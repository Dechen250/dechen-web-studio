"use client";

import Image from "next/image";
import { useState } from "react";
import { featuredDishes, menuCategories } from "@/data/divina-cozinha";
import { IconArrowLeft, IconArrowRight } from "./icons";

export function MenuBook() {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const category = menuCategories[categoryIndex];

  const prev = () =>
    setCategoryIndex(
      (index) => (index - 1 + menuCategories.length) % menuCategories.length,
    );
  const next = () =>
    setCategoryIndex((index) => (index + 1) % menuCategories.length);

  const dishes = category.items;

  return (
    <section id="cardapio" className="py-16">
      <div className="mb-10 flex items-end justify-between px-2">
        <div>
          <h2 className="font-serif text-4xl text-slate-800 italic">
            Direto da cozinha
          </h2>
          <p className="mt-2 font-mono text-xs tracking-widest text-slate-500 uppercase">
            Novos pratos para experimentar esta semana · preços demonstrativos
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={prev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 transition-colors hover:bg-slate-900 hover:text-white"
            aria-label="Categoria anterior"
          >
            <IconArrowLeft />
          </button>
          <button
            type="button"
            onClick={next}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 transition-colors hover:bg-slate-900 hover:text-white"
            aria-label="Próxima categoria"
          >
            <IconArrowRight />
          </button>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-2 px-2">
        {menuCategories.map((cat, index) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setCategoryIndex(index)}
            aria-pressed={index === categoryIndex}
            className={`rounded-full px-5 py-2 text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
              index === categoryIndex
                ? "bg-slate-950 text-white"
                : "bg-slate-100/70 text-slate-600 hover:bg-white hover:shadow-sm"
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {dishes.map((item) => (
          <article key={item.name} className="group cursor-pointer">
            <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src={item.image}
                alt={item.imageAlt ?? item.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute top-4 left-4">
                <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold tracking-wide uppercase backdrop-blur-sm">
                  {category.badge}
                </span>
              </div>
              <div className="absolute right-4 bottom-4 rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] font-bold tracking-wide text-slate-900 backdrop-blur-sm">
                {item.price}
              </div>
            </div>
            <h3 className="text-lg leading-tight font-bold transition-colors group-hover:text-[#e11d48]">
              {item.name}
            </h3>
            <p className="mt-1 line-clamp-2 text-sm text-slate-500">
              {item.description}
            </p>
            <div className="mt-2 flex items-center gap-2 font-mono text-xs text-slate-400">
              <span>{item.time}</span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span>{item.difficulty}</span>
            </div>
          </article>
        ))}

        {dishes.length < 4 &&
          featuredDishes
            .filter((dish) => !dishes.some((item) => item.name === dish.name))
            .slice(0, 4 - dishes.length)
            .map((item) => (
              <article key={item.name} className="group cursor-pointer">
                <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-2xl">
                  <Image
                    src={item.image}
                    alt={item.imageAlt ?? item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold tracking-wide uppercase backdrop-blur-sm">
                      {item.badge}
                    </span>
                  </div>
                  <div className="absolute right-4 bottom-4 rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] font-bold tracking-wide text-slate-900 backdrop-blur-sm">
                    {item.price}
                  </div>
                </div>
                <h3 className="text-lg leading-tight font-bold transition-colors group-hover:text-[#e11d48]">
                  {item.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                  {item.description}
                </p>
                <div className="mt-2 flex items-center gap-2 font-mono text-xs text-slate-400">
                  <span>{item.time}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <span>{item.difficulty}</span>
                </div>
              </article>
            ))}
      </div>
    </section>
  );
}
