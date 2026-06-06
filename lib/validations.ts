import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100).trim(),
  email: z.string().email("Invalid email address").toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password too long")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
  examType: z.enum(["NEET", "JEE", "CUET", "CAT", "GATE", "UPSC", "Boards", "Other"]).default("NEET"),
});

export const MoodEntrySchema = z.object({
  mood: z.number().int().min(1).max(5),
  energy: z.number().int().min(1).max(5).default(3),
  triggers: z.string().max(2000, "Triggers data too large"),
  journal: z.string().max(5000, "Journal entry too long").default(""),
});

export const ChatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string().max(4000, "Message too long"),
      })
    )
    .min(1)
    .max(100),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type MoodEntryInput = z.infer<typeof MoodEntrySchema>;
export type ChatInput = z.infer<typeof ChatSchema>;
