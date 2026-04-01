"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Quote from "@/components/Quote";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const PuzzleLoader = dynamic(() => import("@/components/PuzzleLoader"), { ssr: false });

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <>
      {!loaderDone && (
        <PuzzleLoader onDone={() => {
          setLoaderDone(true);
          document.body.style.overflow = "";
        }} />
      )}
      <main style={{ opacity: loaderDone ? 1 : 0, transition: "opacity 0.5s ease 0.1s" }}>
        <Hero />
        <Services />
        <Gallery />
        <Quote />
        <About />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
