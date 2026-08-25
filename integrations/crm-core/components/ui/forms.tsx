import type { ButtonHTMLAttributes, ReactNode } from "react";

export function Button({
  children,
  type = "button",
  variant = "primary",
  disabled,
  className = "",
  ...props
}: {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "ghost" | "danger";
  disabled?: boolean;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "disabled" | "className" | "children">) {
  const styles =
    variant === "primary"
      ? "bg-brand text-white shadow-sm hover:bg-brand-dark active:translate-y-px"
      : variant === "secondary"
        ? "border border-border bg-surface text-text shadow-sm hover:border-border-strong hover:bg-page active:translate-y-px"
        : variant === "danger"
          ? "bg-danger text-white shadow-sm hover:bg-danger/90 active:translate-y-px"
          : "bg-transparent text-text-muted hover:bg-page hover:text-text";

  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${styles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

const fieldClass =
  "w-full rounded-xl border border-border bg-surface px-3.5 py-2 text-sm text-text outline-none placeholder:text-text-muted/70 hover:border-border-strong focus:border-brand focus:ring-2 focus:ring-brand/20";

const authFieldClass =
  "w-full rounded-xl border border-[#d7e3ec] bg-[#f4f9fc] px-3.5 py-3 text-sm text-text outline-none placeholder:text-text-muted/70 hover:border-[#b9cddc] focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20";

export function TextField({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  placeholder,
  autoComplete,
  tone = "default",
  className = "",
  disabled,
  readOnly,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
  autoComplete?: string;
  tone?: "default" | "auth";
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
}) {
  const isAuth = tone === "auth";

  return (
    <label className="block space-y-1.5">
      <span
        className={
          isAuth
            ? "text-sm font-bold text-utility"
            : "text-[11px] font-semibold uppercase tracking-[0.06em] text-text-muted"
        }
      >
        {label}
      </span>
      <input
        className={`${isAuth ? authFieldClass : fieldClass} ${
          disabled || readOnly ? "cursor-default bg-page text-text-muted" : ""
        } ${className}`}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        readOnly={readOnly}
      />
    </label>
  );
}

export function TextArea({
  label,
  name,
  required,
  defaultValue,
  rows = 4,
}: {
  label: string;
  name: string;
  required?: boolean;
  defaultValue?: string;
  rows?: number;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-text-muted">
        {label}
      </span>
      <textarea
        className={fieldClass}
        name={name}
        required={required}
        defaultValue={defaultValue}
        rows={rows}
      />
    </label>
  );
}

export function SelectField({
  label,
  name,
  required,
  defaultValue,
  options,
  placeholder,
}: {
  label: string;
  name: string;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-text-muted">
        {label}
      </span>
      <select
        className={fieldClass}
        name={name}
        required={required}
        defaultValue={defaultValue ?? ""}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function Alert({
  children,
  tone = "error",
}: {
  children: ReactNode;
  tone?: "error" | "success" | "warning";
}) {
  const styles =
    tone === "success"
      ? "border-success/25 bg-success/10 text-success"
      : tone === "warning"
        ? "border-warning/35 bg-warning/10 text-text"
        : "border-danger/25 bg-danger/10 text-danger";

  return (
    <div className={`rounded-xl border px-3 py-2.5 text-sm font-medium ${styles}`}>
      {children}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="crm-surface px-6 py-14 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand">
        <span className="text-lg font-semibold">+</span>
      </div>
      <h2 className="text-lg font-semibold text-text">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-text-muted">
        {description}
      </p>
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="crm-enter mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-text">{title}</h1>
        {description ? (
          <p className="mt-1 text-sm text-text-muted">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}
