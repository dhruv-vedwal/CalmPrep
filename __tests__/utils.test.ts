import {
  calculateStreak,
  calculateAvgMood,
  countTriggers,
  safeJsonParse,
  truncate,
  formatDate,
} from "@/lib/utils";

describe("calculateStreak", () => {
  const daysAgo = (n: number): { createdAt: Date } => {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return { createdAt: d };
  };

  it("returns 0 for empty entries", () => {
    expect(calculateStreak([])).toBe(0);
  });

  it("returns 1 for a single entry today", () => {
    expect(calculateStreak([daysAgo(0)])).toBe(1);
  });

  it("correctly counts a 3-day streak", () => {
    expect(calculateStreak([daysAgo(0), daysAgo(1), daysAgo(2)])).toBe(3);
  });

  it("stops streak at a gap in consecutive days", () => {
    // today, yesterday, then gap — day 3 missing
    expect(calculateStreak([daysAgo(0), daysAgo(1), daysAgo(3)])).toBe(2);
  });

  it("returns 0 if most recent entry is from 2 days ago (missed yesterday)", () => {
    expect(calculateStreak([daysAgo(2), daysAgo(3)])).toBe(0);
  });
});

describe("calculateAvgMood", () => {
  it("returns null for empty array", () => {
    expect(calculateAvgMood([])).toBeNull();
  });

  it("returns the single value for a one-element array", () => {
    expect(calculateAvgMood([4])).toBe(4);
  });

  it("calculates correct average", () => {
    expect(calculateAvgMood([1, 3, 5])).toBeCloseTo(3.0);
  });

  it("handles all same values", () => {
    expect(calculateAvgMood([5, 5, 5])).toBe(5);
  });
});

describe("countTriggers", () => {
  it("returns empty object for empty input", () => {
    expect(countTriggers([])).toEqual({});
  });

  it("counts triggers correctly", () => {
    const result = countTriggers([
      '["Mock test anxiety", "Sleep issues"]',
      '["Mock test anxiety"]',
      '["Family pressure"]',
    ]);
    expect(result["Mock test anxiety"]).toBe(2);
    expect(result["Sleep issues"]).toBe(1);
    expect(result["Family pressure"]).toBe(1);
  });

  it("excludes None of the above", () => {
    const result = countTriggers(['["None of the above"]']);
    expect(result["None of the above"]).toBeUndefined();
  });

  it("handles invalid JSON gracefully", () => {
    expect(() => countTriggers(["not json", '["valid"]'])).not.toThrow();
    const result = countTriggers(["not json", '["valid"]']);
    expect(result["valid"]).toBe(1);
  });
});

describe("safeJsonParse", () => {
  it("parses valid JSON", () => {
    expect(safeJsonParse('{"a":1}', {})).toEqual({ a: 1 });
  });

  it("returns fallback for invalid JSON", () => {
    expect(safeJsonParse("not json", [])).toEqual([]);
  });

  it("returns fallback for empty string", () => {
    expect(safeJsonParse("", null)).toBeNull();
  });
});

describe("truncate", () => {
  it("does not truncate strings within limit", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });

  it("truncates long strings with ellipsis", () => {
    const result = truncate("hello world", 8);
    expect(result).toHaveLength(8);
    expect(result).toMatch(/…$/);
  });

  it("handles exact limit", () => {
    expect(truncate("hello", 5)).toBe("hello");
  });
});

describe("formatDate", () => {
  it("returns a non-empty string", () => {
    const result = formatDate(new Date("2025-06-06"));
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("accepts string dates", () => {
    expect(() => formatDate("2025-06-06T00:00:00Z")).not.toThrow();
  });
});
