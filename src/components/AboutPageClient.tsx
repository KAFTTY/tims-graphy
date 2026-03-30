"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";

const TEAM = [
  {
    name: "Amara Osei-Bonsu",
    role: "Lead Photographer & Founder",
    bio: "Amara founded Obsidian Studio in 2016 after a decade of chasing light across West Africa. Specialising in weddings and editorial work, she brings a painter's eye and a documentarian's patience to every frame.",
    specialty: "Weddings · Editorial",
  },
  {
    name: "Kolade Fashola",
    role: "Commercial Photographer",
    bio: "With a background in graphic design, Kolade brings sharp compositional instincts to brand and product photography. His work for global and local brands has appeared in print and digital campaigns across 12 countries.",
    specialty: "Commercial · Product",
  },
  {
    name: "Ngozi Eze",
    role: "Portrait & Events Photographer",
    bio: "Ngozi's ability to put subjects at ease is her greatest skill. She creates natural, unhurried portraits that reveal character rather than performance — and her event coverage is unmatched for energy and detail.",
    specialty: "Portraits · Events",
  },
];

const VALUES = [
  { title: "Intentionality", body: "We never point and shoot. Every frame is a decision — about light, composition, timing, and meaning. We bring thoughtfulness to everything we do." },
  { title: "Collaboration", body: "Great photography is a partnership. We listen deeply, ask the right questions, and co-create a vision with you before we ever pick up a camera." },
  { title: "Craft", body: "From the quality of our lenses to the precision of our post-production, we hold every detail to an uncompromising standard. Good enough is never enough." },
  { title: "Humanity", body: "Behind every brief is a person. Behind every wedding is a love story. We never forget that we are documenting real, irreplaceable moments in real people's lives." },
];

const MILESTONES = [
  { year: "2016", event: "Obsidian Studio founded in Lagos by Amara Osei-Bonsu." },
  { year: "2018", event: "First international wedding shoot — destination ceremony in Accra, Ghana." },
  { year: "2019", event: "Expanded into commercial photography. First Fortune 500 client." },
  { year: "2020", event: "Won Best Wedding Photography Studio — Lagos Fashion & Style Awards." },
  { year: "2021", event: "Kolade and Ngozi join the team. Studio relocates to Victoria Island." },
  { year: "2022", event: "Featured in Vogue West Africa and The Guardian Nigeria." },
  { year: "2023", event: "500th session milestone. Launched mentorship programme for emerging photographers." },
  { year: "2024", event: "Expanded international portfolio to include shoots in London and Dubai." },
];

export default function AboutPageClient() {
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
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ paddingTop: "10rem", paddingBottom: "5rem", paddingLeft: "3.5rem", paddingRight: "3.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="about-hero-grid">
          <div>
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", display: "block", marginBottom: "1.25rem", opacity: 0, animation: "fadeUp 0.9s 0.2s forwards" }}>
              Our Story
            </span>
            <h1 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(2.8rem, 6vw, 5.5rem)", fontWeight: 300, lineHeight: 1.05, color: "var(--cream)", marginBottom: "2rem", opacity: 0, animation: "fadeUp 0.9s 0.4s forwards" }}>
              We chase <em style={{ color: "var(--gold2)", fontStyle: "italic" }}>light</em><br />for a living.
            </h1>
            <p style={{ fontSize: "1rem", lineHeight: 1.9, color: "var(--muted)", marginBottom: "1.25rem", opacity: 0, animation: "fadeUp 0.9s 0.6s forwards" }}>
              Obsidian Studio is a Lagos-based photography collective founded in 2016. We began as a
              one-person operation chasing wedding light in Victoria Island and have grown into a
              team of three photographers with a shared obsession: making images that last.
            </p>
            <p style={{ fontSize: "1rem", lineHeight: 1.9, color: "var(--muted)", opacity: 0, animation: "fadeUp 0.9s 0.8s forwards" }}>
              We work with couples, creatives, executives, and brands across Nigeria and
              internationally — and we bring the same level of care to a passport photo as
              we do to a campaign for a global brand.
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", border: "1px solid var(--border-gold)", opacity: 0, animation: "fadeUp 0.9s 0.5s forwards" }}>
            {[
              { n: "8+",   l: "Years in Business" },
              { n: "500+", l: "Sessions Completed" },
              { n: "12",   l: "Awards Won" },
              { n: "3",    l: "Team Members" },
              { n: "18+",  l: "Countries Served" },
              { n: "98%",  l: "Client Satisfaction" },
            ].map((s) => (
              <div key={s.l} style={{ padding: "2rem 1.5rem", background: "var(--bg2)", borderRight: "1px solid var(--border-gold)", borderBottom: "1px solid var(--border-gold)" }}>
                <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "2.5rem", fontWeight: 300, color: "var(--gold2)", lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginTop: "0.4rem" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "6rem 3.5rem", background: "var(--bg2)" }}>
        <span className="section-label reveal">The Team</span>
        <h2 className="section-title reveal" style={{ marginBottom: "4rem", transitionDelay: "0.1s" }}>
          The people <em>behind the lens</em>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }} className="team-grid">
          {TEAM.map((member, i) => (
            <div key={member.name} className="reveal" style={{ transitionDelay: `${i * 0.12}s` }}>
              {/* Photo placeholder */}
              <div style={{ height: "360px", marginBottom: "1.75rem", position: "relative", overflow: "hidden", border: "1px solid var(--border-gold)" }}>
                <Image
                  src={IMAGES.team[i].src}
                  alt={IMAGES.team[i].alt}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,8,6,0.6) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: "1rem", left: "1rem", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>
                  {member.specialty}
                </div>
              </div>
              <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.5rem", fontWeight: 400, color: "var(--cream)", marginBottom: "0.3rem" }}>{member.name}</h3>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>{member.role}</p>
              <p style={{ fontSize: "0.88rem", lineHeight: 1.8, color: "var(--muted)" }}>{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "6rem 3.5rem" }}>
        <span className="section-label reveal">What We Stand For</span>
        <h2 className="section-title reveal" style={{ marginBottom: "4rem", transitionDelay: "0.1s" }}>
          Our <em>values</em>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px", border: "1px solid var(--border-gold)" }} className="values-grid">
          {VALUES.map((v, i) => (
            <div key={v.title} className="reveal" style={{
              padding: "3rem", background: "var(--bg2)",
              borderRight: i % 2 === 0 ? "1px solid var(--border-gold)" : "none",
              borderBottom: i < 2 ? "1px solid var(--border-gold)" : "none",
              transitionDelay: `${i * 0.1}s`,
            }}>
              <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.6rem", fontWeight: 400, color: "var(--gold2)", marginBottom: "1rem" }}>{v.title}</h3>
              <p style={{ fontSize: "0.92rem", lineHeight: 1.85, color: "var(--muted)" }}>{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: "6rem 3.5rem", background: "var(--bg2)" }}>
        <span className="section-label reveal">Our Journey</span>
        <h2 className="section-title reveal" style={{ marginBottom: "4rem", transitionDelay: "0.1s" }}>
          Eight years <em>in the making</em>
        </h2>
        <div style={{ maxWidth: "680px" }}>
          {MILESTONES.map((m, i) => (
            <div key={m.year} className="reveal" style={{
              display: "grid", gridTemplateColumns: "80px 1fr",
              gap: "2rem", paddingBottom: "2rem", transitionDelay: `${i * 0.07}s`,
              borderLeft: "1px solid var(--border-gold)", paddingLeft: "2rem",
              position: "relative", marginLeft: "1rem",
            }}>
              <div style={{ position: "absolute", left: "-5px", top: "4px", width: "9px", height: "9px", borderRadius: "50%", background: "var(--gold)", border: "2px solid var(--bg2)" }} />
              <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.3rem", fontWeight: 300, color: "var(--gold)", lineHeight: 1.2 }}>{m.year}</span>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--muted)" }}>{m.event}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "6rem 3.5rem", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, color: "var(--cream)", marginBottom: "1rem" }}>
          Let's make something <em style={{ color: "var(--gold2)", fontStyle: "italic" }}>together</em>
        </h2>
        <p style={{ color: "var(--muted)", marginBottom: "2.5rem", fontSize: "0.95rem" }}>We'd love to hear about your project.</p>
        <Link href="/contact" className="btn-gold">Start a Conversation</Link>
      </section>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @media (max-width: 1024px) { .team-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 768px) {
          .about-hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .team-grid { grid-template-columns: 1fr !important; }
          .values-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
