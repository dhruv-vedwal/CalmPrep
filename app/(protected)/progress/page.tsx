import type { Metadata } from "next";
import ClientPage from "./page-client";

export const metadata: Metadata = {
  title: "Progress & Insights — MindEase",
  description: "Visualize your mood trends over time and identify what triggers your exam stress and burnout.",
};

export default function Page() {
  return <ClientPage />;
}
