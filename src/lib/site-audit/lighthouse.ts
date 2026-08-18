import { launch } from "chrome-launcher";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

import { capturePageScreenshot } from "./screenshot";
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
type Lhr = {
  requestedUrl?: string;
  finalDisplayedUrl?: string;
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

function readFilmstrip(audits: NonNullable<Lhr["audits"]>): string[] {
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

const RUN_TIMEOUT_MS = 180_000;
const SCREENSHOT_INTERVAL_MS = 900;

type RunOptions = {
  visible?: boolean;
  onScreenshot?: (src: string) => void;
};

function chromeFlags(visible: boolean): string[] {
  const flags = ["--disable-gpu", "--mute-audio"];

  if (visible) {
    flags.push("--window-size=1280,900");
  } else {
    flags.push("--headless=new", "--window-size=412,915");
  }

  if (process.getuid?.() === 0) {
    flags.push("--no-sandbox");
  }

  return flags;
}

/**
 * O Lighthouse injeta funções serializadas na página auditada, o que quebra sob
 * transpiladores que renomeiam funções (o `__name is not defined` do esbuild).
 * Rodar a CLI em um processo Node limpo evita isso e mantém o JSON como contrato.
 */
function lighthouseCli(url: string, formFactor: FormFactor, port: number): Promise<string> {
  const args = [
    createRequire(import.meta.url).resolve("lighthouse/cli/index.js"),
    url,
    `--port=${port}`,
    "--output=json",
    "--output-path=stdout",
    "--quiet",
    "--locale=pt-BR",
    "--only-categories=performance,accessibility,best-practices,seo",
  ];

  if (formFactor === "desktop") {
    args.push("--preset=desktop");
  }

  return new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(process.execPath, args, { stdio: ["ignore", "pipe", "pipe"] });

    let stdout = "";
    let stderr = "";

    const timeout = setTimeout(() => {
      child.kill("SIGKILL");
      rejectPromise(new Error(`O Lighthouse passou de ${RUN_TIMEOUT_MS / 1000}s e foi encerrado.`));
    }, RUN_TIMEOUT_MS);

    child.stdout.on("data", (chunk: Buffer) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk: Buffer) => {
      stderr += chunk.toString();
    });

    child.on("error", (error) => {
      clearTimeout(timeout);
      rejectPromise(error);
    });

    child.on("close", (code) => {
      clearTimeout(timeout);

      if (code !== 0 || !stdout.trim()) {
        const reason = stderr.trim().split("\n").slice(-3).join(" ") || `código ${code}`;
        rejectPromise(new Error(`Lighthouse falhou: ${reason}`));
        return;
      }

      resolvePromise(stdout);
    });
  });
}

export type LighthouseRun = LighthouseResult & { screenshots: string[] };

export async function runLighthouse(
  url: string,
  formFactor: FormFactor,
  options: RunOptions = {},
): Promise<LighthouseRun> {
  const visible = options.visible ?? false;
  const chrome = await launch({
    chromeFlags: chromeFlags(visible),
    // chrome-launcher herda DISPLAY do processo; sem isso o modo visível não abre janela.
  });

  const liveShots: string[] = [];
  let pumping = true;

  const pump = async () => {
    while (pumping) {
      try {
        const src = await capturePageScreenshot(chrome.port);
        if (src) {
          liveShots.push(src);
          options.onScreenshot?.(src);
        }
      } catch {
        /* o Chrome ainda está subindo ou o Lighthouse trocou de aba */
      }
      await new Promise((resolve) => setTimeout(resolve, SCREENSHOT_INTERVAL_MS));
    }
  };

  const pumpPromise = pump();

  try {
    const raw = await lighthouseCli(url, formFactor, chrome.port);

    let lhr: Lhr;
    try {
      lhr = JSON.parse(raw) as Lhr;
    } catch {
      throw new Error("Não foi possível interpretar o relatório JSON do Lighthouse.");
    }

    const audits = lhr.audits ?? {};

    const categories: CategoryScore[] = Object.entries(CATEGORY_LABELS).map(([id, label]) => ({
      id,
      label,
      score: lhr.categories?.[id]?.score ?? null,
    }));

    const filmstrip = readFilmstrip(audits);
    const screenshots = liveShots.length > 0 ? liveShots : filmstrip;

    return {
      requestedUrl: lhr.requestedUrl ?? url,
      finalUrl: lhr.finalDisplayedUrl ?? url,
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
  } finally {
    pumping = false;
    await chrome.kill();
    await pumpPromise.catch(() => undefined);
  }
}
