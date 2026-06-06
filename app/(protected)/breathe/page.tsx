"use client";
import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Wind, Info } from "lucide-react";

type Technique = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  phases: { label: string; duration: number }[];
  color: string;
  bg: string;
  textColor: string;
};

const techniques: Technique[] = [
  {
    id: "478",
    name: "4-7-8 Breath",
    tagline: "Calm anxiety fast",
    description: "Activates the parasympathetic nervous system. Great before a test or when anxious.",
    phases: [
      { label: "Breathe In", duration: 4 },
      { label: "Hold", duration: 7 },
      { label: "Breathe Out", duration: 8 },
    ],
    color: "text-lavender-deep",
    bg: "bg-lavender",
    textColor: "text-lavender-text",
  },
  {
    id: "box",
    name: "Box Breathing",
    tagline: "Focus & clarity",
    description: "Used by Navy SEALs for stress control. Excellent for focus before a study session.",
    phases: [
      { label: "Breathe In", duration: 4 },
      { label: "Hold", duration: 4 },
      { label: "Breathe Out", duration: 4 },
      { label: "Hold", duration: 4 },
    ],
    color: "text-sage-deep",
    bg: "bg-sage",
    textColor: "text-sage-text",
  },
  {
    id: "belly",
    name: "Belly Breathing",
    tagline: "Deep relaxation",
    description: "Diaphragmatic breathing to reduce cortisol levels and enter a calm state.",
    phases: [
      { label: "Breathe In", duration: 5 },
      { label: "Breathe Out", duration: 7 },
    ],
    color: "text-sky-deep",
    bg: "bg-sky",
    textColor: "text-sky-deep",
  },
];

export default function BreathePage() {
  const [selectedTechnique, setSelectedTechnique] = useState<Technique>(techniques[0]);
  const [active, setActive] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentPhase = selectedTechnique.phases[phaseIndex];
  const totalDuration = selectedTechnique.phases.reduce((a, b) => a + b.duration, 0);
  const progress = currentPhase ? ((currentPhase.duration - count) / currentPhase.duration) * 100 : 0;

  useEffect(() => {
    if (!active) return;

    setCount(currentPhase.duration);
    intervalRef.current = setInterval(() => {
      setCount(prev => {
        if (prev <= 1) {
          setPhaseIndex(pi => {
            const next = (pi + 1) % selectedTechnique.phases.length;
            if (next === 0) setCycleCount(c => c + 1);
            return next;
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [active, phaseIndex, selectedTechnique]);

  const reset = () => {
    setActive(false);
    setPhaseIndex(0);
    setCount(0);
    setCycleCount(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleTechniqueChange = (t: Technique) => {
    reset();
    setSelectedTechnique(t);
  };

  const scale = active
    ? currentPhase?.label === "Breathe In" ? "scale-[1.18]"
    : currentPhase?.label === "Hold" ? "scale-[1.18]"
    : "scale-[0.92]"
    : "scale-100";

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-[900px]">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-lavender text-lavender-text text-[13px] font-medium mb-3">
            <Wind className="w-3.5 h-3.5" /> Guided Breathing
          </div>
          <h1 className="text-2xl font-semibold text-textPrimary">Find your calm</h1>
          <p className="text-sm text-textMuted mt-1">3–5 minutes of breathwork can reduce cortisol by up to 40%</p>
        </div>

        {/* Technique selector */}
        <div className="flex gap-2.5 justify-center flex-wrap mb-10">
          {techniques.map(t => (
            <button
              key={t.id}
              onClick={() => handleTechniqueChange(t)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                selectedTechnique.id === t.id
                  ? `${t.bg} ${t.textColor} border-transparent shadow-sm`
                  : "bg-white text-textSecondary border-borderLight hover:border-lavender-mid"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* Main breathing circle */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative w-[240px] h-[240px] mb-8 select-none">
            {/* Outer ring */}
            <div
              className={`absolute inset-0 rounded-full border-2 border-lavender-mid transition-transform duration-[4000ms] ease-in-out ${active ? 'scale-110 opacity-40' : 'scale-100 opacity-60'}`}
            />
            {/* Progress ring using SVG */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 240 240">
              <circle cx="120" cy="120" r="110" fill="none" stroke="var(--lavender-mid)" strokeWidth="3" opacity="0.3" />
              {active && (
                <circle
                  cx="120" cy="120" r="110"
                  fill="none"
                  stroke="var(--lavender-deep)"
                  strokeWidth="3"
                  strokeDasharray={`${2 * Math.PI * 110}`}
                  strokeDashoffset={`${2 * Math.PI * 110 * (1 - (currentPhase.duration - count) / currentPhase.duration)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 linear"
                />
              )}
            </svg>
            {/* Main circle */}
            <div
              className={`absolute inset-[24px] rounded-full ${selectedTechnique.bg} flex flex-col items-center justify-center transition-all duration-[3500ms] ease-in-out ${scale}`}
            >
              <Wind className={`w-8 h-8 mb-2 ${selectedTechnique.color} ${active ? 'opacity-100' : 'opacity-50'}`} />
              <span className={`text-base font-semibold ${selectedTechnique.color}`}>
                {active ? currentPhase?.label : "Ready"}
              </span>
              {active && count > 0 && (
                <span className={`text-4xl font-light mt-1 leading-none ${selectedTechnique.color}`}>{count}</span>
              )}
            </div>
          </div>

          {/* Phase indicators */}
          {active && (
            <div className="flex gap-2 mb-6">
              {selectedTechnique.phases.map((p, i) => (
                <div
                  key={i}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    i === phaseIndex
                      ? `${selectedTechnique.bg} ${selectedTechnique.textColor}`
                      : "bg-offWhite text-textMuted"
                  }`}
                >
                  {p.label} {p.duration}s
                </div>
              ))}
            </div>
          )}

          {/* Cycle count */}
          {cycleCount > 0 && (
            <div className="text-sm text-textMuted mb-4">
              <span className="text-lavender-deep font-semibold">{cycleCount}</span> cycle{cycleCount > 1 ? "s" : ""} completed · {Math.round(cycleCount * totalDuration / 60)} min
            </div>
          )}

          {/* Controls */}
          <div className="flex gap-3">
            <button
              onClick={reset}
              className="w-11 h-11 rounded-full border border-borderMed bg-white flex items-center justify-center hover:bg-offWhite transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-textSecondary" />
            </button>
            <button
              onClick={() => setActive(a => !a)}
              className={`px-8 py-2.5 rounded-xl font-medium text-sm transition-colors flex items-center gap-2 ${
                active ? "bg-white border border-borderMed text-textSecondary hover:bg-offWhite" : `${selectedTechnique.bg.replace('bg-', 'bg-')} bg-lavender-deep text-white hover:bg-lavender-text`
              }`}
            >
              {active ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4" /> Start</>}
            </button>
            <button
              onClick={() => setShowInfo(i => !i)}
              className="w-11 h-11 rounded-full border border-borderMed bg-white flex items-center justify-center hover:bg-offWhite transition-colors"
            >
              <Info className="w-4 h-4 text-textSecondary" />
            </button>
          </div>
        </div>

        {/* Info card */}
        {showInfo && (
          <div className={`${selectedTechnique.bg} border border-lavender-mid rounded-[16px] p-5 mb-6 max-w-[500px] mx-auto`}>
            <h3 className={`text-sm font-semibold ${selectedTechnique.textColor} mb-1`}>{selectedTechnique.name}</h3>
            <p className={`text-[13px] ${selectedTechnique.textColor} opacity-80 leading-relaxed`}>{selectedTechnique.description}</p>
          </div>
        )}

        {/* All techniques grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {techniques.map(t => (
            <button
              key={t.id}
              onClick={() => handleTechniqueChange(t)}
              className={`p-5 rounded-[16px] border text-left transition-all hover:shadow-sm ${
                selectedTechnique.id === t.id ? `${t.bg} border-transparent` : "bg-white border-borderLight hover:border-lavender-mid"
              }`}
            >
              <div className={`text-sm font-semibold mb-1 ${selectedTechnique.id === t.id ? t.textColor : "text-textPrimary"}`}>{t.name}</div>
              <div className={`text-xs mb-2 ${selectedTechnique.id === t.id ? t.textColor : "text-textMuted"} opacity-70`}>{t.tagline}</div>
              <div className="flex gap-1 flex-wrap">
                {t.phases.map((p, i) => (
                  <span key={i} className={`text-[10px] px-2 py-0.5 rounded-full ${selectedTechnique.id === t.id ? "bg-white/50" : "bg-offWhite"} text-textMuted font-medium`}>
                    {p.label} {p.duration}s
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
