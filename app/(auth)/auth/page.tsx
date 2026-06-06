import type { Metadata } from "next";
import ClientPage from "./page-client";

export const metadata: Metadata = {
  title: "Sign in — MindEase",
  description: "Sign in or create your MindEase account to start tracking your mental wellness.",
  robots: { index: false },
};

export default function Page() {
  return <ClientPage />;
}
