import type { Metadata } from "next";
import ClientPage from "./page-client";

export const metadata: Metadata = {
  title: "Journal — MindEase",
  description: "Reflect on your day, reduce anxiety, and clear your mind with private journaling.",
};

export default function Page() {
  return <ClientPage />;
}
