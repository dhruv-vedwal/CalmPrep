import { google } from "@/lib/gemini";
import { streamText } from "ai";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return new Response("Unauthorized", { status: 401 });

  const { messages } = await req.json();

  const userMessage = messages[messages.length - 1];
  await db.chatMessage.create({
    data: {
      userId: session.user.id,
      role: "user",
      content: userMessage.content,
    }
  });

  const result = await streamText({
    model: google('models/gemini-1.5-flash'),
    system: "You are a mental wellness assistant for an Indian student preparing for competitive exams. Provide brief, empathetic, and actionable advice.",
    messages,
    onFinish: async ({ text }) => {
      if (text) {
        await db.chatMessage.create({
          data: {
            userId: session.user.id,
            role: "assistant",
            content: text,
          }
        });
      }
    }
  });

  return result.toDataStreamResponse();
}
