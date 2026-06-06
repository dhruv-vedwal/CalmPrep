import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import ProgressChart from "@/components/ProgressChart";

export default async function ProgressPage() {
  const session = await auth();
  if (!session?.user?.id) return redirect("/auth");

  const entries = await db.moodEntry.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "asc" },
  });

  const chartData = entries.map(e => ({
    date: e.createdAt.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    mood: e.mood,
  }));

  const displayData = chartData.length > 0 ? chartData : [
    { date: 'Mon', mood: 3 }, { date: 'Tue', mood: 4 }, { date: 'Wed', mood: 2 }, { date: 'Thu', mood: 5 }
  ];

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6">Your Progress</h1>
      <div className="bg-white rounded-[20px] border border-borderLight p-6 mb-6">
        <h3 className="text-base font-semibold mb-4">Mood Trends</h3>
        <ProgressChart data={displayData} />
      </div>
    </div>
  );
}
