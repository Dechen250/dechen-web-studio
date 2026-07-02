"use client";

import { useEffect, useState } from "react";
import { navLinks, siteInfo } from "@/data/divina-cozinha";
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
          ? "border-b border-[#E8E0D4]/80 bg-[#FFFDF8]/90 shadow-[0_2px_20px_rgba(61,56,50,0.06)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8"
        aria-label="Principal"
      >
        <a
          href="#"
          className="font-display text-xl font-medium tracking-tight text-[#3D3832] md:text-2xl"
        >
          {siteInfo.name}
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-sm text-[#6B6560] transition-colors duration-300 hover:text-[#3D3832]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button href="#reservas">Reservar Mesa</Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E0D4] md:hidden"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="sr-only">Menu</span>
          <svg
            width="18"
            height="14"
            viewBox="0 0 18 14"
            fill="none"
            aria-hidden
          >
            <path
              d="M0 1h18M0 7h18M0 13h18"
              stroke="#3D3832"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-[#E8E0D4] bg-[#FFFDF8]/95 px-5 py-6 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block font-sans text-base text-[#3D3832]"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <Button href="#reservas" className="w-full">
                Reservar Mesa
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
