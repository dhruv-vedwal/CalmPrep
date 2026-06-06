import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import CrisisBanner from "@/components/CrisisBanner";
import DashboardClient from "@/components/DashboardClient";
import { calculateStreak, calculateAvgMood, countTriggers } from "@/lib/utils";
import { MOOD_LABELS } from "@/lib/constants";
import {
  Flame, TrendingUp, BookOpen, ClipboardCheck,
  MessageSquare, BarChart2, ArrowRight, Sparkles, Target,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard — MindEase",
  description: "Your daily mental wellness overview: mood streak, stress triggers, and check-in status.",
};

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user?.id) return redirect("/auth");

  const userId = session.user.id;

  const [moodEntries, chatCount] = await Promise.all([
    db.moodEntry.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 30,
      select: { id: true, mood: true, energy: true, triggers: true, journal: true, createdAt: true },
    }),
    db.chatMessage.count({ where: { userId, role: "user" } }),
  ]);

  const todayEntry = moodEntries[0];
  const todayCheckedIn =
    todayEntry
      ? new Date(todayEntry.createdAt).toDateString() === new Date().toDateString()
      : false;

  const streak = calculateStreak(moodEntries);

  const weekData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const entry = moodEntries.find(
      (e) => new Date(e.createdAt).toDateString() === d.toDateString()
    );
    return {
      day: d.toLocaleDateString("en-US", { weekday: "short" }),
      mood: entry?.mood ?? null,
      isToday: d.toDateString() === new Date().toDateString(),
    };
  });

  const weekMoods = weekData.filter((d) => d.mood !== null).map((d) => d.mood as number);
  const avgMoodNum = calculateAvgMood(weekMoods);
  const avgMood = avgMoodNum !== null ? avgMoodNum.toFixed(1) : "—";

  const triggerCounts = countTriggers(moodEntries.map((e) => e.triggers));
  const topTriggers = Object.entries(triggerCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const firstName = session.user.name?.split(" ")[0] || "there";

  return (
    <div className="max-w-[1100px] mx-auto px-4 md:px-6 pb-8">
      <div className="py-7 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-[1.75rem] font-semibold text-textPrimary">
            {greeting}, <span className="text-lavender-deep">{firstName}</span>
          </h1>
          <p className="text-[14px] text-textMuted mt-0.5">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        {!todayCheckedIn && (
          <Link
            href="/checkin"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-lavender-deep text-white text-sm font-medium hover:bg-lavender-text transition-colors shadow-sm"
            aria-label="Start today's mood check-in"
          >
            <ClipboardCheck className="w-4 h-4" aria-hidden="true" />
            Daily Check-in
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6" role="region" aria-label="Wellness statistics">
        <StatCard label="Current Streak" value={`${streak}`} sub="days in a row" icon={<Flame className="w-5 h-5 text-peach-deep" aria-hidden="true" />} bg="bg-peach" color="text-peach-deep" />
        <StatCard label="Avg. Mood (7d)" value={avgMood} sub={weekMoods.length > 0 ? `from ${weekMoods.length} check-ins` : "no data yet"} icon={<TrendingUp className="w-5 h-5 text-lavender-deep" aria-hidden="true" />} bg="bg-lavender" color="text-lavender-deep" />
        <StatCard label="Journal Entries" value={`${moodEntries.filter((e) => e.journal).length}`} sub="total entries" icon={<BookOpen className="w-5 h-5 text-sage-deep" aria-hidden="true" />} bg="bg-sage" color="text-sage-deep" />
        <StatCard label="AI Conversations" value={`${chatCount}`} sub="messages sent" icon={<MessageSquare className="w-5 h-5 text-sky-deep" aria-hidden="true" />} bg="bg-sky" color="text-sky-deep" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5 mb-6">
        <div className="space-y-4">
          <section aria-label="Mood this week" className="bg-white rounded-[20px] border border-borderLight p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-[15px] font-semibold text-textPrimary">Mood This Week</h2>
                <p className="text-[13px] text-textMuted">Daily mood score overview</p>
              </div>
              <Link href="/progress" className="text-xs text-lavender-deep font-medium hover:underline flex items-center gap-1" aria-label="View full progress report">
                View all <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </Link>
            </div>
            <DashboardClient weekData={weekData} />
          </section>

          <nav aria-label="Quick actions" className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <QuickAction href="/checkin" icon={<ClipboardCheck className="w-5 h-5 text-lavender-deep" aria-hidden="true" />} label="Check-in" bg="bg-lavender" />
            <QuickAction href="/breathe" icon={<BarChart2 className="w-5 h-5 text-sage-deep" aria-hidden="true" />} label="Breathe" bg="bg-sage" />
            <QuickAction href="/chat" icon={<MessageSquare className="w-5 h-5 text-sky-deep" aria-hidden="true" />} label="AI Support" bg="bg-sky" />
            <QuickAction href="/progress" icon={<BarChart2 className="w-5 h-5 text-peach-deep" aria-hidden="true" />} label="Progress" bg="bg-peach" />
          </nav>
        </div>

        <div className="space-y-4">
          {todayCheckedIn && todayEntry ? (
            <div className="bg-gradient-to-br from-sage to-[rgba(214,237,214,0.4)] rounded-[18px] border border-sage-mid p-5" role="status" aria-label="Today's check-in complete">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-sage-mid flex items-center justify-center" aria-hidden="true">
                  <ClipboardCheck className="w-4 h-4 text-sage-deep" />
                </div>
                <span className="text-sm font-semibold text-sage-text">Today&apos;s Check-in Done</span>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-3 h-3 rounded-full bg-sage-deep" aria-hidden="true" />
                <span className="text-[13px] text-textSecondary">
                  You felt <strong>{MOOD_LABELS[todayEntry.mood]}</strong> today
                </span>
              </div>
              {todayEntry.journal && (
                <p className="text-[13px] text-textSecondary mt-2 italic leading-relaxed line-clamp-2">
                  &ldquo;{todayEntry.journal}&rdquo;
                </p>
              )}
            </div>
          ) : (
            <div className="bg-gradient-to-br from-lavender to-[rgba(237,235,254,0.4)] rounded-[18px] border border-lavender-mid p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-lavender-mid flex items-center justify-center" aria-hidden="true">
                  <Sparkles className="w-4 h-4 text-lavender-deep" />
                </div>
                <span className="text-sm font-semibold text-lavender-text">Ready for your check-in?</span>
              </div>
              <p className="text-[13px] text-textSecondary mb-4">30 seconds to log your mood and start your day with intention.</p>
              <Link href="/checkin" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-lavender-deep text-white text-sm font-medium hover:bg-lavender-text transition-colors">
                Start check-in <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          )}

          <section aria-label="Top stress triggers" className="bg-white rounded-[18px] border border-borderLight p-5">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-peach-deep" aria-hidden="true" />
              <h2 className="text-sm font-semibold text-textPrimary">Top Stressors</h2>
            </div>
            {topTriggers.length > 0 ? (
              <ul className="space-y-2" aria-label="Stress trigger frequency list">
                {topTriggers.map(([trigger, count]) => (
                  <li key={trigger} className="flex items-center gap-2">
                    <span className="flex-1 text-[13px] text-textSecondary">{trigger}</span>
                    <div className="h-1.5 rounded-full bg-peach-mid" style={{ width: `${Math.min(count * 16, 80)}px` }} aria-hidden="true" />
                    <span className="text-[11px] text-textMuted w-5 text-right" aria-label={`${count} times`}>{count}x</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[13px] text-textMuted">Complete check-ins to see your stress patterns.</p>
            )}
          </section>

          {moodEntries.some((e) => e.journal) && (
            <section aria-label="Latest journal entry" className="bg-white rounded-[18px] border border-borderLight p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-sage-deep" aria-hidden="true" />
                  <h2 className="text-sm font-semibold text-textPrimary">Latest Entry</h2>
                </div>
                <Link href="/journal" className="text-xs text-lavender-deep hover:underline">View all</Link>
              </div>
              {(() => {
                const latest = moodEntries.find((e) => e.journal);
                if (!latest) return null;
                return (
                  <blockquote className="text-[13px] text-textSecondary italic leading-relaxed line-clamp-3 border-l-2 border-lavender-mid pl-3">
                    {latest.journal}
                  </blockquote>
                );
              })()}
            </section>
          )}

          <CrisisBanner />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, icon, bg, color }: {
  label: string; value: string; sub: string;
  icon: React.ReactNode; bg: string; color: string;
}) {
  return (
    <div className="bg-white rounded-[16px] border border-borderLight py-4 px-5 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-textMuted font-medium">{label}</span>
        <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`} aria-hidden="true">{icon}</div>
      </div>
      <div className={`text-[28px] font-bold ${color} leading-none`} aria-label={`${label}: ${value}`}>{value}</div>
      <div className="text-[11px] text-textMuted">{sub}</div>
    </div>
  );
}

function QuickAction({ href, icon, label, bg }: { href: string; icon: React.ReactNode; label: string; bg: string }) {
  return (
    <Link href={href} className="bg-white rounded-[14px] border border-borderLight p-4 flex flex-col items-center gap-2.5 hover:border-lavender-mid hover:shadow-sm transition-all group no-underline" aria-label={`Go to ${label}`}>
      <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center group-hover:scale-110 transition-transform`} aria-hidden="true">
        {icon}
      </div>
      <span className="text-[12px] font-medium text-textSecondary">{label}</span>
    </Link>
  );
}
