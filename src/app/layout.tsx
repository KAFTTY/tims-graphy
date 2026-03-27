import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import CursorSpotlight from "@/components/CursorSpotlight";
import JsonLd from "@/components/JsonLd";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-outfit",
  display: "swap",
});

const BASE_URL = "https://obsidianstudio.ng";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Obsidian Studio — Photography",
    template: "%s — Obsidian Studio",
  },
  description:
    "Award-winning photography studio based in Lagos, Nigeria. Specialising in weddings, portraits, and commercial photography.",
  keywords: [
    "photography Lagos",
    "wedding photographer Lagos",
    "portrait photographer Nigeria",
    "commercial photography Lagos",
    "Obsidian Studio",
    "professional photographer Nigeria",
  ],
  authors: [{ name: "Obsidian Studio", url: BASE_URL }],
  creator: "Obsidian Studio",
  publisher: "Obsidian Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: BASE_URL,
    siteName: "Obsidian Studio",
    title: "Obsidian Studio — Photography",
    description:
      "Award-winning photography studio based in Lagos, Nigeria. Weddings, portraits & commercial work.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Obsidian Studio — Photography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Obsidian Studio — Photography",
    description:
      "Award-winning photography studio based in Lagos, Nigeria.",
    images: ["/og-image.jpg"],
    creator: "@obsidianstudiong",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0a0806" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body>
        <JsonLd />
        <CursorSpotlight />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
