"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusCircle, Book, Wind, MessageSquare } from "lucide-react";

export default function MobileNav() {
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/auth") return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] h-[70px] bg-[rgba(248,246,242,0.92)] backdrop-blur-[12px] border-t border-borderLight flex md:hidden items-center justify-around px-2 pb-[env(safe-area-inset-bottom)]">
      <NavItem href="/dashboard" current={pathname} icon={<Home className="w-[22px] h-[22px]" />} label="Home" />
      <NavItem href="/journal" current={pathname} icon={<Book className="w-[22px] h-[22px]" />} label="Journal" />
      <NavItem href="/checkin" current={pathname} icon={<PlusCircle className="w-11 h-11 bg-lavender-deep text-white rounded-full shadow-md" />} label="" isCenter />
      <NavItem href="/breathe" current={pathname} icon={<Wind className="w-[22px] h-[22px]" />} label="Breathe" />
      <NavItem href="/chat" current={pathname} icon={<MessageSquare className="w-[22px] h-[22px]" />} label="AI Chat" />
    </nav>
  );
}

function NavItem({ href, current, icon, label, isCenter }: { href: string, current: string, icon: React.ReactNode, label: string, isCenter?: boolean }) {
  const isActive = current === href || (href !== "/" && current.startsWith(href));
  
  if (isCenter) {
    return (
      <Link href={href} className="flex flex-col items-center justify-center -translate-y-[18px]">
        {icon}
      </Link>
    );
  }

  return (
    <Link href={href} className={`flex flex-col items-center justify-center gap-[3px] min-w-[60px] no-underline transition-colors ${isActive ? 'text-lavender-text' : 'text-textMuted'}`}>
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  );
}
