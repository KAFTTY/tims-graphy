"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";

const SERVICES_DETAIL = [
  {
    num: "01",
    title: "Weddings & Events",
    tagline: "Your story, told frame by frame.",
    description:
      "From the quiet moments of preparation to the last dance of the night, we document your wedding day with sensitivity, artistry, and a cinematic eye. Every look, every tear, every burst of laughter — preserved forever.",
    includes: [
      "Full-day coverage (up to 12 hours)",
      "Lead photographer + second shooter",
      "Engagement session (pre-wedding shoot)",
      "Online proofing gallery",
      "Leather heirloom album",
      "300+ edited digital images",
      "Print release included",
    ],
    packages: [
      { name: "Essential", price: "₦450,000", detail: "6 hrs · 1 photographer · 200 images" },
      { name: "Classic", price: "₦750,000", detail: "10 hrs · 2 photographers · 350 images + album" },
      { name: "Signature", price: "₦1,200,000", detail: "Full day · 2 photographers · engagement shoot + album" },
    ],
    accent: "#c9a96e",
  },
  {
    num: "02",
    title: "Portrait & Headshots",
    tagline: "The way you want to be seen.",
    description:
      "Whether you're building a personal brand, updating your LinkedIn, or creating a family archive — portraits are about connection. We create a comfortable, directed experience that draws out your most authentic self.",
    includes: [
      "Studio or outdoor location",
      "Professional direction throughout",
      "2–3 outfit changes",
      "Same-week turnaround",
      "Online gallery for selection",
      "Retouched high-resolution files",
      "Personal & commercial use license",
    ],
    packages: [
      { name: "Mini", price: "₦80,000", detail: "1 hr · 1 location · 20 edited images" },
      { name: "Standard", price: "₦150,000", detail: "2 hrs · 2 looks · 40 edited images" },
      { name: "Executive", price: "₦280,000", detail: "Half day · multiple looks + locations · 80 images" },
    ],
    accent: "#e8cc9a",
  },
  {
    num: "03",
    title: "Commercial & Product",
    tagline: "Imagery that sells, stories that last.",
    description:
      "Your brand deserves photography that refuses to be invisible. We collaborate closely with founders, creative directors, and marketing teams to produce imagery that stops the scroll — bold, refined, and deeply intentional.",
    includes: [
      "Creative concept development",
      "Art direction & styling guidance",
      "Studio or on-location shoot",
      "Props and set design support",
      "Commercial usage license",
      "High-res retouched deliverables",
      "Raw files available on request",
    ],
    packages: [
      { name: "Product", price: "₦200,000", detail: "Half day · up to 10 products · 30 images" },
      { name: "Brand", price: "₦450,000", detail: "Full day · brand story · 80 images" },
      { name: "Campaign", price: "₦900,000", detail: "2 days · full art direction · 150+ images + BTS" },
    ],
    accent: "#c9a96e",
  },
];

const FAQS = [
  { q: "How far in advance should I book?", a: "For weddings, we recommend booking 6–12 months in advance as our calendar fills quickly. For portraits and commercial shoots, 2–4 weeks is usually sufficient." },
  { q: "Do you travel outside Ilorin?", a: "Yes — we photograph across Nigeria and internationally. Travel fees apply for destinations outside Ilorin. Get in touch with your location and we'll provide a custom quote." },
  { q: "What happens if it rains on my wedding day?", a: "We've shot in every condition imaginable. Rain often produces some of the most dramatic and beautiful images. We come fully prepared and adapt our plan to make the most of whatever the day brings." },
  { q: "How long until I receive my photos?", a: "Portrait sessions are typically delivered within 5–7 business days. Wedding galleries are delivered within 4–6 weeks. Rush delivery is available for an additional fee." },
  { q: "Can I see the full gallery before purchasing prints?", a: "Absolutely. All clients receive access to a private online proofing gallery where you can view, favourite, and download your images before selecting any print products." },
];

function ServiceBlock({ service, index }: { service: typeof SERVICES_DETAIL[0]; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`reveal service-block-container ${isEven ? "is-even" : "is-odd"}`}
    >
      {/* Left info column */}
      <div className="service-info-col">
        <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "1.5rem" }}>
          <span style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(3rem, 5vw, 4rem)", fontWeight: 300, color: "var(--faint)", lineHeight: 1,
          }}>{service.num}</span>
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)" }}>
            Service
          </span>
        </div>
        <h2 className="service-title-text">{service.title}</h2>
        <p className="service-tagline-text">{service.tagline}</p>
        <p className="service-desc-text">
          {service.description}
        </p>

        <div style={{ marginBottom: "2.5rem" }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.25rem" }}>
            What's included
          </p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
            {service.includes.map((item) => (
              <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.9rem", color: "var(--muted)" }}>
                <span style={{ color: "var(--gold)", flexShrink: 0, marginTop: "2px" }}>✦</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <Link href="/contact" className="btn-gold" style={{ display: "inline-block" }}>
          Enquire Now
        </Link>
      </div>

      {/* Right Packages column */}
      <div className="service-packages-col">
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.5rem" }}>
          Packages
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", border: "1px solid var(--border-gold)" }}>
          {service.packages.map((pkg, i) => (
            <PackageCard key={pkg.name} pkg={pkg} isLast={i === service.packages.length - 1} />
          ))}
        </div>

        <div className="service-image-wrapper">
          <Image
            src={IMAGES.services[parseInt(service.num) - 1]?.src || IMAGES.services[0].src}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            style={{ objectFit: "cover", objectPosition: "50% 20%" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,8,6,0.35)" }} />
        </div>

        <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "1rem", lineHeight: 1.7 }}>
          All packages include a personal consultation and are fully customisable.
        </p>
      </div>
    </div>
  );
}

function PackageCard({ pkg, isLast }: { pkg: { name: string; price: string; detail: string }; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      style={{
        padding: "1.5rem 1.75rem",
        background: "var(--bg2)",
        borderBottom: isLast ? "none" : "1px solid var(--border-gold)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        transition: "background 0.3s",
      }}
      onMouseEnter={() => ref.current && (ref.current.style.background = "var(--bg3)")}
      onMouseLeave={() => ref.current && (ref.current.style.background = "var(--bg2)")}
    >
      <div>
        <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.2rem", color: "var(--cream)", marginBottom: "0.3rem" }}>
          {pkg.name}
        </div>
        <div style={{ fontSize: "0.75rem", color: "var(--muted)", letterSpacing: "0.05em" }}>{pkg.detail}</div>
      </div>
      <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.4rem", fontWeight: 300, color: "var(--gold)", whiteSpace: "nowrap" }}>
        {pkg.price}
      </div>
    </div>
  );
}

function FaqItem({ q, a, index, open, onToggle }: { q: string; a: string; index: number; open: boolean; onToggle: () => void }) {
  return (
    <div style={{ borderTop: "1px solid var(--border-gold)" }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%", background: "transparent", border: "none",
          padding: "1.5rem 0", display: "flex", justifyContent: "space-between",
          alignItems: "center", gap: "1rem", textAlign: "left",
        }}
      >
        <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.15rem", fontWeight: 400, color: "var(--cream)" }}>
          {q}
        </span>
        <span style={{
          color: "var(--gold)", fontSize: "1.25rem", flexShrink: 0,
          transform: open ? "rotate(45deg)" : "rotate(0)",
          transition: "transform 0.3s",
          display: "inline-block",
        }}>+</span>
      </button>
      <div style={{
        overflow: "hidden", maxHeight: open ? "200px" : "0",
        transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <p style={{ fontSize: "0.92rem", lineHeight: 1.85, color: "var(--muted)", paddingBottom: "1.5rem" }}>{a}</p>
      </div>
    </div>
  );
}

export default function ServicesPageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
      {/* Page hero — full bg image */}
      <section style={{ position: "relative", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", textAlign: "center", padding: "2rem" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src={IMAGES.services[0].src}
            alt="Photography services"
            fill priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "50% 20%" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,8,6,0.6) 0%, rgba(10,8,6,0.5) 50%, rgba(10,8,6,0.9) 100%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 2, paddingTop: "8rem", paddingBottom: "4rem" }}>
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", display: "block", marginBottom: "1.25rem", opacity: 0, animation: "fadeUp 0.9s 0.2s forwards" }}>
            What I Offer
          </span>
          <h1 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(2.8rem, 7vw, 6rem)", fontWeight: 300, lineHeight: 1.05, color: "var(--cream)", marginBottom: "1.5rem", opacity: 0, animation: "fadeUp 0.9s 0.4s forwards" }}>
            Photography <em style={{ color: "var(--gold2)", fontStyle: "italic" }}>Services</em>
          </h1>
          <p style={{ fontSize: "1rem", lineHeight: 1.85, color: "rgba(245,240,232,0.72)", maxWidth: "540px", margin: "0 auto", opacity: 0, animation: "fadeUp 0.9s 0.6s forwards" }}>
            Every session is personal. Built around your vision, your moment, your story.
          </p>
        </div>
      </section>

      {/* Service blocks */}
      <section style={{ padding: "0 3.5rem" }}>
        {SERVICES_DETAIL.map((s, i) => (
          <ServiceBlock key={s.num} service={s} index={i} />
        ))}
      </section>

      {/* FAQ */}
      <section style={{ padding: "6rem 3.5rem", background: "var(--bg2)" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <span className="section-label reveal">Got Questions?</span>
          <h2 className="section-title reveal" style={{ marginBottom: "3rem", transitionDelay: "0.1s" }}>
            Frequently <em>asked</em>
          </h2>
          {FAQS.map((faq, i) => (
            <FaqItem
              key={i} q={faq.q} a={faq.a} index={i}
              open={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
            />
          ))}
          <div style={{ borderTop: "1px solid var(--border-gold)" }} />
        </div>
      </section>

      {/* CTA strip */}
      <section style={{ padding: "6rem 3.5rem", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, color: "var(--cream)", marginBottom: "1rem" }}>
          Ready to create something <em style={{ color: "var(--gold2)", fontStyle: "italic" }}>unforgettable?</em>
        </h2>
        <p style={{ color: "var(--muted)", marginBottom: "2.5rem", fontSize: "0.95rem" }}>
          Let's talk about your vision and find the right package for you.
        </p>
        <Link href="/contact" className="btn-gold">Get in Touch</Link>
      </section>

    <style dangerouslySetInnerHTML={{
      __html: `
        @keyframes fadeUp { 
          from { opacity:0; transform:translateY(24px); } 
          to { opacity:1; transform:translateY(0); } 
        }

        /* BASE GRID (LG) */
        .service-block-container {
          border-top: 1px solid var(--border-gold);
          padding: 6rem 0;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 6rem;
          align-items: start;
        }

        .service-block-container.is-odd {
          direction: rtl;
        }
        .service-block-container.is-odd > div {
          direction: ltr; /* Reset text direction inside columns */
        }

        .service-title-text {
          font-family: var(--font-cormorant), serif;
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 300;
          color: var(--cream);
          margin-bottom: 0.75rem;
          line-height: 1.1;
        }

        .service-tagline-text {
          font-family: var(--font-cormorant), serif;
          font-size: 1.35rem;
          font-style: italic;
          font-weight: 300;
          color: var(--gold);
          margin-bottom: 1.75rem;
        }

        .service-image-wrapper {
          margin-top: 2.5rem;
          height: 350px;
          position: relative;
          overflow: hidden;
          border: 1px solid var(--border-gold);
        }

        /* MEDIUM SCREENS (md: 768px to 1024px) */
        @media (max-width: 1024px) {
          .service-block-container {
            gap: 3rem;
            padding: 4rem 0;
          }
        }

        /* SMALL SCREENS (sm: 768px and below) */
        @media (max-width: 768px) {
          .service-block-container {
            grid-template-columns: 1fr;
            gap: 3rem;
            padding: 4rem 1.5rem;
            direction: ltr !important; /* Force natural stacking on mobile */
          }

          .service-block-container.is-odd {
            direction: ltr !important;
          }

          .service-image-wrapper {
            height: 250px; /* Shorter image for mobile to keep scroll fast */
            order: -1; /* Optionally move image above packages on mobile */
          }
          
          /* Adjust page padding */
          main section {
            padding-left: 1.5rem !important;
            padding-right: 1.5rem !important;
          }
        }

        /* EXTRA SMALL (Mobile Portrait) */
        @media (max-width: 480px) {
          .service-title-text { font-size: 2.2rem; }
          .service-block-container { padding: 3rem 1rem; }
        }
      ` }} />
    </main>
  );
}
