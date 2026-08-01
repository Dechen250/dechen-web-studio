import type { ReactNode } from "react";

const base =
  "inline-flex items-center justify-center rounded-full font-sans text-sm font-medium tracking-wide transition-all duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2A7A6E]";

const variants = {
  primary:
    "bg-[#2A7A6E] px-8 py-3.5 text-white shadow-[0_2px_16px_rgba(42,122,110,0.25)] hover:bg-[#24685E] hover:shadow-[0_4px_28px_rgba(42,122,110,0.32)] active:scale-[0.98]",
  secondary:
    "border border-[#D5E4E0] bg-white px-8 py-3.5 text-[#1A2E2B] hover:border-[#2A7A6E]/40 hover:bg-[#E8F3F0]",
  ghost: "px-4 py-2 text-[#5A6F6A] hover:text-[#2A7A6E]",
};

type ButtonProps = {
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

export function Button({
  children,
  variant = "primary",
  className = "",
  href,
  type = "button",
  onClick,
  disabled = false,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className} ${
    disabled ? "cursor-not-allowed opacity-60" : ""
  }`;

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
}: {
  label?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`mb-14 max-w-2xl ${alignClass}`}>
      {label && (
        <p className="mb-3 font-sans text-xs font-medium tracking-[0.22em] text-[#2A7A6E] uppercase">
          {label}
        </p>
      )}
      <h2 className="font-display text-3xl leading-tight font-medium tracking-tight text-[#1A2E2B] md:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 font-sans text-base leading-relaxed text-[#5A6F6A] md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

export { Reveal as FadeIn } from "@/components/motion/Reveal";

export function SpecialtyIcon({ name }: { name: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#2A7A6E",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "pulse":
      return (
        <svg {...common}>
          <path d="M3 12h3l2-5 3 10 2-5h6" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...common}>
          <path d="M5 19c8 0 12-6 14-14-8 2-14 6-14 14Z" />
          <path d="M5 19c2-4 6-7 11-9" />
        </svg>
      );
    case "bone":
      return (
        <svg {...common}>
          <path d="M7 8a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm10 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
          <path d="M8.5 7.5 15.5 16.5" />
        </svg>
      );
    case "bowl":
      return (
        <svg {...common}>
          <path d="M4 11h16a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6Z" />
          <path d="M8 7c1.5 1 3 1.5 4 1.5S14.5 8 16 7" />
        </svg>
      );
    case "screen":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="12" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" />
        </svg>
      );
  }
}
