import { RegisterSchema, MoodEntrySchema, ChatSchema } from "@/lib/validations";

describe("RegisterSchema", () => {
  it("accepts valid registration data", () => {
    const result = RegisterSchema.safeParse({
      name: "Arjun Sharma",
      email: "arjun@example.com",
      password: "StrongPass1",
      examType: "NEET",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = RegisterSchema.safeParse({
      name: "Arjun",
      email: "not-an-email",
      password: "StrongPass1",
      examType: "JEE",
    });
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toMatch(/invalid email/i);
  });

  it("rejects a password without uppercase letter", () => {
    const result = RegisterSchema.safeParse({
      name: "Arjun",
      email: "arjun@example.com",
      password: "weakpass1",
      examType: "JEE",
    });
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toMatch(/uppercase/i);
  });

  it("rejects a password without a number", () => {
    const result = RegisterSchema.safeParse({
      name: "Arjun",
      email: "arjun@example.com",
      password: "WeakPassNoNum",
      examType: "JEE",
    });
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toMatch(/number/i);
  });

  it("rejects a password shorter than 8 characters", () => {
    const result = RegisterSchema.safeParse({
      name: "Arjun",
      email: "arjun@example.com",
      password: "Ab1",
      examType: "JEE",
    });
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toMatch(/8 characters/i);
  });

  it("normalizes email to lowercase", () => {
    const result = RegisterSchema.safeParse({
      name: "Arjun",
      email: "ARJUN@EXAMPLE.COM",
      password: "StrongPass1",
      examType: "NEET",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("arjun@example.com");
    }
  });

  it("defaults examType to NEET if not provided", () => {
    const result = RegisterSchema.safeParse({
      name: "Arjun",
      email: "arjun@example.com",
      password: "StrongPass1",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.examType).toBe("NEET");
    }
  });

  it("rejects invalid examType", () => {
    const result = RegisterSchema.safeParse({
      name: "Arjun",
      email: "arjun@example.com",
      password: "StrongPass1",
      examType: "INVALID_EXAM",
    });
    expect(result.success).toBe(false);
  });
});

describe("MoodEntrySchema", () => {
  it("accepts valid mood entry", () => {
    const result = MoodEntrySchema.safeParse({
      mood: 4,
      energy: 3,
      triggers: '["Mock test anxiety"]',
      journal: "Had a productive day",
    });
    expect(result.success).toBe(true);
  });

  it("rejects mood below 1", () => {
    const result = MoodEntrySchema.safeParse({ mood: 0, triggers: "[]" });
    expect(result.success).toBe(false);
  });

  it("rejects mood above 5", () => {
    const result = MoodEntrySchema.safeParse({ mood: 6, triggers: "[]" });
    expect(result.success).toBe(false);
  });

  it("rejects mood that is not an integer", () => {
    const result = MoodEntrySchema.safeParse({ mood: 3.5, triggers: "[]" });
    expect(result.success).toBe(false);
  });

  it("rejects journal longer than 5000 characters", () => {
    const result = MoodEntrySchema.safeParse({
      mood: 3,
      triggers: "[]",
      journal: "x".repeat(5001),
    });
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toMatch(/too long/i);
  });

  it("defaults journal to empty string", () => {
    const result = MoodEntrySchema.safeParse({ mood: 3, triggers: "[]" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.journal).toBe("");
    }
  });
});

describe("ChatSchema", () => {
  it("accepts valid chat messages", () => {
    const result = ChatSchema.safeParse({
      messages: [
        { role: "user", content: "I am feeling anxious about my exam" },
        { role: "assistant", content: "I understand. Let's work through this together." },
      ],
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty messages array", () => {
    const result = ChatSchema.safeParse({ messages: [] });
    expect(result.success).toBe(false);
  });

  it("rejects invalid role", () => {
    const result = ChatSchema.safeParse({
      messages: [{ role: "admin", content: "test" }],
    });
    expect(result.success).toBe(false);
  });

  it("rejects message content over 4000 characters", () => {
    const result = ChatSchema.safeParse({
      messages: [{ role: "user", content: "x".repeat(4001) }],
    });
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toMatch(/too long/i);
  });
});
