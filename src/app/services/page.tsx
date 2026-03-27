import type { Metadata } from "next";
import ServicesPageClient from "@/components/ServicesPageClient";

export const metadata: Metadata = {
  title: "Services — Obsidian Studio",
  description: "Photography services in Lagos: weddings from ₦450k, portrait sessions from ₦80k, and commercial campaigns. View packages and pricing.",
  alternates: { canonical: "https://obsidianstudio.ng/services" },
  openGraph: {
    title: "Services — Obsidian Studio",
    description: "Photography services in Lagos: weddings, portraits, and commercial campaigns.",
    url: "https://obsidianstudio.ng/services",
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
