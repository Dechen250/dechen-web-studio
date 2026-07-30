"use client";

import { useEffect, useState } from "react";
import { navLinks, siteInfo } from "@/data/vertex-consultoria";
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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-400 ease-out ${
        scrolled
          ? "border-b border-[rgba(34,211,238,0.12)] bg-[#0B1118]/92 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8"
        aria-label="Principal"
      >
        <a
          href="#"
          className="font-display text-lg font-semibold tracking-tight text-[#E8EEF4] md:text-xl"
        >
          VERTEX
          <span className="text-[#22D3EE]">.</span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-sm text-[#8B9AAB] transition-colors hover:text-[#E8EEF4]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button href="#contato">Falar com consultor</Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center border border-[rgba(34,211,238,0.25)] md:hidden"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
            <path d="M0 1h18M0 7h18M0 13h18" stroke="#E8EEF4" strokeWidth="1.5" />
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-[rgba(34,211,238,0.12)] bg-[#0B1118]/95 px-5 py-6 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block font-sans text-base text-[#E8EEF4]"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <Button href="#contato" className="w-full" onClick={() => setMenuOpen(false)}>
                Falar com consultor
              </Button>
            </li>
          </ul>
        </div>
      )}

      <span className="sr-only">{siteInfo.name}</span>
    </header>
  );
}
