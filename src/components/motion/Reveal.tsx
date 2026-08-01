"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay after the element becomes visible */
  delayMs?: number;
  /** Animate on mount (above-the-fold heroes) without waiting for scroll */
  immediate?: boolean;
};

/**
 * Scroll-aware fade-up reveal powered by the Web Animations API.
 * Uses commitStyles() so the final state sticks after the animation ends.
 *
 * Important: play-state is local to the effect (not a ref) so React Strict Mode
 * remounts can still run the entrance animation.
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

    let cancelled = false;
    let played = false;
    let animation: Animation | null = null;
    let timer = 0;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const showFinal = () => {
      node.style.opacity = "1";
      node.style.transform = "translateY(0px)";
    };

    const play = () => {
      if (cancelled || played) return;
      played = true;

      if (reduceMotion || typeof node.animate !== "function") {
        showFinal();
        return;
      }

      node.style.opacity = "0";
      node.style.transform = "translateY(40px)";

      animation = node.animate(
        [
          { opacity: 0, transform: "translateY(40px)" },
          { opacity: 1, transform: "translateY(0px)" },
        ],
        {
          duration: 1100,
          delay: delayMs,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          fill: "forwards",
        },
      );

      animation.finished
        .then(() => {
          if (cancelled) return;
          try {
            animation?.commitStyles();
            animation?.cancel();
          } catch {
            showFinal();
          }
        })
        .catch(() => {
          if (!cancelled) showFinal();
        });
    };

    if (reduceMotion) {
      showFinal();
      return;
    }

    if (immediate) {
      timer = window.setTimeout(play, 50);
    } else {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            play();
            observer.disconnect();
          }
        },
        { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
      );

      observer.observe(node);

      return () => {
        cancelled = true;
        observer.disconnect();
        animation?.cancel();
      };
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      animation?.cancel();
    };
  }, [delayMs, immediate]);

  return (
    <div
      ref={ref}
      className={className}
      data-reveal=""
      style={{
        opacity: 0,
        transform: "translateY(40px)",
      }}
    >
      {children}
    </div>
  );
}
