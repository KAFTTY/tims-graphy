"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SITE } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

const SESSION_TYPES = [
  "Wedding & Events",
  "Portrait & Headshots",
  "Commercial & Product",
  "Portfolio Review",
  "Other / Not Sure",
];

const BUDGETS = [
  "Under ₦100,000",
  "₦100,000 – ₦300,000",
  "₦300,000 – ₦600,000",
  "₦600,000 – ₦1,000,000",
  "Over ₦1,000,000",
];

const CONTACT_DETAILS = [
  { label: "Email",    value: SITE.email,    icon: "✉" },
  { label: "Phone",    value: SITE.phone,    icon: "☎" },
  { label: "Studio",   value: SITE.location, icon: "◎" },
  { label: "Hours",    value: SITE.hours,    icon: "◷" },
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
      <label style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  background: "var(--bg3)", border: "1px solid var(--border-gold)",
  color: "var(--cream)", padding: "0.9rem 1rem",
  fontFamily: "var(--font-outfit), sans-serif", fontSize: "0.9rem", fontWeight: 300,
  outline: "none", width: "100%", transition: "border-color 0.3s", WebkitAppearance: "none" as const,
};

export default function ContactPageClient() {
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); } }); },
      { threshold: 0.08 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function getFocusStyle(name: string): React.CSSProperties {
    return { ...inputStyle, borderColor: focused === name ? "var(--gold)" : "var(--border-gold)" };
  }

  function handleSubmit() {
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* Hero — full bg image */}
      <section style={{ position: "relative", minHeight: "55vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", textAlign: "center", padding: "2rem" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src={IMAGES.gallery[0].src}
            alt="Contact Tim's Graphy"
            fill priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center center" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,8,6,0.65) 0%, rgba(10,8,6,0.55) 50%, rgba(10,8,6,0.92) 100%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 2, paddingTop: "8rem", paddingBottom: "4rem" }}>
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", display: "block", marginBottom: "1.25rem", opacity: 0, animation: "fadeUp 0.9s 0.2s forwards" }}>
            Let's Talk
          </span>
          <h1 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(2.8rem, 7vw, 6rem)", fontWeight: 300, lineHeight: 1.05, color: "var(--cream)", marginBottom: "1.5rem", opacity: 0, animation: "fadeUp 0.9s 0.4s forwards" }}>
            Start a <em style={{ color: "var(--gold2)", fontStyle: "italic" }}>conversation</em>
          </h1>
          <p style={{ fontSize: "1rem", lineHeight: 1.85, color: "rgba(245,240,232,0.72)", maxWidth: "540px", margin: "0 auto", opacity: 0, animation: "fadeUp 0.9s 0.6s forwards" }}>
            Whether you have a date in mind or just an idea — I'd love to hear from you.
            Fill in the form and I'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Main grid */}
      <section style={{ padding: "2rem 3.5rem 7rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "6rem", alignItems: "start" }} className="contact-page-grid">

          {/* Left — info */}
          <div className="reveal">
            {/* Contact details */}
            <div style={{ marginBottom: "3.5rem" }}>
              {CONTACT_DETAILS.map((d) => (
                <div key={d.label} style={{ borderTop: "1px solid var(--border-gold)", padding: "1.5rem 0", display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                  <span style={{ color: "var(--gold)", fontSize: "1rem", marginTop: "2px", flexShrink: 0 }}>{d.icon}</span>
                  <div>
                    <div style={{ fontSize: "0.63rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.35rem" }}>{d.label}</div>
                    <div style={{ fontSize: "0.95rem", color: "var(--cream)" }}>{d.value}</div>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: "1px solid var(--border-gold)" }} />
            </div>

            {/* Socials */}
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.25rem" }}>Follow our work</p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {Object.entries(SITE.socials).map(([name]) => (
                <a key={name} href="#" style={{
                  fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "var(--muted)", textDecoration: "none",
                  border: "1px solid var(--border-gold)", padding: "0.5rem 1.2rem",
                  transition: "border-color 0.3s, color 0.3s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--gold)"; e.currentTarget.style.borderColor = "var(--gold)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--border-gold)"; }}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </a>
              ))}
            </div>

            {/* Response time badge */}
            <div style={{ marginTop: "3rem", padding: "1.5rem", background: "var(--bg2)", border: "1px solid var(--border-gold)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4caf50", boxShadow: "0 0 6px #4caf50" }} />
                <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)" }}>
                  Currently Available
                </span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.7 }}>
                We typically respond within <strong style={{ color: "var(--cream)", fontWeight: 400 }}>24 hours</strong>. For urgent
                enquiries, call us directly.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div ref={formRef} className="reveal" style={{ transitionDelay: "0.15s" }}>
            {sent ? (
              <div style={{ padding: "4rem 2rem", textAlign: "center", border: "1px solid var(--border-gold)" }}>
                <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "3rem", color: "var(--gold)", marginBottom: "1rem" }}>✦</div>
                <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.8rem", fontWeight: 300, color: "var(--cream)", marginBottom: "0.75rem" }}>
                  Message Received
                </h3>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                  Thank you for reaching out. We'll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {/* Name row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-name-row">
                  <Field label="First Name">
                    <input type="text" placeholder="Amara" style={getFocusStyle("first")}
                      onFocus={() => setFocused("first")} onBlur={() => setFocused(null)} />
                  </Field>
                  <Field label="Last Name">
                    <input type="text" placeholder="Osei" style={getFocusStyle("last")}
                      onFocus={() => setFocused("last")} onBlur={() => setFocused(null)} />
                  </Field>
                </div>

                <Field label="Email Address">
                  <input type="email" placeholder="you@email.com" style={getFocusStyle("email")}
                    onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
                </Field>

                <Field label="Phone (optional)">
                  <input type="tel" placeholder="+234 800 000 0000" style={getFocusStyle("phone")}
                    onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} />
                </Field>

                <Field label="Session Type">
                  <select style={getFocusStyle("session")}
                    onFocus={() => setFocused("session")} onBlur={() => setFocused(null)}>
                    <option value="">Select a service…</option>
                    {SESSION_TYPES.map((t) => <option key={t} style={{ background: "var(--bg3)" }}>{t}</option>)}
                  </select>
                </Field>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-name-row">
                  <Field label="Preferred Date">
                    <input type="date" style={getFocusStyle("date")}
                      onFocus={() => setFocused("date")} onBlur={() => setFocused(null)} />
                  </Field>
                  <Field label="Approximate Budget">
                    <select style={getFocusStyle("budget")}
                      onFocus={() => setFocused("budget")} onBlur={() => setFocused(null)}>
                      <option value="">Select range…</option>
                      {BUDGETS.map((b) => <option key={b} style={{ background: "var(--bg3)" }}>{b}</option>)}
                    </select>
                  </Field>
                </div>

                <Field label="Tell us about your vision">
                  <textarea placeholder="Describe your event, style preferences, location ideas, any inspiration you have…"
                    style={{ ...getFocusStyle("msg"), height: "140px", resize: "none" }}
                    onFocus={() => setFocused("msg")} onBlur={() => setFocused(null)} />
                </Field>

                <button onClick={handleSubmit} style={{
                  background: "var(--gold)", color: "var(--bg)", border: "none",
                  padding: "1.1rem", fontFamily: "var(--font-outfit), sans-serif",
                  fontSize: "0.78rem", letterSpacing: "0.25em", textTransform: "uppercase",
                  width: "100%", transition: "background 0.3s, transform 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--gold2)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  Send Enquiry ✦
                </button>

                <p style={{ fontSize: "0.72rem", color: "var(--muted)", textAlign: "center", lineHeight: 1.6 }}>
                  By submitting this form you agree to be contacted regarding your enquiry.
                  We never share your details with third parties.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @media (max-width: 1024px) { .contact-page-grid { grid-template-columns: 1fr !important; gap: 3.5rem !important; } }
        @media (max-width: 640px) { .form-name-row { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  );
}
