"use client";

import { useEffect } from "react";

export function useParallax() {
  useEffect(() => {
    function onScroll() {
      const sy = window.scrollY;

      const heroBg = document.getElementById("hero-bg");
      const heroGrid = document.getElementById("hero-grid");
      const quoteBg = document.getElementById("quote-bg");

      if (heroBg) heroBg.style.transform = `translateY(${sy * 0.35}px)`;
      if (heroGrid) heroGrid.style.transform = `translateY(${sy * 0.18}px)`;

      if (quoteBg) {
        const section = quoteBg.closest("[data-parallax]") as HTMLElement;
        if (section) {
          const top = section.getBoundingClientRect().top + sy;
          const offset = (sy - top) * 0.3;
          quoteBg.style.transform = `translateY(${offset}px)`;
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}
