import type { Metadata } from "next";
import ClientPage from "./page-client";

export const metadata: Metadata = {
  title: "Check-in — MindEase",
  description: "Log your mood, energy, and stress triggers to help MindEase personalize your mental wellness support.",
};

export default function Page() {
  return <ClientPage />;
}
