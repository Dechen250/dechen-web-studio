"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  match?: string;
  icon: "home" | "tutorial" | "contacts" | "deals" | "companies" | "agent" | "tasks" | "settings";
  badge?: number;
};

function NavIcon({
  name,
  className = "h-5 w-5",
}: {
  name: NavItem["icon"];
  className?: string;
}) {
  const common = {
    viewBox: "0 0 24 24",
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path d="M3 10.5L12 3l9 7.5" />
          <path d="M5.5 9.5V21h13V9.5" />
        </svg>
      );
    case "tutorial":
      return (
        <svg {...common}>
          <path d="M3 10l9-5 9 5-9 5-9-5z" />
          <path d="M7 12.2V16c0 1.4 2.2 2.6 5 2.6s5-1.2 5-2.6v-3.8" />
          <path d="M21 10v6.2" />
        </svg>
      );
    case "contacts":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="14" height="18" rx="2" />
          <path d="M8 8h6M8 12h6M8 16h4" />
          <path d="M18 8h2M18 12h2M18 16h2" />
        </svg>
      );
    case "deals":
      return (
        <svg {...common}>
          <path d="M8 12a3 3 0 10-3 3h14a3 3 0 10-3-3" />
          <path d="M8 12V8a2 2 0 012-2h0" />
          <path d="M16 12V8a2 2 0 00-2-2h0" />
        </svg>
      );
    case "companies":
      return (
        <svg {...common}>
          <path d="M3 21h18" />
          <path d="M5 21V8l6-3v16" />
          <path d="M11 21V5l8 4v12" />
          <path d="M8 10h1M8 13h1M8 16h1M15 12h1M15 15h1" />
        </svg>
      );
    case "agent":
      return (
        <svg {...common}>
          <path d="M12 3l1.6 4.6L18 9.2l-4.4 1.6L12 15.4l-1.6-4.6L6 9.2l4.4-1.6L12 3z" />
          <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14z" />
        </svg>
      );
    case "tasks":
      return (
        <svg {...common}>
          <path d="M9 6h11M9 12h11M9 18h11" />
          <path d="M4 6h.01M4 12h.01M4 18h.01" />
          <path d="M3.5 6l1 1 2-2" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9c.3.6.9 1 1.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" />
        </svg>
      );
  }
}

function isActive(pathname: string, href: string, match?: string) {
  const base = match ?? href;
  if (href === "/app") {
    return pathname === "/app";
  }
  if (href === "/app/tutorial") {
    return pathname === "/app/tutorial" || pathname.startsWith("/app/tutorial/");
  }
  if (href === "/app/pipeline") {
    return (
      pathname.startsWith("/app/pipeline") ||
      pathname.startsWith("/app/opportunities")
    );
  }
  return pathname === base || pathname.startsWith(`${base}/`);
}

export function AppSidebar({
  taskBadge = 0,
}: {
  taskBadge?: number;
}) {
  const pathname = usePathname();

  const items: NavItem[] = [
    { href: "/app", label: "Início", icon: "home" },
    { href: "/app/tutorial", label: "Tutorial", icon: "tutorial" },
    { href: "/app/contacts", label: "Contatos", icon: "contacts" },
    { href: "/app/pipeline", label: "Negociações", icon: "deals" },
    { href: "/app/companies", label: "Empresas", icon: "companies" },
    {
      href: "/app/tasks",
      label: "Tarefas",
      icon: "tasks",
      badge: taskBadge,
    },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-[4.25rem] flex-col bg-[#062a4a] text-white">
      <div className="flex h-16 items-center justify-center border-b border-white/10">
        <Link
          href="/app"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-sm font-bold shadow-md"
          title="CRM Core"
        >
          C
        </Link>
      </div>

      <nav className="flex flex-1 flex-col items-center gap-1 px-2 py-4">
        {items.map((item) => {
          const active = isActive(pathname, item.href, item.match);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              className={`relative flex h-11 w-11 items-center justify-center rounded-xl transition ${
                active
                  ? "bg-white/10 text-[#5ec8f2]"
                  : "text-white/70 hover:bg-white/8 hover:text-white"
              }`}
            >
              <NavIcon name={item.icon} />
              {active ? (
                <span className="absolute -right-[0.55rem] top-1/2 h-7 w-1 -translate-y-1/2 rounded-l bg-[#5ec8f2]" />
              ) : null}
              {item.badge && item.badge > 0 ? (
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#ff4d6d] ring-2 ring-[#062a4a]" />
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col items-center gap-2 border-t border-white/10 px-2 py-4">
        <Link
          href="/app/settings/organization"
          title="Configurações"
          aria-label="Configurações"
          aria-current={
            pathname.startsWith("/app/settings") ? "page" : undefined
          }
          className={`relative flex h-11 w-11 items-center justify-center rounded-xl transition ${
            pathname.startsWith("/app/settings")
              ? "bg-white/10 text-[#5ec8f2]"
              : "text-white/70 hover:bg-white/8 hover:text-white"
          }`}
        >
          <NavIcon name="settings" />
          {pathname.startsWith("/app/settings") ? (
            <span className="absolute -right-[0.55rem] top-1/2 h-7 w-1 -translate-y-1/2 rounded-l bg-[#5ec8f2]" />
          ) : null}
        </Link>
      </div>
    </aside>
  );
}

/** @deprecated Prefer AppSidebar; kept for rare light contexts. */
export function AppNav({
  className = "",
}: {
  className?: string;
  variant?: "utility" | "light";
}) {
  return <nav className={className} />;
}
