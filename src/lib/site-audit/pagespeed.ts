import { lighthouseFromJson } from "./lighthouse-parse";
import type { FormFactor, LighthouseResult } from "./types";

const PSI_ENDPOINT =
  "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

export type PageSpeedOptions = {
  url: string;
  formFactor?: FormFactor;
  apiKey?: string;
};

export async function runPageSpeed(
  options: PageSpeedOptions,
): Promise<LighthouseResult & { screenshots: string[] }> {
  const formFactor = options.formFactor ?? "mobile";
  const params = new URLSearchParams({
    url: options.url,
    strategy: formFactor === "desktop" ? "desktop" : "mobile",
  });
  for (const category of ["performance", "accessibility", "best-practices", "seo"]) {
    params.append("category", category);
  }

  const key = options.apiKey ?? process.env.PAGESPEED_API_KEY?.trim();
  if (key) params.set("key", key);

  const res = await fetch(`${PSI_ENDPOINT}?${params.toString()}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `PageSpeed Insights recusou a medição (${res.status}). ${body.slice(0, 280)}`,
    );
  }

  const json = (await res.json()) as { lighthouseResult?: unknown };
  if (!json.lighthouseResult) {
    throw new Error("PageSpeed Insights não devolveu lighthouseResult.");
  }

  return lighthouseFromJson(json.lighthouseResult, options.url, formFactor, [], false);
}
