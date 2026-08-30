"use client";

import { useState } from "react";
import { navLinks, siteInfo } from "@/data/divina-cozinha";
import { IconChefHat, IconLeaf, IconMenu, IconSearch } from "./icons";
import { Button } from "./ui";

const mobileIcons = [IconChefHat, IconLeaf, IconSearch, IconMenu];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-6 right-0 left-0 z-50 flex flex-col items-center px-4">
      <div className="glass-panel dc-shadow relative z-20 flex w-full max-w-4xl items-center justify-between gap-2 rounded-full p-2">
        <a
          href="#"
          className="group flex shrink-0 items-center gap-2 px-4"
          onClick={() => setMenuOpen(false)}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0b0b0b] text-white transition-colors duration-300 group-hover:bg-[#e11d48]">
            <span className="font-serif text-lg font-bold italic">D</span>
          </div>
          <span className="hidden font-bold tracking-tight sm:block">
            {siteInfo.name}
          </span>
        </a>

        <div className="dc-shadow hidden items-center rounded-full bg-slate-100/50 p-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-5 py-2 text-xs font-medium tracking-wider uppercase transition-all duration-300 hover:bg-white hover:shadow-sm"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2 pr-1">
          <a
            href="#cardapio"
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-slate-100"
            aria-label="Ver cardápio"
          >
            <IconSearch className="h-5 w-5" />
          </a>
          <Button href="#reservas">Reservar</Button>
          <button
            type="button"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-slate-900 transition-colors hover:bg-slate-100 md:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <IconMenu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="animate-menu-in z-10 mt-2 flex w-full max-w-4xl flex-col gap-2 rounded-[2rem] border border-white/40 bg-white/90 p-3 shadow-[0px_10px_40px_-10px_rgba(0,0,0,0.1)] backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 p-2">
            {navLinks.map((link, index) => {
              const Icon = mobileIcons[index] ?? IconMenu;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="group flex items-center justify-between rounded-xl px-5 py-3 transition-colors hover:bg-slate-100/80"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="text-sm font-bold tracking-wider text-slate-600 uppercase group-hover:text-slate-900">
                    {link.label}
                  </span>
                  <Icon className="h-5 w-5 text-slate-400 transition-colors group-hover:text-[#e11d48]" />
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
