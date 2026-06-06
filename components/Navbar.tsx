"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardCheck,
  BookOpen,
  Wind,
  MessageSquare,
  BarChart2,
  Bell,
  Settings,
  Heart,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  if (pathname === "/auth") return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] h-[64px] bg-[rgba(248,246,242,0.92)] backdrop-blur-[16px] border-b border-borderLight flex items-center justify-between px-4 md:px-8 shadow-[0_1px_0_0_var(--border)]">
      <Link href="/" className="flex items-center gap-2.5 text-lg font-semibold text-lavender-text no-underline">
        <span className="w-8 h-8 rounded-xl bg-lavender flex items-center justify-center">
          <Heart className="w-[17px] h-[17px] text-lavender-deep" strokeWidth={2.5} />
        </span>
        MindEase
      </Link>

      <div className="hidden md:flex items-center gap-0.5">
        <NavLink href="/dashboard" current={pathname} icon={<LayoutDashboard className="w-4 h-4" />}>Dashboard</NavLink>
        <NavLink href="/checkin" current={pathname} icon={<ClipboardCheck className="w-4 h-4" />}>Check-in</NavLink>
        <NavLink href="/journal" current={pathname} icon={<BookOpen className="w-4 h-4" />}>Journal</NavLink>
        <NavLink href="/breathe" current={pathname} icon={<Wind className="w-4 h-4" />}>Breathe</NavLink>
        <NavLink href="/chat" current={pathname} icon={<MessageSquare className="w-4 h-4" />}>AI Support</NavLink>
        <NavLink href="/progress" current={pathname} icon={<BarChart2 className="w-4 h-4" />}>Progress</NavLink>
      </div>

      <div className="flex items-center gap-2">
        <button className="w-[34px] h-[34px] rounded-full hover:bg-lavender flex items-center justify-center transition-colors relative">
          <Bell className="w-[17px] h-[17px] text-textSecondary" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-lavender-deep"></span>
        </button>
        <Link href="/profile" className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-lavender-mid to-lavender-deep flex items-center justify-center text-[13px] font-semibold text-white cursor-pointer no-underline hover:opacity-90 transition-opacity">
          A
        </Link>
      </div>
    </nav>
  );
}

function NavLink({ href, current, icon, children }: { href: string, current: string, icon: React.ReactNode, children: React.ReactNode }) {
  const isActive = current === href || (href !== "/" && current.startsWith(href));
  return (
    <Link href={href} className={`inline-flex items-center gap-1.5 px-3 py-[7px] rounded-[10px] text-[13px] font-medium no-underline transition-colors ${isActive ? 'bg-lavender text-lavender-text' : 'text-textSecondary hover:bg-lavender/60 hover:text-lavender-text'}`}>
      {icon}
      {children}
    </Link>
  );
}
