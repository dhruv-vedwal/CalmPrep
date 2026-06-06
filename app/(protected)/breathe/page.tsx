"use client";
import { useState, useEffect } from "react";

export default function BreathePage() {
  const [phase, setPhase] = useState("Breathe In");
  const [count, setCount] = useState(4);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;
    
    let timer: NodeJS.Timeout;
    
    if (phase === "Breathe In") {
      timer = setTimeout(() => { setPhase("Hold"); setCount(7); }, 4000);
    } else if (phase === "Hold") {
      timer = setTimeout(() => { setPhase("Breathe Out"); setCount(8); }, 7000);
    } else if (phase === "Breathe Out") {
      timer = setTimeout(() => { setPhase("Breathe In"); setCount(4); }, 8000);
    }

    return () => clearTimeout(timer);
  }, [phase, active]);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setCount(prev => (prev > 1 ? prev - 1 : prev));
    }, 1000);
    return () => clearInterval(interval);
  }, [active, phase]);

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-8" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(200,190,240,0.2) 0%, var(--off-white) 70%)' }}>
      <div className="relative w-[240px] h-[240px] my-8 mx-auto">
        <div className={`absolute inset-0 rounded-full border-2 border-lavender-mid ${active ? 'animate-ring' : ''}`}></div>
        <div className={`absolute inset-[20px] rounded-full bg-lavender flex flex-col items-center justify-center ${active ? 'animate-breathe' : ''}`}>
          <div className="text-xl font-semibold text-lavender-text">{active ? phase : "Ready?"}</div>
          {active && <div className="text-[40px] font-light text-lavender-deep leading-none mt-1">{count}</div>}
        </div>
      </div>
      
      <div className="flex gap-3">
        <button onClick={() => setActive(!active)} className={`px-5 py-2.5 rounded-xl font-medium transition-colors ${active ? 'bg-white border border-borderMed text-textSecondary hover:bg-offWhite' : 'bg-lavender-deep text-white hover:bg-lavender-text'}`}>
          {active ? 'Pause' : 'Start 4-7-8 Breathing'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-[700px] w-full mt-8">
        <div className="bg-lavender border border-lavender-mid rounded-[16px] p-[1.1rem] text-center cursor-pointer transition-colors">
          <h4 className="text-sm font-semibold mb-1">4-7-8 Relaxing Breath</h4>
          <p className="text-xs text-lavender-text">Inhale 4s, Hold 7s, Exhale 8s. Good for anxiety and sleep.</p>
        </div>
        <div className="bg-white border border-borderLight rounded-[16px] p-[1.1rem] text-center cursor-pointer hover:bg-lavender hover:border-lavender-mid transition-colors text-textMuted hover:text-lavender-text">
          <h4 className="text-sm font-semibold mb-1 text-textPrimary">Box Breathing</h4>
          <p className="text-xs">Inhale 4s, Hold 4s, Exhale 4s, Hold 4s. Used by Navy SEALs.</p>
        </div>
      </div>
    </div>
  );
}
