import type { AuditResult, Severity } from "./types";

export const SEVERITY_LABEL: Record<Severity, string> = {
  ok: "OK",
  atencao: "Atenção",
  critico: "Crítico",
};

export function scoreSeverity(score: number | null): Severity {
  if (score === null) return "atencao";
  if (score >= 0.9) return "ok";
  if (score >= 0.5) return "atencao";

  return "critico";
}

export function formatScore(score: number | null): string {
  return score === null ? "—" : `${Math.round(score * 100)}/100`;
}

export function worstSeverity(items: Array<{ severity: Severity }>): Severity {
  if (items.some((item) => item.severity === "critico")) return "critico";
  if (items.some((item) => item.severity === "atencao")) return "atencao";

  return "ok";
}

export function overallSeverity(result: AuditResult): Severity {
  return worstSeverity([
    ...result.checks,
    ...result.lighthouse.metrics,
    ...result.lighthouse.categories.map((category) => ({
      severity: scoreSeverity(category.score),
    })),
  ]);
}

export function listPriorities(result: AuditResult): string[] {
  const priorities: string[] = [];

  for (const check of result.checks) {
    if (check.severity !== "critico") continue;
    priorities.push(`${check.label} — ${check.detail}${check.why ? ` ${check.why}` : ""}`);
  }

  for (const metric of result.lighthouse.metrics) {
    if (metric.severity !== "critico") continue;
    priorities.push(`${metric.label} — está em ${metric.display}, alvo ${metric.target}.`);
  }

  const topOpportunity = result.lighthouse.opportunities[0];
  if (topOpportunity && (topOpportunity.savingsMs ?? 0) >= 500) {
    const seconds = ((topOpportunity.savingsMs ?? 0) / 1000).toFixed(1).replace(".", ",");
    priorities.push(`${topOpportunity.label} — ganho estimado de ${seconds} s no carregamento.`);
  }

  for (const check of result.checks) {
    if (check.severity !== "atencao" || priorities.length >= 6) continue;
    priorities.push(`${check.label} — ${check.detail}`);
  }

  return priorities.slice(0, 6);
}

export function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  return new URL(withProtocol).toString();
}

export function hostnameOf(url: string): string {
  return new URL(url).hostname;
}