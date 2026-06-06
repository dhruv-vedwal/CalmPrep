"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckinPage() {
  const [mood, setMood] = useState<number>(0);
  const [triggers, setTriggers] = useState<string[]>([]);
  const [journal, setJournal] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const moodScale = [
    { value: 1, emoji: "😫", label: "Terrible" },
    { value: 2, emoji: "😔", label: "Bad" },
    { value: 3, emoji: "😐", label: "Okay" },
    { value: 4, emoji: "🙂", label: "Good" },
    { value: 5, emoji: "🤩", label: "Awesome" }
  ];

  const triggerList = ["Mock test anxiety", "Sleep issues", "Family pressure", "Peer comparison", "Syllabus backlog", "Health", "Distractions", "None"];

  const toggleTrigger = (t: string) => {
    if (triggers.includes(t)) {
      setTriggers(triggers.filter(x => x !== t));
    } else {
      setTriggers([...triggers, t]);
    }
  };

  const submitCheckin = async () => {
    if (!mood) return alert("Please select a mood");
    setLoading(true);
    await fetch("/api/mood", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mood, triggers: JSON.stringify(triggers), journal, energy: 5 })
    });
    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="max-w-[640px] mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-[26px] h-[26px] rounded-full bg-lavender text-lavender-text text-xs font-semibold mb-3">1</div>
        <h2 className="text-xl font-semibold mb-1">How are you feeling right now?</h2>
        <p className="text-sm text-textMuted mb-5">Be honest with yourself.</p>
        <div className="flex flex-wrap gap-2.5 justify-center">
          {moodScale.map(m => (
            <button
              key={m.value}
              onClick={() => setMood(m.value)}
              className={`w-[72px] h-[72px] rounded-[18px] border-2 flex flex-col items-center justify-center gap-1 transition-all ${mood === m.value ? 'border-lavender-deep bg-lavender scale-110' : 'border-borderLight bg-white'}`}
            >
              <span className="text-[28px]">{m.emoji}</span>
              <span className={`text-[10px] font-medium ${mood === m.value ? 'text-lavender-text' : 'text-textMuted'}`}>{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-[26px] h-[26px] rounded-full bg-lavender text-lavender-text text-xs font-semibold mb-3">2</div>
        <h2 className="text-xl font-semibold mb-1">What's affecting your mood?</h2>
        <p className="text-sm text-textMuted mb-5">Select all that apply.</p>
        <div className="flex flex-wrap gap-2">
          {triggerList.map(t => (
            <button
              key={t}
              onClick={() => toggleTrigger(t)}
              className={`px-3.5 py-[7px] rounded-full text-[13px] border transition-colors ${triggers.includes(t) ? 'bg-lavender border-lavender-mid text-lavender-text' : 'bg-white border-borderMed text-textSecondary'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-[26px] h-[26px] rounded-full bg-lavender text-lavender-text text-xs font-semibold mb-3">3</div>
        <h2 className="text-xl font-semibold mb-1">Want to vent? (Optional)</h2>
        <p className="text-sm text-textMuted mb-5">Write whatever is on your mind. It's safe here.</p>
        <textarea
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
          placeholder="I'm feeling..."
          className="w-full px-3.5 py-2.5 rounded-xl border border-borderMed bg-white text-sm text-textPrimary outline-none min-h-[120px] focus:border-lavender-deep focus:ring-[3px] focus:ring-[rgba(124,107,196,0.15)]"
        />
      </div>

      <button onClick={submitCheckin} disabled={loading} className="w-full py-3.5 rounded-[14px] bg-lavender-deep text-white text-[15px] font-medium hover:bg-lavender-text transition-colors">
        {loading ? "Saving..." : "Save Check-in"}
      </button>
    </div>
  );
}
