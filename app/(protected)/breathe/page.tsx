import type { Metadata } from "next";
import ClientPage from "./page-client";

export const metadata: Metadata = {
  title: "Breathe — MindEase",
  description: "Guided breathing exercises to quickly reduce exam anxiety, lower heart rate, and improve focus.",
};

export default function Page() {
  return <ClientPage />;
}
