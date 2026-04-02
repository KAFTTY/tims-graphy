import type { Metadata } from "next";
import ContactPageClient from "@/components/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact — Tim's Graphy",
  description: "Book a photography session or send an enquiry. Based in Ilorin, Kwara State. We respond within 24 hours.",
  alternates: { canonical: "https://timsgraphy.com/contact" },
  openGraph: {
    title: "Contact — Tim's Graphy",
    description: "Book a photography session or send an enquiry. Based in Ilorin, Kwara State.",
    url: "https://timsgraphy.com/contact",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
