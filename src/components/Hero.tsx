"use client";

import { useEffect } from "react";
import Typewriter from "@/components/Typewriter";

export default function Hero() {
  // Parallax — hero bg + grid move at different speeds on scroll
  useEffect(() => {
    function onScroll() {
      const sy = window.scrollY;
      const bg = document.getElementById("hero-bg");
      const grid = document.getElementById("hero-grid");
      if (bg) bg.style.transform = `translateY(${sy * 0.35}px)`;
      if (grid) grid.style.transform = `translateY(${sy * 0.18}px)`;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      {/* Parallax layer 1 — radial gold glows */}
      <div
        id="hero-bg"
        style={{
          position: "absolute",
          inset: "-15%",
          zIndex: 0,
          background: `
            radial-gradient(ellipse 60% 50% at 70% 40%, rgba(201,169,110,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 40% 60% at 20% 70%, rgba(201,169,110,0.04) 0%, transparent 60%),
            var(--bg)
          `,
          willChange: "transform",
        }}
      />

      {/* Parallax layer 2 — subtle grid */}
      <div
        id="hero-grid"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          backgroundImage: `
            linear-gradient(rgba(201,169,110,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,110,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          willChange: "transform",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: "900px" }}>
        {/* Eyebrow — fade up delay 0 */}
        <span
          style={{
            fontSize: "0.68rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: "2rem",
            display: "block",
            opacity: 0,
            animation: "heroFadeUp 1s 0.3s cubic-bezier(0.25,0.46,0.45,0.94) forwards",
          }}
        >
          Award-winning photography studio
        </span>

        {/* Headline — fade up delay 1 */}
        <h1
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(3.5rem, 9vw, 8rem)",
            fontWeight: 300,
            lineHeight: 1.0,
            letterSpacing: "-0.01em",
            marginBottom: "1rem",
            opacity: 0,
            animation: "heroFadeUp 1s 0.6s cubic-bezier(0.25,0.46,0.45,0.94) forwards",
          }}
        >
          Light.
          <br />
          <em style={{ fontStyle: "italic", color: "var(--gold2)" }}>Emotion.</em>
          <br />
          Memory.
        </h1>

        {/* Typewriter — fade up delay 2 */}
        <div
          style={{
            opacity: 0,
            animation: "heroFadeUp 1s 0.9s cubic-bezier(0.25,0.46,0.45,0.94) forwards",
          }}
        >
          <Typewriter />
        </div>

        {/* CTAs — fade up delay 3 */}
        <div
          style={{
            display: "flex",
            gap: "1.25rem",
            justifyContent: "center",
            flexWrap: "wrap",
            opacity: 0,
            animation: "heroFadeUp 1s 1.2s cubic-bezier(0.25,0.46,0.45,0.94) forwards",
          }}
        >
          <a href="#gallery" className="btn-gold">Explore Portfolio</a>
          <a href="#contact" className="btn-outline">Book a Session</a>
        </div>
      </div>

      {/* Scroll indicator — fade up delay 4 */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          color: "var(--muted)",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          opacity: 0,
          animation: "heroFadeUp 1s 1.8s cubic-bezier(0.25,0.46,0.45,0.94) forwards",
        }}
      >
        <div
          style={{
            width: "1px",
            height: "50px",
            background: "var(--border-gold)",
            animation: "scrollPulse 2s ease-in-out infinite",
          }}
        />
        <span>Scroll</span>
      </div>

      {/* Hero-specific keyframes */}
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollPulse {
          0%, 100% { transform: scaleY(1);   opacity: 0.4; }
          50%       { transform: scaleY(0.5); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
