"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

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
 * Respects prefers-reduced-motion and brand motion tokens (ease-out, ~300ms).
 */
export function Reveal({
  children,
  className = "",
  delayMs = 0,
  immediate = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (media.matches) {
      setVisible(true);
      return;
    }

    if (immediate) {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [immediate]);

  const style: CSSProperties | undefined =
    delayMs > 0 && visible
      ? { transitionDelay: `${delayMs}ms` }
      : undefined;

  return (
    <div
      ref={ref}
      className={`dws-reveal${visible ? " dws-reveal-visible" : ""}${className ? ` ${className}` : ""}`}
      style={style}
    >
      {children}
    </div>
  );
}
