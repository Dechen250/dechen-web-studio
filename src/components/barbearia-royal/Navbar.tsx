"use client";

import { useEffect, useState } from "react";
import { navLinks, siteInfo } from "@/data/barbearia-royal";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-50 flex w-full items-center justify-between gap-4 bg-[#0A0A0A]/95 px-5 py-5 transition-all duration-500 md:px-12 ${
          scrolled
            ? "border-b border-[#C8A97E]/10 py-4 backdrop-blur-xl"
            : ""
        }`}
      >
        <a
          href="#"
          className="font-bebas flex shrink-0 items-center gap-2 text-2xl tracking-[0.18em] whitespace-nowrap text-[#FAFAF9]"
          onClick={close}
        >
          {siteInfo.wordmark}{" "}
          <span className="font-serif text-xl tracking-normal text-[#C8A97E] italic">
            {siteInfo.wordmarkAccent}
          </span>
        </a>
        <ul className="hidden list-none items-center justify-center gap-8 xl:flex xl:flex-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="whitespace-nowrap text-[11px] tracking-[0.18em] text-[#E8E6E1] uppercase transition-colors hover:text-[#C8A97E]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#agendar"
          className="hidden shrink-0 whitespace-nowrap border border-[#C8A97E] px-6 py-2.5 text-[11px] font-semibold tracking-[0.22em] text-[#C8A97E] uppercase transition-colors hover:bg-[#C8A97E] hover:text-[#0A0A0A] xl:inline-flex"
        >
          Agendar horário
        </a>
        <button
          type="button"
          className="relative flex h-8 w-8 flex-col items-center justify-center gap-1.5 xl:hidden"
          aria-expanded={open}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span
            className={`h-px w-6 bg-[#FAFAF9] transition ${open ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 bg-[#FAFAF9] transition ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-px w-6 bg-[#FAFAF9] transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[#0A0A0A] transition-all duration-500 xl:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!open}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-bebas text-4xl tracking-[0.16em] text-[#E8E6E1] hover:text-[#C8A97E]"
            onClick={close}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#agendar"
          className="font-bebas text-4xl tracking-[0.16em] text-[#C8A97E]"
          onClick={close}
        >
          Agendar horário
        </a>
      </div>
    </>
  );
}
