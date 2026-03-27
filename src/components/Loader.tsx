"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Lock scroll while loading
    document.body.style.overflow = "hidden";

    // Ease-out steps: fast start, cinematic slow finish
    const steps = [
      { target: 30, duration: 300 },
      { target: 60, duration: 400 },
      { target: 80, duration: 500 },
      { target: 92, duration: 400 },
      { target: 100, duration: 700 },
    ];

    let stepIndex = 0;
    let currentProgress = 0;
    let rafId: number;
    let timeoutId: ReturnType<typeof setTimeout>;

    function runStep() {
      if (stepIndex >= steps.length) return;

      const step = steps[stepIndex];
      const startVal = currentProgress;
      const endVal = step.target;
      const startTime = performance.now();

      function animate(now: number) {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / step.duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - t, 3);
        currentProgress = startVal + (endVal - startVal) * eased;
        setProgress(Math.round(currentProgress));

        if (t < 1) {
          rafId = requestAnimationFrame(animate);
        } else {
          stepIndex++;
          if (stepIndex < steps.length) {
            timeoutId = setTimeout(runStep, 60);
          } else {
            // All done — fade out loader
            timeoutId = setTimeout(() => {
              setVisible(false);
              document.body.style.overflow = "";
            }, 350);
          }
        }
      }

      rafId = requestAnimationFrame(animate);
    }

    const startTimeout = setTimeout(runStep, 300);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            background: "var(--bg)",
            zIndex: 99999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2.5rem",
          }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "2rem",
              fontWeight: 300,
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              color: "var(--gold2)",
              display: "flex",
              alignItems: "baseline",
              gap: "0",
            }}
          >
            Obsi
            <span style={{ fontStyle: "italic", color: "var(--gold)" }}>
              dian
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginTop: "-2rem",
            }}
          >
            Photography Studio
          </motion.p>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            style={{ width: "280px", display: "flex", flexDirection: "column", gap: "0.65rem" }}
          >
            {/* Track */}
            <div
              style={{
                width: "100%",
                height: "1px",
                background: "rgba(201,169,110,0.15)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Fill */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, var(--gold) 0%, var(--gold2) 100%)",
                  boxShadow: "0 0 8px rgba(201,169,110,0.6)",
                  transition: "width 0.1s linear",
                }}
              >
                {/* Glowing dot at leading edge */}
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translate(50%, -50%)",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "var(--gold2)",
                    boxShadow: "0 0 6px 2px rgba(232,204,154,0.8)",
                  }}
                />
              </div>
            </div>

            {/* Percentage */}
            <div
              style={{
                textAlign: "right",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                color: "var(--gold)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {progress}%
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
