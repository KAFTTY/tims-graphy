"use client";

import { useEffect, useRef } from "react";

export default function CursorSpotlight() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const spot = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    const spotlight = spotlightRef.current;
    if (!cursor || !spotlight) return;

    // Track raw mouse position — cursor snaps instantly
    function onMove(e: MouseEvent) {
      if (!cursor) return;
      mouse.current = { x: e.clientX, y: e.clientY };
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    }

    // Spotlight lags behind with lerp
    function animateSpotlight() {
      if (!spotlight) return;
      spot.current.x += (mouse.current.x - spot.current.x) * 0.08;
      spot.current.y += (mouse.current.y - spot.current.y) * 0.08;
      spotlight.style.left = spot.current.x + "px";
      spotlight.style.top = spot.current.y + "px";
      rafRef.current = requestAnimationFrame(animateSpotlight);
    }
    rafRef.current = requestAnimationFrame(animateSpotlight);

    // Expand cursor on interactive elements
    function onEnter() {
      if (!cursor) return;
      cursor.style.width = "28px";
      cursor.style.height = "28px";
      cursor.style.background = "rgba(201,169,110,0.5)";
    }
    function onLeave() {
      if (!cursor) return;
      cursor.style.width = "12px";
      cursor.style.height = "12px";
      cursor.style.background = "var(--gold)";
    }

    function attachListeners() {
      document
        .querySelectorAll("a, button, .gallery-item")
        .forEach((el) => {
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        });
    }
    attachListeners();

    // Re-attach when DOM changes (e.g. after loader unmounts)
    const mo = new MutationObserver(attachListeners);
    mo.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      mo.disconnect();
    };
  }, []);

  return (
    <>
      {/* Hard dot — snaps to cursor */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          width: "12px",
          height: "12px",
          background: "var(--gold)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99998,
          transform: "translate(-50%, -50%)",
          transition: "width 0.3s, height 0.3s, background 0.3s",
          mixBlendMode: "screen",
        }}
      />
      {/* Soft glow — lags behind */}
      <div
        ref={spotlightRef}
        style={{
          position: "fixed",
          width: "380px",
          height: "380px",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99997,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 70%)",
        }}
      />
    </>
  );
}
