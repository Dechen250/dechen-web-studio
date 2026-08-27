"use client";

import { useEffect, useState } from "react";
import { navLinks, siteInfo, whatsappUrl } from "@/data/nn-estetica-beleza";
import { Button } from "./ui";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <p className="bg-[#2B2420] px-4 py-2 text-center font-sans text-[11px] leading-snug tracking-wide text-[#F7F1EB] md:text-xs">
        Proposta visual Dechen Web Studio · placeholders até a descoberta · não
        é o site publicado
      </p>
      <nav
        className={`transition-all duration-500 ease-out ${
          scrolled
            ? "border-b border-[#E6DCD4]/90 bg-[#F7F1EB]/94 shadow-[0_2px_24px_rgba(43,36,32,0.08)] backdrop-blur-md"
            : "bg-[#F7F1EB]/70 backdrop-blur-sm"
        }`}
        aria-label="Principal"
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-[4.25rem] md:px-8">
          <a
            href="#topo"
            className="font-display text-xl font-medium tracking-tight text-[#2B2420] md:text-2xl"
          >
            NN <span className="text-[#9A6B5A]">Estética</span>
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-sans text-sm text-[#7A716A] transition-colors duration-300 hover:text-[#2B2420]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <Button href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              Agendar avaliação
            </Button>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E6DCD4] lg:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
              {menuOpen ? (
                <path d="M1 1l16 12M17 1 1 13" stroke="#2B2420" strokeWidth="1.5" />
              ) : (
                <path d="M0 1h18M0 7h18M0 13h18" stroke="#2B2420" strokeWidth="1.5" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-[#E6DCD4] bg-[#F7F1EB]/96 px-5 py-6 backdrop-blur-md lg:hidden">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block font-sans text-base text-[#2B2420]"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <Button
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                  onClick={() => setMenuOpen(false)}
                >
                  Agendar avaliação
                </Button>
              </li>
            </ul>
          </div>
        )}
      </nav>
      <span className="sr-only">{siteInfo.name}</span>
    </header>
  );
}
