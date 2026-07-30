"use client";

import { useEffect, useState } from "react";
import { navLinks, siteInfo } from "@/data/instituto-harmonia";
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "border-b border-[#D5E4E0]/80 bg-[#F4F8F7]/92 shadow-[0_2px_24px_rgba(26,46,43,0.08)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8"
        aria-label="Principal"
      >
        <a
          href="#"
          className="font-display text-xl font-medium tracking-tight text-[#1A2E2B] md:text-2xl"
        >
          Instituto <span className="text-[#2A7A6E]">Harmonia</span>
        </a>

        <ul className="hidden items-center gap-6 xl:flex xl:gap-7">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-sm text-[#5A6F6A] transition-colors duration-300 hover:text-[#1A2E2B]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button href="#agendar">Agendar consulta</Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D5E4E0] md:hidden"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
            <path d="M0 1h18M0 7h18M0 13h18" stroke="#1A2E2B" strokeWidth="1.5" />
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-[#D5E4E0] bg-[#F4F8F7]/96 px-5 py-6 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block font-sans text-base text-[#1A2E2B]"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <Button href="#agendar" className="w-full" onClick={() => setMenuOpen(false)}>
                Agendar consulta
              </Button>
            </li>
          </ul>
        </div>
      )}

      <span className="sr-only">{siteInfo.name}</span>
    </header>
  );
}
