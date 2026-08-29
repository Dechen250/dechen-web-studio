"use client";

import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  type ReactNode,
} from "react";

type SplitTag = "h1" | "h2" | "h3" | "p" | "span";

type SplitHeadingProps = {
  as?: SplitTag;
  children: ReactNode;
  className?: string;
  /** Animate on mount when already above the fold */
  immediate?: boolean;
  /** Extra delay before the first letter (ms) */
  delayMs?: number;
};

type Counter = { n: number };

function flattenText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(flattenText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    if (node.type === "br") return " ";
    return flattenText(node.props.children);
  }
  return "";
}

function splitString(text: string, counter: Counter): ReactNode[] {
  return text.split(/(\s+)/).map((part, i) => {
    if (part === "") return null;
    if (/^\s+$/.test(part)) return part;

    const chars = Array.from(part);
    const wordKey = `w-${counter.n}-${i}`;

    return (
      <span key={wordKey} className="inline-block whitespace-nowrap">
        {chars.map((ch) => {
          const index = counter.n++;
          return (
            <span
              key={index}
              data-split-char=""
              className="inline-block"
              style={{
                opacity: 0,
                transform: "translateY(0.55em)",
              }}
            >
              {ch}
            </span>
          );
        })}
      </span>
    );
  });
}

function renderSplit(node: ReactNode, counter: Counter): ReactNode {
  if (node == null || typeof node === "boolean") return node;
  if (typeof node === "string" || typeof node === "number") {
    return splitString(String(node), counter);
  }
  if (Array.isArray(node)) {
    return Children.map(node, (child) => renderSplit(child, counter));
  }
  if (isValidElement<{ children?: ReactNode }>(node)) {
    if (node.type === Fragment) {
      return renderSplit(node.props.children, counter);
    }
    if (node.type === "br") return node;
    return cloneElement(node, undefined, renderSplit(node.props.children, counter));
  }
  return node;
}

function commitAndCancel(animations: Animation[]) {
  for (const animation of animations) {
    try {
      animation.commitStyles();
    } catch {
      /* ignore uncommitted animations */
    }
    animation.cancel();
  }
}

/**
 * Splits heading text into letters that fade in when the heading enters
 * the viewport and fade out when it leaves. Screen readers get the full
 * sentence via a visually hidden copy.
 */
export function SplitHeading({
  as: Tag = "h2",
  children,
  className = "",
  immediate = false,
  delayMs = 0,
}: SplitHeadingProps) {
  const ref = useRef<HTMLElement>(null);
  const labelId = useId();
  const plainText = flattenText(children).replace(/\s+/g, " ").trim();
  const splitChildren = renderSplit(children, { n: 0 });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const chars = Array.from(
      node.querySelectorAll<HTMLElement>("[data-split-char]"),
    );
    if (chars.length === 0) return;

    let cancelled = false;
    let visible = false;
    let animations: Animation[] = [];
    let timer = 0;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const showFinal = () => {
      for (const el of chars) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0px)";
      }
    };

    const hideFinal = () => {
      for (const el of chars) {
        el.style.opacity = "0";
        el.style.transform = "translateY(0.55em)";
      }
    };

    if (reduceMotion || typeof node.animate !== "function") {
      showFinal();
      return;
    }

    const playIn = () => {
      if (cancelled) return;
      commitAndCancel(animations);
      animations = chars.map((el, i) =>
        el.animate(
          [
            { opacity: 0, transform: "translateY(0.55em)" },
            { opacity: 1, transform: "translateY(0px)" },
          ],
          {
            duration: 720,
            delay: delayMs + Math.min(i * 22, 880),
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            fill: "forwards",
          },
        ),
      );
    };

    const playOut = () => {
      if (cancelled) return;
      commitAndCancel(animations);
      const last = chars.length - 1;
      animations = chars.map((el, i) =>
        el.animate(
          [
            { opacity: 1, transform: "translateY(0px)" },
            { opacity: 0, transform: "translateY(-0.35em)" },
          ],
          {
            duration: 340,
            delay: Math.min((last - i) * 12, 280),
            easing: "cubic-bezier(0.4, 0, 1, 1)",
            fill: "forwards",
          },
        ),
      );
    };

    const show = () => {
      if (visible) return;
      visible = true;
      playIn();
    };

    const hide = () => {
      if (!visible) return;
      visible = false;
      playOut();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.18) show();
        else if (!entry.isIntersecting) hide();
      },
      {
        threshold: [0, 0.18, 0.4, 0.7],
        rootMargin: "-10% 0px -16% 0px",
      },
    );

    observer.observe(node);

    if (immediate) {
      timer = window.setTimeout(() => {
        const rect = node.getBoundingClientRect();
        const inView = rect.bottom > 80 && rect.top < window.innerHeight - 80;
        if (inView) show();
      }, 60);
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      observer.disconnect();
      commitAndCancel(animations);
      if (visible) showFinal();
      else hideFinal();
    };
  }, [delayMs, immediate]);

  return (
    <Tag
      ref={ref as never}
      className={className}
      data-split-heading=""
      aria-labelledby={labelId}
    >
      <span id={labelId} className="sr-only">
        {plainText}
      </span>
      <span aria-hidden="true">{splitChildren}</span>
    </Tag>
  );
}
