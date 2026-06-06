import type { Metadata } from "next";
import { DM_Sans, Lora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MindEase — Mental Wellness for Indian Students",
    template: "%s | MindEase",
  },
  description:
    "Track your mood, identify stress triggers, journal your thoughts, and get personalized AI wellness support built for NEET, JEE, UPSC and more.",
  keywords: ["mental wellness", "student mental health", "NEET", "JEE", "mood tracker", "stress", "burnout"],
  authors: [{ name: "MindEase" }],
  openGraph: {
    title: "MindEase — Mental Wellness for Indian Students",
    description: "Your mind matters as much as your rank.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${lora.variable} font-body bg-offWhite text-textPrimary antialiased min-h-screen pt-[64px] md:pb-0 pb-[70px]`}
      >
        {/* Skip to main content — accessibility requirement */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-lavender-deep focus:text-white focus:text-sm focus:font-medium focus:outline-none"
        >
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content" tabIndex={-1}>
          {children}
        </main>

        <MobileNav />
      </body>
    </html>
  );
}
