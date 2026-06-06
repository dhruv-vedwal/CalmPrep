"use client";

type WeekDay = { day: string; mood: number | null; isToday: boolean };

const moodColors: Record<number, string> = {
  1: "bg-peach-deep",
  2: "bg-peach-mid",
  3: "bg-lavender-mid",
  4: "bg-sage-mid",
  5: "bg-sage-deep",
};

const moodLabels: Record<number, string> = {
  1: "Terrible",
  2: "Low",
  3: "Okay",
  4: "Good",
  5: "Great",
};

export default function DashboardClient({ weekData }: { weekData: WeekDay[] }) {
  return (
    <div className="flex items-end gap-2 h-[120px]">
      {weekData.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
          <div className="relative flex flex-col items-center justify-end h-full w-full">
            {d.mood !== null ? (
              <>
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 bg-textPrimary text-white text-[10px] font-medium px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                  {moodLabels[d.mood]} ({d.mood}/5)
                </div>
                <div
                  className={`w-full rounded-t-lg ${moodColors[d.mood]} transition-all`}
                  style={{ height: `${(d.mood / 5) * 100}%`, minHeight: "12px" }}
                />
              </>
            ) : (
              <div className="w-full rounded-t-lg bg-borderLight h-3" title="No data" />
            )}
          </div>
          <span className={`text-[10px] font-medium ${d.isToday ? "text-lavender-deep" : "text-textMuted"}`}>
            {d.day}
            {d.isToday && <span className="block w-1 h-1 rounded-full bg-lavender-deep mx-auto mt-0.5" />}
          </span>
        </div>
      ))}
    </div>
  );
}
