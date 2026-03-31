"use client";

import { useEffect, useRef, useState } from "react";
import { TYPEWRITER_WORDS } from "@/lib/constants";

export default function Typewriter() {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const charIndex = useRef(0);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    function tick() {
      const word = TYPEWRITER_WORDS[wordIndex];

      if (!deleting) {
        charIndex.current += 1;
        setDisplayed(word.slice(0, charIndex.current));

        if (charIndex.current === word.length) {
          // Pause at full word before deleting
          timeout.current = setTimeout(() => {
            setDeleting(true);
          }, 2000);
          return;
        }
        timeout.current = setTimeout(tick, 90);
      } else {
        charIndex.current -= 1;
        setDisplayed(word.slice(0, charIndex.current));

        if (charIndex.current === 0) {
          setDeleting(false);
          setWordIndex((i) => (i + 1) % TYPEWRITER_WORDS.length);
          timeout.current = setTimeout(tick, 400);
          return;
        }
        timeout.current = setTimeout(tick, 55);
      }
    }

    // Initial delay before starting
    timeout.current = setTimeout(tick, 2200);

    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordIndex, deleting]);

  return (
    <div
      style={{
        fontFamily: "var(--font-cormorant), serif",
        fontSize: "clamp(1.4rem, 3.5vw, 2.6rem)",
        fontWeight: 300,
        fontStyle: "italic",
        color: "var(--muted)",
        marginBottom: "3rem",
        minHeight: "3rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
      }}
    >
      <span>We tell stories through&nbsp;</span>
      <span
        style={{
          color: "var(--gold2)",
          borderRight: "2px solid var(--gold)",
          paddingRight: "4px",
          animation: "cursorBlink 0.7s step-end infinite",
        }}
      >
        {displayed}
      </span>

      <style>{`
        @keyframes cursorBlink {
          0%, 100% { border-color: var(--gold); }
          50%       { border-color: transparent; }
        }
      `}</style>
    </div>
  );
}
