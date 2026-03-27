import type { Metadata } from "next";
import ContactPageClient from "@/components/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact — Obsidian Studio",
  description: "Book a photography session or send an enquiry. Based in Victoria Island, Lagos. We respond within 24 hours.",
  alternates: { canonical: "https://obsidianstudio.ng/contact" },
  openGraph: {
    title: "Contact — Obsidian Studio",
    description: "Book a photography session or send an enquiry. Based in Victoria Island, Lagos.",
    url: "https://obsidianstudio.ng/contact",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
