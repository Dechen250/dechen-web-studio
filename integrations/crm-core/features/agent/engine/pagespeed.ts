export type PageSpeedScores = {
  performance: number | null;
  accessibility: number | null;
  seo: number | null;
  bestPractices: number | null;
  strategy: "mobile" | "desktop";
};

function scoreOf(value: unknown): number | null {
  if (typeof value !== "number" || Number.isNaN(value)) return null;
  return Math.round(value * 100);
}

export async function collectPageSpeedScores(
  url: string,
): Promise<{ scores?: PageSpeedScores; error?: string; markdown: string }> {
  const endpoint = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
  const params = new URLSearchParams({
    url,
    strategy: "mobile",
  });
  for (const category of ["performance", "accessibility", "best-practices", "seo"]) {
    params.append("category", category);
  }
  const key = process.env.PAGESPEED_API_KEY?.trim();
  if (!key) {
    return {
      markdown:
        "Medição PageSpeed disponível quando o CRM tiver PAGESPEED_API_KEY. O rascunho abaixo usa só o HTML do site.",
    };
  }
  params.set("key", key);

  try {
    const response = await fetch(`${endpoint}?${params.toString()}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(45_000),
    });
    if (!response.ok) {
      const body = await response.text();
      const error = `PageSpeed recusou a medição (${response.status}). ${body.slice(0, 180)}`;
      return { error, markdown: `- ${error}` };
    }

    const json = (await response.json()) as {
      lighthouseResult?: {
        categories?: Record<string, { score?: number | null }>;
      };
    };
    const categories = json.lighthouseResult?.categories ?? {};
    const scores: PageSpeedScores = {
      performance: scoreOf(categories.performance?.score),
      accessibility: scoreOf(categories.accessibility?.score),
      seo: scoreOf(categories.seo?.score),
      bestPractices: scoreOf(categories["best-practices"]?.score),
      strategy: "mobile",
    };

    const line = (label: string, value: number | null) =>
      `- ${label}: ${value === null ? "—" : `${value}/100`}`;

    return {
      scores,
      markdown: [
        "Medição PageSpeed Insights (celular):",
        line("Performance", scores.performance),
        line("Acessibilidade", scores.accessibility),
        line("SEO", scores.seo),
        line("Boas práticas", scores.bestPractices),
      ].join("\n"),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { error: message, markdown: `- Falha na medição PageSpeed: ${message}` };
  }
}
