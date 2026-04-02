"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SITE } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

const SESSION_TYPES = [
  "Wedding & Events",
  "Portrait & Headshots",
  "Commercial & Product",
  "Birthday / Celebration",
  "Graduation Shoot",
  "Model Shoot",
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
  { label: "Email",  value: SITE.email,    icon: "✉" },
  { label: "Phone",  value: SITE.phone,    icon: "☎" },
  { label: "Studio", value: SITE.location, icon: "◎" },
  { label: "Hours",  value: SITE.hours,    icon: "◷" },
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
  outline: "none", width: "100%", transition: "border-color 0.3s",
  WebkitAppearance: "none" as const,
};

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactPageClient() {
  const [status,  setStatus]  = useState<Status>("idle");
  const [focused, setFocused] = useState<string | null>(null);
  const [error,   setError]   = useState("");

  // Form field refs — EmailJS reads these directly
  const firstRef   = useRef<HTMLInputElement>(null);
  const lastRef    = useRef<HTMLInputElement>(null);
  const emailRef   = useRef<HTMLInputElement>(null);
  const phoneRef   = useRef<HTMLInputElement>(null);
  const sessionRef = useRef<HTMLSelectElement>(null);
  const dateRef    = useRef<HTMLInputElement>(null);
  const budgetRef  = useRef<HTMLSelectElement>(null);
  const msgRef     = useRef<HTMLTextAreaElement>(null);

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

  async function handleSubmit() {
    // ── Basic validation ──
    const firstName = firstRef.current?.value.trim() ?? "";
    const lastName  = lastRef.current?.value.trim()  ?? "";
    const email     = emailRef.current?.value.trim()  ?? "";
    const message   = msgRef.current?.value.trim()    ?? "";

    if (!firstName || !email || !message) {
      setError("Please fill in your name, email, and message.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setStatus("sending");

    try {
      // ── Dynamic import keeps bundle small (emailjs not loaded until needed) ──
      const emailjs = (await import("@emailjs/browser")).default;

      // ── Template parameters — must match the variables in your EmailJS template ──
      const templateParams = {
        from_name:    `${firstName} ${lastName}`.trim(),
        from_email:   email,
        phone:        phoneRef.current?.value.trim()   || "Not provided",
        session_type: sessionRef.current?.value        || "Not specified",
        date:         dateRef.current?.value           || "Not specified",
        budget:       budgetRef.current?.value         || "Not specified",
        message:      message,
        to_email:     "timsgraphy@gmail.com",
      };

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! }
      );

      setStatus("sent");
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Something went wrong. Please try again or email us directly.");
      setStatus("error");
    }
  }

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* Hero — full bg image */}
      <section style={{ position: "relative", minHeight: "55vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", textAlign: "center", padding: "2rem" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src={IMAGES.gallery[0].src}
            alt="Contact Tim's Graphy"
            fill priority sizes="100vw"
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

            <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.25rem" }}>Follow my work</p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {Object.entries(SITE.socials).map(([name]) => (
                <a key={name} href="#" style={{ fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", textDecoration: "none", border: "1px solid var(--border-gold)", padding: "0.5rem 1.2rem", transition: "border-color 0.3s, color 0.3s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--gold)"; e.currentTarget.style.borderColor = "var(--gold)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--border-gold)"; }}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </a>
              ))}
            </div>

            <div style={{ marginTop: "3rem", padding: "1.5rem", background: "var(--bg2)", border: "1px solid var(--border-gold)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4caf50", boxShadow: "0 0 6px #4caf50" }} />
                <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)" }}>Currently Available</span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.7 }}>
                I typically respond within <strong style={{ color: "var(--cream)", fontWeight: 400 }}>24 hours</strong>. For urgent enquiries, call me directly.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div className="reveal" style={{ transitionDelay: "0.15s" }}>

            {/* Success state */}
            {status === "sent" ? (
              <div style={{ padding: "4rem 2rem", textAlign: "center", border: "1px solid var(--border-gold)" }}>
                <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "3rem", color: "var(--gold)", marginBottom: "1rem" }}>✦</div>
                <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.8rem", fontWeight: 300, color: "var(--cream)", marginBottom: "0.75rem" }}>
                  Message Sent!
                </h3>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "2rem" }}>
                  Thank you for reaching out. I'll be in touch within 24 hours.
                </p>
                <button onClick={() => setStatus("idle")} style={{ background: "transparent", border: "1px solid var(--border-gold)", color: "var(--gold)", padding: "0.75rem 2rem", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--font-outfit), sans-serif", cursor: "pointer" }}>
                  Send Another
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

                {/* Error message */}
                {error && (
                  <div style={{ padding: "0.85rem 1rem", background: "rgba(220,50,50,0.1)", border: "1px solid rgba(220,50,50,0.3)", color: "#f87171", fontSize: "0.82rem", lineHeight: 1.5 }}>
                    {error}
                  </div>
                )}

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-name-row">
                  <Field label="First Name">
                    <input ref={firstRef} type="text" placeholder="Amara" style={getFocusStyle("first")}
                      onFocus={() => setFocused("first")} onBlur={() => setFocused(null)} />
                  </Field>
                  <Field label="Last Name">
                    <input ref={lastRef} type="text" placeholder="Osei" style={getFocusStyle("last")}
                      onFocus={() => setFocused("last")} onBlur={() => setFocused(null)} />
                  </Field>
                </div>

                <Field label="Email Address *">
                  <input ref={emailRef} type="email" placeholder="you@email.com" style={getFocusStyle("email")}
                    onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
                </Field>

                <Field label="Phone (optional)">
                  <input ref={phoneRef} type="tel" placeholder="+234 800 000 0000" style={getFocusStyle("phone")}
                    onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} />
                </Field>

                <Field label="Session Type">
                  <select ref={sessionRef} style={getFocusStyle("session")}
                    onFocus={() => setFocused("session")} onBlur={() => setFocused(null)}>
                    <option value="">Select a service…</option>
                    {SESSION_TYPES.map((t) => <option key={t} style={{ background: "var(--bg3)" }}>{t}</option>)}
                  </select>
                </Field>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-name-row">
                  <Field label="Preferred Date">
                    <input ref={dateRef} type="date" style={getFocusStyle("date")}
                      onFocus={() => setFocused("date")} onBlur={() => setFocused(null)} />
                  </Field>
                  <Field label="Approximate Budget">
                    <select ref={budgetRef} style={getFocusStyle("budget")}
                      onFocus={() => setFocused("budget")} onBlur={() => setFocused(null)}>
                      <option value="">Select range…</option>
                      {BUDGETS.map((b) => <option key={b} style={{ background: "var(--bg3)" }}>{b}</option>)}
                    </select>
                  </Field>
                </div>

                <Field label="Your Message *">
                  <textarea ref={msgRef} placeholder="Tell me about your vision, the event, location ideas…"
                    style={{ ...getFocusStyle("msg"), height: "140px", resize: "none" }}
                    onFocus={() => setFocused("msg")} onBlur={() => setFocused(null)} />
                </Field>

                <button
                  onClick={handleSubmit}
                  disabled={status === "sending"}
                  style={{
                    background: status === "sending" ? "rgba(201,169,110,0.4)" : "var(--gold)",
                    color: "var(--bg)", border: "none", padding: "1.1rem",
                    fontFamily: "var(--font-outfit), sans-serif",
                    fontSize: "0.78rem", letterSpacing: "0.25em", textTransform: "uppercase",
                    width: "100%", transition: "background 0.3s, transform 0.2s",
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
                  }}
                  onMouseEnter={(e) => { if (status !== "sending") { e.currentTarget.style.background = "var(--gold2)"; e.currentTarget.style.transform = "translateY(-2px)"; }}}
                  onMouseLeave={(e) => { e.currentTarget.style.background = status === "sending" ? "rgba(201,169,110,0.4)" : "var(--gold)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  {status === "sending" ? (
                    <>
                      <span style={{ display: "inline-block", width: "14px", height: "14px", border: "2px solid var(--bg)", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                      Sending…
                    </>
                  ) : (
                    "Send Enquiry ✦"
                  )}
                </button>

                <p style={{ fontSize: "0.72rem", color: "var(--muted)", textAlign: "center", lineHeight: 1.6 }}>
                  By submitting this form you agree to be contacted regarding your enquiry. I never share your details with third parties.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin   { to { transform: rotate(360deg); } }
        @media(max-width:1024px){ .contact-page-grid{grid-template-columns:1fr!important;gap:3.5rem!important} }
        @media(max-width:640px) { .form-name-row{grid-template-columns:1fr!important} }
      `}</style>
    </main>
  );
}
