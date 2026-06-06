"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, ClipboardCheck, Wind, MessageSquare } from "lucide-react";

export default function MobileNav() {
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/auth") return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] h-[68px] bg-[rgba(248,246,242,0.95)] backdrop-blur-[16px] border-t border-borderLight flex md:hidden items-stretch justify-around pb-[env(safe-area-inset-bottom)]">
      <NavItem href="/dashboard" current={pathname} icon={<LayoutDashboard className="w-5 h-5" />} label="Home" />
      <NavItem href="/journal" current={pathname} icon={<BookOpen className="w-5 h-5" />} label="Journal" />
      <NavItem href="/checkin" current={pathname} icon={null} label="" isCenter />
      <NavItem href="/breathe" current={pathname} icon={<Wind className="w-5 h-5" />} label="Breathe" />
      <NavItem href="/chat" current={pathname} icon={<MessageSquare className="w-5 h-5" />} label="AI Chat" />
    </nav>
  );
}

function NavItem({ href, current, icon, label, isCenter }: { href: string, current: string, icon: React.ReactNode, label: string, isCenter?: boolean }) {
  const isActive = current === href || (href !== "/" && current.startsWith(href));

  if (isCenter) {
    return (
      <Link href={href} className="flex-1 flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-lavender-deep flex items-center justify-center shadow-md -translate-y-3 hover:bg-lavender-text transition-colors">
          <ClipboardCheck className="w-[22px] h-[22px] text-white" />
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className={`flex-1 flex flex-col items-center justify-center gap-1 no-underline transition-colors ${isActive ? 'text-lavender-deep' : 'text-textMuted hover:text-textSecondary'}`}>
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  );
}
