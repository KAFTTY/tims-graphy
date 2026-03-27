"use client";

import { useEffect, useRef } from "react";
import { SERVICES } from "@/lib/constants";

function ServiceCard({
  num,
  title,
  description,
  price,
  delay,
}: {
  num: string;
  title: string;
  description: string;
  price: string;
  delay: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  function onEnter() {
    const el = cardRef.current;
    if (!el) return;
    el.style.background = "var(--bg3)";
    const line = el.querySelector<HTMLDivElement>(".card-top-line");
    if (line) line.style.transform = "scaleX(1)";
  }

  function onLeave() {
    const el = cardRef.current;
    if (!el) return;
    el.style.background = "var(--bg2)";
    const line = el.querySelector<HTMLDivElement>(".card-top-line");
    if (line) line.style.transform = "scaleX(0)";
  }

  return (
    <div
      ref={cardRef}
      className="reveal"
      style={{
        padding: "3rem 2.5rem",
        background: "var(--bg2)",
        borderRight: "1px solid var(--border-gold)",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.4s",
        transitionDelay: delay,
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Gold top-line — slides in from left on hover */}
      <div
        className="card-top-line"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "var(--gold)",
          transform: "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      />

      {/* Large ghost number */}
      <div
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "3.5rem",
          fontWeight: 300,
          color: "var(--faint)",
          lineHeight: 1,
          marginBottom: "1.5rem",
        }}
      >
        {num}
      </div>

      <h3
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "1.6rem",
          fontWeight: 400,
          color: "var(--cream)",
          marginBottom: "1rem",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: "0.88rem",
          lineHeight: 1.8,
          color: "var(--muted)",
          marginBottom: "1.75rem",
        }}
      >
        {description}
      </p>

      <div
        style={{
          fontSize: "0.7rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--gold)",
        }}
      >
        {price}
      </div>
    </div>
  );
}

export default function Services() {
  // Scroll reveal
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
      id="services"
      style={{ padding: "7rem 3.5rem", background: "var(--bg2)" }}
    >
      <span className="section-label reveal">What We Do</span>
      <h2
        className="section-title reveal"
        style={{ marginBottom: "4rem", transitionDelay: "0.1s" }}
      >
        Crafted for your
        <br />
        <em>most important moments</em>
      </h2>

      {/* Grid bordered like original — 1px gold border wrapping all three */}
      <div
        className="services-grid-wrap"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          border: "1px solid var(--border-gold)",
        }}
      >
        {SERVICES.map((s, i) => (
          <ServiceCard
            key={s.num}
            {...s}
            delay={`${i * 0.1}s`}
          />
        ))}
      </div>
    </section>
  );
}
