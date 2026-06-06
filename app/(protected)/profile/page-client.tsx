import { auth, signOut } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import {
  User, Mail, BookOpen, Calendar, Flame, TrendingUp,
  LogOut, Shield, Bell, Palette, ChevronRight, Award
} from "lucide-react";
import Link from "next/link";

const moodLabels: Record<number, string> = { 1: "Terrible", 2: "Low", 3: "Okay", 4: "Good", 5: "Great" };

const badges = [
  { id: "first_checkin", label: "First Step", desc: "Completed first check-in", icon: Award, req: 1 },
  { id: "week_streak", label: "Week Warrior", desc: "7-day check-in streak", icon: Flame, req: 7 },
  { id: "ten_entries", label: "Journaler", desc: "10 journal entries", icon: BookOpen, req: 10 },
  { id: "month_streak", label: "Iron Will", desc: "30-day streak", icon: Shield, req: 30 },
];

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) return redirect("/auth");

  const userId = session.user.id;

  const [user, moodEntries] = await Promise.all([
    db.user.findUnique({ where: { id: userId } }),
    db.moodEntry.findMany({ where: { userId }, orderBy: { createdAt: "desc" } }),
  ]);

  if (!user) return redirect("/auth");

  // Compute stats
  const streak = (() => {
    let s = 0;
    const now = new Date();
    for (let i = 0; i < moodEntries.length; i++) {
      const d = new Date(moodEntries[i].createdAt);
      const diff = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
      if (diff === i) s++;
      else break;
    }
    return s;
  })();

  const avgMood = moodEntries.length > 0
    ? (moodEntries.reduce((a, e) => a + e.mood, 0) / moodEntries.length).toFixed(1)
    : null;

  const journalCount = moodEntries.filter(e => e.journal).length;

  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long", year: "numeric"
  });

  const initials = user.name
    ? user.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  // Badge unlock logic
  const unlockedBadges = badges.filter(b => {
    if (b.id === "first_checkin") return moodEntries.length >= 1;
    if (b.id === "week_streak") return streak >= 7;
    if (b.id === "ten_entries") return journalCount >= 10;
    if (b.id === "month_streak") return streak >= 30;
    return false;
  });

  return (
    <div className="max-w-[900px] mx-auto px-4 md:px-6 pb-12">
      <div className="py-7">
        <h1 className="text-[1.75rem] font-semibold text-textPrimary">Profile</h1>
        <p className="text-[14px] text-textMuted mt-0.5">Manage your account and wellbeing journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-5">
        {/* Left — Avatar & Identity */}
        <div className="space-y-4">
          {/* Avatar card */}
          <div className="bg-white rounded-[20px] border border-borderLight p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-lavender-mid to-lavender-deep flex items-center justify-center text-[26px] font-bold text-white mx-auto mb-3">
              {initials}
            </div>
            <h2 className="text-[17px] font-semibold text-textPrimary">{user.name}</h2>
            <p className="text-[13px] text-textMuted mt-0.5">{user.email}</p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lavender text-lavender-text text-xs font-medium mt-2.5">
              <BookOpen className="w-3 h-3" />
              {user.examType} Aspirant
            </div>
          </div>

          {/* Quick stats */}
          <div className="bg-white rounded-[20px] border border-borderLight p-5 space-y-3">
            <h3 className="text-xs font-semibold text-textMuted uppercase tracking-wider">Your Stats</h3>
            <Stat icon={<Flame className="w-4 h-4 text-peach-deep" />} label="Current Streak" value={`${streak} days`} />
            <Stat icon={<TrendingUp className="w-4 h-4 text-lavender-deep" />} label="Avg. Mood" value={avgMood ? `${avgMood}/5` : "No data"} />
            <Stat icon={<BookOpen className="w-4 h-4 text-sage-deep" />} label="Journal Entries" value={`${journalCount}`} />
            <Stat icon={<Calendar className="w-4 h-4 text-sky-deep" />} label="Total Check-ins" value={`${moodEntries.length}`} />
            <Stat icon={<User className="w-4 h-4 text-textMuted" />} label="Member since" value={memberSince} />
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Profile info */}
          <div className="bg-white rounded-[20px] border border-borderLight p-6">
            <h3 className="text-[15px] font-semibold text-textPrimary mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-lavender-deep" /> Account Information
            </h3>
            <div className="space-y-4">
              <InfoRow icon={<User className="w-4 h-4 text-textMuted" />} label="Full Name" value={user.name} />
              <InfoRow icon={<Mail className="w-4 h-4 text-textMuted" />} label="Email" value={user.email} />
              <InfoRow icon={<BookOpen className="w-4 h-4 text-textMuted" />} label="Exam Focus" value={user.examType} />
              <InfoRow icon={<Calendar className="w-4 h-4 text-textMuted" />} label="Joined" value={memberSince} />
            </div>
          </div>

          {/* Badges */}
          <div className="bg-white rounded-[20px] border border-borderLight p-6">
            <h3 className="text-[15px] font-semibold text-textPrimary mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-peach-deep" /> Achievement Badges
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {badges.map(badge => {
                const unlocked = unlockedBadges.some(b => b.id === badge.id);
                const Icon = badge.icon;
                return (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-[14px] border transition-all ${
                      unlocked
                        ? "bg-lavender border-lavender-mid"
                        : "bg-offWhite border-borderLight opacity-50 grayscale"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2.5 ${unlocked ? "bg-lavender-mid" : "bg-borderLight"}`}>
                      <Icon className={`w-5 h-5 ${unlocked ? "text-lavender-deep" : "text-textMuted"}`} />
                    </div>
                    <div className={`text-[13px] font-semibold ${unlocked ? "text-lavender-text" : "text-textMuted"}`}>{badge.label}</div>
                    <div className={`text-[11px] mt-0.5 ${unlocked ? "text-lavender-deep" : "text-textMuted"}`}>{badge.desc}</div>
                    {!unlocked && <div className="text-[10px] text-textMuted mt-1">🔒 Locked</div>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Settings links */}
          <div className="bg-white rounded-[20px] border border-borderLight overflow-hidden">
            <h3 className="text-[15px] font-semibold text-textPrimary p-5 pb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-lavender-deep" /> Preferences
            </h3>
            <SettingsLink icon={<Bell className="w-4 h-4" />} label="Notifications" sub="Daily check-in reminders" />
            <SettingsLink icon={<Palette className="w-4 h-4" />} label="Appearance" sub="Theme and display options" />
            <SettingsLink icon={<Shield className="w-4 h-4" />} label="Privacy & Data" sub="Manage your personal data" />
          </div>

          {/* Danger zone */}
          <div className="bg-white rounded-[20px] border border-borderLight p-6">
            <h3 className="text-[15px] font-semibold text-textPrimary mb-4 flex items-center gap-2">
              <LogOut className="w-4 h-4 text-peach-deep" /> Account Actions
            </h3>
            <form action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}>
              <button type="submit" className="inline-flex items-center gap-2 px-4 py-2.5 bg-[rgba(212,116,42,0.08)] text-peach-text rounded-[10px] text-sm font-medium hover:bg-[rgba(212,116,42,0.16)] transition-colors border border-[rgba(212,116,42,0.15)]">
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-7 h-7 rounded-lg bg-offWhite flex items-center justify-center shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] text-textMuted">{label}</div>
        <div className="text-[13px] font-semibold text-textPrimary truncate">{value}</div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | null }) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-borderLight last:border-0">
      <div className="w-7 h-7 rounded-lg bg-offWhite flex items-center justify-center shrink-0">{icon}</div>
      <div>
        <div className="text-[11px] text-textMuted">{label}</div>
        <div className="text-[14px] text-textPrimary font-medium">{value || "—"}</div>
      </div>
    </div>
  );
}

function SettingsLink({ icon, label, sub }: { icon: React.ReactNode; label: string; sub: string }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3.5 border-t border-borderLight hover:bg-offWhite transition-colors cursor-pointer">
      <div className="w-8 h-8 rounded-lg bg-lavender flex items-center justify-center text-lavender-deep shrink-0">{icon}</div>
      <div className="flex-1">
        <div className="text-[14px] font-medium text-textPrimary">{label}</div>
        <div className="text-[12px] text-textMuted">{sub}</div>
      </div>
      <ChevronRight className="w-4 h-4 text-textMuted" />
    </div>
  );
}
