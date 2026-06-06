"use client";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-[500px] mx-auto px-6 py-20 text-center" role="alert" aria-live="assertive">
      <div className="w-14 h-14 rounded-2xl bg-peach flex items-center justify-center mx-auto mb-4">
        <AlertTriangle className="w-7 h-7 text-peach-deep" />
      </div>
      <h2 className="text-lg font-semibold text-textPrimary mb-2">Something went wrong</h2>
      <p className="text-sm text-textMuted mb-6">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-lavender-deep text-white text-sm font-medium hover:bg-lavender-text transition-colors"
      >
        <RefreshCw className="w-4 h-4" /> Try again
      </button>
    </div>
  );
}
