import type { Metadata } from "next";
import { BookOpen, ExternalLink, Phone, Youtube, FileText, Heart, Brain, Moon, Dumbbell, Wind } from "lucide-react";
import ClinicalScreener from "@/components/ClinicalScreener";

export const metadata: Metadata = {
  title: "Resources — MindEase",
  description: "Curated mental health resources for Indian students: articles, helplines, techniques, and self-care guides.",
};

const categories = [
  {
    id: "crisis",
    label: "Crisis Support",
    icon: Phone,
    color: "text-peach-deep",
    bg: "bg-peach",
    border: "border-peach-mid",
    items: [
      { title: "iCall — Free Counselling", desc: "Psychosocial support by TISS. Call Mon-Sat 8am–10pm.", link: "tel:9152987821", linkLabel: "Call 9152987821", tag: "Helpline" },
      { title: "Vandrevala Foundation", desc: "24/7 crisis support in English and Hindi.", link: "tel:18602662345", linkLabel: "Call 1860-266-2345", tag: "Helpline" },
      { title: "iMind — NIMHANS", desc: "Government mental health helpline.", link: "tel:08046110007", linkLabel: "Call 080-4611-0007", tag: "Helpline" },
      { title: "Snehi NGO", desc: "Emotional support and suicide prevention.", link: "tel:04424640050", linkLabel: "Call 044-24640050", tag: "Helpline" },
    ],
  },
  {
    id: "anxiety",
    label: "Managing Exam Anxiety",
    icon: Brain,
    color: "text-lavender-deep",
    bg: "bg-lavender",
    border: "border-lavender-mid",
    items: [
      { title: "What is Exam Anxiety?", desc: "Learn the signs, physical symptoms, and why it happens to high-achievers.", link: "https://www.healthline.com/health/test-anxiety", linkLabel: "Read on Healthline", tag: "Article" },
      { title: "CBT Techniques for Test Anxiety", desc: "Cognitive Behavioral Therapy strategies you can apply on your own.", link: "https://www.verywellmind.com/test-anxiety-2671667", linkLabel: "Read guide", tag: "Guide" },
      { title: "5-Minute Pre-Test Breathing", desc: "A quick breathing exercise to calm nerves before an exam.", link: "/breathe", linkLabel: "Try it in MindEase", tag: "Tool" },
      { title: "Stop the Catastrophic Thinking Spiral", desc: "Practical journaling prompts to reframe negative exam thoughts.", link: "/journal", linkLabel: "Open journal", tag: "Tool" },
    ],
  },
  {
    id: "burnout",
    label: "Burnout Recovery",
    icon: Dumbbell,
    color: "text-sage-deep",
    bg: "bg-sage",
    border: "border-sage-mid",
    items: [
      { title: "Are You Burned Out?", desc: "Understand the 5 stages of burnout and where you are on the spectrum.", link: "https://www.helpguide.org/mental-health/stress/burnout-prevention-and-recovery", linkLabel: "Read on HelpGuide", tag: "Article" },
      { title: "Rest is Productive", desc: "Research on why taking breaks improves long-term memory and performance.", link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6296273/", linkLabel: "Read research", tag: "Research" },
      { title: "The 12 Signs of Burnout", desc: "Psychology Today's clinical breakdown of student burnout patterns.", link: "https://www.psychologytoday.com/us/basics/burnout", linkLabel: "Read on PsyToday", tag: "Article" },
    ],
  },
  {
    id: "sleep",
    label: "Sleep & Recovery",
    icon: Moon,
    color: "text-sky-deep",
    bg: "bg-sky",
    border: "border-[rgba(56,189,248,0.3)]",
    items: [
      { title: "Sleep and Memory Consolidation", desc: "Why 7–8 hours of sleep is non-negotiable during exam prep.", link: "https://www.sleepfoundation.org/how-sleep-works/memory-consolidation", linkLabel: "Read on SleepFoundation", tag: "Research" },
      { title: "Sleep Hygiene for Students", desc: "15 evidence-based habits to fall asleep faster and wake refreshed.", link: "https://www.healthline.com/health/sleep-hygiene", linkLabel: "Read guide", tag: "Guide" },
      { title: "4-7-8 Breathing for Sleep", desc: "Use the breathing technique in MindEase to fall asleep in under 5 minutes.", link: "/breathe", linkLabel: "Try it in MindEase", tag: "Tool" },
    ],
  },
  {
    id: "mindfulness",
    label: "Mindfulness & Focus",
    icon: Wind,
    color: "text-lavender-deep",
    bg: "bg-lavender",
    border: "border-lavender-mid",
    items: [
      { title: "Mindfulness-Based Stress Reduction", desc: "The gold-standard program for reducing stress, adapted for self-study.", link: "https://www.umassmed.edu/cfm/mindfulness-based-programs/mbsr-courses/", linkLabel: "Learn more", tag: "Program" },
      { title: "Headspace for Students", desc: "Guided meditations specifically designed for studying and focus.", link: "https://www.headspace.com/student-plan", linkLabel: "Visit Headspace", tag: "App" },
      { title: "The Wim Hof Breathing Method", desc: "Popular breathwork technique for energy, focus, and stress reduction.", link: "https://www.wimhofmethod.com/breathing-exercises", linkLabel: "Learn technique", tag: "Technique" },
    ],
  },
];

const TAG_STYLES: Record<string, string> = {
  Helpline: "bg-peach text-peach-text border-peach-mid",
  Article: "bg-lavender text-lavender-text border-lavender-mid",
  Guide: "bg-sage text-sage-text border-sage-mid",
  Tool: "bg-sky text-sky-deep border-[rgba(56,189,248,0.3)]",
  Research: "bg-offWhite text-textSecondary border-borderMed",
  Program: "bg-lavender text-lavender-text border-lavender-mid",
  App: "bg-sage text-sage-text border-sage-mid",
  Technique: "bg-peach text-peach-text border-peach-mid",
};

export default function ResourcesPage() {
  return (
    <div className="max-w-[1100px] mx-auto px-4 md:px-6 pb-12">
      <div className="py-7">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-lavender text-lavender-text text-[13px] font-medium mb-3">
          <Heart className="w-3.5 h-3.5" aria-hidden="true" /> Mental Health Library
        </div>
        <h1 className="text-[1.75rem] font-semibold text-textPrimary mb-1">Resources & Support</h1>
        <p className="text-[14px] text-textMuted max-w-[560px]">
          Curated mental health resources specifically for Indian students. Crisis helplines, evidence-based techniques, and expert articles — all in one place.
        </p>
      </div>

      {/* Quick access helplines bar */}
      <div className="bg-peach rounded-[16px] border border-peach-mid p-4 mb-6 flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-peach-deep" aria-hidden="true" />
          <span className="text-sm font-semibold text-peach-text">Need help now?</span>
        </div>
        {[
          { name: "iCall", tel: "9152987821" },
          { name: "Vandrevala", tel: "18602662345" },
          { name: "iMind", tel: "08046110007" },
        ].map(h => (
          <a
            key={h.name}
            href={`tel:${h.tel}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-peach-mid text-xs font-semibold text-peach-text hover:bg-peach/50 transition-colors"
            aria-label={`Call ${h.name} helpline at ${h.tel}`}
          >
            <Phone className="w-3 h-3" aria-hidden="true" /> {h.name} · {h.tel}
          </a>
        ))}
      </div>

      <div className="mb-10">
        <ClinicalScreener />
      </div>

      {/* Categories */}
      <div className="space-y-10">
        {categories.map(cat => {
          const Icon = cat.icon;
          return (
            <section key={cat.id} aria-labelledby={`cat-${cat.id}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-xl ${cat.bg} flex items-center justify-center`} aria-hidden="true">
                  <Icon className={`w-5 h-5 ${cat.color}`} />
                </div>
                <h2 id={`cat-${cat.id}`} className="text-[16px] font-semibold text-textPrimary">{cat.label}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cat.items.map(item => {
                  const isExternal = item.link.startsWith("http");
                  const isInternal = item.link.startsWith("/");
                  return (
                    <div
                      key={item.title}
                      className={`bg-white rounded-[16px] border ${cat.border} p-5 hover:shadow-sm transition-all`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-[14px] font-semibold text-textPrimary leading-snug">{item.title}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border shrink-0 ${TAG_STYLES[item.tag] || "bg-offWhite text-textMuted"}`}>
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-[13px] text-textMuted mb-3 leading-relaxed">{item.desc}</p>
                      <a
                        href={item.link}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className={`inline-flex items-center gap-1.5 text-[13px] font-medium ${cat.color} hover:underline`}
                        aria-label={item.linkLabel}
                      >
                        {isExternal ? <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" /> : isInternal ? <BookOpen className="w-3.5 h-3.5" aria-hidden="true" /> : <Phone className="w-3.5 h-3.5" aria-hidden="true" />}
                        {item.linkLabel}
                      </a>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* Disclaimer */}
      <div className="mt-10 p-5 rounded-[16px] bg-offWhite border border-borderLight">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-textMuted shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-[13px] font-semibold text-textSecondary mb-1">Disclaimer</p>
            <p className="text-[12px] text-textMuted leading-relaxed">
              MindEase is a wellness support tool and is not a substitute for professional mental health care. If you are experiencing severe distress, self-harm urges, or a mental health crisis, please contact one of the helplines above or visit your nearest hospital emergency department immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
