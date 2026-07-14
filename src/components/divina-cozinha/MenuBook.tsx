"use client";

import { useCallback, useEffect, useState } from "react";
import {
  hasValidMenuImage,
  menuCategories,
  type MenuItem,
} from "@/data/divina-cozinha";
import { SectionHeading } from "./ui";

const INTERVAL_MS = 10000;

function MenuDishCard({
  item,
  categoryLabel,
}: {
  item: MenuItem;
  categoryLabel: string;
}) {
  const showImage = hasValidMenuImage(item);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#E8E0D4] bg-[#FFFDF8] transition-shadow duration-500 hover:shadow-[0_8px_30px_rgba(61,56,50,0.08)]">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A962]/50 to-transparent"
      />

      {showImage && item.image && (
        <div className="relative aspect-[16/10] overflow-hidden border-b border-[#E8E0D4]">
          <img
            src={item.image}
            alt={item.imageAlt ?? item.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <span className="mb-4 text-[10px] font-medium tracking-[0.22em] text-[#8B9A7D] uppercase">
          {categoryLabel}
        </span>

        <div className="mb-4 flex items-start justify-between gap-4 border-b border-[#E8E0D4]/80 pb-4">
          <h4 className="font-display text-lg font-medium leading-snug text-[#3D3832] md:text-xl">
            {item.name}
          </h4>
          <span className="shrink-0 pt-0.5 font-sans text-sm font-medium tracking-wide text-[#C9A962]">
            {item.price}
          </span>
        </div>

        <p className="flex-1 font-sans text-sm leading-relaxed text-[#6B6560]">
          {item.description}
        </p>

        <span
          aria-hidden
          className="mt-5 block h-px w-8 bg-[#C9A962]/35 transition-all duration-500 group-hover:w-14"
        />
      </div>
    </article>
  );
}

export function MenuBook() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    if (index === activeIndex) return;
    setIsFlipping(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsFlipping(false);
    }, 350);
  }, [activeIndex]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % menuCategories.length);
        setIsFlipping(false);
      }, 350);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused]);

  const category = menuCategories[activeIndex];

  return (
    <section
      id="cardapio"
      className="bg-[#FFFDF8] px-5 py-24 md:px-8 md:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Cardápio"
          title="Sabores preparados para surpreender."
          description="Cada receita foi criada para valorizar ingredientes frescos, equilíbrio de sabores e uma apresentação impecável."
        />

        <div className="mb-8 flex flex-wrap justify-center gap-2 md:gap-3">
          {menuCategories.map((cat, index) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => goTo(index)}
              aria-pressed={activeIndex === index}
              className={`rounded-full px-5 py-2 font-sans text-sm transition-all duration-500 ease-out ${
                activeIndex === index
                  ? "bg-[#8B9A7D] text-white shadow-[0_2px_12px_rgba(139,154,125,0.25)]"
                  : "border border-[#E8E0D4] bg-[#FAF9F6] text-[#6B6560] hover:border-[#C9A962]/40"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        <div className="perspective-[1400px]">
          <div
            className={`origin-left rounded-3xl border border-[#E8E0D4] bg-[#FAF9F6] p-6 shadow-[0_8px_40px_rgba(61,56,50,0.08)] transition-all duration-700 ease-out md:p-10 ${
              isFlipping
                ? "rotate-y-90 opacity-0 scale-[0.98]"
                : "rotate-y-0 opacity-100 scale-100"
            }`}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="mb-8 border-b border-[#E8E0D4] pb-6">
              <h3 className="font-display text-2xl font-medium text-[#3D3832] md:text-3xl">
                {category.title}
              </h3>
              <p className="mt-2 font-sans text-sm text-[#6B6560] md:text-base">
                {category.description}
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {category.items.map((item) => (
                <MenuDishCard
                  key={item.name}
                  item={item}
                  categoryLabel={category.title}
                />
              ))}
            </div>
          </div>
        </div>

        <p className="mt-6 text-center font-sans text-xs text-[#9C958D]">
          O cardápio alterna automaticamente a cada 10 segundos — clique nas
          categorias para navegar.
        </p>
      </div>
    </section>
  );
}
