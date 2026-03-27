"use client";

import { useEffect, useRef, useState } from "react";

type Category = "All" | "Weddings" | "Portraits" | "Commercial" | "Editorial";

const FILTERS: Category[] = ["All", "Weddings", "Portraits", "Commercial", "Editorial"];

interface PortfolioItem {
  id: number;
  label: string;
  category: Category;
  // Aspect ratio class: tall | wide | square
  size: "tall" | "wide" | "square";
  fill: string;
  svgPath: string;
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: 1,  label: "Adanna & Emeka",       category: "Weddings",   size: "tall",   fill: "#2a1f14", svgPath: "M20 70 Q40 10 60 70 Q50 50 40 55 Q30 50 20 70Z" },
  { id: 2,  label: "Zara — Studio",         category: "Portraits",  size: "square", fill: "#1f1a14", svgPath: "M20 20 Q40 5 60 20 Q70 40 60 60 Q40 75 20 60 Q10 40 20 20Z" },
  { id: 3,  label: "Luxury Brand",          category: "Commercial", size: "wide",   fill: "#241c10", svgPath: "M10 40 L30 15 L50 30 L70 10 L90 40 L70 60 L50 50 L30 65Z" },
  { id: 4,  label: "Lagos Fashion Week",    category: "Editorial",  size: "square", fill: "#1a1510", svgPath: "M40 10 L70 30 L70 70 L40 90 L10 70 L10 30Z" },
  { id: 5,  label: "Chioma & David",        category: "Weddings",   size: "wide",   fill: "#251e12", svgPath: "M15 50 Q30 20 50 35 Q70 20 85 50 Q70 75 50 65 Q30 75 15 50Z" },
  { id: 6,  label: "Kofi — Corporate",      category: "Portraits",  size: "tall",   fill: "#1e1812", svgPath: "M35 10 Q60 10 65 35 Q70 55 55 70 Q40 80 25 70 Q10 55 15 35 Q20 10 35 10Z" },
  { id: 7,  label: "Product Launch",        category: "Commercial", size: "square", fill: "#1c1710", svgPath: "M20 20 L80 20 L80 55 L60 70 L40 70 L20 55Z" },
  { id: 8,  label: "Tolu & Emeka",          category: "Weddings",   size: "square", fill: "#211b0f", svgPath: "M50 10 C80 10 90 40 80 60 C70 80 30 80 20 60 C10 40 20 10 50 10Z" },
  { id: 9,  label: "Amara — Branding",      category: "Portraits",  size: "wide",   fill: "#241c10", svgPath: "M10 35 Q40 10 70 35 Q90 55 70 75 Q40 90 10 75 Q-5 55 10 35Z" },
  { id: 10, label: "Art Direction",         category: "Editorial",  size: "tall",   fill: "#2a1f14", svgPath: "M50 5 L95 25 L80 75 L50 95 L20 75 L5 25Z" },
  { id: 11, label: "Jewellery Campaign",    category: "Commercial", size: "square", fill: "#1f1a14", svgPath: "M25 50 L50 10 L75 50 L50 90Z" },
  { id: 12, label: "Nkechi & Chidi",        category: "Weddings",   size: "tall",   fill: "#1a1510", svgPath: "M30 20 Q55 5 70 25 Q85 50 70 75 Q55 95 30 80 Q10 65 15 40 Q20 15 30 20Z" },
  { id: 13, label: "Vogue Feature",         category: "Editorial",  size: "wide",   fill: "#1e1812", svgPath: "M15 45 Q35 15 55 30 Q75 15 85 45 Q85 70 55 80 Q35 80 15 45Z" },
  { id: 14, label: "Sade — Headshot",       category: "Portraits",  size: "square", fill: "#251e12", svgPath: "M50 15 A35 35 0 1 1 49.9 15Z" },
  { id: 15, label: "Skincare Brand",        category: "Commercial", size: "tall",   fill: "#211b0f", svgPath: "M20 80 L35 20 L50 50 L65 20 L80 80Z" },
  { id: 16, label: "Femi & Bola",           category: "Weddings",   size: "square", fill: "#241c10", svgPath: "M50 10 L90 35 L90 65 L50 90 L10 65 L10 35Z" },
];

function PortfolioCard({ item }: { item: PortfolioItem }) {
  const fillRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  function onEnter() {
    if (fillRef.current) fillRef.current.style.transform = "scale(1.06)";
    if (overlayRef.current) overlayRef.current.style.opacity = "1";
    if (infoRef.current) infoRef.current.style.transform = "translateY(0)";
  }
  function onLeave() {
    if (fillRef.current) fillRef.current.style.transform = "scale(1)";
    if (overlayRef.current) overlayRef.current.style.opacity = "0";
    if (infoRef.current) infoRef.current.style.transform = "translateY(8px)";
  }

  const heightMap = { tall: "420px", wide: "240px", square: "320px" };

  return (
    <div
      className="gallery-item reveal"
      style={{
        position: "relative",
        overflow: "hidden",
        background: item.fill,
        height: heightMap[item.size],
        borderRadius: "2px",
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
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" opacity="0.18">
          <path d={item.svgPath} stroke="#c9a96e" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* Overlay gradient */}
      <div
        ref={overlayRef}
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(10,8,6,0.9) 0%, rgba(10,8,6,0.2) 60%, transparent 100%)",
          opacity: 0,
          transition: "opacity 0.4s",
        }}
      />

      {/* Info — slides up on hover */}
      <div
        ref={infoRef}
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "1.5rem",
          transform: "translateY(8px)",
          transition: "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
          pointerEvents: "none",
        }}
      >
        <div style={{
          fontSize: "0.65rem", letterSpacing: "0.2em",
          textTransform: "uppercase", color: "var(--gold)",
          marginBottom: "0.35rem",
        }}>
          {item.category}
        </div>
        <div style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "1.15rem", fontWeight: 400,
          color: "var(--cream)", letterSpacing: "0.03em",
        }}>
          {item.label}
        </div>
      </div>

      {/* Corner gold accent */}
      <div style={{
        position: "absolute", top: "1rem", right: "1rem",
        width: "20px", height: "20px",
        borderTop: "1px solid var(--gold)", borderRight: "1px solid var(--gold)",
        opacity: 0.4,
      }} />
    </div>
  );
}

export default function PortfolioGrid() {
  const [active, setActive] = useState<Category>("All");
  const filtered = active === "All"
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((i) => i.category === active);

  // Re-run scroll reveal after filter change
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    // Reset then re-observe
    els.forEach((el) => el.classList.remove("visible"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.06 }
    );
    setTimeout(() => els.forEach((el) => observer.observe(el)), 50);
    return () => observer.disconnect();
  }, [active]);

  return (
    <div>
      {/* Filter pills */}
      <div style={{
        display: "flex", gap: "0.75rem", justifyContent: "center",
        flexWrap: "wrap", marginBottom: "4rem",
      }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            style={{
              background: active === f ? "var(--gold)" : "transparent",
              border: "1px solid",
              borderColor: active === f ? "var(--gold)" : "var(--border-gold)",
              color: active === f ? "var(--bg)" : "var(--muted)",
              padding: "0.5rem 1.4rem",
              fontSize: "0.7rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontFamily: "var(--font-outfit), sans-serif",
              transition: "all 0.25s",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div
        style={{
          columns: "3 280px",
          columnGap: "8px",
          padding: "0 3.5rem 6rem",
        }}
        className="portfolio-masonry"
      >
        {filtered.map((item) => (
          <div
            key={item.id}
            style={{ breakInside: "avoid", marginBottom: "8px" }}
          >
            <PortfolioCard item={item} />
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .portfolio-masonry { columns: 2 240px !important; padding: 0 2rem 4rem !important; }
        }
        @media (max-width: 640px) {
          .portfolio-masonry { columns: 1 !important; padding: 0 1.25rem 3rem !important; }
        }
      `}</style>
    </div>
  );
}
