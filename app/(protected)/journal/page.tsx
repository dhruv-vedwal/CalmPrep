import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { BookOpen, CalendarDays, Tag, TrendingUp } from "lucide-react";
import Link from "next/link";

const moodLabels: Record<number, string> = { 1: "Terrible", 2: "Low", 3: "Okay", 4: "Good", 5: "Great" };
const moodColors: Record<number, string> = {
  1: "bg-peach text-peach-text border-peach-mid",
  2: "bg-peach text-peach-text border-peach-mid",
  3: "bg-lavender text-lavender-text border-lavender-mid",
  4: "bg-sage text-sage-text border-sage-mid",
  5: "bg-sage text-sage-text border-sage-mid",
};
const moodBarColors: Record<number, string> = {
  1: "bg-peach-deep", 2: "bg-peach-mid", 3: "bg-lavender-mid", 4: "bg-sage-mid", 5: "bg-sage-deep"
};

export default async function JournalPage() {
  const session = await auth();
  if (!session?.user?.id) return redirect("/auth");

  const entries = await db.moodEntry.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const journalEntries = entries.filter(e => e.journal);
  const totalEntries = entries.length;
  const avgMood = entries.length > 0
    ? (entries.reduce((acc, e) => acc + e.mood, 0) / entries.length).toFixed(1)
    : "—";

  return (
    <div className="max-w-[1100px] mx-auto px-4 md:px-6 pb-12">
      {/* Header */}
      <div className="py-7 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-[1.75rem] font-semibold text-textPrimary">Your Journal</h1>
          <p className="text-[14px] text-textMuted mt-0.5">A safe, private space for your thoughts</p>
        </div>
        <Link href="/checkin" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-lavender-deep text-white text-sm font-medium hover:bg-lavender-text transition-colors">
          <BookOpen className="w-4 h-4" />
          New Entry
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-7">
        <div className="bg-white rounded-[16px] border border-borderLight p-5">
          <div className="flex items-center gap-2 mb-2">
            <CalendarDays className="w-4 h-4 text-lavender-deep" />
            <span className="text-xs text-textMuted font-medium">Total Check-ins</span>
          </div>
          <div className="text-2xl font-bold text-lavender-deep">{totalEntries}</div>
        </div>
        <div className="bg-white rounded-[16px] border border-borderLight p-5">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-sage-deep" />
            <span className="text-xs text-textMuted font-medium">Journal Entries</span>
          </div>
          <div className="text-2xl font-bold text-sage-deep">{journalEntries.length}</div>
        </div>
        <div className="bg-white rounded-[16px] border border-borderLight p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-peach-deep" />
            <span className="text-xs text-textMuted font-medium">Average Mood</span>
          </div>
          <div className="text-2xl font-bold text-peach-deep">{avgMood}<span className="text-sm font-normal text-textMuted">/5</span></div>
        </div>
      </div>

      {/* Entries + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">
        <div>
          {entries.length === 0 ? (
            <div className="bg-white rounded-[20px] border border-borderLight p-10 text-center">
              <BookOpen className="w-10 h-10 text-borderMed mx-auto mb-3" />
              <p className="text-textMuted text-sm">No entries yet.</p>
              <p className="text-textMuted text-xs mt-1">Complete your first check-in to start your journal.</p>
              <Link href="/checkin" className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl bg-lavender-deep text-white text-sm font-medium hover:bg-lavender-text transition-colors">
                Start check-in
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {entries.map(entry => {
                let tags: string[] = [];
                try { tags = JSON.parse(entry.triggers).filter((t: string) => t !== "None of the above"); } catch {}
                return (
                  <div key={entry.id} className="bg-white rounded-[16px] border border-borderLight p-5 hover:border-lavender-mid hover:shadow-sm transition-all">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${moodColors[entry.mood]}`}>
                          {moodLabels[entry.mood]}
                        </div>
                        <div className="flex items-center gap-1.5">
                          {[1, 2, 3, 4, 5].map(n => (
                            <div
                              key={n}
                              className={`w-2 h-2 rounded-full ${n <= entry.mood ? moodBarColors[entry.mood] : "bg-borderLight"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-[12px] text-textMuted shrink-0">
                        {new Date(entry.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        {" · "}
                        {new Date(entry.createdAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>

                    {entry.journal && (
                      <p className="text-[14px] text-textSecondary leading-relaxed mb-3 italic">
                        &ldquo;{entry.journal}&rdquo;
                      </p>
                    )}

                    {tags.length > 0 && (
                      <div className="flex gap-1.5 flex-wrap">
                        <Tag className="w-3.5 h-3.5 text-textMuted shrink-0 mt-0.5" />
                        {tags.map(t => (
                          <span key={t} className="px-2 py-0.5 rounded-full bg-offWhite text-[11px] text-textMuted border border-borderLight">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-2.5 pt-2.5 border-t border-borderLight flex gap-3 text-[12px] text-textMuted">
                      <span>Energy: <strong className="text-textSecondary">{entry.energy}/5</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-lavender to-[rgba(237,235,254,0.4)] rounded-[18px] border border-lavender-mid p-5">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-lavender-deep" />
              <h3 className="text-sm font-semibold text-lavender-text">Writing Prompts</h3>
            </div>
            <div className="space-y-2">
              {[
                "What made you smile today, even briefly?",
                "What's one thing you'd tell your past self this week?",
                "When did you feel most in control today?",
                "What's draining your energy most right now?",
              ].map((prompt, i) => (
                <div key={i} className="text-[12px] text-lavender-text bg-white/60 rounded-lg px-3 py-2 italic leading-relaxed">
                  &ldquo;{prompt}&rdquo;
                </div>
              ))}
            </div>
          </div>

          {/* Mood distribution */}
          {entries.length > 0 && (
            <div className="bg-white rounded-[18px] border border-borderLight p-5">
              <h3 className="text-sm font-semibold text-textPrimary mb-3">Mood Distribution</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map(score => {
                  const count = entries.filter(e => e.mood === score).length;
                  const pct = entries.length > 0 ? (count / entries.length) * 100 : 0;
                  return (
                    <div key={score} className="flex items-center gap-2">
                      <span className="text-[12px] text-textMuted w-12">{moodLabels[score]}</span>
                      <div className="flex-1 h-2 rounded-full bg-offWhite overflow-hidden">
                        <div className={`h-full rounded-full ${moodBarColors[score]}`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-[11px] text-textMuted w-5 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
