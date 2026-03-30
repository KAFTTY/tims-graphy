"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IMAGES } from "@/lib/images";

type Category = "All" | "Weddings" | "Portraits" | "Commercial" | "Editorial";
const FILTERS: Category[] = ["All", "Weddings", "Portraits", "Commercial", "Editorial"];

interface PortfolioItem {
  id: number;
  label: string;
  category: Category;
  size: "tall" | "wide" | "square";
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: 1,  label: "Adanna & Emeka",    category: "Weddings",   size: "tall"   },
  { id: 2,  label: "Zara — Studio",     category: "Portraits",  size: "square" },
  { id: 3,  label: "Luxury Brand",      category: "Commercial", size: "wide"   },
  { id: 4,  label: "Lagos Fashion Week",category: "Editorial",  size: "square" },
  { id: 5,  label: "Chioma & David",    category: "Weddings",   size: "wide"   },
  { id: 6,  label: "Kofi — Corporate",  category: "Portraits",  size: "tall"   },
  { id: 7,  label: "Product Launch",    category: "Commercial", size: "square" },
  { id: 8,  label: "Tolu & Emeka",      category: "Weddings",   size: "square" },
  { id: 9,  label: "Amara — Branding",  category: "Portraits",  size: "wide"   },
  { id: 10, label: "Art Direction",     category: "Editorial",  size: "tall"   },
  { id: 11, label: "Jewellery Campaign",category: "Commercial", size: "square" },
  { id: 12, label: "Nkechi & Chidi",    category: "Weddings",   size: "tall"   },
  { id: 13, label: "Vogue Feature",     category: "Editorial",  size: "wide"   },
  { id: 14, label: "Sade — Headshot",   category: "Portraits",  size: "square" },
  { id: 15, label: "Skincare Brand",    category: "Commercial", size: "tall"   },
  { id: 16, label: "Femi & Bola",       category: "Weddings",   size: "square" },
];

function PortfolioCard({ item, imgIndex }: { item: PortfolioItem; imgIndex: number }) {
  const imgRef     = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const infoRef    = useRef<HTMLDivElement>(null);
  const img        = IMAGES.portfolio[imgIndex % IMAGES.portfolio.length];

  const heightMap = { tall: "420px", wide: "240px", square: "320px" };

  return (
    <div
      className="gallery-item reveal"
      style={{ position: "relative", overflow: "hidden", height: heightMap[item.size], borderRadius: "2px" }}
      onMouseEnter={() => {
        if (imgRef.current)     imgRef.current.style.transform   = "scale(1.06)";
        if (overlayRef.current) overlayRef.current.style.opacity = "1";
        if (infoRef.current)    infoRef.current.style.transform  = "translateY(0)";
      }}
      onMouseLeave={() => {
        if (imgRef.current)     imgRef.current.style.transform   = "scale(1)";
        if (overlayRef.current) overlayRef.current.style.opacity = "0";
        if (infoRef.current)    infoRef.current.style.transform  = "translateY(8px)";
      }}
    >
      {/* Image */}
      <div ref={imgRef} style={{ width: "100%", height: "100%", position: "relative", transition: "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)" }}>
        <Image src={img.src} alt={img.alt} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" style={{ objectFit: "cover", objectPosition: "center" }} />
      </div>

      {/* Overlay */}
      <div ref={overlayRef} style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(10,8,6,0.9) 0%, rgba(10,8,6,0.2) 60%, transparent 100%)",
        opacity: 0, transition: "opacity 0.4s",
      }} />

      {/* Info */}
      <div ref={infoRef} style={{
        position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem",
        transform: "translateY(8px)", transition: "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
        pointerEvents: "none",
      }}>
        <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.35rem" }}>{item.category}</div>
        <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.15rem", fontWeight: 400, color: "var(--cream)" }}>{item.label}</div>
      </div>

      {/* Corner accent */}
      <div style={{ position: "absolute", top: "1rem", right: "1rem", width: "20px", height: "20px", borderTop: "1px solid var(--gold)", borderRight: "1px solid var(--gold)", opacity: 0.4 }} />
    </div>
  );
}

export default function PortfolioGrid() {
  const [active, setActive] = useState<Category>("All");

  const filtered = active === "All"
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((i) => i.category === active);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    els.forEach((el) => el.classList.remove("visible"));
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); } }); },
      { threshold: 0.06 }
    );
    setTimeout(() => els.forEach((el) => observer.observe(el)), 50);
    return () => observer.disconnect();
  }, [active]);

  return (
    <div>
      {/* Filter pills */}
      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "4rem" }}>
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setActive(f)} style={{
            background: active === f ? "var(--gold)" : "transparent",
            border: "1px solid", borderColor: active === f ? "var(--gold)" : "var(--border-gold)",
            color: active === f ? "var(--bg)" : "var(--muted)",
            padding: "0.5rem 1.4rem", fontSize: "0.7rem", letterSpacing: "0.18em",
            textTransform: "uppercase", fontFamily: "var(--font-outfit), sans-serif",
            transition: "all 0.25s",
          }}>{f}</button>
        ))}
      </div>

      {/* Masonry via CSS columns */}
      <div className="portfolio-masonry" style={{ columns: "3 280px", columnGap: "8px", padding: "0 3.5rem 6rem" }}>
        {filtered.map((item, i) => (
          <div key={item.id} style={{ breakInside: "avoid", marginBottom: "8px" }}>
            <PortfolioCard item={item} imgIndex={i} />
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) { .portfolio-masonry { columns: 2 240px !important; padding: 0 2rem 4rem !important; } }
        @media (max-width: 640px)  { .portfolio-masonry { columns: 1 !important; padding: 0 1.25rem 3rem !important; } }
      `}</style>
    </div>
  );
}
