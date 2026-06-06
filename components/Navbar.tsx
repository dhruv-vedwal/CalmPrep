"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  if (pathname === "/auth") return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] h-[64px] bg-[rgba(248,246,242,0.88)] backdrop-blur-[12px] border-b border-borderLight flex items-center justify-between px-4 md:px-8">
      <Link href="/" className="flex items-center gap-2.5 text-lg font-semibold text-lavender-text no-underline">
        <span className="w-8 h-8 rounded-xl bg-lavender flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="#7C6BC4" strokeWidth="2" strokeLinecap="round" className="w-[18px] h-[18px]">
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
          </svg>
        </span>
        MindEase
      </Link>
      <div className="hidden md:flex items-center gap-1">
        <NavLink href="/dashboard" current={pathname}>Dashboard</NavLink>
        <NavLink href="/checkin" current={pathname}>Check-in</NavLink>
        <NavLink href="/journal" current={pathname}>Journal</NavLink>
        <NavLink href="/breathe" current={pathname}>Breathe</NavLink>
        <NavLink href="/chat" current={pathname}>AI Support</NavLink>
        <NavLink href="/progress" current={pathname}>Progress</NavLink>
      </div>
      <div className="flex items-center gap-2.5">
        <Link href="/settings" className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-lavender-mid to-lavender-deep flex items-center justify-center text-[13px] font-semibold text-white cursor-pointer no-underline">
          AR
        </Link>
      </div>
    </nav>
  );
}

function NavLink({ href, current, children }: { href: string, current: string, children: React.ReactNode }) {
  const isActive = current === href || (href !== "/" && current.startsWith(href));
  return (
    <Link href={href} className={`px-3.5 py-[7px] rounded-[10px] text-sm font-normal no-underline cursor-pointer transition-colors border-none bg-transparent ${isActive ? 'bg-lavender text-lavender-text font-medium' : 'text-textSecondary hover:bg-lavender hover:text-lavender-text'}`}>
      {children}
    </Link>
  );
}
