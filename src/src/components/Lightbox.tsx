"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";

interface LightboxProps {
  images: { src: string; alt: string; category?: string }[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({ images, currentIndex, onClose, onNext, onPrev }: LightboxProps) {
  const current = images[currentIndex];

  // Keyboard navigation
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape")     onClose();
    if (e.key === "ArrowRight") onNext();
    if (e.key === "ArrowLeft")  onPrev();
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        background: "rgba(5,4,3,0.97)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "lbFadeIn 0.25s ease",
      }}
    >
      <style>{`
        @keyframes lbFadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes lbImgIn { from { opacity:0; transform:scale(0.96); } to { opacity:1; transform:scale(1); } }
      `}</style>

      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: "1.5rem", right: "1.75rem",
          background: "transparent", border: "1px solid rgba(201,169,110,0.3)",
          color: "var(--gold)", width: "42px", height: "42px",
          borderRadius: "50%", fontSize: "1.1rem",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 2, transition: "border-color 0.2s, background 0.2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(201,169,110,0.15)"; e.currentTarget.style.borderColor = "var(--gold)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(201,169,110,0.3)"; }}
      >
        ✕
      </button>

      {/* Counter */}
      <div style={{
        position: "absolute", top: "1.75rem", left: "50%", transform: "translateX(-50%)",
        fontSize: "0.65rem", letterSpacing: "0.25em", color: "var(--muted)",
        textTransform: "uppercase", zIndex: 2,
      }}>
        {currentIndex + 1} / {images.length}
      </div>

      {/* Prev button */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        style={{
          position: "absolute", left: "1.5rem", top: "50%", transform: "translateY(-50%)",
          background: "transparent", border: "1px solid rgba(201,169,110,0.25)",
          color: "var(--gold2)", width: "48px", height: "48px",
          borderRadius: "50%", fontSize: "1.2rem",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 2, transition: "border-color 0.2s, background 0.2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(201,169,110,0.12)"; e.currentTarget.style.borderColor = "var(--gold)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(201,169,110,0.25)"; }}
      >
        ‹
      </button>

      {/* Next button */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        style={{
          position: "absolute", right: "1.5rem", top: "50%", transform: "translateY(-50%)",
          background: "transparent", border: "1px solid rgba(201,169,110,0.25)",
          color: "var(--gold2)", width: "48px", height: "48px",
          borderRadius: "50%", fontSize: "1.2rem",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 2, transition: "border-color 0.2s, background 0.2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(201,169,110,0.12)"; e.currentTarget.style.borderColor = "var(--gold)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(201,169,110,0.25)"; }}
      >
        ›
      </button>

      {/* Image */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "min(90vw, 1100px)",
          height: "min(82vh, 760px)",
          animation: "lbImgIn 0.3s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      >
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          priority
          sizes="90vw"
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Caption */}
      <div style={{
        position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
        textAlign: "center", zIndex: 2,
        display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem",
      }}>
        {current.category && (
          <span style={{ fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--gold)" }}>
            {current.category}
          </span>
        )}
        <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.1rem", fontStyle: "italic", fontWeight: 300, color: "var(--cream)" }}>
          {current.alt}
        </span>
      </div>

      {/* Thumbnail strip */}
      <div style={{
        position: "absolute", bottom: "5.5rem", left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: "6px", zIndex: 2,
        maxWidth: "min(90vw, 700px)", overflowX: "auto", padding: "4px",
      }}>
        {images.map((img, i) => (
          <div
            key={i}
            onClick={(e) => { e.stopPropagation(); /* navigate to index handled via parent */ }}
            style={{
              width: "52px", height: "38px", flexShrink: 0,
              position: "relative", overflow: "hidden",
              border: i === currentIndex ? "2px solid var(--gold)" : "2px solid transparent",
              opacity: i === currentIndex ? 1 : 0.45,
              transition: "opacity 0.2s, border-color 0.2s",
              cursor: "pointer",
            }}
          >
            <Image src={img.src} alt={img.alt} fill sizes="52px" style={{ objectFit: "cover" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
