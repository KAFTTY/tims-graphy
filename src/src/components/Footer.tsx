"use client";

import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer
      className="footer-wrap"
      style={{
        background: "var(--bg)",
        padding: "2.5rem 3.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: "1px solid var(--border-gold)",
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "1.1rem",
          fontWeight: 300,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "var(--gold)",
        }}
      >
        Tim's Graphy
      </div>

      <p
        style={{
          fontSize: "0.7rem",
          letterSpacing: "0.1em",
          color: "var(--muted)",
        }}
      >
        © {new Date().getFullYear()} Tim's Graphy. All rights reserved.
      </p>

      {/* Social links */}
      <div style={{ display: "flex", gap: "1.5rem" }}>
        {Object.entries(SITE.socials).map(([name, href]) => (
          <a
            key={name}
            href={href}
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              color: "var(--muted)",
              textDecoration: "none",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "var(--gold)")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "var(--muted)")
            }
          >
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </a>
        ))}
      </div>
    </footer>
  );
}
