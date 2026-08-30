"use client";

import Image from "next/image";
import { useCallback, useRef, useState, type PointerEvent } from "react";
import { testimonials, testimonialStats } from "@/data/divina-cozinha";
import { IconArrowRight, IconHand, IconStar } from "./icons";

const STACK = [
  { scale: 1, y: 0, opacity: 1, z: 30 },
  { scale: 0.95, y: 16, opacity: 0.7, z: 20 },
  { scale: 0.9, y: 32, opacity: 0.4, z: 10 },
] as const;

export function Testimonials() {
  const [order, setStateOrder] = useState([0, 1, 2]);
  const [drag, setDrag] = useState({ x: 0, y: 0, rotating: 0, active: false });
  const start = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);

  const cycle = useCallback(() => {
    setStateOrder((prev) => [prev[1], prev[2], prev[0]]);
    pos.current = { x: 0, y: 0 };
    setDrag({ x: 0, y: 0, rotating: 0, active: false });
  }, []);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    start.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDrag((prev) => ({ ...prev, active: true }));
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const x = event.clientX - start.current.x;
    const y = event.clientY - start.current.y;
    pos.current = { x, y };
    setDrag({ x, y, rotating: x * 0.08, active: true });
  };

  const onPointerUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    const { x, y } = pos.current;
    if (Math.abs(x) > 120) {
      const direction = x > 0 ? 1 : -1;
      setDrag({
        x: direction * 480,
        y,
        rotating: direction * 28,
        active: false,
      });
      window.setTimeout(cycle, 280);
    } else {
      pos.current = { x: 0, y: 0 };
      setDrag({ x: 0, y: 0, rotating: 0, active: false });
    }
  };

  return (
    <section className="overflow-hidden border-t border-slate-200 bg-slate-50/30 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div
            className="perspective-1000 relative flex h-[480px] w-full select-none items-center justify-center"
            aria-label="Depoimentos — arraste o card"
          >
            {order.map((testimonialIndex, stackIndex) => {
              const item = testimonials[testimonialIndex];
              const layer = STACK[stackIndex];
              const isTop = stackIndex === 0;

              return (
                <div
                  key={item.name}
                  data-card={stackIndex}
                  onPointerDown={isTop ? onPointerDown : undefined}
                  onPointerMove={isTop ? onPointerMove : undefined}
                  onPointerUp={isTop ? onPointerUp : undefined}
                  onPointerCancel={isTop ? onPointerUp : undefined}
                  className={`absolute w-[340px] rounded-3xl border border-slate-200/60 bg-white p-8 ${
                    isTop
                      ? "z-30 cursor-grab touch-none shadow-2xl active:cursor-grabbing"
                      : "pointer-events-none transition-all duration-500 ease-out"
                  }`}
                  style={
                    isTop
                      ? {
                          zIndex: layer.z,
                          transform: `translate(${drag.x}px, ${drag.y}px) rotate(${drag.rotating}deg) scale(${drag.active ? 1.03 : 1})`,
                          transition: drag.active
                            ? "none"
                            : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
                        }
                      : {
                          zIndex: layer.z,
                          opacity: layer.opacity,
                          transform: `scale(${layer.scale}) translateY(${layer.y}px)`,
                        }
                  }
                >
                  {item.featured && (
                    <div className="bg-brand-rose absolute -top-3 -right-3 rounded-full px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase shadow-sm">
                      Novo
                    </div>
                  )}
                  <div className="pointer-events-none mb-6 flex items-center gap-4">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-slate-100"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">
                        {item.name}
                      </h4>
                      <span className="font-mono text-[10px] tracking-wider text-slate-400 uppercase">
                        {item.role}
                      </span>
                    </div>
                  </div>
                  <p className="pointer-events-none mb-6 leading-relaxed text-slate-600 italic">
                    “{item.quote}”
                  </p>
                  <div className="pointer-events-none flex gap-1 text-xs text-yellow-400">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <IconStar key={star} />
                    ))}
                  </div>
                  {isTop && (
                    <div className="pointer-events-none absolute right-4 bottom-4 animate-pulse text-slate-200">
                      <IconHand />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="lg:pl-12">
            <span className="text-brand-rose mb-4 block font-mono text-xs font-semibold tracking-[0.2em] uppercase">
              Depoimentos
            </span>
            <h2 className="mb-6 font-serif text-4xl font-medium tracking-tight text-slate-900 md:text-5xl">
              Histórias da
              <br />
              mesa da cozinha
            </h2>
            <p className="mb-10 text-lg leading-relaxed font-light text-slate-600">
              Junte-se a quem já sentou à nossa mesa — técnica, ingredientes da
              estação e um serviço que trata cada visita como convite.
            </p>
            <div className="flex items-center gap-10">
              <div className="flex flex-col gap-1">
                <span className="text-4xl font-semibold tracking-tight text-slate-900">
                  {testimonialStats.rating}
                </span>
                <div className="flex text-xs text-yellow-400">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <IconStar key={star} />
                  ))}
                </div>
                <span className="mt-1 text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
                  Avaliação média
                </span>
              </div>
              <div className="h-12 w-px bg-slate-200" />
              <div className="flex flex-col gap-1">
                <span className="text-4xl font-semibold tracking-tight text-slate-900">
                  {testimonialStats.members}
                </span>
                <span className="text-brand-rose font-mono text-xs">
                  {testimonialStats.membersDelta}
                </span>
                <span className="mt-1 text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
                  Mesas reservadas
                </span>
              </div>
            </div>
            <div className="mt-12 flex gap-4">
              <a
                href="#reservas"
                className="group flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-xs font-semibold tracking-widest text-white uppercase transition-all hover:bg-slate-800"
              >
                Reservar mesa
                <IconArrowRight className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
