import type { Metadata } from "next";
import Loader from "@/components/Loader";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Quote from "@/components/Quote";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Obsidian Studio — Photography",
  description:
    "Award-winning photography studio in Lagos, Nigeria. We capture weddings, portraits, and commercial campaigns with a cinematic, intentional eye.",
  alternates: { canonical: "https://obsidianstudio.ng" },
};

export default function Home() {
  return (
    <main>
      <Loader />
      <Hero />
      <Services />
      <Gallery />
      <Quote />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
