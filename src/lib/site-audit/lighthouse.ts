import { launch } from "chrome-launcher";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

import {
  lighthouseFromLhr,
  readFilmstrip,
  type Lhr,
  type LighthouseRun,
} from "./lighthouse-parse";
import { capturePageScreenshot } from "./screenshot";
import type { FormFactor } from "./types";

export {
  lighthouseFromJson,
  lighthouseFromLhr,
  type LighthouseRun,
} from "./lighthouse-parse";

const RUN_TIMEOUT_MS = 180_000;
const SCREENSHOT_INTERVAL_MS = 900;

type RunOptions = {
  visible?: boolean;
  onScreenshot?: (src: string) => void;
};

function chromeFlags(visible: boolean): string[] {
  const flags = ["--disable-gpu", "--mute-audio", "--disable-dev-shm-usage"];

  if (visible) {
    flags.push("--window-size=1280,900");
  } else {
    flags.push("--headless=new", "--window-size=412,915");
  }

  if (process.getuid?.() === 0 || process.env.CHROME_NO_SANDBOX === "1") {
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

    const filmstrip = readFilmstrip(lhr.audits ?? {});
    const screenshots = liveShots.length > 0 ? liveShots : filmstrip;
    return lighthouseFromLhr(lhr, url, formFactor, screenshots);
  } finally {
    pumping = false;
    await chrome.kill();
    await pumpPromise.catch(() => undefined);
  }
}
