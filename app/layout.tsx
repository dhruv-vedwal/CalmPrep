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
  title: "MindEase — Mental Wellness for Indian Students",
  description: "Track your mood, identify stress triggers, journal your thoughts, and get personalized AI wellness support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${lora.variable} font-body bg-offWhite text-textPrimary antialiased min-h-screen pt-[64px] md:pb-0 pb-[70px]`}>
        <Navbar />
        {children}
        <MobileNav />
      </body>
    </html>
  );
}
