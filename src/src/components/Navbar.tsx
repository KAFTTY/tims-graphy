"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV_LINKS = [
  { label: "Home",      href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services",  href: "/services" },
  { label: "About",     href: "/about" },
  { label: "Contact",   href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router   = useRouter();
  const isNavigatingRef = useRef(false);

  /* detect screen size */
  useEffect(() => {
    function check() { setIsMobile(window.innerWidth <= 768); }
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* scroll shadow */
  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 40); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* lock body scroll while menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* close menu after route actually changes */
  useEffect(() => {
    setMenuOpen(false);
    isNavigatingRef.current = false;
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  /* navigate — set flag so outside-click doesn't cancel */
  function handleNav(href: string) {
    isNavigatingRef.current = true;
    setMenuOpen(false);
    router.push(href);
  }

  /* hamburger toggle */
  function toggleMenu(e: React.MouseEvent) {
    e.stopPropagation();
    setMenuOpen((o) => !o);
  }

  /* overlay backdrop click — only close if not mid-navigation */
  function handleBackdropClick() {
    if (!isNavigatingRef.current) setMenuOpen(false);
  }

  return (
    <>
      {/* ── NAV BAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: isMobile ? "1.25rem 1.5rem" : "1.75rem 3.5rem",
        background: scrolled || menuOpen
          ? "rgba(10,8,6,0.98)"
          : "linear-gradient(to bottom, rgba(10,8,6,0.95), transparent)",
        borderBottom: scrolled || menuOpen ? "1px solid var(--border-gold)" : "none",
        transition: "background 0.4s, border-color 0.4s",
      }}>
        {/* Logo */}
        <Link href="/" style={{
          fontFamily: "var(--font-cormorant), serif", fontSize: "1.4rem",
          fontWeight: 300, letterSpacing: "0.25em", color: "var(--gold2)",
          textTransform: "uppercase", textDecoration: "none", zIndex: 1001,
        }}>
          Tim's Graphy
        </Link>

        {/* Desktop links */}
        {!isMobile && (
          <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none", margin: 0, padding: 0 }}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} style={{
                  fontSize: "0.72rem", letterSpacing: "0.18em",
                  textTransform: "uppercase", textDecoration: "none",
                  color: isActive(link.href) ? "var(--gold2)" : "var(--muted)",
                  borderBottom: isActive(link.href) ? "1px solid var(--gold)" : "1px solid transparent",
                  paddingBottom: "2px", transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold2)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = isActive(link.href) ? "var(--gold2)" : "var(--muted)")}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" style={{
                fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase",
                textDecoration: "none", color: "var(--gold)",
                border: "1px solid var(--border-gold)", padding: "0.55rem 1.4rem",
                transition: "background 0.3s, color 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.color = "var(--bg)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--gold)"; }}
              >
                Book Now
              </Link>
            </li>
          </ul>
        )}

        {/* Hamburger — mobile only */}
        {isMobile && (
          <button
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              background: "transparent", border: "none", zIndex: 1001,
              display: "flex", flexDirection: "column", gap: "5px",
              alignItems: "center", justifyContent: "center",
              width: "36px", height: "36px", padding: "6px",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                display: "block", width: "22px", height: "1.5px",
                background: "var(--gold2)", borderRadius: "2px",
                transform:
                  menuOpen && i === 0 ? "translateY(6.5px) rotate(45deg)" :
                  menuOpen && i === 2 ? "translateY(-6.5px) rotate(-45deg)" : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
                transition: "transform 0.3s ease, opacity 0.2s ease",
              }} />
            ))}
          </button>
        )}
      </nav>

      {/* ── Mobile drawer ── */}
      {isMobile && (
        <>
          {/* Backdrop — separate from links so clicks don't bubble */}
          <div
            onClick={handleBackdropClick}
            style={{
              position: "fixed", inset: 0, zIndex: 998,
              background: "rgba(10,8,6,0.98)",
              opacity: menuOpen ? 1 : 0,
              pointerEvents: menuOpen ? "auto" : "none",
              transition: "opacity 0.35s cubic-bezier(0.4,0,0.2,1)",
            }}
          />

          {/* Links container — sits above backdrop, does NOT propagate clicks down */}
          <div
            style={{
              position: "fixed", inset: 0, zIndex: 999,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: "0.25rem", pointerEvents: "none",
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <button
                key={link.href}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNav(link.href);
                }}
                style={{
                  pointerEvents: menuOpen ? "auto" : "none",
                  background: "transparent", border: "none",
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(1.8rem, 6vw, 2.4rem)",
                  fontWeight: 300, fontStyle: "italic",
                  letterSpacing: "0.05em",
                  color: isActive(link.href) ? "var(--gold2)" : "var(--cream)",
                  padding: "0.65rem 2.5rem",
                  transform: menuOpen ? "translateY(0)" : "translateY(24px)",
                  opacity: menuOpen ? 1 : 0,
                  transition: [
                    `color 0.3s`,
                    `transform 0.45s cubic-bezier(0.4,0,0.2,1) ${i * 0.07}s`,
                    `opacity 0.45s ease ${i * 0.07}s`,
                  ].join(", "),
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold2)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = isActive(link.href) ? "var(--gold2)" : "var(--cream)")}
              >
                {link.label}
              </button>
            ))}

            {/* Book Now CTA */}
            <button
              onClick={(e) => { e.stopPropagation(); handleNav("/contact"); }}
              style={{
                pointerEvents: menuOpen ? "auto" : "none",
                background: "transparent",
                border: "1px solid var(--border-gold)",
                color: "var(--gold)",
                padding: "0.9rem 2.5rem",
                fontFamily: "var(--font-outfit), sans-serif",
                fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase",
                marginTop: "1.5rem",
                transform: menuOpen ? "translateY(0)" : "translateY(24px)",
                opacity: menuOpen ? 1 : 0,
                transition: [
                  `background 0.3s, color 0.3s`,
                  `transform 0.45s cubic-bezier(0.4,0,0.2,1) ${NAV_LINKS.length * 0.07}s`,
                  `opacity 0.45s ease ${NAV_LINKS.length * 0.07}s`,
                ].join(", "),
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.color = "var(--bg)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--gold)"; }}
            >
              Book Now
            </button>
          </div>
        </>
      )}
    </>
  );
}
