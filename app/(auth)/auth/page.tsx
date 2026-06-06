"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function AuthPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [examType, setExamType] = useState("NEET");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const exams = ["NEET", "JEE", "CUET", "CAT", "GATE", "UPSC", "Boards", "Other"];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.ok) {
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `${firstName} ${lastName}`.trim(),
        email,
        password,
        examType,
      }),
    });
    setLoading(false);
    if (res.ok) {
      await signIn("credentials", { email, password, redirect: false });
      router.push("/dashboard");
    } else {
      alert("Error creating account");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4" style={{
      background: `radial-gradient(ellipse 50% 60% at 80% 20%, rgba(200,190,240,0.3) 0%, transparent 55%), var(--off-white)`
    }}>
      <div className="w-full max-w-[420px] bg-white rounded-[24px] border border-borderLight p-9">
        <div className="text-center mb-7">
          <Link href="/" className="inline-flex items-center gap-2.5 text-lg font-semibold text-lavender-text no-underline">
            <span className="w-8 h-8 rounded-xl bg-lavender flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="#7C6BC4" strokeWidth="2" strokeLinecap="round" className="w-[18px] h-[18px]">
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
              </svg>
            </span>
            MindEase
          </Link>
        </div>

        <div className="flex bg-offWhite rounded-xl p-1 mb-6 gap-1">
          <button 
            onClick={() => setTab("login")}
            className={`flex-1 py-2 rounded-[9px] text-center text-sm font-medium transition-colors ${tab === "login" ? 'bg-white text-textPrimary shadow-sm' : 'text-textMuted hover:text-textSecondary'}`}
          >
            Sign in
          </button>
          <button 
            onClick={() => setTab("register")}
            className={`flex-1 py-2 rounded-[9px] text-center text-sm font-medium transition-colors ${tab === "register" ? 'bg-white text-textPrimary shadow-sm' : 'text-textMuted hover:text-textSecondary'}`}
          >
            Create account
          </button>
        </div>

        {tab === "login" ? (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-[13px] font-medium text-textSecondary mb-1.5">Email address</label>
              <input type="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-borderMed bg-white text-sm text-textPrimary outline-none transition-all focus:border-lavender-deep focus:ring-[3px] focus:ring-[rgba(124,107,196,0.15)]" />
            </div>
            <div className="mb-4">
              <label className="block text-[13px] font-medium text-textSecondary mb-1.5">Password</label>
              <input type="password" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-borderMed bg-white text-sm text-textPrimary outline-none transition-all focus:border-lavender-deep focus:ring-[3px] focus:ring-[rgba(124,107,196,0.15)]" />
            </div>
            <div className="text-right mb-4">
              <Link href="#" className="text-[13px] text-lavender-deep hover:underline">Forgot password?</Link>
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-lavender-deep text-white text-sm font-medium hover:bg-lavender-text transition-colors flex justify-center items-center">
              {loading ? "Signing in..." : "Sign in to MindEase"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              <div>
                <label className="block text-[13px] font-medium text-textSecondary mb-1.5">First name</label>
                <input type="text" placeholder="Arjun" required value={firstName} onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-borderMed bg-white text-sm text-textPrimary outline-none transition-all focus:border-lavender-deep focus:ring-[3px] focus:ring-[rgba(124,107,196,0.15)]" />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-textSecondary mb-1.5">Last name</label>
                <input type="text" placeholder="Sharma" required value={lastName} onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-borderMed bg-white text-sm text-textPrimary outline-none transition-all focus:border-lavender-deep focus:ring-[3px] focus:ring-[rgba(124,107,196,0.15)]" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-[13px] font-medium text-textSecondary mb-1.5">Email address</label>
              <input type="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-borderMed bg-white text-sm text-textPrimary outline-none transition-all focus:border-lavender-deep focus:ring-[3px] focus:ring-[rgba(124,107,196,0.15)]" />
            </div>
            <div className="mb-4">
              <label className="block text-[13px] font-medium text-textSecondary mb-1.5">Password</label>
              <input type="password" placeholder="Create a strong password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-borderMed bg-white text-sm text-textPrimary outline-none transition-all focus:border-lavender-deep focus:ring-[3px] focus:ring-[rgba(124,107,196,0.15)]" />
            </div>
            <div className="mb-4">
              <label className="block text-[13px] font-medium text-textSecondary mb-1.5">Which exam are you preparing for?</label>
              <div className="grid grid-cols-3 gap-2 mt-1.5">
                {exams.map(exam => (
                  <button
                    key={exam}
                    type="button"
                    onClick={() => setExamType(exam)}
                    className={`px-1.5 py-2 rounded-[10px] text-xs font-medium border transition-colors text-center ${examType === exam ? 'bg-lavender border-lavender-mid text-lavender-text' : 'bg-white border-borderMed text-textSecondary'}`}
                  >
                    {exam}
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-lavender-deep text-white text-sm font-medium hover:bg-lavender-text transition-colors flex justify-center items-center">
              {loading ? "Creating account..." : "Create my account"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
