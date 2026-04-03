"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

const COLS = 5;
const ROWS = 5;
const TOTAL = COLS * ROWS;                 // 25 tiles
const CENTRE_IDX = Math.floor(TOTAL / 2); // index 12 — exact centre

const PHASE1_MS = 2000;
const PHASE2_MS = 650;
const PHASE3_MS = 850;
const EXPAND_MS = 900;

// 25 curated Unsplash photos — mix of wedding, portrait, model, graduation
const TILE_IMAGES = [
  /* ROW 1 */
  "https://res.cloudinary.com/dhxexwrnd/image/upload/c_fill,g_face,q_auto,f_auto/v1775205693/_DSC0093copy_wqniu8.jpg",
  "https://res.cloudinary.com/dhxexwrnd/image/upload/c_fill,g_face,q_auto,f_auto/v1775205690/_DSC0091copy_upbt7p.jpg",
  "https://res.cloudinary.com/dhxexwrnd/image/upload/c_fill,g_face,q_auto,f_auto/v1775205691/_DSC0083copy_wpu6hq.jpg",
  "https://res.cloudinary.com/dhxexwrnd/image/upload/c_fill,g_face,q_auto,f_auto/v1775205690/_DSC0083copy_1_bo857l.jpg",
  "https://res.cloudinary.com/dhxexwrnd/image/upload/c_fill,g_face,q_auto,f_auto/v1775205689/_DSC0071_jfsbuw.jpg",

  /* ROW 2 */
  "https://res.cloudinary.com/dhxexwrnd/image/upload/c_fill,g_face,q_auto,f_auto/v1775205691/_DSC0065copy_qzob8t.jpg",
  "https://res.cloudinary.com/dhxexwrnd/image/upload/c_fill,g_face,q_auto,f_auto/v1775205688/_DSC0064copy_zpzynu.jpg",
  "https://res.cloudinary.com/dhxexwrnd/image/upload/c_fill,g_face,q_auto,f_auto/v1775205688/_DSC0056copy_eqwxyf.jpg",
  "https://res.cloudinary.com/dhxexwrnd/image/upload/c_fill,g_face,q_auto,f_auto/v1775223182/_DSC0324_m4h2ex.jpg",
  "https://res.cloudinary.com/dhxexwrnd/image/upload/c_fill,g_face,q_auto,f_auto/v1775223510/_DSC0505_d2ljkp.jpg",

  /* ROW 3 */
  "https://res.cloudinary.com/dhxexwrnd/image/upload/c_fill,g_face,q_auto,f_auto/v1775223483/_DSC0046_iua3xq.jpg",
  "https://res.cloudinary.com/dhxexwrnd/image/upload/c_fill,g_face,q_auto,f_auto/v1775223458/_DSC0571_sygqqz.jpg",
  "https://res.cloudinary.com/dhxexwrnd/image/upload/c_fill,g_face,q_auto,f_auto/v1775223329/_DSC0569_kux53i.jpg",
  "https://res.cloudinary.com/dhxexwrnd/image/upload/c_fill,g_face,q_auto,f_auto/v1775223303/_DSC0534_qnkogx.jpg",
  "https://res.cloudinary.com/dhxexwrnd/image/upload/c_fill,g_face,q_auto,f_auto/v1775223304/_DSC0527_guslvn.jpg",

  /* ROW 4 */
  "https://res.cloudinary.com/dhxexwrnd/image/upload/c_fill,g_face,q_auto,f_auto/v1775223287/_DSC0514_wx4omt.jpg",
  "https://res.cloudinary.com/dhxexwrnd/image/upload/c_fill,g_face,q_auto,f_auto/v1775223300/_DSC0427_woxkm4.jpg",
  "https://res.cloudinary.com/dhxexwrnd/image/upload/c_fill,g_face,q_auto,f_auto/v1775223430/_DSC0426_jqpvc4.jpg",
  "https://res.cloudinary.com/dhxexwrnd/image/upload/c_fill,g_face,q_auto,f_auto/v1775223240/_DSC0411_e2cwfj.jpg",
  "https://res.cloudinary.com/dhxexwrnd/image/upload/c_fill,g_face,q_auto,f_auto/v1775223238/_DSC0410_ypsvb0.jpg",

  /* ROW 5 */
  "https://res.cloudinary.com/dhxexwrnd/image/upload/c_fill,g_face,q_auto,f_auto/v1775223185/_DSC0283_xgw7wp.jpg",
  "https://res.cloudinary.com/dhxexwrnd/image/upload/c_fill,g_face,q_auto,f_auto/v1775223144/_DSC0271_rmeb0i.jpg",
  "https://res.cloudinary.com/dhxexwrnd/image/upload/c_fill,g_face,q_auto,f_auto/v1775223408/_DSC0257_lx1j7q.jpg",
  "https://res.cloudinary.com/dhxexwrnd/image/upload/c_fill,g_face,q_auto,f_auto/v1775223053/_DSC0148_mrikgi.jpg",
  "https://res.cloudinary.com/dhxexwrnd/image/upload/c_fill,g_face,q_auto,f_auto/v1775223081/_DSC0127_r2dcke.jpg",
];

type Phase = "scramble" | "snap" | "logo" | "expand" | "done";

interface TileState { x: number; y: number; opacity: number; }

export default function PuzzleLoader({ onDone }: { onDone: () => void }) {
  const [phase,     setPhase]     = useState<Phase>("scramble");
  const [tiles,     setTiles]     = useState<TileState[]>(() =>
    Array.from({ length: TOTAL }, () => ({ x: 0, y: 0, opacity: 1 }))
  );
  const [logoAlpha, setLogoAlpha] = useState(0);
  const [scale,     setScale]     = useState(1);
  const [wrapAlpha, setWrapAlpha] = useState(1);
  const raf = useRef<number>(0);

  // Phase 1 — scramble
  useEffect(() => {
    if (phase !== "scramble") return;
    const AMP = 140;
    let start = 0;
    function tick(now: number) {
      if (!start) start = now;
      const elapsed  = now - start;
      const progress = Math.min(elapsed / PHASE1_MS, 1);
      const env = progress < 0.65
        ? progress / 0.65
        : 1 - ((progress - 0.65) / 0.35);
      setTiles(Array.from({ length: TOTAL }, (_, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        if (i === CENTRE_IDX) return { x: 0, y: 0, opacity: 1 };
        return {
          x: Math.sin(elapsed * 0.003 + col * 1.4 + row * 0.8) * AMP * env,
          y: Math.cos(elapsed * 0.004 + row * 1.2 + col * 0.9) * AMP * env,
          opacity: 1,
        };
      }));
      if (progress < 1) raf.current = requestAnimationFrame(tick);
      else setPhase("snap");
    }
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [phase]);

  // Phase 2 — snap
  useEffect(() => {
    if (phase !== "snap") return;
    let start = 0;
    function tick(now: number) {
      if (!start) start = now;
      const t = Math.min((now - start) / PHASE2_MS, 1);
      const e = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setTiles(prev => prev.map(tile => ({ x: tile.x * (1 - e), y: tile.y * (1 - e), opacity: 1 })));
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else { setTiles(Array.from({ length: TOTAL }, () => ({ x: 0, y: 0, opacity: 1 }))); setPhase("logo"); }
    }
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [phase]);

  // Phase 3 — logo fade in, hold
  useEffect(() => {
    if (phase !== "logo") return;
    let start = 0;
    function tick(now: number) {
      if (!start) start = now;
      const t = Math.min((now - start) / 400, 1);
      setLogoAlpha(t);
      if (t < 1) raf.current = requestAnimationFrame(tick);
    }
    raf.current = requestAnimationFrame(tick);
    const hold = setTimeout(() => setPhase("expand"), PHASE3_MS);
    return () => { cancelAnimationFrame(raf.current); clearTimeout(hold); };
  }, [phase]);

  // Phase 4 — expand
  const handleDone = useCallback(onDone, [onDone]);
  useEffect(() => {
    if (phase !== "expand") return;
    let start = 0;
    function tick(now: number) {
      if (!start) start = now;
      const t = Math.min((now - start) / EXPAND_MS, 1);
      const e = t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2;
      setScale(1 + e * 35);
      setWrapAlpha(t < 0.55 ? 1 : 1 - ((t - 0.55) / 0.45));
      setLogoAlpha(1 - e * 2);
      setTiles(prev => prev.map((tile, i) => ({
        ...tile,
        opacity: i === CENTRE_IDX ? 1 : Math.max(0, 1 - t * 4),
      })));
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else { setPhase("done"); handleDone(); }
    }
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [phase, handleDone]);

  if (phase === "done") return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999,
      background: "#080604",
      display: "grid",
      gridTemplateColumns: `repeat(${COLS}, 1fr)`,
      gridTemplateRows: `repeat(${ROWS}, 1fr)`,
      gap: "2px",
      opacity: wrapAlpha,
      overflow: "hidden",
    }}>
      {Array.from({ length: TOTAL }, (_, i) => {
        const isCentre = i === CENTRE_IDX;
        const tile = tiles[i];
        return (
          <div
            key={i}
            style={{
              position: "relative",
              overflow: "hidden",
              transform: `translate(${tile.x}px, ${tile.y}px)${isCentre && phase === "expand" ? ` scale(${scale})` : ""}`,
              opacity: tile.opacity,
              transformOrigin: "center center",
              zIndex: isCentre ? 10 : 1,
              transition: phase === "snap" ? "transform 0.06s ease-out"
                : phase === "expand" && !isCentre ? "opacity 0.18s ease"
                : "none",
            }}
          >
            {/* Photo bg — darkened; centre tile extra dark for logo contrast */}
            <Image
              src={TILE_IMAGES[i]}
              alt=""
              fill
              sizes="20vw"
              style={{
                objectFit: "cover",
                objectPosition: "center",
                filter: isCentre ? "brightness(0.25)" : "brightness(0.45) saturate(0.7)",
              }}
              priority={i < 10}
            />

            {/* Gold border overlay */}
            <div style={{
              position: "absolute", inset: 0,
              border: `1px solid rgba(201,169,110,${isCentre ? 0.55 : 0.15})`,
              pointerEvents: "none",
              zIndex: 2,
            }} />

            {/* Corner accents */}
            {!isCentre && (
              <>
                <div style={{ position: "absolute", top: 5, left: 5, width: 8, height: 8, borderTop: "1px solid rgba(201,169,110,0.25)", borderLeft: "1px solid rgba(201,169,110,0.25)", zIndex: 3 }} />
                <div style={{ position: "absolute", bottom: 5, right: 5, width: 8, height: 8, borderBottom: "1px solid rgba(201,169,110,0.25)", borderRight: "1px solid rgba(201,169,110,0.25)", zIndex: 3 }} />
              </>
            )}

            {/* Logo — centre only */}
            {isCentre && (
              <div style={{
                position: "absolute", inset: 0, zIndex: 4,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                opacity: Math.max(0, logoAlpha),
                userSelect: "none",
              }}>
                {/* TG monogram */}
                <div style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  fontWeight: 300,
                  color: "var(--gold2)",
                  lineHeight: 1,
                  letterSpacing: "0.05em",
                }}>
                  T<span style={{ fontStyle: "italic", color: "var(--gold)", fontSize: "0.65em" }}>G</span>
                </div>
                {/* Thin gold rule */}
                <div style={{ width: "40px", height: "1px", background: "var(--gold)", opacity: 0.6, margin: "8px 0" }} />
                {/* Studio name */}
                <div style={{
                  fontFamily: "var(--font-outfit), sans-serif",
                  fontSize: "clamp(0.5rem, 1vw, 0.65rem)",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "rgba(245,240,232,0.55)",
                }}>
                  Tim's Graphy
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Bottom status label */}
      <div style={{
        position: "fixed", bottom: "1.75rem", left: "50%",
        transform: "translateX(-50%)",
        fontSize: "0.55rem", letterSpacing: "0.32em",
        textTransform: "uppercase",
        color: "rgba(201,169,110,0.35)",
        opacity: phase === "expand" ? 0 : 1,
        transition: "opacity 0.3s",
        zIndex: 99999,
        whiteSpace: "nowrap",
      }}>
        {phase === "scramble" ? "Loading…" : phase === "snap" ? "Assembling…" : "Tim's Graphy"}
      </div>
    </div>
  );
}
