"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { portfolioDemos } from "@/data/portfolio-demos";

const INTERVAL_MS = 4000;

const slides = portfolioDemos.filter((demo) => demo.cover);

export function HeroShowcase() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || paused || slides.length < 2) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [paused, index]);

  const current = slides[index];
  if (!current?.cover) return null;

  const href = current.href ?? `/portfolio/${current.slug}`;

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Link
        href={href}
        aria-label={`Ver demonstração ${current.title}`}
        className="group relative block overflow-hidden rounded-lg border border-[#262626] bg-[#0c0c0c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0070F3]"
      >
        <div className="relative aspect-[16/10]">
          {slides.map((slide, slideIndex) => (
            <Image
              key={slide.slug}
              src={slide.cover ?? ""}
              alt={`Demonstração ${slide.title}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={slideIndex === 0}
              className={`object-cover object-top transition-opacity duration-700 ease-out ${
                slideIndex === index
                  ? "z-10 opacity-100"
                  : "pointer-events-none z-0 opacity-0"
              }`}
            />
          ))}
        </div>
      </Link>

      <div className="mt-3 flex items-center justify-between gap-4">
        <p className="min-w-0 truncate text-sm text-[#6B6B76]">
          {current.title} · {current.category} · Demonstração
        </p>
        <div className="flex shrink-0 gap-1.5" role="tablist" aria-label="Projetos no hero">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.slug}
              type="button"
              role="tab"
              aria-selected={slideIndex === index}
              aria-label={slide.title}
              onClick={() => setIndex(slideIndex)}
              className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0070F3] ${
                slideIndex === index
                  ? "w-5 bg-white"
                  : "w-1.5 bg-[#404040] hover:bg-[#6B6B76]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
