"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/constants";

const CONTACT_DETAILS = [
  { label: "Email", value: SITE.email },
  { label: "Phone", value: SITE.phone },
  { label: "Studio", value: SITE.location },
  { label: "Hours", value: SITE.hours },
];

const SESSION_TYPES = [
  "Wedding & Events",
  "Portrait & Headshots",
  "Commercial & Product",
  "Other",
];

function InputField({
  label,
  type = "text",
  placeholder,
  isTextarea = false,
}: {
  label: string;
  type?: string;
  placeholder: string;
  isTextarea?: boolean;
}) {
  const ref = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  const baseStyle: React.CSSProperties = {
    background: "var(--bg3)",
    border: "1px solid var(--border-gold)",
    color: "var(--cream)",
    padding: "0.85rem 1rem",
    fontFamily: "var(--font-outfit), sans-serif",
    fontSize: "0.9rem",
    fontWeight: 300,
    outline: "none",
    width: "100%",
    transition: "border-color 0.3s",
    WebkitAppearance: "none",
    ...(isTextarea ? { height: "120px", resize: "none" as const } : {}),
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      <label
        style={{
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
      >
        {label}
      </label>
      {isTextarea ? (
        <textarea
          ref={ref as React.RefObject<HTMLTextAreaElement>}
          placeholder={placeholder}
          style={baseStyle}
          onFocus={() => ref.current && (ref.current.style.borderColor = "var(--gold)")}
          onBlur={() => ref.current && (ref.current.style.borderColor = "var(--border-gold)")}
        />
      ) : (
        <input
          ref={ref as React.RefObject<HTMLInputElement>}
          type={type}
          placeholder={placeholder}
          style={baseStyle}
          onFocus={() => ref.current && (ref.current.style.borderColor = "var(--gold)")}
          onBlur={() => ref.current && (ref.current.style.borderColor = "var(--border-gold)")}
        />
      )}
    </div>
  );
}

export default function Contact() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [sent, setSent] = useState(false);

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
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function handleSubmit() {
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <section
      id="contact"
      style={{ padding: "7rem 3.5rem", background: "var(--bg)" }}
    >
      <span className="section-label reveal">Get in Touch</span>
      <h2
        className="section-title reveal"
        style={{ transitionDelay: "0.1s" }}
      >
        Let's create something
        <br />
        <em>unforgettable</em>
      </h2>

      <div
        className="contact-grid-wrap"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6rem",
          marginTop: "4rem",
        }}
      >
        {/* Left — contact info */}
        <div
          className="reveal"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            transitionDelay: "0.2s",
          }}
        >
          {CONTACT_DETAILS.map((d) => (
            <div
              key={d.label}
              style={{
                borderTop: "1px solid var(--border-gold)",
                paddingTop: "1.25rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "0.4rem",
                }}
              >
                {d.label}
              </div>
              <div style={{ fontSize: "1rem", color: "var(--cream)" }}>
                {d.value}
              </div>
            </div>
          ))}
        </div>

        {/* Right — form */}
        <div
          className="reveal"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            transitionDelay: "0.3s",
          }}
        >
          <div className="contact-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <InputField label="First Name" placeholder="Amara" />
            <InputField label="Last Name" placeholder="Osei" />
          </div>
          <InputField label="Email" type="email" placeholder="you@email.com" />

          {/* Select */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--muted)",
              }}
            >
              Session Type
            </label>
            <select
              style={{
                background: "var(--bg3)",
                border: "1px solid var(--border-gold)",
                color: "var(--cream)",
                padding: "0.85rem 1rem",
                fontFamily: "var(--font-outfit), sans-serif",
                fontSize: "0.9rem",
                fontWeight: 300,
                outline: "none",
                width: "100%",
                WebkitAppearance: "none",
              }}
            >
              {SESSION_TYPES.map((t) => (
                <option key={t} style={{ background: "var(--bg3)" }}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <InputField
            label="Message"
            placeholder="Tell us about your vision…"
            isTextarea
          />

          {/* Submit */}
          <button
            ref={btnRef}
            onClick={handleSubmit}
            style={{
              background: sent ? "var(--gold)" : "transparent",
              border: "1px solid var(--gold)",
              color: sent ? "var(--bg)" : "var(--gold)",
              padding: "1rem",
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              width: "100%",
              transition: "background 0.3s, color 0.3s",
            } as React.CSSProperties}
            onMouseEnter={() => {
              if (!sent && btnRef.current) {
                btnRef.current.style.background = "var(--gold)";
                btnRef.current.style.color = "var(--bg)";
              }
            }}
            onMouseLeave={() => {
              if (!sent && btnRef.current) {
                btnRef.current.style.background = "transparent";
                btnRef.current.style.color = "var(--gold)";
              }
            }}
          >
            {sent ? "Message Sent ✦" : "Send Enquiry"}
          </button>
        </div>
      </div>
    </section>
  );
}
