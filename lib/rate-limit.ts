/**
 * Simple in-memory rate limiter.
 * For production, replace with Redis-based (e.g. Upstash).
 */
const rateMap = new Map<string, { count: number; resetAt: number }>();

interface RateLimitOptions {
  /** Identifier (e.g. IP or userId) */
  key: string;
  /** Max requests allowed in the window */
  limit: number;
  /** Window duration in seconds */
  windowSec: number;
}

export function rateLimit({ key, limit, windowSec }: RateLimitOptions): {
  success: boolean;
  remaining: number;
} {
  const now = Date.now();
  const entry = rateMap.get(key);

  if (!entry || entry.resetAt < now) {
    rateMap.set(key, { count: 1, resetAt: now + windowSec * 1000 });
    return { success: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { success: false, remaining: 0 };
  }

  entry.count += 1;
  return { success: true, remaining: limit - entry.count };
}
