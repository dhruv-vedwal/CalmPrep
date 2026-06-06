import { google } from "@/lib/gemini";
import { streamText } from "ai";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { ChatSchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) return new Response("Unauthorized", { status: 401 });

    // Rate limit: 30 messages per user per hour
    const { success } = rateLimit({ key: `chat:${userId}`, limit: 30, windowSec: 3600 });
    if (!success) {
      return new Response(
        JSON.stringify({ error: "Message limit reached. Please try again in an hour." }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const parsed = ChatSchema.safeParse(body);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: parsed.error.errors[0].message }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { messages } = parsed.data;
    const userMessage = messages[messages.length - 1];

    // Persist user message
    await db.chatMessage.create({
      data: { userId, role: "user", content: userMessage.content.slice(0, 4000) },
    });

    const result = await streamText({
      model: google("gemini-2.5-flash"),
      system: `You are MindEase AI, a compassionate mental wellness assistant specifically designed for Indian students preparing for competitive exams like NEET, JEE, UPSC, CAT, GATE, and board exams.

Your role:
- Provide empathetic, evidence-based mental wellness support
- Offer practical, exam-specific coping strategies
- Give actionable advice for stress, anxiety, burnout, and self-doubt
- Suggest breathing exercises, study techniques, and healthy habits
- Recognize when to recommend professional help (always include crisis helplines for severe distress)

Guidelines:
- Keep responses concise (3-5 sentences unless asked for more detail)
- Use warm, encouraging, non-judgmental language
- Acknowledge the unique pressures of Indian competitive exam culture
- Never diagnose or prescribe; recommend professional help when appropriate
- If user expresses self-harm or suicidal thoughts, immediately provide iCall (9152987821) and Vandrevala Foundation (1860-2662-345)`,
      messages: messages as any,
      onFinish: async ({ text }) => {
        if (text) {
          await db.chatMessage.create({
            data: { userId, role: "assistant", content: text.slice(0, 4000) },
          });
        }
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("[chat]", error);
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
