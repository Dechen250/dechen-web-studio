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
 * Scroll-aware fade-up reveal.
 * Toggles a CSS class via IntersectionObserver (no React state) so motion
 * stays aligned with the brand guide and React Compiler lint rules.
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
    if (media.matches || immediate) {
      const frame = requestAnimationFrame(reveal);
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [immediate]);

  const style: CSSProperties | undefined =
    delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined;

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
