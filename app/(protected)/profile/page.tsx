import type { Metadata } from "next";
import ClientPage from "./page-client";

export const metadata: Metadata = {
  title: "My Profile — MindEase",
  description: "Manage your MindEase account, preferences, and view your mental wellness achievements.",
};

export default function Page() {
  return <ClientPage />;
}
