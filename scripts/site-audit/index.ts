import { writeSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

import { worstSeverity } from "../../src/lib/site-audit/format";
import { runAudit } from "../../src/lib/site-audit/run";
import type { AuditEvent, FormFactor } from "../../src/lib/site-audit/types";

type Options = {
  url: string;
  formFactor: FormFactor;
  outDir: string;
  json: boolean;
  strict: boolean;
  visible: boolean;
  events: boolean;
};

const USAGE = `
Auditoria técnica de site — Dechen Web Studio

Uso:
  npm run audit -- <url> [opções]

Opções:
  --desktop        Simula desktop em vez de celular (padrão: celular)
  --out <pasta>    Pasta de saída (padrão: reports)
  --json           Salva também o resultado bruto em JSON
  --strict         Sai com código 1 se houver achado crítico (útil em CI)
  --visible        Abre o Chrome com janela em vez de headless (demonstração)
  --events         Emite um JSON por linha no stdout (usado pelo console web)
  -h, --help       Mostra esta ajuda

A interface web, com tela ao vivo, está em /ops/audit.

Exemplos:
  npm run audit -- dechenwebstudio.com.br
  npm run audit -- https://exemplo.com.br --desktop --json
`.trim();

function slimEvent(event: AuditEvent): AuditEvent {
  if (event.type !== "complete") return event;

  const screenshots = [...event.result.screenshots]
    .sort((a, b) => b.length - a.length)
    .slice(0, 4);

  return {
    ...event,
    markdown: "",
    result: { ...event.result, screenshots },
  };
}

function slugify(hostname: string): string {
  return hostname.replace(/^www\./, "").replace(/[^a-z0-9]+/gi, "-").toLowerCase();
}

function parseArgs(argv: string[]): Options {
  const positional: string[] = [];
  let formFactor: FormFactor = "mobile";
  let outDir = "reports";
  let json = false;
  let strict = false;
  let visible = false;
  let events = false;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "-h" || arg === "--help") {
      console.log(USAGE);
      process.exit(0);
    } else if (arg === "--desktop") {
      formFactor = "desktop";
    } else if (arg === "--json") {
      json = true;
    } else if (arg === "--strict") {
      strict = true;
    } else if (arg === "--visible") {
      visible = true;
    } else if (arg === "--events") {
      events = true;
    } else if (arg === "--out") {
      const value = argv[index + 1];
      if (!value) throw new Error("--out exige um caminho de pasta.");
      outDir = value;
      index += 1;
    } else if (arg.startsWith("-")) {
      throw new Error(`Opção desconhecida: ${arg}`);
    } else {
      positional.push(arg);
    }
  }

  if (positional.length === 0) {
    throw new Error("Informe a URL do site. Use --help para ver exemplos.");
  }

  return { url: positional[0], formFactor, outDir, json, strict, visible, events };
}

async function save(path: string, contents: string): Promise<string> {
  const absolute = resolve(path);
  await mkdir(dirname(absolute), { recursive: true });
  await writeFile(absolute, contents, "utf8");
  return absolute;
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  const date = new Date().toISOString().slice(0, 10);
  const events: AuditEvent[] = [];

  await runAudit(options.url, {
    formFactor: options.formFactor,
    visible: options.visible,
    emit: (event) => {
      events.push(event);
      if (options.events) {
        writeSync(1, `${JSON.stringify(slimEvent(event))}\n`);
        return;
      }
      if (event.type === "status") console.log(event.message);
    },
  });

  if (options.events) return;

  const blocked = events.find((event) => event.type === "blocked");
  const complete = events.find((event) => event.type === "complete");

  if (blocked) {
    const hostname = new URL(
      options.url.startsWith("http") ? options.url : `https://${options.url}`,
    ).hostname;
    const path = await save(
      join(options.outDir, `${slugify(hostname)}-bloqueado-${date}.md`),
      blocked.markdown,
    );

    console.log(`\nBloqueado: ${blocked.title}`);
    for (const item of blocked.evidence) {
      console.log(`  ${item.replace(/`/g, "")}`);
    }
    console.log(`\nRelatório: ${path}`);

    if (options.strict) process.exitCode = 1;
    return;
  }

  if (!complete) {
    throw new Error("A auditoria terminou sem relatório.");
  }

  const hostname = new URL(complete.result.lighthouse.finalUrl).hostname;
  const baseName = `${slugify(hostname)}-${options.formFactor}-${date}`;
  const markdownPath = await save(join(options.outDir, `${baseName}.md`), complete.markdown);

  if (options.json) {
    await save(join(options.outDir, `${baseName}.json`), JSON.stringify(complete.result, null, 2));
  }

  for (const category of complete.result.lighthouse.categories) {
    const score = category.score === null ? "—" : Math.round(category.score * 100).toString();
    console.log(`  ${category.label.padEnd(14)} ${score.padStart(3)}`);
  }

  const criticos = complete.result.checks.filter((check) => check.severity === "critico");
  console.log(
    criticos.length > 0
      ? `\n${criticos.length} achado(s) crítico(s): ${criticos.map((c) => c.label).join(", ")}`
      : "\nNenhum achado crítico de fundação.",
  );
  console.log(`\nRelatório: ${markdownPath}`);

  if (
    options.strict &&
    worstSeverity([...complete.result.checks, ...complete.result.lighthouse.metrics]) === "critico"
  ) {
    process.exitCode = 1;
  }
}

main().catch((error: unknown) => {
  console.error(`\nFalha na auditoria: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
