"use client";

import { useEffect, useRef } from "react";
import { TESTIMONIALS } from "@/lib/constants";

function TestimonialCard({
  quote,
  author,
  event,
  delay,
}: {
  quote: string;
  author: string;
  event: string;
  delay: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  function onEnter() {
    if (cardRef.current)
      cardRef.current.style.borderColor = "rgba(201,169,110,0.45)";
  }
  function onLeave() {
    if (cardRef.current)
      cardRef.current.style.borderColor = "var(--border-gold)";
  }

  return (
    <div
      ref={cardRef}
      className="reveal"
      style={{
        padding: "2.5rem",
        border: "1px solid var(--border-gold)",
        position: "relative",
        transition: "border-color 0.3s",
        transitionDelay: delay,
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Opening mark */}
      <span
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "5rem",
          fontWeight: 300,
          color: "var(--gold)",
          lineHeight: 0.8,
          marginBottom: "1rem",
          display: "block",
        }}
      >
        "
      </span>

      <p
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "1.1rem",
          fontStyle: "italic",
          fontWeight: 300,
          lineHeight: 1.7,
          color: "var(--cream)",
          marginBottom: "1.75rem",
        }}
      >
        {quote}
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "var(--gold)",
            flexShrink: 0,
          }}
        />
        <div>
          <div
            style={{
              fontSize: "0.78rem",
              fontWeight: 500,
              letterSpacing: "0.08em",
              color: "var(--cream)",
            }}
          >
            {author}
          </div>
          <div
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.1em",
              color: "var(--muted)",
              marginTop: "0.1rem",
            }}
          >
            {event}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
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
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      style={{ padding: "7rem 3.5rem", background: "var(--bg2)" }}
    >
      <span className="section-label reveal">Kind Words</span>
      <h2
        className="section-title reveal"
        style={{ marginBottom: "4rem", transitionDelay: "0.1s" }}
      >
        What our <em>clients say</em>
      </h2>

      <div
        className="test-grid-wrap"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem",
        }}
      >
        {TESTIMONIALS.map((t, i) => (
          <TestimonialCard
            key={t.author}
            {...t}
            delay={`${i * 0.1}s`}
          />
        ))}
      </div>
    </section>
  );
}
