"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LINKS = [
  { href: "/ops", label: "Início" },
  { href: "/ops/audit", label: "Auditoria" },
  { href: "/ops/discovery", label: "Descoberta" },
  { href: "/ops/historico", label: "Histórico" },
];

export function OpsNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/ops/logout", { method: "POST" });
    router.replace("/ops/login");
    router.refresh();
  }

  return (
    <header className="border-b border-[#262626] bg-[#050505]">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-5 py-4 md:px-8">
        <p className="text-[13px] tracking-[0.18em] text-[#A1A1AA] uppercase">
          Dechen Web Studio · interno
        </p>
        <nav aria-label="Console interno">
          <ul className="flex flex-wrap items-center gap-1">
            {LINKS.map((link) => {
              const active =
                link.href === "/ops"
                  ? pathname === "/ops"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`rounded-full px-3 py-1.5 text-sm ${
                      active ? "bg-[#0070F3] text-white" : "text-[#A1A1AA] hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <button
                type="button"
                onClick={() => void logout()}
                className="rounded-full px-3 py-1.5 text-sm text-[#A1A1AA] hover:text-white"
              >
                Sair
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
