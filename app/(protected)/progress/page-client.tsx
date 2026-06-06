import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import ProgressChart from "@/components/ProgressChart";
import { calculateStreak } from "@/lib/utils";
import { BarChart2, TrendingUp, Flame, Calendar, Tag, Target } from "lucide-react";

const moodLabels: Record<number, string> = { 1: "Terrible", 2: "Low", 3: "Okay", 4: "Good", 5: "Great" };

export default async function ProgressPage() {
  const session = await auth();
  if (!session?.user?.id) return redirect("/auth");

  const entries = await db.moodEntry.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "asc" },
  });

  // Chart data — last 30 entries
  const chartData = entries.slice(-30).map(e => ({
    date: new Date(e.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    mood: e.mood,
    energy: e.energy,
  }));

  const displayData = chartData.length > 0 ? chartData : [
    { date: "Mon", mood: 3, energy: 3 },
    { date: "Tue", mood: 4, energy: 4 },
    { date: "Wed", mood: 2, energy: 2 },
    { date: "Thu", mood: 5, energy: 5 },
    { date: "Fri", mood: 3, energy: 3 },
  ];

  // Stats
  const avgMood = entries.length > 0
    ? (entries.reduce((a, e) => a + e.mood, 0) / entries.length).toFixed(1)
    : "—";

  const avgEnergy = entries.length > 0
    ? (entries.reduce((a, e) => a + e.energy, 0) / entries.length).toFixed(1)
    : "—";

  // Streak
  const streak = calculateStreak(entries);

  // Trigger counts
  const allTriggers: string[] = [];
  entries.forEach(e => {
    try { allTriggers.push(...JSON.parse(e.triggers)); } catch {}
  });
  const triggerCounts: Record<string, number> = {};
  allTriggers.forEach(t => { if (t && t !== "None of the above") triggerCounts[t] = (triggerCounts[t] || 0) + 1; });
  const topTriggers = Object.entries(triggerCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);

  // Mood distribution
  const moodCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  entries.forEach((e) => {
    if (moodCounts[e.mood] !== undefined) {
      moodCounts[e.mood]++;
    }
  });

  const moodDist = [5, 4, 3, 2, 1].map(score => {
    const count = moodCounts[score] || 0;
    return {
      score,
      count,
      pct: entries.length > 0 ? Math.round((count / entries.length) * 100) : 0,
    };
  });

  const moodBarColors: Record<number, string> = {
    1: "bg-peach-deep", 2: "bg-peach-mid", 3: "bg-lavender-mid", 4: "bg-sage-mid", 5: "bg-sage-deep"
  };

  // Best & worst days
  const bestEntry = entries.length > 0 ? entries.reduce((a, b) => b.mood > a.mood ? b : a) : null;
  const worstEntry = entries.length > 0 ? entries.reduce((a, b) => b.mood < a.mood ? b : a) : null;

  return (
    <div className="max-w-[1100px] mx-auto px-4 md:px-6 pb-12">
      <div className="py-7">
        <h1 className="text-[1.75rem] font-semibold text-textPrimary">Your Progress</h1>
        <p className="text-[14px] text-textMuted mt-0.5">Track your emotional wellbeing over time</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-[16px] border border-borderLight p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-lavender-deep" />
            <span className="text-xs text-textMuted">Avg. Mood</span>
          </div>
          <div className="text-2xl font-bold text-lavender-deep">{avgMood}<span className="text-sm font-normal text-textMuted">/5</span></div>
          <div className="text-xs text-textMuted mt-1">{entries.length} check-ins total</div>
        </div>
        <div className="bg-white rounded-[16px] border border-borderLight p-5">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-4 h-4 text-peach-deep" />
            <span className="text-xs text-textMuted">Streak</span>
          </div>
          <div className="text-2xl font-bold text-peach-deep">{streak} <span className="text-sm font-normal text-textMuted">days</span></div>
          <div className="text-xs text-textMuted mt-1">Keep it going!</div>
        </div>
        <div className="bg-white rounded-[16px] border border-borderLight p-5">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-sage-deep" />
            <span className="text-xs text-textMuted">Avg. Energy</span>
          </div>
          <div className="text-2xl font-bold text-sage-deep">{avgEnergy}<span className="text-sm font-normal text-textMuted">/5</span></div>
          <div className="text-xs text-textMuted mt-1">Daily energy levels</div>
        </div>
        <div className="bg-white rounded-[16px] border border-borderLight p-5">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-sky-deep" />
            <span className="text-xs text-textMuted">This Month</span>
          </div>
          <div className="text-2xl font-bold text-sky-deep">
            {entries.filter(e => {
              const d = new Date(e.createdAt);
              const now = new Date();
              return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
            }).length}
          </div>
          <div className="text-xs text-textMuted mt-1">check-ins</div>
        </div>
      </div>

      {/* Main chart */}
      <div className="bg-white rounded-[20px] border border-borderLight p-6 mb-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-[15px] font-semibold flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-lavender-deep" /> Mood & Energy Trends
            </h2>
            <p className="text-[13px] text-textMuted">Last 30 check-ins</p>
          </div>
        </div>
        <ProgressChart data={displayData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Mood distribution */}
        <div className="bg-white rounded-[20px] border border-borderLight p-6">
          <h2 className="text-[15px] font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-lavender-deep" /> Mood Distribution
          </h2>
          {entries.length === 0 ? (
            <p className="text-sm text-textMuted">No data yet.</p>
          ) : (
            <div className="space-y-3">
              {moodDist.map(({ score, count, pct }) => (
                <div key={score} className="flex items-center gap-3">
                  <span className="text-[13px] text-textSecondary font-medium w-16">{moodLabels[score]}</span>
                  <div className="flex-1 h-2.5 rounded-full bg-offWhite overflow-hidden">
                    <div className={`h-full rounded-full ${moodBarColors[score]} transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-[12px] text-textMuted w-12 text-right">{count}× ({pct}%)</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top triggers */}
        <div className="bg-white rounded-[20px] border border-borderLight p-6">
          <h2 className="text-[15px] font-semibold mb-4 flex items-center gap-2">
            <Tag className="w-4 h-4 text-peach-deep" /> Top Stress Triggers
          </h2>
          {topTriggers.length === 0 ? (
            <p className="text-sm text-textMuted">Complete more check-ins to see patterns.</p>
          ) : (
            <div className="space-y-3">
              {topTriggers.map(([trigger, count]) => {
                const max = topTriggers[0][1];
                return (
                  <div key={trigger} className="flex items-center gap-3">
                    <span className="text-[13px] text-textSecondary flex-1 leading-snug">{trigger}</span>
                    <div className="w-24 h-2 rounded-full bg-offWhite overflow-hidden">
                      <div className="h-full rounded-full bg-peach-mid" style={{ width: `${(count / max) * 100}%` }} />
                    </div>
                    <span className="text-[12px] text-textMuted w-5 text-right">{count}×</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Best / worst days */}
        {(bestEntry || worstEntry) && (
          <div className="bg-white rounded-[20px] border border-borderLight p-6 md:col-span-2">
            <h2 className="text-[15px] font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sage-deep" /> Notable Days
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bestEntry && (
                <div className="bg-sage rounded-[12px] border border-sage-mid p-4">
                  <div className="text-xs font-semibold text-sage-text uppercase tracking-wider mb-1">Best day</div>
                  <div className="text-base font-semibold text-sage-text">
                    {new Date(bestEntry.createdAt).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                  </div>
                  <div className="text-sm text-sage-deep mt-1">Mood: {moodLabels[bestEntry.mood]} ({bestEntry.mood}/5)</div>
                  {bestEntry.journal && <p className="text-xs text-sage-text/70 mt-2 italic line-clamp-2">&ldquo;{bestEntry.journal}&rdquo;</p>}
                </div>
              )}
              {worstEntry && (
                <div className="bg-peach rounded-[12px] border border-peach-mid p-4">
                  <div className="text-xs font-semibold text-peach-text uppercase tracking-wider mb-1">Toughest day</div>
                  <div className="text-base font-semibold text-peach-text">
                    {new Date(worstEntry.createdAt).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                  </div>
                  <div className="text-sm text-peach-deep mt-1">Mood: {moodLabels[worstEntry.mood]} ({worstEntry.mood}/5)</div>
                  {worstEntry.journal && <p className="text-xs text-peach-text/70 mt-2 italic line-clamp-2">&ldquo;{worstEntry.journal}&rdquo;</p>}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
