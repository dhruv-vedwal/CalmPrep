import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { MoodEntrySchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate limit: 20 mood entries per user per hour
    const { success } = rateLimit({
      key: `mood:${session.user.id}`,
      limit: 20,
      windowSec: 3600,
    });
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please slow down." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = MoodEntrySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { mood, triggers, journal, energy } = parsed.data;

    const entry = await db.moodEntry.create({
      data: {
        userId: session.user.id,
        mood,
        triggers,
        journal,
        energy,
      },
      select: { id: true, mood: true, createdAt: true },
    });

    return NextResponse.json({ entry }, { status: 201 });
  } catch (error) {
    console.error("[mood POST]", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const entries = await db.moodEntry.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        mood: true,
        energy: true,
        triggers: true,
        journal: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ entries });
  } catch (error) {
    console.error("[mood GET]", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
