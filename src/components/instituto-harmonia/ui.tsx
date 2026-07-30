import type { ReactNode } from "react";

const base =
  "inline-flex items-center justify-center rounded-full font-sans text-sm font-medium tracking-wide transition-all duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2A7A6E]";

const variants = {
  primary:
    "bg-[#2A7A6E] px-8 py-3.5 text-white shadow-[0_2px_16px_rgba(42,122,110,0.25)] hover:bg-[#24685E] hover:shadow-[0_4px_24px_rgba(42,122,110,0.3)] active:scale-[0.98]",
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
};

export function Button({
  children,
  variant = "primary",
  className = "",
  href,
  type = "button",
  onClick,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
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
    <div className={`mb-12 max-w-2xl ${alignClass}`}>
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

export function FadeIn({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`animate-[fadeInUp_0.8s_ease-out_both] ${className}`}>
      {children}
    </div>
  );
}
