import type { ReactNode } from "react";

const base =
  "inline-flex items-center justify-center rounded-full font-medium transition-all duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A962]";

const variants = {
  primary:
    "bg-[#8B9A7D] px-8 py-3.5 text-sm text-white shadow-[0_2px_12px_rgba(139,154,125,0.25)] hover:bg-[#7A8A6E] hover:shadow-[0_4px_20px_rgba(139,154,125,0.3)] active:scale-[0.98]",
  secondary:
    "border border-[#E8E0D4] bg-[#FFFDF8] px-8 py-3.5 text-sm text-[#5C5347] hover:border-[#C9A962]/40 hover:bg-[#FAF9F6]",
  ghost:
    "px-4 py-2 text-sm text-[#5C5347] hover:text-[#8B9A7D]",
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
      <a href={href} className={classes}>
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
  align = "center",
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
        <p className="mb-3 font-sans text-xs font-medium tracking-[0.2em] text-[#8B9A7D] uppercase">
          {label}
        </p>
      )}
      <h2 className="font-display text-3xl leading-tight font-medium tracking-tight text-[#3D3832] md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 font-sans text-base leading-relaxed text-[#6B6560] md:text-lg">
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
    <div
      className={`animate-[fadeInUp_0.8s_ease-out_both] ${className}`}
    >
      {children}
    </div>
  );
}
