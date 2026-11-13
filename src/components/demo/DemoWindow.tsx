"use client";

import Link from "next/link";
import { useEffect, type ReactNode } from "react";
import { FOCUS } from "@/components/dws/ui";

const shellStyle = {
  position: "fixed",
  inset: 0,
  zIndex: 60,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  background: "#050505",
  color: "#fff",
} as const;

function useDemoScrollLock() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, []);
}

function ArrowLeft() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M19 12H5M5 12L11 6M5 12L11 18"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DemoWindow({
  src,
  title,
  children,
}: {
  src: string;
  title: string;
  children: ReactNode;
}) {
  useDemoScrollLock();

  return (
    <div style={shellStyle}>
      <div style={{ flexShrink: 0 }}>{children}</div>
      <div
        className="flex h-12 shrink-0 items-center gap-3 border-b border-white/[0.06] bg-[#050505] px-3 md:px-4"
        style={{ display: "flex", height: 48, flexShrink: 0, alignItems: "center" }}
      >
        <Link
          href="/#trabalhos"
          aria-label="Voltar aos trabalhos"
          className={`inline-flex h-9 shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] pr-3.5 pl-2.5 text-sm font-medium text-white transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.08] ${FOCUS}`}
        >
          <ArrowLeft />
          Voltar
        </Link>
        <p className="min-w-0 truncate text-sm text-[#8A8A96]">
          <span className="text-[#E4E4E7]">{title}</span>
          <span> · Demonstração</span>
        </p>
      </div>

      <div
        className="dws-demo-stage bg-[#0c0c0c]"
        style={{ flex: 1, minHeight: 0, display: "flex", background: "#0c0c0c" }}
      >
        <div
          className="overflow-hidden bg-white md:rounded-lg md:border md:border-[#262626]"
          style={{ flex: 1, minHeight: 0, display: "flex", overflow: "hidden", background: "#fff" }}
        >
          <iframe
            src={src}
            title={`Demonstração ${title}`}
            style={{ flex: 1, width: "100%", height: "100%", border: 0, background: "#fff" }}
          />
        </div>
      </div>
    </div>
  );
}
