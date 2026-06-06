export default function Loading() {
  return (
    <div
      className="flex items-center justify-center min-h-[50vh]"
      aria-label="Loading content"
      aria-live="polite"
      role="status"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-lavender-mid border-t-lavender-deep animate-spin" />
        <span className="text-sm text-textMuted">Loading…</span>
      </div>
    </div>
  );
}
