"use client";

import { useEffect } from "react";

export default function Quote() {
  // Parallax — bg drifts at 0.3x scroll speed relative to section top
  useEffect(() => {
    function onScroll() {
      const bg = document.getElementById("quote-bg");
      if (!bg) return;
      const section = bg.closest("[data-parallax]") as HTMLElement;
      if (!section) return;
      const top = section.getBoundingClientRect().top + window.scrollY;
      const offset = (window.scrollY - top) * 0.3;
      bg.style.transform = `translateY(${offset}px)`;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      data-parallax
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        padding: "6rem 3.5rem",
      }}
    >
      {/* Parallax bg layer */}
      <div
        id="quote-bg"
        style={{
          position: "absolute",
          inset: "-20%",
          background: `
            radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,169,110,0.08) 0%, transparent 70%),
            var(--bg2)
          `,
          willChange: "transform",
        }}
      />

      {/* Content */}
      <div
        className="reveal"
        style={{ position: "relative", zIndex: 2, maxWidth: "800px" }}
      >
        {/* Vertical gold line above quote */}
        <div
          style={{
            width: "1px",
            height: "60px",
            background: "var(--gold)",
            margin: "0 auto 2rem",
          }}
        />

        <blockquote
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
            fontWeight: 300,
            fontStyle: "italic",
            lineHeight: 1.4,
            color: "var(--cream)",
          }}
        >
          "Photography is the story I fail to put into words — but every frame
          speaks volumes."
        </blockquote>

        <cite
          style={{
            display: "block",
            marginTop: "2rem",
            fontSize: "0.7rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--gold)",
            fontStyle: "normal",
          }}
        >
          — Tim's Graphy Philosophy
        </cite>
      </div>
    </div>
  );
}
