/** Mood score labels */
export const MOOD_LABELS: Record<number, string> = {
  1: "Terrible",
  2: "Low",
  3: "Okay",
  4: "Good",
  5: "Great",
} as const;

/** Mood score Tailwind color classes */
export const MOOD_COLORS: Record<number, string> = {
  1: "bg-peach-deep",
  2: "bg-peach-mid",
  3: "bg-lavender-mid",
  4: "bg-sage-mid",
  5: "bg-sage-deep",
} as const;

/** Mood score badge classes (bg + text + border) */
export const MOOD_BADGE: Record<number, string> = {
  1: "bg-peach text-peach-text border-peach-mid",
  2: "bg-peach text-peach-text border-peach-mid",
  3: "bg-lavender text-lavender-text border-lavender-mid",
  4: "bg-sage text-sage-text border-sage-mid",
  5: "bg-sage text-sage-text border-sage-mid",
} as const;

/** Valid exam types */
export const EXAM_TYPES = ["NEET", "JEE", "CUET", "CAT", "GATE", "UPSC", "Boards", "Other"] as const;
export type ExamType = (typeof EXAM_TYPES)[number];

/** Valid roles in the chat */
export const CHAT_ROLES = ["user", "assistant", "system"] as const;
export type ChatRole = (typeof CHAT_ROLES)[number];

/** Max mood entry journal length */
export const MAX_JOURNAL_LENGTH = 5000;

/** Max chat message length */
export const MAX_MESSAGE_LENGTH = 4000;

/** Helpline numbers */
export const HELPLINES = [
  { name: "iCall", tel: "9152987821", display: "9152987821" },
  { name: "Vandrevala Foundation", tel: "18602662345", display: "1860-266-2345" },
  { name: "iMind", tel: "08046110007", display: "080-46110007" },
] as const;
