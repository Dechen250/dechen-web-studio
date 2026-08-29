"use client";

import { useEffect, useRef } from "react";

type Glyph = {
  ch: string;
  x: string;
  y: string;
  size: string;
  delay: string;
  duration: string;
  md?: boolean;
};

const glyphs: Glyph[] = [
  { ch: "D", x: "5%", y: "10%", size: "clamp(5rem, 14vw, 10rem)", delay: "0s", duration: "11s" },
  { ch: "E", x: "78%", y: "6%", size: "clamp(3.5rem, 9vw, 7rem)", delay: "1.2s", duration: "13s", md: true },
  { ch: "C", x: "88%", y: "38%", size: "clamp(4rem, 10vw, 8rem)", delay: "2.4s", duration: "10s" },
  { ch: "H", x: "8%", y: "42%", size: "clamp(3rem, 8vw, 6.5rem)", delay: "0.6s", duration: "14s", md: true },
  { ch: "N", x: "62%", y: "72%", size: "clamp(4.5rem, 11vw, 8.5rem)", delay: "3.1s", duration: "12s" },
  { ch: "W", x: "42%", y: "8%", size: "clamp(3.2rem, 8vw, 6rem)", delay: "1.8s", duration: "15s" },
  { ch: "E", x: "18%", y: "78%", size: "clamp(3.8rem, 9vw, 7rem)", delay: "2.8s", duration: "11s" },
  { ch: "B", x: "82%", y: "82%", size: "clamp(3rem, 7vw, 5.5rem)", delay: "0.4s", duration: "13s", md: true },
  { ch: "S", x: "28%", y: "52%", size: "clamp(5.5rem, 13vw, 9.5rem)", delay: "2.1s", duration: "16s" },
  { ch: "T", x: "70%", y: "22%", size: "clamp(2.8rem, 7vw, 5rem)", delay: "3.6s", duration: "12s", md: true },
  { ch: "U", x: "48%", y: "88%", size: "clamp(3.4rem, 8vw, 6.2rem)", delay: "1.1s", duration: "14s" },
  { ch: "I", x: "92%", y: "58%", size: "clamp(2.6rem, 6vw, 4.8rem)", delay: "2.6s", duration: "10s", md: true },
  { ch: "O", x: "2%", y: "88%", size: "clamp(3.6rem, 9vw, 6.8rem)", delay: "0.9s", duration: "15s", md: true },
  { ch: "D", x: "54%", y: "38%", size: "clamp(2.4rem, 6vw, 4.5rem)", delay: "3.4s", duration: "11s", md: true },
];

/**
 * Fixed ambient glow + drifting brand letters. Motion lives in globals.css
 * so reduced-motion can kill it in one place.
 */
export function AmbientBackground() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      const y = window.scrollY * 0.14;
      stage.style.transform = `translate3d(0, ${y}px, 0)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="dws-ambient pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="dws-ambient__wash" />
      <div ref={stageRef} className="dws-ambient__stage">
        <div className="dws-orb-slot dws-orb-slot--hero">
          <div className="dws-orb dws-orb--hero" />
        </div>
        <div className="dws-orb-slot dws-orb-slot--left">
          <div className="dws-orb dws-orb--left" />
        </div>
        <div className="dws-orb-slot dws-orb-slot--right">
          <div className="dws-orb dws-orb--right" />
        </div>
        <div className="dws-orb-slot dws-orb-slot--core">
          <div className="dws-orb dws-orb--core" />
        </div>
        <div className="dws-letter-field">
          {glyphs.map((glyph, index) => (
            <span
              key={`${glyph.ch}-${index}`}
              className={glyph.md ? "dws-glyph dws-glyph--md" : "dws-glyph"}
              style={{
                left: glyph.x,
                top: glyph.y,
                fontSize: glyph.size,
                animation: `dws-glyph-breathe ${glyph.duration} ${glyph.delay} ease-in-out infinite`,
              }}
            >
              {glyph.ch}
            </span>
          ))}
        </div>
      </div>
      <div className="dws-ambient__vignette" />
    </div>
  );
}
