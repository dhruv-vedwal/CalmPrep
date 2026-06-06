import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import CrisisBanner from "@/components/CrisisBanner";

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user) return redirect("/auth");

  return (
    <div className="max-w-[1100px] mx-auto px-6">
      <div className="py-8 pb-4">
        <div className="text-2xl font-semibold text-textPrimary">
          Good evening, <span className="text-lavender-deep">{session.user.name?.split(' ')[0] || 'User'}</span> 👋
        </div>
        <div className="text-[14px] text-textMuted mt-0.5">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-[16px] border border-borderLight py-4 px-5">
          <div className="text-xs text-textMuted mb-1">Current streak</div>
          <div className="text-[26px] font-semibold text-lavender-deep leading-none">12 🔥</div>
          <div className="text-[11px] text-textMuted mt-1">days in a row</div>
        </div>
        <div className="bg-white rounded-[16px] border border-borderLight py-4 px-5">
          <div className="text-xs text-textMuted mb-1">Avg. mood this week</div>
          <div className="text-[26px] font-semibold text-textPrimary leading-none">3.8 <span className="text-xl">😊</span></div>
          <div className="text-[11px] text-textMuted mt-1">↑ 0.4 from last week</div>
        </div>
        <div className="bg-white rounded-[16px] border border-borderLight py-4 px-5">
          <div className="text-xs text-textMuted mb-1">Journal entries</div>
          <div className="text-[26px] font-semibold text-sage-deep leading-none">24</div>
          <div className="text-[11px] text-textMuted mt-1">this month</div>
        </div>
        <div className="bg-white rounded-[16px] border border-borderLight py-4 px-5">
          <div className="text-xs text-textMuted mb-1">Breathe sessions</div>
          <div className="text-[26px] font-semibold text-sky-deep leading-none">9</div>
          <div className="text-[11px] text-textMuted mt-1">this week</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-5">
        <div>
          {/* Mood chart stub */}
          <div className="bg-white rounded-[20px] border border-borderLight p-6 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-base font-semibold text-textPrimary">Mood this week</div>
                <div className="text-sm text-textMuted">Your daily mood scores</div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-sage text-sage-text">This week</span>
            </div>
            <div className="flex items-end gap-1.5 h-20 mt-4">
              <div className="flex-1 rounded-t-md min-h-[12px] bg-peach-mid h-[55%]"></div>
              <div className="flex-1 rounded-t-md min-h-[12px] bg-lavender-mid h-[70%]"></div>
              <div className="flex-1 rounded-t-md min-h-[12px] bg-peach-mid h-[45%]"></div>
              <div className="flex-1 rounded-t-md min-h-[12px] bg-sage-mid h-[80%]"></div>
              <div className="flex-1 rounded-t-md min-h-[12px] bg-sage-mid h-[75%]"></div>
              <div className="flex-1 rounded-t-md min-h-[12px] bg-lavender-mid h-[90%]"></div>
              <div className="flex-1 rounded-t-md min-h-[12px] bg-lavender-mid h-[60%]"></div>
            </div>
            <div className="flex gap-1.5 mt-1">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <span key={day} className="flex-1 text-center text-[10px] text-textMuted">{day}</span>
              ))}
            </div>
          </div>
        </div>

        <div>
          {/* Checkin prompt */}
          <div className="bg-gradient-to-br from-lavender to-[rgba(237,235,254,0.4)] rounded-[18px] border border-lavender-mid p-6 mb-4">
            <h3 className="text-base font-semibold text-textPrimary mb-2">How are you feeling today?</h3>
            <p className="text-[13px] text-textSecondary mb-4">Take 30 seconds to check in with your mind.</p>
            <Link href="/checkin" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-lavender-deep text-white text-sm font-medium hover:bg-lavender-text transition-colors">
              Start check-in
            </Link>
          </div>
          
          <CrisisBanner />
        </div>
      </div>
    </div>
  );
}
