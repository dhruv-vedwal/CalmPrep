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
  
  // Get unique local dates (YYYY-MM-DD)
  const uniqueDates = Array.from(new Set(
    entries.map(e => new Date(e.createdAt).toLocaleDateString("en-CA"))
  )).sort((a, b) => b.localeCompare(a)); // Newest first

  if (uniqueDates.length === 0) return 0;

  const todayStr = new Date().toLocaleDateString("en-CA");
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toLocaleDateString("en-CA");

  const newestDate = uniqueDates[0];
  
  // If the newest check-in is not today and not yesterday, the streak is broken
  if (newestDate !== todayStr && newestDate !== yesterdayStr) {
    return 0;
  }

  let streak = 1;
  for (let i = 0; i < uniqueDates.length - 1; i++) {
    const current = new Date(uniqueDates[i]);
    const next = new Date(uniqueDates[i + 1]);
    const diffTime = current.getTime() - next.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      streak++;
    } else if (diffDays > 1) {
      break; // Gap detected, stop counting
    }
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
