import { MOOD_LABELS, MOOD_COLORS, HELPLINES, EXAM_TYPES, MAX_JOURNAL_LENGTH, MAX_MESSAGE_LENGTH } from "@/lib/constants";

describe("MOOD_LABELS", () => {
  it("covers all scores 1-5", () => {
    [1, 2, 3, 4, 5].forEach(score => {
      expect(MOOD_LABELS[score]).toBeDefined();
      expect(typeof MOOD_LABELS[score]).toBe("string");
    });
  });

  it("assigns correct labels", () => {
    expect(MOOD_LABELS[1]).toBe("Terrible");
    expect(MOOD_LABELS[3]).toBe("Okay");
    expect(MOOD_LABELS[5]).toBe("Great");
  });
});

describe("MOOD_COLORS", () => {
  it("covers all scores 1-5", () => {
    [1, 2, 3, 4, 5].forEach(score => {
      expect(MOOD_COLORS[score]).toBeDefined();
    });
  });

  it("uses different colors for low vs high scores", () => {
    expect(MOOD_COLORS[1]).not.toBe(MOOD_COLORS[5]);
  });
});

describe("HELPLINES", () => {
  it("has at least 3 helplines", () => {
    expect(HELPLINES.length).toBeGreaterThanOrEqual(3);
  });

  it("each helpline has name, tel, and display fields", () => {
    HELPLINES.forEach(line => {
      expect(line.name).toBeTruthy();
      expect(line.tel).toBeTruthy();
      expect(line.display).toBeTruthy();
    });
  });

  it("tel numbers contain only digits", () => {
    HELPLINES.forEach(line => {
      expect(line.tel).toMatch(/^\d+$/);
    });
  });
});

describe("EXAM_TYPES", () => {
  it("includes major Indian competitive exams", () => {
    expect(EXAM_TYPES).toContain("NEET");
    expect(EXAM_TYPES).toContain("JEE");
    expect(EXAM_TYPES).toContain("UPSC");
    expect(EXAM_TYPES).toContain("CAT");
    expect(EXAM_TYPES).toContain("GATE");
  });
});

describe("Limits", () => {
  it("MAX_JOURNAL_LENGTH is at least 1000 characters", () => {
    expect(MAX_JOURNAL_LENGTH).toBeGreaterThanOrEqual(1000);
  });

  it("MAX_MESSAGE_LENGTH is at least 500 characters", () => {
    expect(MAX_MESSAGE_LENGTH).toBeGreaterThanOrEqual(500);
  });
});
