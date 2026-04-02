import type { Metadata } from "next";
import AboutPageClient from "@/components/AboutPageClient";

export const metadata: Metadata = {
  title: "About — Tim's Graphy",
  description: "Meet Tim — an independent photographer based in Ilorin, Kwara State, Nigeria, specialising in weddings, portraits, model shoots, graduations, birthdays, and commercial photography.",
  alternates: { canonical: "https://timsgraphy.com/about" },
  openGraph: {
    title: "About Tim — Tim's Graphy",
    description: "Independent photographer based in Ilorin, Kwara State. 6+ years, 800+ sessions, 500+ happy clients.",
    url: "https://timsgraphy.com/about",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
