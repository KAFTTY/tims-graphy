"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";

const VALUES = [
  { title: "Intentionality", body: "I never point and shoot. Every frame is a deliberate decision — about light, angle, timing, and meaning. I bring that same thoughtfulness to every session, big or small." },
  { title: "Connection", body: "Great photography starts with trust. I take time to understand you, your vision, and what makes this moment matter — before I ever pick up my camera." },
  { title: "Craft", body: "From the quality of my lenses to the precision of my editing, I hold every detail to an uncompromising standard. Good enough has never been good enough for me." },
  { title: "Humanity", body: "Behind every brief is a person. Behind every wedding is a love story. I never lose sight of the fact that I'm documenting real, irreplaceable moments in real people's lives." },
];

const MILESTONES = [
  { year: "2018", event: "Started photography as a passion project — shooting portraits and street scenes across Ilorin." },
  { year: "2019", event: "First paid wedding commission. Shot 12 weddings in the first year alone." },
  { year: "2020", event: "Expanded into commercial and product photography. First brand campaign delivered." },
  { year: "2021", event: "Launched graduation and birthday shoot packages. Crossed 200 happy clients." },
  { year: "2022", event: "Featured in a Iolrin lifestyle publication. Studio upgraded to Victoria Island." },
  { year: "2023", event: "Crossed 500 sessions milestone. Started mentoring aspiring photographers." },
  { year: "2024", event: "Expanded into model and fashion shoots. Now serving clients across Nigeria." },
];

export default function AboutPageClient() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* ── HERO with full image ── */}
      <section style={{ position: "relative", minHeight: "85vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src={IMAGES.aboutStudio.src}
            alt="Tim — photographer at work"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
          />
          {/* Layered gradient — dark at bottom for text, subtle at top */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(10,8,6,0.95) 0%, rgba(10,8,6,0.5) 40%, rgba(10,8,6,0.85) 80%, rgba(10,8,6,1) 100%)",
          }} />
        </div>

        {/* Hero text — sits over image at the bottom */}
        <div style={{ position: "relative", zIndex: 2, padding: "0 3.5rem 5rem", maxWidth: "780px" }}>
          <span style={{
            fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase",
            color: "var(--gold)", display: "block", marginBottom: "1.25rem",
            opacity: 0, animation: "fadeUp 0.9s 0.2s forwards",
          }}>
            The Photographer
          </span>
          <h1 style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(2.8rem, 7vw, 6rem)",
            fontWeight: 300, lineHeight: 1.05, color: "var(--cream)",
            marginBottom: "1.5rem",
            opacity: 0, animation: "fadeUp 0.9s 0.4s forwards",
          }}>
            I chase <em style={{ color: "var(--gold2)", fontStyle: "italic" }}>light</em><br />for a living.
          </h1>
          <p style={{
            fontSize: "1.05rem", lineHeight: 1.9, color: "rgba(245,240,232,0.75)",
            maxWidth: "560px",
            opacity: 0, animation: "fadeUp 0.9s 0.6s forwards",
          }}>
            Hi, I'm Tim — an independent photographer based in Ilorin, Nigeria.
            I specialise in weddings, portraits, model shoots, graduations, birthdays,
            and commercial work. Every session is personal to me.
          </p>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: "absolute", bottom: "2rem", right: "3.5rem", zIndex: 2,
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
          color: "var(--muted)", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase",
          opacity: 0, animation: "fadeUp 0.9s 1s forwards",
        }}>
          <div style={{ width: "1px", height: "40px", background: "var(--border-gold)", animation: "scrollPulse 2s ease-in-out infinite" }} />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── ABOUT TIM — two column ── */}
      <section style={{ padding: "7rem 3.5rem", background: "var(--bg)" }}>
        <div className="about-hero-grid reveal" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "5rem", alignItems: "center",
        }}>
          {/* Portrait */}
          <div style={{ position: "relative" }}>
            <div style={{ width: "100%", paddingTop: "125%", position: "relative", overflow: "hidden" }}>
              <Image
                src={IMAGES.team[0].src}
                alt="Tim — portrait"
                fill
                sizes="(max-width:768px) 100vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "rgba(201,169,110,0.04)", mixBlendMode: "multiply" }} />
            </div>
            {/* Gold offset border */}
            <div style={{
              position: "absolute", bottom: "-1.5rem", right: "-1.5rem",
              width: "100px", height: "100px",
              border: "1px solid var(--border-gold)", zIndex: -1,
            }} />
            {/* Name badge */}
            <div style={{
              position: "absolute", bottom: "1.5rem", left: "-1rem",
              background: "var(--bg2)", border: "1px solid var(--border-gold)",
              padding: "0.85rem 1.5rem",
            }}>
              <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.15rem", color: "var(--gold2)", fontStyle: "italic" }}>Tim</div>
              <div style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginTop: "0.2rem" }}>Independent Photographer</div>
            </div>
          </div>

          {/* Story */}
          <div>
            <span className="section-label">My Story</span>
            <h2 className="section-title" style={{ marginBottom: "1.75rem" }}>
              Six years,<br /><em>one lens at a time.</em>
            </h2>
            <p style={{ fontSize: "0.98rem", lineHeight: 1.95, color: "var(--muted)", marginBottom: "1.25rem" }}>
              I picked up a camera in 2018 out of pure curiosity — and never put it down. What started as weekend portrait sessions in Ilorin quickly grew into a full-time passion and profession.
            </p>
            <p style={{ fontSize: "0.98rem", lineHeight: 1.95, color: "var(--muted)", marginBottom: "1.25rem" }}>
              Today I shoot weddings, birthdays, model sessions, graduations, portraits, and commercial campaigns. I work alone — which means when you book me, you get me, fully present, from first consultation to final delivery.
            </p>
            <p style={{ fontSize: "0.98rem", lineHeight: 1.95, color: "var(--muted)", marginBottom: "2rem" }}>
              Based in Ilorin, available across Nigeria and beyond.
            </p>

            {/* Stats */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
              borderTop: "1px solid var(--border-gold)", borderLeft: "1px solid var(--border-gold)",
            }}>
              {[
                { n: "6+",   l: "Years Shooting" },
                { n: "800+", l: "Sessions" },
                { n: "500+", l: "Happy Clients" },
              ].map((s) => (
                <div key={s.l} style={{ padding: "1.25rem 1rem", borderRight: "1px solid var(--border-gold)", borderBottom: "1px solid var(--border-gold)" }}>
                  <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "2.2rem", fontWeight: 300, color: "var(--gold2)", lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginTop: "0.35rem" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ padding: "6rem 3.5rem", background: "var(--bg2)" }}>
        <span className="section-label reveal">How I Work</span>
        <h2 className="section-title reveal" style={{ marginBottom: "4rem", transitionDelay: "0.1s" }}>
          What I <em>believe in</em>
        </h2>
        <div className="values-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1px", border: "1px solid var(--border-gold)",
        }}>
          {VALUES.map((v, i) => (
            <div key={v.title} className="reveal" style={{
              padding: "3rem",
              background: "var(--bg2)",
              borderRight: i % 2 === 0 ? "1px solid var(--border-gold)" : "none",
              borderBottom: i < 2 ? "1px solid var(--border-gold)" : "none",
              transitionDelay: `${i * 0.1}s`,
            }}>
              <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.6rem", fontWeight: 400, color: "var(--gold2)", marginBottom: "1rem" }}>
                {v.title}
              </h3>
              <p style={{ fontSize: "0.92rem", lineHeight: 1.85, color: "var(--muted)" }}>{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section style={{ padding: "6rem 3.5rem" }}>
        <span className="section-label reveal">The Journey</span>
        <h2 className="section-title reveal" style={{ marginBottom: "4rem", transitionDelay: "0.1s" }}>
          Six years <em>in the making</em>
        </h2>
        <div style={{ maxWidth: "620px" }}>
          {MILESTONES.map((m, i) => (
            <div key={m.year} className="reveal" style={{
              display: "grid", gridTemplateColumns: "72px 1fr",
              gap: "2rem", paddingBottom: "2rem",
              borderLeft: "1px solid var(--border-gold)",
              paddingLeft: "2rem", marginLeft: "1rem",
              position: "relative",
              transitionDelay: `${i * 0.07}s`,
            }}>
              <div style={{
                position: "absolute", left: "-5px", top: "5px",
                width: "9px", height: "9px", borderRadius: "50%",
                background: "var(--gold)", border: "2px solid var(--bg)",
              }} />
              <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.25rem", fontWeight: 300, color: "var(--gold)", lineHeight: 1.2 }}>
                {m.year}
              </span>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--muted)" }}>{m.event}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "6rem 3.5rem", background: "var(--bg2)", textAlign: "center" }}>
        <h2 style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300,
          color: "var(--cream)", marginBottom: "1rem",
        }}>
          Let's create something <em style={{ color: "var(--gold2)", fontStyle: "italic" }}>together</em>
        </h2>
        <p style={{ color: "var(--muted)", marginBottom: "2.5rem", fontSize: "0.95rem" }}>
          Whether it's your wedding day, your grad shoot, or your next brand campaign — I'd love to hear from you.
        </p>
        <Link href="/contact" className="btn-gold">Book a Session</Link>
      </section>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes scrollPulse { 0%,100%{transform:scaleY(1);opacity:0.4} 50%{transform:scaleY(0.5);opacity:1} }
        @media (max-width: 768px) {
          .about-hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .values-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
