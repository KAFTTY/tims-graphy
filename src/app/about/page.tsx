import type { Metadata } from "next";
import AboutPageClient from "@/components/AboutPageClient";

export const metadata: Metadata = {
  title: "About — Obsidian Studio",
  description: "Meet the team behind Obsidian Studio. 8+ years, 500+ sessions, 12 awards. Lagos-based photographers Amara, Kolade, and Ngozi.",
  alternates: { canonical: "https://obsidianstudio.ng/about" },
  openGraph: {
    title: "About — Obsidian Studio",
    description: "Meet the team behind Obsidian Studio. 8+ years, 500+ sessions, 12 awards.",
    url: "https://obsidianstudio.ng/about",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
