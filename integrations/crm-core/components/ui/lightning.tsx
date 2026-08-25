import type { ReactNode } from "react";

export function Panel({
  children,
  className = "",
  title,
  actions,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  actions?: ReactNode;
}) {
  return (
    <section className={`crm-surface overflow-hidden ${className}`}>
      {title || actions ? (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-thead/80 px-4 py-2.5">
          {title ? (
            <h2 className="text-sm font-semibold tracking-tight text-text">{title}</h2>
          ) : (
            <span />
          )}
          {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
        </div>
      ) : null}
      <div className="p-4">{children}</div>
    </section>
  );
}

export function RecordHeader({
  title,
  subtitle,
  meta,
  actions,
}: {
  title: string;
  subtitle?: string;
  meta?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="crm-enter crm-surface relative mb-5 overflow-hidden px-5 py-4">
      <div className="absolute inset-y-3 left-2 w-1 rounded-full bg-brand" />
      <div className="flex flex-wrap items-start justify-between gap-3 pl-3">
        <div className="min-w-0">
          {subtitle ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted">
              {subtitle}
            </p>
          ) : null}
          <h1 className="mt-0.5 truncate text-2xl font-semibold tracking-tight text-text">
            {title}
          </h1>
          {meta ? (
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-text-muted">
              {meta}
            </div>
          ) : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
    </div>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "brand" | "success" | "warning" | "danger";
}) {
  const styles =
    tone === "brand"
      ? "bg-brand-soft text-brand-dark ring-1 ring-brand/15"
      : tone === "success"
        ? "bg-success/10 text-success ring-1 ring-success/15"
        : tone === "warning"
          ? "bg-warning/15 text-text ring-1 ring-warning/25"
          : tone === "danger"
            ? "bg-danger/10 text-danger ring-1 ring-danger/15"
            : "bg-page text-text-muted ring-1 ring-border";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${styles}`}
    >
      {children}
    </span>
  );
}

export function DataTable({
  headers,
  children,
}: {
  headers: ReactNode[];
  children: ReactNode;
}) {
  return (
    <div className="crm-surface overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-thead text-[11px] font-semibold uppercase tracking-[0.06em] text-text-muted">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="border-b border-border px-3.5 py-2.5 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-surface [&_tr:hover]:bg-brand-soft/40">
          {children}
        </tbody>
      </table>
    </div>
  );
}

export function dataTableCellClass(extra = "") {
  return `px-3.5 py-2.5 text-text ${extra}`.trim();
}

export function dataTableLinkClass() {
  return "font-semibold text-brand hover:text-brand-dark hover:underline";
}
