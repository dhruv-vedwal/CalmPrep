"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ThumbsDown, Frown, Minus, Smile, Star,
  AlertCircle, Moon, Users, BookOpen, ClipboardList, Heart, Zap, CheckCircle2, ArrowRight
} from "lucide-react";

const moodScale = [
  { value: 1, icon: ThumbsDown, label: "Terrible", color: "text-peach-deep", bg: "bg-peach", border: "border-peach-mid" },
  { value: 2, icon: Frown, label: "Low", color: "text-peach-deep", bg: "bg-peach", border: "border-peach-mid" },
  { value: 3, icon: Minus, label: "Okay", color: "text-lavender-deep", bg: "bg-lavender", border: "border-lavender-mid" },
  { value: 4, icon: Smile, label: "Good", color: "text-sage-deep", bg: "bg-sage", border: "border-sage-mid" },
  { value: 5, icon: Star, label: "Great", color: "text-sage-deep", bg: "bg-sage", border: "border-sage-mid" },
];

const triggerList = [
  { label: "Mock test anxiety", icon: AlertCircle },
  { label: "Sleep issues", icon: Moon },
  { label: "Family pressure", icon: Users },
  { label: "Peer comparison", icon: Users },
  { label: "Syllabus backlog", icon: ClipboardList },
  { label: "Health", icon: Heart },
  { label: "Distractions", icon: Zap },
  { label: "Relationship stress", icon: Users },
  { label: "None of the above", icon: CheckCircle2 },
];

const journalPrompts = [
  "What's one thing that drained your energy today?",
  "What small win can you celebrate right now?",
  "What are you most worried about this week?",
  "What would make tomorrow better than today?",
  "Write freely — this space is just for you.",
];

export default function CheckinPage() {
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState<number>(0);
  const [energy, setEnergy] = useState<number>(3);
  const [triggers, setTriggers] = useState<string[]>([]);
  const [journal, setJournal] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const prompt = journalPrompts[Math.floor(Math.random() * journalPrompts.length)];

  const toggleTrigger = (t: string) => {
    setTriggers(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  };

  const submitCheckin = async () => {
    if (!mood) return;
    setLoading(true);
    await fetch("/api/mood", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mood, triggers: JSON.stringify(triggers), journal, energy }),
    });
    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="w-full max-w-[600px]">
        {/* Progress bar */}
        <div className="flex gap-1.5 mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className={`h-1 flex-1 rounded-full transition-colors ${s <= step ? 'bg-lavender-deep' : 'bg-borderMed'}`} />
          ))}
        </div>

        {/* Step 1 – Mood */}
        {step === 1 && (
          <div className="bg-white rounded-[24px] border border-borderLight p-8 shadow-sm">
            <div className="mb-6">
              <span className="text-xs font-semibold text-lavender-deep uppercase tracking-wider">Step 1 of 3</span>
              <h2 className="text-2xl font-semibold mt-1 mb-1 text-textPrimary">How are you feeling?</h2>
              <p className="text-sm text-textMuted">Be honest — this is just for you.</p>
            </div>

            <div className="flex gap-3 justify-between mb-8">
              {moodScale.map(m => {
                const Icon = m.icon;
                const isSelected = mood === m.value;
                return (
                  <button
                    key={m.value}
                    onClick={() => setMood(m.value)}
                    className={`flex-1 flex flex-col items-center gap-2 py-4 px-2 rounded-[16px] border-2 transition-all ${
                      isSelected
                        ? `${m.border} ${m.bg} scale-105 shadow-sm`
                        : "border-borderLight bg-offWhite hover:border-lavender-mid hover:bg-lavender/40"
                    }`}
                  >
                    <Icon className={`w-7 h-7 ${isSelected ? m.color : "text-textMuted"}`} strokeWidth={isSelected ? 2.5 : 1.5} />
                    <span className={`text-[11px] font-semibold ${isSelected ? m.color : "text-textMuted"}`}>{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Energy level */}
            <div className="mb-8">
              <label className="text-sm font-medium text-textSecondary mb-3 block">Energy level today</label>
              <div className="flex items-center gap-3">
                <span className="text-xs text-textMuted w-12">Depleted</span>
                <input
                  type="range" min={1} max={5} value={energy}
                  onChange={e => setEnergy(Number(e.target.value))}
                  className="flex-1 accent-[var(--lavender-deep)]"
                />
                <span className="text-xs text-textMuted w-12 text-right">Energised</span>
              </div>
              <div className="flex justify-between mt-1 px-12">
                {[1, 2, 3, 4, 5].map(n => (
                  <span key={n} className={`text-[10px] font-semibold ${energy === n ? "text-lavender-deep" : "text-borderMed"}`}>{n}</span>
                ))}
              </div>
            </div>

            <button
              disabled={!mood}
              onClick={() => setStep(2)}
              className="w-full py-3 rounded-xl bg-lavender-deep text-white font-medium text-sm hover:bg-lavender-text disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2 – Triggers */}
        {step === 2 && (
          <div className="bg-white rounded-[24px] border border-borderLight p-8 shadow-sm">
            <div className="mb-6">
              <span className="text-xs font-semibold text-lavender-deep uppercase tracking-wider">Step 2 of 3</span>
              <h2 className="text-2xl font-semibold mt-1 mb-1 text-textPrimary">What&apos;s on your mind?</h2>
              <p className="text-sm text-textMuted">Select all that&apos;s affecting you today.</p>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-8">
              {triggerList.map(({ label, icon: Icon }) => {
                const isSelected = triggers.includes(label);
                return (
                  <button
                    key={label}
                    onClick={() => toggleTrigger(label)}
                    className={`flex items-center gap-2.5 px-3 py-3 rounded-[12px] border text-left transition-all ${
                      isSelected
                        ? "border-lavender-mid bg-lavender text-lavender-text"
                        : "border-borderLight bg-offWhite text-textSecondary hover:border-lavender-mid hover:bg-lavender/40"
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-lavender-deep" : "text-textMuted"}`} />
                    <span className="text-[13px] font-medium leading-tight">{label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2.5">
              <button onClick={() => setStep(1)} className="px-4 py-2.5 rounded-xl border border-borderMed text-textSecondary text-sm hover:bg-offWhite transition-colors">
                Back
              </button>
              <button onClick={() => setStep(3)} className="flex-1 py-2.5 rounded-xl bg-lavender-deep text-white font-medium text-sm hover:bg-lavender-text transition-colors flex items-center justify-center gap-2">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3 – Journal */}
        {step === 3 && (
          <div className="bg-white rounded-[24px] border border-borderLight p-8 shadow-sm">
            <div className="mb-6">
              <span className="text-xs font-semibold text-lavender-deep uppercase tracking-wider">Step 3 of 3</span>
              <h2 className="text-2xl font-semibold mt-1 mb-1 text-textPrimary">A few words (optional)</h2>
              <p className="text-sm text-textMuted italic">&ldquo;{prompt}&rdquo;</p>
            </div>

            <textarea
              value={journal}
              onChange={e => setJournal(e.target.value)}
              placeholder="Write anything on your mind..."
              className="w-full px-4 py-3.5 rounded-xl border border-borderMed bg-offWhite text-sm text-textPrimary outline-none min-h-[150px] resize-none focus:border-lavender-deep focus:ring-[3px] focus:ring-[rgba(124,107,196,0.15)] transition-all"
            />
            <div className="text-right text-[11px] text-textMuted mt-1">{journal.length} characters</div>

            <div className="flex gap-2.5 mt-4">
              <button onClick={() => setStep(2)} className="px-4 py-2.5 rounded-xl border border-borderMed text-textSecondary text-sm hover:bg-offWhite transition-colors">
                Back
              </button>
              <button
                onClick={submitCheckin}
                disabled={loading}
                className="flex-1 py-2.5 rounded-xl bg-lavender-deep text-white font-medium text-sm hover:bg-lavender-text disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                {loading ? "Saving..." : "Save Check-in"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
