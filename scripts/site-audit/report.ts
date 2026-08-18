import { worstSeverity } from "./checks";
import type { BlockReason, Preflight } from "./preflight";
import type { AuditResult, CheckResult, MetricResult, Severity } from "./types";

const SEVERITY_LABEL: Record<Severity, string> = {
  ok: "OK",
  atencao: "Atenção",
  critico: "Crítico",
};

const FORM_FACTOR_LABEL = {
  mobile: "Celular (rede móvel simulada)",
  desktop: "Desktop",
} as const;

function scoreSeverity(score: number | null): Severity {
  if (score === null) return "atencao";
  if (score >= 0.9) return "ok";
  if (score >= 0.5) return "atencao";

  return "critico";
}

function formatScore(score: number | null): string {
  return score === null ? "—" : `${Math.round(score * 100)}/100`;
}

function formatBytes(bytes: number | null): string {
  if (bytes === null) return "—";
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`.replace(".", ",");
}

function formatMs(ms: number | null): string {
  if (ms === null || ms <= 0) return "—";
  if (ms < 1000) return `${Math.round(ms)} ms`;

  return `${(ms / 1000).toFixed(1)} s`.replace(".", ",");
}

/** Conteúdo vindo do site pode conter `|`, que quebraria a tabela Markdown. */
function cell(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\s+/g, " ").trim();
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(iso));
}

function verdict(result: AuditResult): string {
  const performance = result.lighthouse.categories.find((item) => item.id === "performance");
  const criticalChecks = result.checks.filter((item) => item.severity === "critico");
  const criticalMetrics = result.lighthouse.metrics.filter((item) => item.severity === "critico");

  const parts = [
    `Performance ${formatScore(performance?.score ?? null)} em ${
      result.lighthouse.formFactor === "mobile" ? "celular" : "desktop"
    }`,
  ];

  parts.push(
    criticalMetrics.length > 0
      ? `${criticalMetrics.length} métrica(s) de carregamento fora do alvo`
      : "métricas de carregamento dentro do alvo",
  );

  parts.push(
    criticalChecks.length > 0
      ? `${criticalChecks.length} falha(s) crítica(s) de fundação`
      : "nenhuma falha crítica de fundação",
  );

  return `${parts.join(", ")}.`;
}

function categoriesTable(result: AuditResult): string {
  const rows = result.lighthouse.categories.map((category) => {
    const severity = scoreSeverity(category.score);

    return `| ${category.label} | ${formatScore(category.score)} | ${SEVERITY_LABEL[severity]} |`;
  });

  return ["| Categoria | Nota | Situação |", "|-----------|------|----------|", ...rows].join("\n");
}

function metricsTable(metrics: MetricResult[]): string {
  const rows = metrics.map(
    (metric) =>
      `| ${metric.label} | ${cell(metric.display)} | ${metric.target} | ${SEVERITY_LABEL[metric.severity]} |`,
  );

  return [
    "| Métrica | Resultado | Alvo | Situação |",
    "|---------|-----------|------|----------|",
    ...rows,
  ].join("\n");
}

function checksTable(checks: CheckResult[]): string {
  const rows = checks.map(
    (check) => `| ${check.label} | ${SEVERITY_LABEL[check.severity]} | ${cell(check.detail)} |`,
  );

  return ["| Item | Situação | Observação |", "|------|----------|------------|", ...rows].join(
    "\n",
  );
}

function opportunitiesSection(result: AuditResult): string {
  const opportunities = result.lighthouse.opportunities.slice(0, 8);

  if (opportunities.length === 0) {
    return "Nenhuma oportunidade relevante de carregamento apontada.";
  }

  const rows = opportunities.map((opportunity) => {
    const gains = [
      opportunity.savingsMs && opportunity.savingsMs >= 10 ? formatMs(opportunity.savingsMs) : null,
      opportunity.savingsBytes && opportunity.savingsBytes >= 1024
        ? formatBytes(opportunity.savingsBytes)
        : null,
    ].filter(Boolean);

    return `| ${cell(opportunity.label)} | ${gains.length > 0 ? gains.join(" · ") : "—"} |`;
  });

  return ["| Oportunidade | Ganho estimado |", "|--------------|----------------|", ...rows].join(
    "\n",
  );
}

function prioritiesSection(result: AuditResult): string {
  const priorities: string[] = [];

  for (const check of result.checks) {
    if (check.severity !== "critico") continue;
    priorities.push(`**${check.label}** — ${check.detail}${check.why ? ` ${check.why}` : ""}`);
  }

  for (const metric of result.lighthouse.metrics) {
    if (metric.severity !== "critico") continue;
    priorities.push(
      `**${metric.label}** — está em ${metric.display}, alvo ${metric.target}.`,
    );
  }

  const topOpportunity = result.lighthouse.opportunities[0];
  if (topOpportunity && (topOpportunity.savingsMs ?? 0) >= 500) {
    priorities.push(
      `**${topOpportunity.label}** — ganho estimado de ${formatMs(topOpportunity.savingsMs)} no carregamento.`,
    );
  }

  for (const check of result.checks) {
    if (check.severity !== "atencao" || priorities.length >= 6) continue;
    priorities.push(`**${check.label}** — ${check.detail}`);
  }

  if (priorities.length === 0) {
    return "Nenhuma correção técnica urgente identificada. A próxima alavanca provavelmente é conteúdo, oferta ou copy — fora do escopo desta auditoria.";
  }

  return priorities
    .slice(0, 6)
    .map((item, index) => `${index + 1}. ${item}`)
    .join("\n");
}

function whySection(checks: CheckResult[]): string {
  const relevant = checks.filter((check) => check.severity !== "ok" && check.why);

  if (relevant.length === 0) return "";

  const bullets = [...new Map(relevant.map((check) => [check.why, check])).values()].map(
    (check) => `- **${check.label}:** ${check.why}`,
  );

  return ["", "### Impacto de negócio dos achados", "", ...bullets].join("\n");
}

const PRIORITY_ZERO: Record<BlockReason, string> = {
  certificado:
    "Emitir e instalar um certificado válido para o domínio. Enquanto o aviso de segurança aparecer, qualquer visita, anúncio ou indicação é perdida antes da página abrir.",
  dns: "Apontar o DNS do domínio para o servidor correto e confirmar que o registro do domínio não expirou.",
  conexao:
    "Confirmar que o servidor web está no ar e respondendo em HTTPS na porta esperada.",
};

export function buildBlockedReport(url: string, preflight: Extract<Preflight, { status: "bloqueado" }>): string {
  const evidence =
    preflight.evidence.length > 0
      ? preflight.evidence.map((item) => `- ${item}`).join("\n")
      : "- Sem detalhes adicionais retornados pelo servidor.";

  return `# Auditoria bloqueada — ${new URL(url).hostname}

**Tipo:** auditoria · **Status:** bloqueado na verificação de acesso · **Versão:** 1.0

| Campo | Valor |
|-------|-------|
| URL auditada | ${cell(url)} |
| Data da verificação | ${formatDate(new Date().toISOString())} |
| Resultado | ${preflight.title} |

## O que está acontecendo

${preflight.summary}

## Evidência técnica

${evidence}

## Prioridade zero

${PRIORITY_ZERO[preflight.reason]}

## Por que este relatório não tem notas

A medição de performance foi interrompida de propósito: o navegador não carrega a página em condições normais, então qualquer nota seria irreal. Corrigido o acesso, rode a auditoria novamente para obter o relatório completo.
`;
}

export function buildReport(result: AuditResult): string {
  const { lighthouse } = result;
  const overall = worstSeverity([
    ...result.checks,
    ...lighthouse.metrics,
    ...lighthouse.categories.map((category) => ({ severity: scoreSeverity(category.score) })),
  ]);

  return `# Auditoria técnica — ${new URL(lighthouse.finalUrl).hostname}

**Tipo:** auditoria · **Status:** gerado automaticamente · **Versão:** 1.0

| Campo | Valor |
|-------|-------|
| URL auditada | ${cell(lighthouse.requestedUrl)} |
| URL final | ${cell(lighthouse.finalUrl)} |
| Dispositivo simulado | ${FORM_FACTOR_LABEL[lighthouse.formFactor]} |
| Data da medição | ${formatDate(lighthouse.fetchedAt)} |
| Ferramenta | Lighthouse ${lighthouse.lighthouseVersion} |
| Situação geral | ${SEVERITY_LABEL[overall]} |

## Resumo

${verdict(result)}

${categoriesTable(result)}

Peso da página: ${formatBytes(lighthouse.diagnostics.totalByteWeight)} em ${
    lighthouse.diagnostics.requestCount ?? "—"
  } requisições.

## Velocidade percebida

${metricsTable(lighthouse.metrics)}

## Checagens de fundação

${checksTable(result.checks)}
${whySection(result.checks)}

## Oportunidades de carregamento

${opportunitiesSection(result)}

## Prioridades sugeridas

${prioritiesSection(result)}

## Limites deste relatório

- Medição de laboratório: um carregamento, uma página, rede simulada. Números variam entre execuções.
- Avalia fundação técnica. Não avalia qualidade de copy, design, oferta ou conversão real.
- Detecção de tags e canais de contato é heurística, feita sobre o HTML inicial.
- Insumo para a etapa de Diagnóstico do funil comercial — não substitui a análise humana.
`;
}
