import { PhoneCall, AlertCircle } from "lucide-react";

export default function CrisisBanner() {
  return (
    <div className="bg-peach rounded-[16px] p-4 md:p-5 flex items-start gap-4 flex-wrap border border-[rgba(212,116,42,0.2)]">
      <div className="w-9 h-9 rounded-xl bg-[rgba(212,116,42,0.15)] flex items-center justify-center shrink-0 mt-0.5">
        <AlertCircle className="w-5 h-5 text-peach-deep" />
      </div>
      <div className="flex-1 min-w-[200px]">
        <strong className="block text-sm font-semibold text-peach-text mb-0.5">Need to talk to someone right now?</strong>
        <span className="text-[13px] text-textSecondary">Free, confidential mental health helplines available 24/7 in India</span>
      </div>
      <div className="flex gap-2 flex-wrap items-center">
        <HelplineButton tel="9152987821" label="iCall" number="9152987821" />
        <HelplineButton tel="18602662345" label="Vandrevala" number="1860-266-2345" />
        <HelplineButton tel="08046110007" label="iMind" number="080-46110007" />
      </div>
    </div>
  );
}

function HelplineButton({ tel, label, number }: { tel: string; label: string; number: string }) {
  return (
    <a
      href={`tel:${tel}`}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[rgba(212,116,42,0.1)] text-peach-text no-underline border border-[rgba(212,116,42,0.2)] hover:bg-[rgba(212,116,42,0.2)] transition-colors"
    >
      <PhoneCall className="w-3 h-3" />
      {label} · {number}
    </a>
  );
}
