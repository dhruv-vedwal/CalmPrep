"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, ClipboardCheck, BookOpen, Wind,
  MessageSquare, BarChart2, Bell, Heart, Library,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  if (pathname === "/auth") return null;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] h-[64px] bg-[rgba(248,246,242,0.92)] backdrop-blur-[16px] border-b border-borderLight flex items-center justify-between px-4 md:px-8"
      aria-label="Main navigation"
    >
      <Link href="/" className="flex items-center gap-2.5 text-lg font-semibold text-lavender-text no-underline" aria-label="MindEase home">
        <span className="w-8 h-8 rounded-xl bg-lavender flex items-center justify-center" aria-hidden="true">
          <Heart className="w-[17px] h-[17px] text-lavender-deep" />
        </span>
        MindEase
      </Link>

      <div className="hidden md:flex items-center gap-0.5" role="list">
        <NavLink href="/dashboard" current={pathname} icon={<LayoutDashboard className="w-4 h-4" aria-hidden="true" />}>Dashboard</NavLink>
        <NavLink href="/checkin" current={pathname} icon={<ClipboardCheck className="w-4 h-4" aria-hidden="true" />}>Check-in</NavLink>
        <NavLink href="/journal" current={pathname} icon={<BookOpen className="w-4 h-4" aria-hidden="true" />}>Journal</NavLink>
        <NavLink href="/breathe" current={pathname} icon={<Wind className="w-4 h-4" aria-hidden="true" />}>Breathe</NavLink>
        <NavLink href="/chat" current={pathname} icon={<MessageSquare className="w-4 h-4" aria-hidden="true" />}>AI Support</NavLink>
        <NavLink href="/progress" current={pathname} icon={<BarChart2 className="w-4 h-4" aria-hidden="true" />}>Progress</NavLink>
        <NavLink href="/resources" current={pathname} icon={<Library className="w-4 h-4" aria-hidden="true" />}>Resources</NavLink>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="w-[34px] h-[34px] rounded-full hover:bg-lavender flex items-center justify-center transition-colors relative"
          aria-label="View notifications"
        >
          <Bell className="w-[17px] h-[17px] text-textSecondary" aria-hidden="true" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-lavender-deep" aria-label="1 unread notification" />
        </button>
        <Link
          href="/profile"
          className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-lavender-mid to-lavender-deep flex items-center justify-center text-[13px] font-semibold text-white cursor-pointer no-underline hover:opacity-90 transition-opacity"
          aria-label="Go to your profile"
        >
          A
        </Link>
      </div>
    </nav>
  );
}

function NavLink({ href, current, icon, children }: { href: string; current: string; icon: React.ReactNode; children: React.ReactNode }) {
  const isActive = current === href || (href !== "/" && current.startsWith(href));
  return (
    <Link
      href={href}
      role="listitem"
      aria-current={isActive ? "page" : undefined}
      className={`inline-flex items-center gap-1.5 px-3 py-[7px] rounded-[10px] text-[13px] font-medium no-underline transition-colors ${isActive ? "bg-lavender text-lavender-text" : "text-textSecondary hover:bg-lavender/60 hover:text-lavender-text"}`}
    >
      {icon}
      {children}
    </Link>
  );
}
