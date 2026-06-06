export default function Loading() {
  return (
    <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-8" aria-label="Loading dashboard" aria-live="polite">
      <div className="py-7">
        <div className="h-8 w-64 rounded-xl bg-borderLight animate-pulse mb-2" />
        <div className="h-4 w-40 rounded-lg bg-borderLight animate-pulse" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-[16px] border border-borderLight p-5 space-y-3">
            <div className="h-3 w-20 rounded bg-borderLight animate-pulse" />
            <div className="h-7 w-14 rounded bg-borderLight animate-pulse" />
            <div className="h-2 w-24 rounded bg-borderLight animate-pulse" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5">
        <div className="bg-white rounded-[20px] border border-borderLight p-6 h-[280px] animate-pulse" />
        <div className="space-y-4">
          <div className="bg-white rounded-[18px] border border-borderLight p-6 h-[160px] animate-pulse" />
          <div className="bg-white rounded-[18px] border border-borderLight p-6 h-[140px] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
