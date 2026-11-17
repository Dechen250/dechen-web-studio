"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/dws/ButtonLink";
import { Logo } from "@/components/dws/Logo";
import { homeNav } from "@/components/dws/nav";
import { FOCUS } from "@/components/dws/ui";

const SCROLL_THRESHOLD = 12;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`dws-nav fixed inset-x-0 top-0 z-50 border-b ${
        scrolled
          ? "dws-nav-glass border-white/20"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5 md:h-16 md:px-6 lg:px-8"
        aria-label="Principal"
      >
        <Logo href="#" />

        <ul className="hidden items-center gap-6 md:flex lg:gap-7">
          {homeNav.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm text-[#B4B4BE] transition-colors duration-200 hover:text-white ${FOCUS}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <ButtonLink href="#contato" size="sm" className="shrink-0">
          Orçamento
        </ButtonLink>
      </nav>
    </header>
  );
}
