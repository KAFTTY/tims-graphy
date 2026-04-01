"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition() {
  const pathname   = usePathname();
  const [visible,  setVisible]  = useState(false);
  const [opacity,  setOpacity]  = useState(0);
  const prevPath   = useRef(pathname);
  const raf        = useRef<number>(0);
  const timeout    = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;

    // Trigger: fade in bar
    setVisible(true);
    setOpacity(0);
    cancelAnimationFrame(raf.current);
    clearTimeout(timeout.current);

    let start = 0;
    const FADE_IN  = 180;
    const HOLD     = 320;
    const FADE_OUT = 280;

    function fadeIn(now: number) {
      if (!start) start = now;
      const t = Math.min((now - start) / FADE_IN, 1);
      setOpacity(t);
      if (t < 1) raf.current = requestAnimationFrame(fadeIn);
      else {
        timeout.current = setTimeout(() => {
          start = 0;
          requestAnimationFrame(fadeOut);
        }, HOLD);
      }
    }

    function fadeOut(now: number) {
      if (!start) start = now;
      const t = Math.min((now - start) / FADE_OUT, 1);
      setOpacity(1 - t);
      if (t < 1) raf.current = requestAnimationFrame(fadeOut);
      else setVisible(false);
    }

    raf.current = requestAnimationFrame(fadeIn);
    return () => { cancelAnimationFrame(raf.current); clearTimeout(timeout.current); };
  }, [pathname]);

  if (!visible) return null;

  return (
    <>
      {/* Full-screen dark flash */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 99990,
        background: "var(--bg)",
        opacity: opacity * 0.65,
        pointerEvents: "none",
      }} />

      {/* Gold progress bar at top */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0,
        height: "2px", zIndex: 99991,
        background: "rgba(201,169,110,0.15)",
        pointerEvents: "none",
      }}>
        <div style={{
          height: "100%",
          background: "linear-gradient(90deg, var(--gold) 0%, var(--gold2) 100%)",
          boxShadow: "0 0 10px rgba(201,169,110,0.7)",
          width: `${opacity * 100}%`,
          transition: "width 0.05s linear",
        }} />
      </div>
    </>
  );
}
