"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { IMAGES } from "@/lib/images";
import { GALLERY_ITEMS } from "@/lib/constants";

const GRID_POSITIONS = [
  { gridColumn: "1 / 6",  gridRow: "1 / 3" },
  { gridColumn: "6 / 9",  gridRow: "1 / 2" },
  { gridColumn: "9 / 13", gridRow: "1 / 2" },
  { gridColumn: "6 / 10", gridRow: "2 / 3" },
  { gridColumn: "10 / 13",gridRow: "2 / 3" },
  { gridColumn: "1 / 5",  gridRow: "3 / 4" },
  { gridColumn: "5 / 9",  gridRow: "3 / 4" },
  { gridColumn: "9 / 13", gridRow: "3 / 4" },
];

function GalleryItem({ label, index, gridColumn, gridRow }: {
  label: string; index: number; gridColumn: string; gridRow: string;
}) {
  const imgRef     = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const img        = IMAGES.gallery[index];

  function onEnter() {
    if (imgRef.current)     imgRef.current.style.transform     = "scale(1.07)";
    if (overlayRef.current) overlayRef.current.style.opacity   = "1";
  }
  function onLeave() {
    if (imgRef.current)     imgRef.current.style.transform     = "scale(1)";
    if (overlayRef.current) overlayRef.current.style.opacity   = "0";
  }

  return (
    <div
      className="gallery-item reveal"
      style={{ gridColumn, gridRow, overflow: "hidden", position: "relative", background: "#1a1510" }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Zoomable image */}
      <div ref={imgRef} style={{ width: "100%", height: "100%", transition: "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)", position: "relative" }}>
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          style={{ objectFit: "cover", objectPosition: "50% 20%" }}
        />
      </div>

      {/* Caption overlay */}
      <div ref={overlayRef} style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(10,8,6,0.85) 0%, transparent 55%)",
        opacity: 0, transition: "opacity 0.4s",
        display: "flex", alignItems: "flex-end", padding: "1.5rem",
        pointerEvents: "none",
      }}>
        <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold2)" }}>
          {label}
        </span>
      </div>
    </div>
  );
}

export default function Gallery() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); } }); },
      { threshold: 0.08 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="gallery" style={{ background: "var(--bg)", padding: "7rem 3.5rem 0" }}>
      <div style={{ maxWidth: "520px", marginBottom: "4rem" }}>
        <span className="section-label reveal">Portfolio</span>
        <h2 className="section-title reveal" style={{ transitionDelay: "0.1s" }}>
          Selected <em>Works</em>
        </h2>
        <p className="reveal" style={{ fontSize: "0.95rem", lineHeight: 1.9, color: "var(--muted)", marginTop: "1.5rem", transitionDelay: "0.2s" }}>
          A curated collection of moments captured across Lagos and beyond. Each frame tells a story worth keeping.
        </p>
      </div>

      <div className="gallery-masonry-wrap" style={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gridTemplateRows: "repeat(3, 220px)",
        gap: "6px",
      }}>
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
