/**
 * Central image registry for Obsidian Studio.
 *
 * HOW TO SWAP IN YOUR OWN PHOTOS:
 * 1. Add your image to /public/images/
 * 2. Replace the `src` value with e.g. "/images/hero-bg.jpg"
 * 3. Remove the `?auto=format&fit=crop...` Unsplash params
 *
 * Unsplash usage is free for commercial use (unsplash.com/license).
 * Credit: photographer names are noted in comments.
 */

export const IMAGES = {
  // ── HERO ──────────────────────────────────────────────────────
  heroBg: {
    src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1920&q=80&auto=format&fit=crop",
    alt: "Wedding couple in golden light",
    credit: "Євгенія Височина / Unsplash",
    // swap: "/images/hero-bg.jpg"
  },

  // ── GALLERY GRID (8 slots) ─────────────────────────────────────
  gallery: [
    { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80&auto=format&fit=crop", alt: "Wedding — Adanna & Emeka", credit: "Photos by Lanty / Unsplash" },
    { src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80&auto=format&fit=crop", alt: "Portrait — Zara M.", credit: "Jernej Graj / Unsplash" },
    { src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80&auto=format&fit=crop", alt: "Commercial — Brand Campaign", credit: "ShareGrid / Unsplash" },
    { src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80&auto=format&fit=crop", alt: "Event — Lagos Fashion Week", credit: "Chalo Garcia / Unsplash" },
    { src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80&auto=format&fit=crop", alt: "Product — Luxury Collection", credit: "Artem Bali / Unsplash" },
    { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80&auto=format&fit=crop", alt: "Wedding — Chioma & David", credit: "Thomas AE / Unsplash" },
    { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop", alt: "Headshot — Corporate Series", credit: "Nicolas Horn / Unsplash" },
    { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop", alt: "Editorial — Art Direction", credit: "Jayson Hinrichsen / Unsplash" },
  ],

  // ── ABOUT / TEAM ──────────────────────────────────────────────
  team: [
    { src: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=80&auto=format&fit=crop&crop=face", alt: "Amara Osei-Bonsu — Lead Photographer", credit: "Leighann Blackwood / Unsplash" },
    { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80&auto=format&fit=crop&crop=face", alt: "Kolade Fashola — Commercial Photographer", credit: "Foto Sushi / Unsplash" },
    { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80&auto=format&fit=crop&crop=face", alt: "Ngozi Eze — Portrait Photographer", credit: "Christopher Campbell / Unsplash" },
  ],

  aboutStudio: {
    src: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=900&q=80&auto=format&fit=crop",
    alt: "Photographer at work",
    credit: "Joanna Kosinska / Unsplash",
  },

  // ── SERVICES ──────────────────────────────────────────────────
  services: [
    { src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80&auto=format&fit=crop", alt: "Wedding photography", credit: "Álvaro CvG / Unsplash" },
    { src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80&auto=format&fit=crop", alt: "Portrait photography", credit: "Jernej Graj / Unsplash" },
    { src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80&auto=format&fit=crop", alt: "Commercial photography", credit: "Brooke Lark / Unsplash" },
  ],

  // ── PORTFOLIO PAGE (16 items) ──────────────────────────────────
  portfolio: [
    { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=80&auto=format&fit=crop", alt: "Adanna & Emeka", category: "Weddings" },
    { src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&q=80&auto=format&fit=crop", alt: "Zara Studio", category: "Portraits" },
    { src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=700&q=80&auto=format&fit=crop", alt: "Luxury Brand", category: "Commercial" },
    { src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=700&q=80&auto=format&fit=crop", alt: "Lagos Fashion Week", category: "Editorial" },
    { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&q=80&auto=format&fit=crop", alt: "Chioma & David", category: "Weddings" },
    { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80&auto=format&fit=crop", alt: "Kofi Corporate", category: "Portraits" },
    { src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=700&q=80&auto=format&fit=crop", alt: "Product Launch", category: "Commercial" },
    { src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=700&q=80&auto=format&fit=crop", alt: "Tolu & Emeka", category: "Weddings" },
    { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=700&q=80&auto=format&fit=crop", alt: "Amara Branding", category: "Portraits" },
    { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80&auto=format&fit=crop", alt: "Art Direction", category: "Editorial" },
    { src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&q=80&auto=format&fit=crop", alt: "Jewellery Campaign", category: "Commercial" },
    { src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=700&q=80&auto=format&fit=crop", alt: "Nkechi & Chidi", category: "Weddings" },
    { src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=700&q=80&auto=format&fit=crop", alt: "Vogue Feature", category: "Editorial" },
    { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=700&q=80&auto=format&fit=crop", alt: "Sade Headshot", category: "Portraits" },
    { src: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=700&q=80&auto=format&fit=crop", alt: "Skincare Brand", category: "Commercial" },
    { src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=700&q=80&auto=format&fit=crop", alt: "Femi & Bola", category: "Weddings" },
  ],
};
