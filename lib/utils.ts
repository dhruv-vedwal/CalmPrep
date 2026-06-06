/**
 * Formats a Date object into a short human-readable string.
 * @example formatDate(new Date()) → "Jun 6, 2026"
 */
export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Formats a Date into a time string.
 * @example formatTime(new Date()) → "12:30 PM"
 */
export function formatTime(date: Date | string): string {
  return new Date(date).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Safely parses a JSON string, returning a fallback on error.
 * Used for parsing mood trigger arrays stored as strings in the DB.
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

/**
 * Calculates the check-in streak from a sorted (newest-first) array of mood entry dates.
 */
export function calculateStreak(entries: { createdAt: Date | string }[]): number {
  if (entries.length === 0) return 0;
  let streak = 0;
  const now = new Date();
  for (let i = 0; i < entries.length; i++) {
    const entryDate = new Date(entries[i].createdAt);
    const diffDays = Math.floor(
      (now.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diffDays === i) streak++;
    else break;
  }
  return streak;
}

/**
 * Calculates the average mood from a list of mood entry scores.
 * Returns null if no entries.
 */
export function calculateAvgMood(moods: number[]): number | null {
  if (moods.length === 0) return null;
  return moods.reduce((a, b) => a + b, 0) / moods.length;
}

/**
 * Counts the frequency of each trigger across all entries.
 * Excludes "None of the above" and invalid JSON.
 */
export function countTriggers(
  triggerJsonStrings: string[]
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const json of triggerJsonStrings) {
    let parsed: string[] = [];
    try {
      parsed = JSON.parse(json);
    } catch {
      continue;
    }
    for (const t of parsed) {
      if (t && t !== "None of the above") {
        counts[t] = (counts[t] ?? 0) + 1;
      }
    }
  }
  return counts;
}

/**
 * Truncates a string to a max character length with an ellipsis.
 */
export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 1) + "…";
}
