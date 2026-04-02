import type { Metadata } from "next";
import ServicesPageClient from "@/components/ServicesPageClient";

export const metadata: Metadata = {
  title: "Services — Tim's Graphy",
  description: "Photography services in Ilorin: weddings from ₦450k, portrait sessions from ₦80k, and commercial campaigns. View packages and pricing.",
  alternates: { canonical: "https://timsgraphy.com/services" },
  openGraph: {
    title: "Services — Tim's Graphy",
    description: "Photography services in Ilorin: weddings, portraits, and commercial campaigns.",
    url: "https://timsgraphy.com/services",
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
