import type {
  CategoryScore,
  FormFactor,
  LighthouseResult,
  MetricResult,
  Opportunity,
  Severity,
} from "./types";

/**
 * Só o subconjunto do relatório do Lighthouse que este agente lê. Tipar aqui
 * evita depender de caminhos internos de tipos do pacote, que mudam entre versões.
 */
export type Lhr = {
  requestedUrl?: string;
  finalDisplayedUrl?: string;
  finalUrl?: string;
  fetchTime?: string;
  lighthouseVersion?: string;
  categories?: Record<string, { id?: string; title?: string; score?: number | null }>;
  audits?: Record<
    string,
    {
      id?: string;
      title?: string;
      description?: string;
      score?: number | null;
      displayValue?: string;
      numericValue?: number;
      details?: {
        type?: string;
        overallSavingsMs?: number;
        overallSavingsBytes?: number;
        items?: Array<{ data?: string }>;
        data?: string;
      };
    }
  >;
};

const CATEGORY_LABELS: Record<string, string> = {
  performance: "Performance",
  accessibility: "Acessibilidade",
  "best-practices": "Boas práticas",
  seo: "SEO técnico",
};

/**
 * Limites do próprio Lighthouse/Core Web Vitals. `bom` e acima é verde;
 * acima de `ruim` é vermelho; entre os dois é amarelo.
 */
const METRIC_THRESHOLDS: Array<{
  id: string;
  label: string;
  bom: number;
  ruim: number;
  target: string;
}> = [
  {
    id: "largest-contentful-paint",
    label: "LCP — maior elemento visível",
    bom: 2500,
    ruim: 4000,
    target: "até 2,5 s",
  },
  {
    id: "cumulative-layout-shift",
    label: "CLS — estabilidade visual",
    bom: 0.1,
    ruim: 0.25,
    target: "até 0,1",
  },
  {
    id: "total-blocking-time",
    label: "TBT — bloqueio de interação",
    bom: 200,
    ruim: 600,
    target: "até 200 ms",
  },
  {
    id: "first-contentful-paint",
    label: "FCP — primeiro conteúdo",
    bom: 1800,
    ruim: 3000,
    target: "até 1,8 s",
  },
  {
    id: "speed-index",
    label: "Speed Index — velocidade percebida",
    bom: 3400,
    ruim: 5800,
    target: "até 3,4 s",
  },
];

function severityFromThresholds(value: number, bom: number, ruim: number): Severity {
  if (value <= bom) return "ok";
  if (value <= ruim) return "atencao";
  return "critico";
}

function readMetrics(audits: NonNullable<Lhr["audits"]>): MetricResult[] {
  return METRIC_THRESHOLDS.map(({ id, label, bom, ruim, target }) => {
    const audit = audits[id];
    const numericValue = typeof audit?.numericValue === "number" ? audit.numericValue : null;

    return {
      id,
      label,
      display: audit?.displayValue ?? "—",
      numericValue,
      severity: numericValue === null ? "atencao" : severityFromThresholds(numericValue, bom, ruim),
      target,
    };
  });
}

function readOpportunities(audits: NonNullable<Lhr["audits"]>): Opportunity[] {
  return Object.values(audits)
    .filter((audit) => audit.details?.type === "opportunity")
    .filter((audit) => typeof audit.score === "number" && audit.score < 0.9)
    .filter(
      (audit) =>
        (audit.details?.overallSavingsMs ?? 0) >= 50 ||
        (audit.details?.overallSavingsBytes ?? 0) >= 10 * 1024,
    )
    .map((audit) => ({
      id: audit.id ?? "desconhecido",
      label: audit.title ?? audit.id ?? "Oportunidade",
      description: (audit.description ?? "").replace(/\s*\[.*?\]\(.*?\)\s*/g, " ").trim(),
      savingsMs: audit.details?.overallSavingsMs ?? null,
      savingsBytes: audit.details?.overallSavingsBytes ?? null,
    }))
    .sort((a, b) => (b.savingsMs ?? 0) - (a.savingsMs ?? 0));
}

export function readFilmstrip(audits: NonNullable<Lhr["audits"]>): string[] {
  const frames: string[] = [];
  const thumbs = audits["screenshot-thumbnails"]?.details?.items ?? [];

  for (const item of thumbs) {
    if (!item.data) continue;
    frames.push(item.data.startsWith("data:") ? item.data : `data:image/jpeg;base64,${item.data}`);
  }

  const finalShot = audits["final-screenshot"]?.details?.data;
  if (finalShot) {
    frames.push(finalShot.startsWith("data:") ? finalShot : `data:image/jpeg;base64,${finalShot}`);
  }

  return frames;
}

export type LighthouseRun = LighthouseResult & { screenshots: string[] };

export function lighthouseFromLhr(
  lhr: Lhr,
  url: string,
  formFactor: FormFactor,
  extraShots: string[] = [],
  includeFilmstrip = true,
): LighthouseRun {
  const audits = lhr.audits ?? {};
  const categories: CategoryScore[] = Object.entries(CATEGORY_LABELS).map(([id, label]) => ({
    id,
    label,
    score: lhr.categories?.[id]?.score ?? null,
  }));
  const filmstrip = includeFilmstrip ? readFilmstrip(audits) : [];
  const screenshots = extraShots.length > 0 ? extraShots : filmstrip;

  return {
    requestedUrl: lhr.requestedUrl ?? url,
    finalUrl: lhr.finalDisplayedUrl ?? lhr.finalUrl ?? url,
    fetchedAt: lhr.fetchTime ?? new Date().toISOString(),
    lighthouseVersion: lhr.lighthouseVersion ?? "desconhecida",
    formFactor,
    categories,
    metrics: readMetrics(audits),
    opportunities: readOpportunities(audits),
    diagnostics: {
      totalByteWeight: audits["total-byte-weight"]?.numericValue ?? null,
      requestCount: audits["network-requests"]?.details?.items?.length ?? null,
    },
    screenshots,
  };
}

export function lighthouseFromJson(
  raw: unknown,
  url: string,
  formFactor: FormFactor,
  extraShots: string[] = [],
  includeFilmstrip = true,
): LighthouseRun {
  return lighthouseFromLhr(raw as Lhr, url, formFactor, extraShots, includeFilmstrip);
}
