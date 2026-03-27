import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0a0806",
          2: "#111009",
          3: "#181510",
        },
        gold: {
          DEFAULT: "#c9a96e",
          light: "#e8cc9a",
        },
        cream: {
          DEFAULT: "#f5f0e8",
          muted: "rgba(245,240,232,0.45)",
          faint: "rgba(245,240,232,0.12)",
        },
        border: {
          gold: "rgba(201,169,110,0.18)",
        },
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "serif"],
        outfit: ["var(--font-outfit)", "sans-serif"],
      },
      animation: {
        "scroll-pulse": "scrollPulse 2s ease-in-out infinite",
        "fade-up": "fadeUp 1s ease forwards",
        "loader-fade": "loaderFadeIn 0.9s ease forwards",
      },
      keyframes: {
        scrollPulse: {
          "0%, 100%": { transform: "scaleY(1)", opacity: "0.4" },
          "50%": { transform: "scaleY(0.5)", opacity: "1" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        loaderFadeIn: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
