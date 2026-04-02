"use client";

import { useEffect } from "react";
import Image from "next/image";
import { STATS } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

export default function About() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); } }); },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" style={{ padding: "7rem 3.5rem", background: "var(--bg)" }}>
      <span className="section-label reveal">Our Story</span>

      <div className="about-grid-wrap" style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "6rem", alignItems: "center", marginTop: "4rem",
      }}>
        {/* Photo */}
        <div className="reveal" style={{ position: "relative" }}>
          <div style={{ width: "100%", paddingTop: "130%", position: "relative", overflow: "hidden" }}>
            <Image
              src={IMAGES.aboutStudio.src}
              alt={IMAGES.aboutStudio.alt}
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
            {/* Gold tint overlay */}
            <div style={{ position: "absolute", inset: 0, background: "rgba(201,169,110,0.06)", mixBlendMode: "multiply" }} />
          </div>
          {/* Decorative offset border */}
          <div style={{
            position: "absolute", bottom: "-1.5rem", right: "-1.5rem",
            width: "120px", height: "120px",
            border: "1px solid var(--border-gold)", zIndex: -1,
          }} />
        </div>

        {/* Text */}
        <div>
          <h2 className="section-title reveal" style={{ marginBottom: "1.5rem" }}>
            Chasing light<br /><em>since 2016</em>
          </h2>
          <p className="reveal" style={{ fontSize: "0.98rem", lineHeight: 1.95, color: "var(--muted)", marginBottom: "1.25rem", transitionDelay: "0.1s" }}>
            We are a Ilorin-based photography studio obsessed with the quiet power of a single frame. Founded on the belief that every face, every moment, every brand deserves to be seen beautifully.
          </p>
          <p className="reveal" style={{ fontSize: "0.98rem", lineHeight: 1.95, color: "var(--muted)", marginBottom: "1.25rem", transitionDelay: "0.2s" }}>
            From intimate wedding ceremonies in Lekki to high-stakes commercial campaigns for global brands — our approach is always the same: patient, intentional, and deeply human.
          </p>

          {/* Stats */}
          <div className="reveal" style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            marginTop: "2.5rem",
            borderTop: "1px solid var(--border-gold)",
            borderLeft: "1px solid var(--border-gold)",
            transitionDelay: "0.35s",
          }}>
            {STATS.map((s) => (
              <div key={s.label} style={{ padding: "1.5rem 1.25rem", borderRight: "1px solid var(--border-gold)", borderBottom: "1px solid var(--border-gold)" }}>
                <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "2.5rem", fontWeight: 300, color: "var(--gold2)", lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginTop: "0.3rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
