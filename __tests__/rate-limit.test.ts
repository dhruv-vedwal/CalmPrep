import { rateLimit } from "@/lib/rate-limit";

describe("rateLimit", () => {
  it("allows requests under the limit", () => {
    const result = rateLimit({ key: "test-under-1", limit: 5, windowSec: 60 });
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(4);
  });

  it("blocks requests that exceed the limit", () => {
    const key = "test-over-limit";
    for (let i = 0; i < 3; i++) {
      rateLimit({ key, limit: 3, windowSec: 60 });
    }
    const blocked = rateLimit({ key, limit: 3, windowSec: 60 });
    expect(blocked.success).toBe(false);
    expect(blocked.remaining).toBe(0);
  });

  it("tracks remaining count correctly", () => {
    const key = "test-remaining";
    const r1 = rateLimit({ key, limit: 5, windowSec: 60 });
    expect(r1.remaining).toBe(4);
    const r2 = rateLimit({ key, limit: 5, windowSec: 60 });
    expect(r2.remaining).toBe(3);
    const r3 = rateLimit({ key, limit: 5, windowSec: 60 });
    expect(r3.remaining).toBe(2);
  });

  it("uses separate buckets for different keys", () => {
    const r1 = rateLimit({ key: "user-A", limit: 1, windowSec: 60 });
    const r2 = rateLimit({ key: "user-B", limit: 1, windowSec: 60 });
    expect(r1.success).toBe(true);
    expect(r2.success).toBe(true);

    const r3 = rateLimit({ key: "user-A", limit: 1, windowSec: 60 });
    expect(r3.success).toBe(false);
  });
});
