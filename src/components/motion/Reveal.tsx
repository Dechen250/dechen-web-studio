"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay after the element becomes visible */
  delayMs?: number;
  /** Animate on mount (above-the-fold heroes) without waiting for scroll */
  immediate?: boolean;
};

/**
 * Scroll-aware fade-up reveal using a CSS keyframe animation.
 * Keyframes run reliably when the visible class is added (unlike transitions,
 * which can skip if the initial state never paints).
 */
export function Reveal({
  children,
  className = "",
  delayMs = 0,
  immediate = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reveal = () => {
      node.classList.add("dws-reveal-visible");
    };

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      reveal();
      return;
    }

    if (immediate) {
      // Double rAF: wait until after the browser paints opacity: 0
      let inner = 0;
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(reveal);
      });
      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [immediate]);

  const style: CSSProperties | undefined =
    delayMs > 0 ? { animationDelay: `${delayMs}ms` } : undefined;

  return (
    <div
      ref={ref}
      className={`dws-reveal${className ? ` ${className}` : ""}`}
      style={style}
    >
      {children}
    </div>
  );
}
