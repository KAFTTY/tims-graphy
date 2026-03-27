"use client";

import { useEffect, useRef } from "react";
import { GALLERY_ITEMS } from "@/lib/constants";

// Placeholder colours matching the original warm dark tones
const FILLS = [
  "#2a1f14", "#1f1a14", "#241c10", "#1a1510",
  "#1e1812", "#251e12", "#1c1710", "#211b0f",
];

// SVG placeholder shapes per slot so the grid looks intentional
const SVGS = [
  <svg key={0} width="80" height="80" viewBox="0 0 80 80" fill="none" opacity="0.15"><circle cx="40" cy="32" r="18" stroke="#c9a96e" strokeWidth="1"/><ellipse cx="40" cy="65" rx="28" ry="16" stroke="#c9a96e" strokeWidth="1"/></svg>,
  <svg key={1} width="60" height="60" viewBox="0 0 60 60" fill="none" opacity="0.15"><rect x="10" y="8" width="40" height="44" rx="2" stroke="#c9a96e" strokeWidth="1"/><circle cx="30" cy="28" r="10" stroke="#c9a96e" strokeWidth="1"/></svg>,
  <svg key={2} width="60" height="60" viewBox="0 0 60 60" fill="none" opacity="0.15"><path d="M5 42 L20 20 L35 32 L45 18 L58 42Z" stroke="#c9a96e" strokeWidth="1" fill="none"/></svg>,
  <svg key={3} width="60" height="60" viewBox="0 0 60 60" fill="none" opacity="0.15"><circle cx="30" cy="30" r="22" stroke="#c9a96e" strokeWidth="1"/><circle cx="30" cy="30" r="10" stroke="#c9a96e" strokeWidth="1"/></svg>,
  <svg key={4} width="60" height="60" viewBox="0 0 60 60" fill="none" opacity="0.15"><rect x="8" y="8" width="20" height="28" stroke="#c9a96e" strokeWidth="1"/><rect x="32" y="16" width="20" height="20" stroke="#c9a96e" strokeWidth="1"/></svg>,
  <svg key={5} width="60" height="60" viewBox="0 0 60 60" fill="none" opacity="0.15"><path d="M10 50 Q30 10 50 50" stroke="#c9a96e" strokeWidth="1" fill="none"/><circle cx="30" cy="28" r="6" stroke="#c9a96e" strokeWidth="1"/></svg>,
  <svg key={6} width="60" height="60" viewBox="0 0 60 60" fill="none" opacity="0.15"><circle cx="30" cy="22" r="12" stroke="#c9a96e" strokeWidth="1"/><rect x="14" y="38" width="32" height="18" rx="1" stroke="#c9a96e" strokeWidth="1"/></svg>,
  <svg key={7} width="60" height="60" viewBox="0 0 60 60" fill="none" opacity="0.15"><polygon points="30,6 54,48 6,48" stroke="#c9a96e" strokeWidth="1" fill="none"/></svg>,
];

function GalleryItem({
  label,
  index,
  gridColumn,
  gridRow,
}: {
  label: string;
  index: number;
  gridColumn: string;
  gridRow: string;
}) {
  const fillRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  function onEnter() {
    if (fillRef.current) fillRef.current.style.transform = "scale(1.07)";
    if (overlayRef.current) overlayRef.current.style.opacity = "1";
  }
  function onLeave() {
    if (fillRef.current) fillRef.current.style.transform = "scale(1)";
    if (overlayRef.current) overlayRef.current.style.opacity = "0";
  }

  return (
    <div
      className="gallery-item reveal"
      style={{
        gridColumn,
        gridRow,
        overflow: "hidden",
        position: "relative",
        background: FILLS[index],
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Zoomable fill */}
      <div
        ref={fillRef}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      >
        {SVGS[index]}
      </div>

      {/* Caption overlay — fades in on hover */}
      <div
        ref={overlayRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(10,8,6,0.85) 0%, transparent 55%)",
          opacity: 0,
          transition: "opacity 0.4s",
          display: "flex",
          alignItems: "flex-end",
          padding: "1.5rem",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--gold2)",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

// Grid positions matching the original 12-column masonry layout
const GRID_POSITIONS = [
  { gridColumn: "1 / 6",  gridRow: "1 / 3" }, // tall
  { gridColumn: "6 / 9",  gridRow: "1 / 2" },
  { gridColumn: "9 / 13", gridRow: "1 / 2" },
  { gridColumn: "6 / 10", gridRow: "2 / 3" },
  { gridColumn: "10 / 13",gridRow: "2 / 3" },
  { gridColumn: "1 / 5",  gridRow: "3 / 4" },
  { gridColumn: "5 / 9",  gridRow: "3 / 4" },
  { gridColumn: "9 / 13", gridRow: "3 / 4" },
];

export default function Gallery() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="gallery"
      style={{ background: "var(--bg)", padding: "7rem 3.5rem 0" }}
    >
      {/* Intro */}
      <div style={{ maxWidth: "520px", marginBottom: "4rem" }}>
        <span className="section-label reveal">Portfolio</span>
        <h2
          className="section-title reveal"
          style={{ transitionDelay: "0.1s" }}
        >
          Selected <em>Works</em>
        </h2>
        <p
          className="reveal"
          style={{
            fontSize: "0.95rem",
            lineHeight: 1.9,
            color: "var(--muted)",
            marginTop: "1.5rem",
            transitionDelay: "0.2s",
          }}
        >
          A curated collection of moments captured across Lagos and beyond.
          Each frame tells a story worth keeping.
        </p>
      </div>

      {/* Masonry grid */}
      <div
        className="gallery-masonry-wrap"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "repeat(3, 220px)",
          gap: "6px",
        }}
      >
        {GALLERY_ITEMS.map((item, i) => (
          <GalleryItem
            key={item.label}
            label={item.label}
            index={i}
            gridColumn={GRID_POSITIONS[i].gridColumn}
            gridRow={GRID_POSITIONS[i].gridRow}
          />
        ))}
      </div>
    </section>
  );
}
