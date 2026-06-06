import type { Metadata } from "next";
import ClientPage from "./page-client";

export const metadata: Metadata = {
  title: "MindEase AI — MindEase",
  description: "Chat with MindEase AI, your personal 24/7 mental wellness assistant for exam stress support.",
};

export default function Page() {
  return <ClientPage />;
}
