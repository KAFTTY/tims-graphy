"use client";

import { useEffect } from "react";
import { STATS } from "@/lib/constants";

export default function About() {
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
      id="about"
      style={{ padding: "7rem 3.5rem", background: "var(--bg)" }}
    >
      <span className="section-label reveal">Our Story</span>

      <div
        className="about-grid-wrap"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6rem",
          alignItems: "center",
          marginTop: "4rem",
        }}
      >
        {/* Left — portrait placeholder */}
        <div className="reveal" style={{ position: "relative" }}>
          {/* Main image box */}
          <div
            style={{
              width: "100%",
              paddingTop: "130%",
              background: "var(--bg3)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Placeholder silhouette */}
              <svg
                width="100"
                height="140"
                viewBox="0 0 100 140"
                fill="none"
                opacity="0.2"
              >
                <circle
                  cx="50"
                  cy="45"
                  r="30"
                  stroke="#c9a96e"
                  strokeWidth="1"
                />
                <ellipse
                  cx="50"
                  cy="110"
                  rx="40"
                  ry="22"
                  stroke="#c9a96e"
                  strokeWidth="1"
                />
              </svg>
            </div>
          </div>

          {/* Decorative offset border */}
          <div
            style={{
              position: "absolute",
              bottom: "-1.5rem",
              right: "-1.5rem",
              width: "120px",
              height: "120px",
              border: "1px solid var(--border-gold)",
              zIndex: -1,
            }}
          />
        </div>

        {/* Right — text */}
        <div>
          <h2
            className="section-title reveal"
            style={{ marginBottom: "1.5rem" }}
          >
            Chasing light
            <br />
            <em>since 2016</em>
          </h2>

          <p
            className="reveal"
            style={{
              fontSize: "0.98rem",
              lineHeight: 1.95,
              color: "var(--muted)",
              marginBottom: "1.25rem",
              transitionDelay: "0.1s",
            }}
          >
            We are a Lagos-based photography studio obsessed with the quiet
            power of a single frame. Founded on the belief that every face,
            every moment, every brand deserves to be seen beautifully.
          </p>

          <p
            className="reveal"
            style={{
              fontSize: "0.98rem",
              lineHeight: 1.95,
              color: "var(--muted)",
              marginBottom: "1.25rem",
              transitionDelay: "0.2s",
            }}
          >
            From intimate wedding ceremonies in Lekki to high-stakes commercial
            campaigns for global brands — our approach is always the same:
            patient, intentional, and deeply human.
          </p>

          {/* Stats grid — bordered like original */}
          <div
            className="reveal"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              marginTop: "2.5rem",
              borderTop: "1px solid var(--border-gold)",
              borderLeft: "1px solid var(--border-gold)",
              transitionDelay: "0.35s",
            }}
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                style={{
                  padding: "1.5rem 1.25rem",
                  borderRight: "1px solid var(--border-gold)",
                  borderBottom: "1px solid var(--border-gold)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "2.5rem",
                    fontWeight: 300,
                    color: "var(--gold2)",
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontSize: "0.68rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginTop: "0.3rem",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
