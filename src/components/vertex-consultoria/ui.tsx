import type { ReactNode } from "react";

const base =
  "inline-flex items-center justify-center rounded-none font-sans text-sm font-semibold tracking-wide transition-all duration-400 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22D3EE]";

const variants = {
  primary:
    "bg-[#22D3EE] px-8 py-3.5 text-[#0B1118] shadow-[0_0_24px_rgba(34,211,238,0.25)] hover:bg-[#67E8F9] hover:shadow-[0_0_36px_rgba(34,211,238,0.4)] active:scale-[0.98]",
  secondary:
    "border border-[rgba(34,211,238,0.35)] bg-transparent px-8 py-3.5 text-[#E8EEF4] hover:border-[#22D3EE]/70 hover:bg-[rgba(34,211,238,0.06)]",
  ghost: "px-4 py-2 text-[#8B9AAB] hover:text-[#22D3EE]",
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
        <p className="mb-3 font-sans text-xs font-semibold tracking-[0.32em] text-[#22D3EE] uppercase">
          {label}
        </p>
      )}
      <h2 className="font-display text-3xl leading-[1.1] font-semibold tracking-tight text-[#E8EEF4] md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 font-sans text-base leading-relaxed text-[#8B9AAB] md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

export function FadeIn({
  children,
  className = "",
  delayMs = 0,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}) {
  return (
    <div
      className={`animate-[fadeInUp_0.75s_ease-out_both] ${className}`}
      style={delayMs ? { animationDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
