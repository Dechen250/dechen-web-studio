"use client";

import Image from "next/image";
import { useState } from "react";
import { cuisineList } from "@/data/divina-cozinha";
import { IconArrowRight } from "./icons";

export function Flavors() {
  const [active, setActive] = useState(0);
  const current = cuisineList[active];

  return (
    <section className="py-16">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="flex flex-col justify-center lg:col-span-4">
          <h2 className="mb-8 font-serif text-4xl">Sabores da casa</h2>
          <div className="space-y-1">
            {cuisineList.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(index)}
                className={`group w-full cursor-pointer rounded-lg border-b border-slate-200 py-4 text-left transition-all duration-300 hover:bg-white hover:pl-4 ${
                  index === active ? "bg-white pl-4" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm font-bold tracking-widest uppercase transition-colors ${
                      index === active
                        ? "text-slate-900"
                        : "text-slate-400 group-hover:text-slate-900"
                    }`}
                  >
                    {item.id}. {item.name}
                  </span>
                  <IconArrowRight
                    className={`h-4 w-4 transition-all ${
                      index === active
                        ? "text-[#e11d48] opacity-100"
                        : "text-slate-300 opacity-0 group-hover:text-[#e11d48] group-hover:opacity-100"
                    }`}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="group relative flex min-h-[500px] items-center justify-center overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 md:p-12 lg:col-span-8">
          <Image
            src={current.image}
            alt={current.name}
            fill
            className="object-cover opacity-40 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-55"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          <div className="relative z-10 max-w-sm rounded-2xl border border-white/10 bg-white/10 p-6 text-white backdrop-blur-md">
            <span className="mb-2 block font-mono text-[10px] tracking-widest text-white/70 uppercase">
              {current.id} · Em destaque
            </span>
            <h3 className="font-serif text-3xl leading-tight">{current.name}</h3>
            <a
              href="#cardapio"
              className="mt-4 inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase hover:text-[#e11d48]"
            >
              Ver na carta
              <IconArrowRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
