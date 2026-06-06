export default function CrisisBanner() {
  return (
    <div className="bg-peach rounded-[16px] p-4 md:p-6 flex items-center gap-4 flex-wrap border border-[rgba(212,116,42,0.2)]">
      <span className="text-2xl shrink-0">🆘</span>
      <div className="flex-1 min-w-[200px]">
        <strong className="block text-sm text-peach-text">Need to talk to someone right now?</strong>
        <span className="text-[13px] text-textSecondary">Free, confidential mental health helplines available 24/7 in India</span>
      </div>
      <div className="flex gap-2 flex-wrap">
        <a className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[rgba(212,116,42,0.12)] text-peach-text no-underline border border-[rgba(212,116,42,0.2)]" href="tel:9152987821">iCall · 9152987821</a>
        <a className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[rgba(212,116,42,0.12)] text-peach-text no-underline border border-[rgba(212,116,42,0.2)]" href="tel:18602662345">Vandrevala · 1860-2662-345</a>
        <a className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[rgba(212,116,42,0.12)] text-peach-text no-underline border border-[rgba(212,116,42,0.2)]" href="tel:08046110007">iMind · 080-46110007</a>
      </div>
    </div>
  );
}
