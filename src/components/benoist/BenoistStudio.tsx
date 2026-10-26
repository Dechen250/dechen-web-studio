"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AGENCY,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP_DISPLAY,
  whatsappUrl,
} from "@/lib/site";
import { frames, services, steps } from "./frames";
import "./benoist.css";

type View = "index" | "work" | "about";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function BenoistStudio() {
  const [view, setView] = useState<View>("index");
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  const drag = useRef({ active: false, x: 0, scroll: 0, moved: false });
  const frame = frames[active] ?? frames[0];
  const total = frames.length;
  activeRef.current = active;

  const scrollToFrame = useCallback((index: number, smooth: boolean) => {
    const strip = stripRef.current;
    const node = strip?.querySelectorAll<HTMLElement>("[data-frame]")[index];
    if (!strip || !node) return;
    strip.scrollTo({
      left: node.offsetLeft,
      behavior: smooth ? "smooth" : "auto",
    });
  }, []);

  const go = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(total - 1, index));
      setActive(next);
      scrollToFrame(next, true);
    },
    [scrollToFrame, total],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (event.key === "Escape") {
        setView("index");
        return;
      }
      if (view === "about") return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(active + 1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(active - 1);
      }
      if (event.key === "Enter" && view === "index") {
        setView("work");
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, go, view]);

  const syncFromScroll = useCallback(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const nodes = strip.querySelectorAll<HTMLElement>("[data-frame]");
    const focus = strip.scrollLeft + 4;
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    nodes.forEach((node, index) => {
      const dist = Math.abs(node.offsetLeft - focus);
      if (dist < bestDist) {
        bestDist = dist;
        best = index;
      }
    });
    setActive((current) => (current === best ? current : best));
  }, []);

  useEffect(() => {
    if (view !== "index") return;
    scrollToFrame(activeRef.current, false);
  }, [view, scrollToFrame]);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip || view !== "index") return;

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      event.preventDefault();
      strip.scrollLeft += event.deltaY;
    };

    strip.addEventListener("wheel", onWheel, { passive: false });
    return () => strip.removeEventListener("wheel", onWheel);
  }, [view]);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const strip = stripRef.current;
      if (!strip || !drag.current.active) return;
      const dx = event.clientX - drag.current.x;
      if (Math.abs(dx) > 4) drag.current.moved = true;
      strip.scrollLeft = drag.current.scroll - dx;
    };
    const onUp = () => {
      if (!drag.current.active) return;
      const moved = drag.current.moved;
      drag.current.active = false;
      setDragging(false);
      syncFromScroll();
      if (moved) {
        requestAnimationFrame(() => {
          drag.current.moved = false;
        });
      }
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [syncFromScroll]);

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch" || event.button !== 0) return;
    const strip = stripRef.current;
    if (!strip) return;
    drag.current = {
      active: true,
      x: event.clientX,
      scroll: strip.scrollLeft,
      moved: false,
    };
    setDragging(true);
  }

  function openFrame(index: number) {
    if (drag.current.moved) {
      drag.current.moved = false;
      return;
    }
    setActive(index);
    setView("work");
  }

  return (
    <div className="bz-stage">
      <h1 className="sr-only">Dechen Web Studio</h1>

      <header className="bz-top">
        <button
          type="button"
          className="bz-wordmark bz-rise bz-d1"
          onClick={() => setView("index")}
        >
          Dechen
        </button>

        {view !== "about" ? (
          <div className="bz-ticks bz-rise bz-d2">
            {frames.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`bz-tick${index === active ? " is-active" : ""}`}
                aria-label={`${item.project}, ${item.label}`}
                onClick={() => {
                  setActive(index);
                  scrollToFrame(index, true);
                }}
              />
            ))}
          </div>
        ) : null}

        <div className="bz-top-links bz-rise bz-d1">
          {view === "work" ? (
            <button type="button" className="bz-link" onClick={() => setView("index")}>
              Índice
            </button>
          ) : null}
          <button
            type="button"
            className={`bz-link${view === "about" ? " is-active" : ""}`}
            onClick={() => setView(view === "about" ? "index" : "about")}
            aria-pressed={view === "about"}
          >
            Sobre
          </button>
        </div>
      </header>

      {view === "index" ? (
        <div className="bz-strip-wrap">
          <p className="bz-caption" aria-live="polite">
            <span className="bz-caption-index">{pad(active + 1)}</span>
            <span className="bz-caption-name">{frame.project}</span>
            <span className="bz-caption-meta">
              {frame.category} — {frame.label}
            </span>
          </p>
          <div
            ref={stripRef}
            className={`bz-strip${dragging ? " is-dragging" : ""}`}
            onScroll={syncFromScroll}
            onPointerDown={onPointerDown}
          >
            {frames.map((item, index) => (
              <button
                key={item.id}
                type="button"
                data-frame
                className={`bz-thumb${index === active ? " is-active" : ""}`}
                aria-label={`${item.project}, ${item.label}`}
                aria-current={index === active ? "true" : undefined}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => openFrame(index)}
              >
                {/* Local files, so the strip does not wait on the image optimizer. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt=""
                  width={420}
                  height={600}
                  draggable={false}
                  className="bz-thumb-img"
                />
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {view === "work" ? (
        <section className="bz-work" aria-label={frame.project}>
          <div className="bz-work-copy">
            <p className="bz-kicker">
              {pad(active + 1)} / {pad(total)}
            </p>
            <h2 className="bz-display" key={frame.project}>
              {frame.project}
            </h2>
            <p className="bz-category">
              {frame.category} — {frame.label}
            </p>
            <p className="bz-summary">{frame.summary}</p>
            <Link className="bz-go" href={frame.href}>
              Ver demonstração
            </Link>
            <div className="bz-pager">
              <button
                type="button"
                onClick={() => go(active - 1)}
                disabled={active === 0}
              >
                Anterior
              </button>
              <span className="bz-pager-count">{frame.label}</span>
              <button
                type="button"
                onClick={() => go(active + 1)}
                disabled={active === total - 1}
              >
                Seguinte
              </button>
            </div>
          </div>
          <figure className="bz-work-figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={frame.id}
              src={frame.src}
              alt={`${frame.project}, ${frame.label}`}
              className="bz-work-img"
            />
          </figure>
        </section>
      ) : null}

      {view === "about" ? (
        <section className="bz-about" aria-label="Sobre a Dechen Web Studio">
          <div>
            <h2 className="bz-about-lead">
              Um site que faz o cliente falar com você.
            </h2>
            <p className="bz-about-text">
              A Dechen Web Studio faz sites para clínicas, lojas, restaurantes
              e consultorias. A página explica o negócio, abre rápido no
              celular e deixa o WhatsApp à vista. Publicação em 7 a 14 dias.
              Resposta em até 24 horas.
            </p>
            <p className="bz-credit">
              Estudo de linguagem visual a partir do portfólio de Aristide
              Benoist. Conteúdo e trabalhos da Dechen Web Studio.
            </p>
            <div className="bz-contact">
              <a href={`mailto:${AGENCY.email}`}>
                Email
                <small>{AGENCY.email}</small>
              </a>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                WhatsApp
                <small>{WHATSAPP_DISPLAY}</small>
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                Instagram
                <small>@{INSTAGRAM_HANDLE}</small>
              </a>
            </div>
          </div>

          <div>
            <h3 className="bz-col-label">Serviços</h3>
            <ol className="bz-list">
              {services.map((service) => (
                <li key={service.n}>
                  <span>{service.n}</span>
                  <div>
                    <strong>{service.title}</strong>
                    <span>{service.text}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="bz-col-label">Processo</h3>
            <ol className="bz-list">
              {steps.map((step) => (
                <li key={step.n}>
                  <span>{step.n}</span>
                  <div>
                    <strong>{step.title}</strong>
                    <span>{step.text}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      <footer className="bz-bottom">
        <div className="bz-meta bz-rise bz-d3">
          <p>Studio independente</p>
          <p>São Paulo, Brasil</p>
        </div>
        <div className="bz-social bz-rise bz-d3">
          <a href={`mailto:${AGENCY.email}`}>Email</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
      </footer>
    </div>
  );
}
