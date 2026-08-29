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
  immediate?: boolean;
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
              style={{ ["--i" as string]: String(index) }}
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

/**
 * Letter-by-letter in/out driven by a CSS class toggled on intersection.
 * Immediate headings start visible so the hero never renders as blank text.
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

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      node.setAttribute("data-in-view", "");
      return;
    }

    const show = () => {
      node.setAttribute("data-in-view", "");
      node.setAttribute("data-seen", "");
    };

    const hide = () => {
      if (!node.hasAttribute("data-seen")) return;
      node.removeAttribute("data-in-view");
    };

    const inViewport = () => {
      const rect = node.getBoundingClientRect();
      return rect.bottom > 40 && rect.top < window.innerHeight - 40;
    };

    if (immediate || inViewport()) show();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) show();
        else hide();
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [immediate]);

  return (
    <Tag
      ref={ref as never}
      className={className}
      data-split-heading=""
      {...(immediate ? { "data-in-view": "" } : {})}
      style={{ ["--split-delay" as string]: `${delayMs}ms` }}
      aria-labelledby={labelId}
    >
      <span id={labelId} className="sr-only">
        {plainText}
      </span>
      <span aria-hidden="true">{splitChildren}</span>
    </Tag>
  );
}
