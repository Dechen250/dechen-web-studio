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

type SplitTag = "h1" | "h2";

type SplitHeadingProps = {
  as?: SplitTag;
  children: ReactNode;
  className?: string;
  /** Type on mount when already above the fold */
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
              style={{ opacity: 0 }}
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
 * Types the heading letter by letter when it enters the viewport.
 * The title stays in place after it is written. Screen readers get the
 * full sentence via a visually hidden copy.
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
    let played = false;
    let animations: Animation[] = [];
    let timer = 0;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const showFinal = () => {
      node.removeAttribute("data-typing");
      for (const el of chars) el.style.opacity = "1";
    };

    if (reduceMotion || typeof node.animate !== "function") {
      showFinal();
      return;
    }

    const type = () => {
      if (cancelled || played) return;
      played = true;
      node.setAttribute("data-typing", "");

      const step = 52;
      animations = chars.map((el, i) =>
        el.animate([{ opacity: 1 }], {
          duration: 1,
          delay: delayMs + i * step,
          easing: "step-end",
          fill: "forwards",
        }),
      );

      const last = animations[animations.length - 1];
      last?.finished
        .then(() => {
          if (cancelled) return;
          node.removeAttribute("data-typing");
          commitAndCancel(animations);
          showFinal();
        })
        .catch(() => {
          if (!cancelled) showFinal();
        });
    };

    if (immediate) {
      timer = window.setTimeout(type, 50);
      return () => {
        cancelled = true;
        window.clearTimeout(timer);
        commitAndCancel(animations);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          type();
          observer.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);

    return () => {
      cancelled = true;
      observer.disconnect();
      commitAndCancel(animations);
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
      <span aria-hidden="true">
        {splitChildren}
        <span className="dws-caret" />
      </span>
    </Tag>
  );
}
