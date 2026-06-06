"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { AlertCircle, Eye, EyeOff, Heart } from "lucide-react";

export default function AuthPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [examType, setExamType] = useState("NEET");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const exams = ["NEET", "JEE", "CUET", "CAT", "GATE", "UPSC", "Boards", "Other"];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.ok) {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
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
    const data = await res.json();
    if (res.ok) {
      await signIn("credentials", { email, password, redirect: false });
      router.push("/dashboard");
    } else {
      setError(data.error || "Error creating account. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4"
      style={{
        background: `radial-gradient(ellipse 50% 60% at 80% 20%, rgba(200,190,240,0.3) 0%, transparent 55%), var(--off-white)`,
      }}
    >
      <div className="w-full max-w-[420px] bg-white rounded-[24px] border border-borderLight p-9 shadow-sm">
        <div className="text-center mb-7">
          <Link href="/" className="inline-flex items-center gap-2.5 text-lg font-semibold text-lavender-text no-underline" aria-label="Go to MindEase home">
            <span className="w-8 h-8 rounded-xl bg-lavender flex items-center justify-center" aria-hidden="true">
              <Heart className="w-[17px] h-[17px] text-lavender-deep" />
            </span>
            MindEase
          </Link>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-offWhite rounded-xl p-1 mb-6 gap-1" role="tablist" aria-label="Authentication options">
          <button
            role="tab"
            aria-selected={tab === "login"}
            aria-controls="login-panel"
            id="login-tab"
            onClick={() => { setTab("login"); setError(null); }}
            className={`flex-1 py-2 rounded-[9px] text-center text-sm font-medium transition-colors ${tab === "login" ? "bg-white text-textPrimary shadow-sm" : "text-textMuted hover:text-textSecondary"}`}
          >
            Sign in
          </button>
          <button
            role="tab"
            aria-selected={tab === "register"}
            aria-controls="register-panel"
            id="register-tab"
            onClick={() => { setTab("register"); setError(null); }}
            className={`flex-1 py-2 rounded-[9px] text-center text-sm font-medium transition-colors ${tab === "register" ? "bg-white text-textPrimary shadow-sm" : "text-textMuted hover:text-textSecondary"}`}
          >
            Create account
          </button>
        </div>

        {/* Error alert */}
        {error && (
          <div role="alert" aria-live="assertive" className="flex items-start gap-2.5 mb-4 p-3.5 rounded-xl bg-peach border border-peach-mid">
            <AlertCircle className="w-4 h-4 text-peach-deep shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-[13px] text-peach-text">{error}</span>
          </div>
        )}

        {tab === "login" ? (
          <form onSubmit={handleLogin} id="login-panel" role="tabpanel" aria-labelledby="login-tab" noValidate>
            <div className="mb-4">
              <label htmlFor="login-email" className="block text-[13px] font-medium text-textSecondary mb-1.5">
                Email address
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-borderMed bg-white text-sm text-textPrimary outline-none transition-all focus:border-lavender-deep focus:ring-[3px] focus:ring-[rgba(124,107,196,0.15)]"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="login-password" className="block text-[13px] font-medium text-textSecondary mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-borderMed bg-white text-sm text-textPrimary outline-none transition-all focus:border-lavender-deep focus:ring-[3px] focus:ring-[rgba(124,107,196,0.15)]"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-textMuted hover:text-textSecondary"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="text-right mb-5">
              <Link href="#" className="text-[13px] text-lavender-deep hover:underline">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="w-full py-3 rounded-xl bg-lavender-deep text-white text-sm font-medium hover:bg-lavender-text disabled:opacity-60 transition-colors flex justify-center items-center"
            >
              {loading ? "Signing in…" : "Sign in to MindEase"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} id="register-panel" role="tabpanel" aria-labelledby="register-tab" noValidate>
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              <div>
                <label htmlFor="reg-first" className="block text-[13px] font-medium text-textSecondary mb-1.5">First name</label>
                <input
                  id="reg-first"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Arjun"
                  required
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-borderMed bg-white text-sm text-textPrimary outline-none transition-all focus:border-lavender-deep focus:ring-[3px] focus:ring-[rgba(124,107,196,0.15)]"
                />
              </div>
              <div>
                <label htmlFor="reg-last" className="block text-[13px] font-medium text-textSecondary mb-1.5">Last name</label>
                <input
                  id="reg-last"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Sharma"
                  required
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-borderMed bg-white text-sm text-textPrimary outline-none transition-all focus:border-lavender-deep focus:ring-[3px] focus:ring-[rgba(124,107,196,0.15)]"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="reg-email" className="block text-[13px] font-medium text-textSecondary mb-1.5">Email address</label>
              <input
                id="reg-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-borderMed bg-white text-sm text-textPrimary outline-none transition-all focus:border-lavender-deep focus:ring-[3px] focus:ring-[rgba(124,107,196,0.15)]"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="reg-password" className="block text-[13px] font-medium text-textSecondary mb-1.5">
                Password
                <span className="text-textMuted font-normal ml-1 text-[11px]">(8+ chars, uppercase, number)</span>
              </label>
              <div className="relative">
                <input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Create a strong password"
                  required
                  minLength={8}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  aria-describedby="password-hint"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-borderMed bg-white text-sm text-textPrimary outline-none transition-all focus:border-lavender-deep focus:ring-[3px] focus:ring-[rgba(124,107,196,0.15)]"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-textMuted hover:text-textSecondary"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p id="password-hint" className="sr-only">Password must be at least 8 characters, contain one uppercase letter and one number</p>
            </div>
            <div className="mb-5">
              <label className="block text-[13px] font-medium text-textSecondary mb-1.5">
                Which exam are you preparing for?
              </label>
              <div className="grid grid-cols-4 gap-1.5 mt-1.5" role="group" aria-label="Exam type selection">
                {exams.map(exam => (
                  <button
                    key={exam}
                    type="button"
                    aria-pressed={examType === exam}
                    onClick={() => setExamType(exam)}
                    className={`px-1.5 py-2 rounded-[10px] text-xs font-medium border transition-colors text-center ${examType === exam ? "bg-lavender border-lavender-mid text-lavender-text" : "bg-white border-borderMed text-textSecondary hover:border-lavender-mid"}`}
                  >
                    {exam}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="w-full py-3 rounded-xl bg-lavender-deep text-white text-sm font-medium hover:bg-lavender-text disabled:opacity-60 transition-colors flex justify-center items-center"
            >
              {loading ? "Creating account…" : "Create my account"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
