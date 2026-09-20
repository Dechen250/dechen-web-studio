"use client";

import { useEffect, useState } from "react";
import { testimonials } from "@/data/barbearia-royal";
import { IconStar } from "./icons";
import { SectionTag } from "./ui";

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  const current = testimonials[index];

  return (
    <section
      className="relative overflow-hidden px-5 py-20 md:px-12 lg:px-20 lg:py-32"
      id="depoimentos"
    >
      <div className="font-bebas pointer-events-none absolute top-1/2 left-1/2 -z-0 -translate-x-1/2 -translate-y-1/2 text-[22vw] leading-none text-[#C8A97E]/[0.06] select-none">
        AVALIAÇÕES
      </div>
      <div className="relative z-10 text-center">
        <SectionTag text="Depoimentos" centered />
        <h2 className="font-bebas mb-12 text-[clamp(2.2rem,4vw,4rem)] leading-[1.05] tracking-[0.05em]">
          O QUE NOSSOS{" "}
          <span className="font-serif text-[0.72em] font-normal text-[#C8A97E] italic">
            Clientes
          </span>{" "}
          DIZEM
        </h2>
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex justify-center gap-1 text-[#C8A97E]" aria-hidden>
            {Array.from({ length: 5 }).map((_, star) => (
              <IconStar key={star} className="h-4 w-4" />
            ))}
          </div>
          <p className="font-serif text-xl leading-relaxed text-[#E8E6E1] italic md:text-2xl">
            “ {current.quote} ”
          </p>
          <div className="font-bebas mt-8 text-lg tracking-[0.12em]">
            {current.name}
          </div>
          <div className="mt-2 text-[11px] tracking-[0.2em] text-[#999] uppercase">
            {current.detail}
          </div>
        </div>
        <div className="mt-10 flex justify-center gap-3">
          {testimonials.map((item, itemIndex) => (
            <button
              key={item.name}
              type="button"
              className={`h-2 w-2 rounded-full transition ${
                itemIndex === index ? "bg-[#C8A97E]" : "bg-[#FAFAF9]/20"
              }`}
              aria-label={`Ver depoimento de ${item.name}`}
              onClick={() => setIndex(itemIndex)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
