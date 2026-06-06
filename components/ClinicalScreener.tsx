"use client";

import { useState } from "react";
import { ClipboardList, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

const PHQ9_QUESTIONS = [
  "Little interest or pleasure in doing things?",
  "Feeling down, depressed, or hopeless?",
  "Trouble falling or staying asleep, or sleeping too much?",
  "Feeling tired or having little energy?",
  "Poor appetite or overeating?",
  "Feeling bad about yourself — or that you are a failure or have let yourself or your family down?",
  "Trouble concentrating on things, such as reading or studying?",
  "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual?",
  "Thoughts that you would be better off dead, or of hurting yourself in some way?",
];

const PHQ9_OPTIONS = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "Several days" },
  { value: 2, label: "More than half the days" },
  { value: 3, label: "Nearly every day" },
];

export default function ClinicalScreener() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(-1); // -1 = start, 0-8 = questions, 9 = results
  const [answers, setAnswers] = useState<number[]>(Array(9).fill(0));

  const totalScore = answers.reduce((a, b) => a + b, 0);

  const getSeverity = (score: number) => {
    if (score <= 4) return { level: "Minimal", color: "text-sage-deep", bg: "bg-sage" };
    if (score <= 9) return { level: "Mild", color: "text-sky-deep", bg: "bg-sky" };
    if (score <= 14) return { level: "Moderate", color: "text-peach-deep", bg: "bg-peach" };
    if (score <= 19) return { level: "Moderately Severe", color: "text-peach-text", bg: "bg-peach-mid" };
    return { level: "Severe", color: "text-white", bg: "bg-[#D4742A]" };
  };

  const handleAnswer = (val: number) => {
    const newAns = [...answers];
    newAns[step] = val;
    setAnswers(newAns);
    setTimeout(() => {
      setStep((prev) => prev + 1);
    }, 300);
  };

  const severity = getSeverity(totalScore);
  const requiresAttention = totalScore >= 10 || answers[8] > 0; // Moderate+ or suicidal ideation

  if (!isOpen) {
    return (
      <div className="bg-white rounded-[16px] border border-borderLight p-5 hover:shadow-sm transition-shadow">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-sky flex items-center justify-center shrink-0" aria-hidden="true">
            <ClipboardList className="w-5 h-5 text-sky-deep" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-textPrimary">Burnout & Wellbeing Check (PHQ-9)</h3>
            <p className="text-[13px] text-textMuted mt-1 mb-3 leading-relaxed max-w-[500px]">
              A standard 9-question clinical tool to measure symptoms of depression and academic burnout over the last 2 weeks. Takes 2 minutes.
            </p>
            <button
              onClick={() => { setIsOpen(true); setStep(-1); setAnswers(Array(9).fill(0)); }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-borderMed text-[13px] font-medium text-textSecondary hover:bg-offWhite transition-colors"
            >
              Start Assessment <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[20px] border border-lavender-mid p-6 shadow-sm relative overflow-hidden" role="region" aria-label="PHQ-9 Clinical Assessment">
      {/* Progress bar */}
      {step >= 0 && step < 9 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-borderLight">
          <div
            className="h-full bg-lavender-deep transition-all duration-300"
            style={{ width: `${((step + 1) / 9) * 100}%` }}
          />
        </div>
      )}

      {step === -1 && (
        <div className="text-center py-4">
          <h3 className="text-lg font-semibold text-textPrimary mb-2">Instructions</h3>
          <p className="text-sm text-textSecondary mb-6 max-w-[400px] mx-auto leading-relaxed">
            Over the last <strong>2 weeks</strong>, how often have you been bothered by any of the following problems?
          </p>
          <button
            onClick={() => setStep(0)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-lavender-deep text-white text-sm font-medium hover:bg-lavender-text transition-colors"
          >
            Begin <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {step >= 0 && step < 9 && (
        <div>
          <div className="text-[12px] font-semibold text-textMuted uppercase tracking-wider mb-2">
            Question {step + 1} of 9
          </div>
          <h3 className="text-[16px] font-semibold text-textPrimary mb-6 min-h-[48px] leading-snug">
            {PHQ9_QUESTIONS[step]}
          </h3>

          <div className="space-y-2">
            {PHQ9_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleAnswer(opt.value)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all text-left ${
                  answers[step] === opt.value
                    ? "border-lavender-mid bg-lavender text-lavender-text font-medium"
                    : "border-borderLight bg-offWhite text-textSecondary hover:border-borderMed"
                }`}
              >
                <span className="text-[14px]">{opt.label}</span>
                {answers[step] === opt.value && <CheckCircle2 className="w-4 h-4 text-lavender-deep" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 9 && (
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${severity.bg} mb-4`}>
            <span className={`text-2xl font-bold ${severity.color}`}>{totalScore}</span>
          </div>
          <h3 className="text-lg font-semibold text-textPrimary mb-2">Assessment Complete</h3>
          <p className="text-sm text-textSecondary mb-1">
            Your score indicates <strong>{severity.level}</strong> symptoms.
          </p>

          {requiresAttention && (
            <div className="mt-5 p-4 rounded-xl bg-peach border border-peach-mid text-left flex gap-3">
              <AlertCircle className="w-5 h-5 text-peach-deep shrink-0 mt-0.5" />
              <div>
                <p className="text-[13px] font-medium text-peach-text mb-1">Professional support recommended</p>
                <p className="text-[12px] text-peach-text/80 leading-relaxed">
                  Your score suggests a level of burnout or distress that would benefit from talking to a counselor. Please visit the Resources page or call <strong>iCall at 9152987821</strong>.
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-center gap-3">
            <button
              onClick={() => setIsOpen(false)}
              className="px-5 py-2 rounded-xl bg-offWhite border border-borderMed text-[13px] font-medium text-textSecondary hover:bg-white transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => { setStep(-1); setAnswers(Array(9).fill(0)); }}
              className="px-5 py-2 rounded-xl bg-lavender-deep text-white text-[13px] font-medium hover:bg-lavender-text transition-colors"
            >
              Retake
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
