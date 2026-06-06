import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function JournalPage() {
  const session = await auth();
  if (!session?.user?.id) return redirect("/auth");

  const entries = await db.moodEntry.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Your Journal</h1>
        <p className="text-sm text-textMuted mt-1">A safe space for your thoughts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-5">
        <div>
          {entries.length === 0 ? (
            <p className="text-textMuted text-sm">No entries yet. Complete a check-in to start journaling.</p>
          ) : entries.map(entry => (
            <div key={entry.id} className="bg-white rounded-[16px] border border-borderLight p-5 mb-3 hover:border-lavender-mid transition-colors">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-lavender flex items-center justify-center text-lg">
                  {entry.mood === 5 ? "🤩" : entry.mood === 4 ? "🙂" : entry.mood === 3 ? "😐" : entry.mood === 2 ? "😔" : "😫"}
                </div>
                <div>
                  <strong className="block text-sm font-medium">{entry.createdAt.toLocaleDateString()}</strong>
                  <span className="text-xs text-textMuted">{entry.createdAt.toLocaleTimeString()}</span>
                </div>
              </div>
              {entry.journal && (
                <p className="text-[13px] text-textSecondary leading-[1.55]">{entry.journal}</p>
              )}
              {entry.triggers && JSON.parse(entry.triggers).length > 0 && (
                <div className="flex gap-1.5 mt-2.5 flex-wrap">
                  {JSON.parse(entry.triggers).map((t: string) => (
                    <span key={t} className="px-2 py-0.5 rounded-full bg-offWhite text-[11px] text-textMuted border border-borderLight">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div>
          <div className="bg-gradient-to-br from-lavender to-[rgba(237,235,254,0.4)] rounded-[18px] border border-lavender-mid p-5">
             <h3 className="text-sm font-semibold mb-2">Journaling Prompt</h3>
             <p className="text-xs text-textSecondary italic">"What is one thing you did well today, even if it feels small?"</p>
          </div>
        </div>
      </div>
    </div>
  );
}
