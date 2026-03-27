import type { Metadata } from "next";
import PortfolioGrid from "@/components/PortfolioGrid";

export const metadata: Metadata = {
  title: "Portfolio — Obsidian Studio",
  description: "Browse our full portfolio of wedding, portrait, commercial, and editorial photography across Lagos and beyond.",
  alternates: { canonical: "https://obsidianstudio.ng/portfolio" },
  openGraph: {
    title: "Portfolio — Obsidian Studio",
    description: "Browse our full portfolio of photography across Lagos and beyond.",
    url: "https://obsidianstudio.ng/portfolio",
  },
};

export default function PortfolioPage() {
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <section style={{ paddingTop: "10rem", paddingBottom: "4rem", paddingLeft: "3.5rem", paddingRight: "3.5rem", textAlign: "center" }}>
        <span style={{ fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", display: "block", marginBottom: "1.25rem", opacity: 0, animation: "fadeUp 0.9s 0.2s forwards" }}>
          Our Work
        </span>
        <h1 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(2.8rem, 7vw, 6rem)", fontWeight: 300, lineHeight: 1.05, color: "var(--cream)", marginBottom: "1.5rem", opacity: 0, animation: "fadeUp 0.9s 0.4s forwards" }}>
          Selected <em style={{ color: "var(--gold2)", fontStyle: "italic" }}>Portfolio</em>
        </h1>
        <p style={{ fontSize: "1rem", lineHeight: 1.85, color: "var(--muted)", maxWidth: "540px", margin: "0 auto 3rem", opacity: 0, animation: "fadeUp 0.9s 0.6s forwards" }}>
          Every frame is a decision. Browse our curated collection of work spanning weddings, portraits, commercial campaigns, and editorial projects across Lagos and beyond.
        </p>
        <PortfolioGrid />
      </section>
      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </main>
  );
}
