import Link from "next/link";
import CrisisBanner from "@/components/CrisisBanner";
import { CheckCircle, Wind, MessageSquare, BarChart3, Book, Award, ArrowRight, Lightbulb } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-[calc(100vh-64px)]">
      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center text-center px-6 py-16 md:py-24" style={{
        background: `radial-gradient(ellipse 60% 50% at 20% 30%, rgba(200,190,240,0.25) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 70%, rgba(166,212,166,0.2) 0%, transparent 60%), var(--off-white)`
      }}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lavender text-lavender-text text-[13px] font-medium mb-6">
          <Lightbulb className="w-3.5 h-3.5" />
          Mental wellness for Indian students
        </div>
        <h1 className="font-serif text-[clamp(2.4rem,6vw,4rem)] font-normal leading-[1.2] text-textPrimary mb-5">
          Your mind matters as much<br/>as your <em className="text-lavender-deep not-italic italic">rank</em>
        </h1>
        <p className="text-[17px] text-textSecondary max-w-[520px] mx-auto mb-8 leading-[1.7]">
          Track your mood, identify stress triggers, journal your thoughts, and get personalized AI wellness support — built for NEET, JEE, UPSC and every exam you're conquering.
        </p>
        <div className="flex gap-3 justify-center flex-wrap mb-12">
          <Link href="/auth" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[14px] bg-lavender-deep text-white text-[15px] font-medium transition-colors hover:bg-lavender-text">
            Start your journey <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/dashboard" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[14px] bg-transparent text-textSecondary border border-borderMed text-[15px] font-medium transition-colors hover:bg-offWhite">
            See demo &rarr;
          </Link>
        </div>
        <div className="flex flex-wrap gap-2 justify-center max-w-[560px] mx-auto">
          {['NEET', 'JEE Mains & Advanced', 'CUET', 'CAT', 'GATE', 'UPSC', 'CBSE Boards', 'State Boards'].map((exam) => (
            <span key={exam} className="px-3.5 py-1.5 rounded-full text-[13px] font-medium border border-borderMed text-textSecondary bg-white">
              {exam}
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-[1100px] mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <div className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-lavender text-lavender-text mb-2.5">
            Everything you need
          </div>
          <h2 className="font-serif text-[clamp(1.5rem,3vw,2.2rem)] font-normal mb-2 text-textPrimary">
            Tools built for exam warriors
          </h2>
          <p className="text-textMuted text-[15px]">
            Not generic wellness. Designed specifically for the pressure of Indian competitive exams.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeatureCard 
            icon={<CheckCircle className="w-[22px] h-[22px] text-lavender-deep" />} 
            bg="bg-lavender" title="Daily Mood Check-in" 
            desc="30-second daily check-in with emoji scale, stress triggers, and a short journal prompt." 
          />
          <FeatureCard 
            icon={<Wind className="w-[22px] h-[22px] text-sage-deep" />} 
            bg="bg-sage" title="Guided Breathing" 
            desc="4-7-8, Box breathing, and Pranayama techniques with beautiful animated visuals." 
          />
          <FeatureCard 
            icon={<MessageSquare className="w-[22px] h-[22px] text-sky-deep" />} 
            bg="bg-sky" title="AI Wellness Chat" 
            desc="Powered by Gemini. Get personalized coping strategies, affirmations, and study tips." 
          />
          <FeatureCard 
            icon={<BarChart3 className="w-[22px] h-[22px] text-peach-deep" />} 
            bg="bg-peach" title="Mood Analytics" 
            desc="Track patterns over time. See your mood trends, streak calendar, and stress triggers." 
          />
          <FeatureCard 
            icon={<Book className="w-[22px] h-[22px] text-lavender-deep" />} 
            bg="bg-lavender" title="Private Journal" 
            desc="A safe, encrypted space to write your thoughts, fears, and victories." 
          />
          <FeatureCard 
            icon={<Award className="w-[22px] h-[22px] text-sage-deep" />} 
            bg="bg-sage" title="Streak & Gamification" 
            desc="Build healthy habits with daily streaks, milestones, and motivational badges." 
          />
        </div>
      </section>

      {/* Quotes */}
      <section className="max-w-[1100px] mx-auto px-6 py-12">
        <div className="mb-6">
          <div className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-peach text-peach-text mb-2">
            Inspiration
          </div>
          <h2 className="text-xl font-semibold text-textPrimary">From students who made it</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuoteCard 
            quote="The pressure of JEE is immense. Taking 5 minutes each day for my mental health made a huge difference. You can crack it — believe in yourself."
            initials="KV" name="Kalpit Veerwal" title="JEE Mains AIR 1, 2017" color="bg-lavender-deep"
          />
          <QuoteCard 
            quote="Burnout is real. The students who take care of their mind alongside their studies are the ones who truly succeed in the long run."
            initials="AP" name="Anushka Patra" title="NEET AIR 1, 2022" color="bg-sage-deep"
          />
          <QuoteCard 
            quote="UPSC tests your character and resilience as much as your knowledge. Build mental strength every single day — it compounds."
            initials="SK" name="Srushti Jayant Deshmukh" title="UPSC CSE AIR 5, 2018" color="bg-peach-deep"
          />
        </div>
      </section>

      {/* Crisis Banner */}
      <div className="max-w-[1100px] mx-auto px-6 pb-12">
        <CrisisBanner />
      </div>
    </div>
  );
}

function FeatureCard({ icon, bg, title, desc }: { icon: React.ReactNode, bg: string, title: string, desc: string }) {
  return (
    <div className="p-6 rounded-[20px] border border-borderLight bg-white">
      <div className={`w-11 h-11 rounded-[14px] flex items-center justify-center mb-4 ${bg}`}>
        {icon}
      </div>
      <h3 className="text-[15px] font-semibold mb-1.5 text-textPrimary">{title}</h3>
      <p className="text-[13px] text-textMuted leading-[1.55]">{desc}</p>
    </div>
  );
}

function QuoteCard({ quote, initials, name, title, color }: { quote: string, initials: string, name: string, title: string, color: string }) {
  return (
    <div className="bg-white rounded-[16px] border border-borderLight p-5">
      <p className="font-serif text-[15px] italic text-textPrimary mb-4 leading-[1.6]">"{quote}"</p>
      <div className="flex items-center gap-2.5">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white ${color}`}>
          {initials}
        </div>
        <div>
          <strong className="block text-[13px] font-semibold text-textPrimary">{name}</strong>
          <span className="text-[11px] text-textMuted">{title}</span>
        </div>
      </div>
    </div>
  );
}
