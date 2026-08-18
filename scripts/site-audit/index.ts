import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

import { runChecks, worstSeverity } from "./checks";
import { runLighthouse } from "./lighthouse";
import { preflight } from "./preflight";
import { buildBlockedReport, buildReport } from "./report";
import type { AuditResult, FormFactor } from "./types";

type Options = {
  url: string;
  formFactor: FormFactor;
  outDir: string;
  json: boolean;
  strict: boolean;
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
  -h, --help       Mostra esta ajuda

Exemplos:
  npm run audit -- dechenwebstudio.com.br
  npm run audit -- https://exemplo.com.br --desktop --json
`.trim();

function normalizeUrl(input: string): string {
  const withProtocol = /^https?:\/\//i.test(input) ? input : `https://${input}`;

  return new URL(withProtocol).toString();
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

  return { url: normalizeUrl(positional[0]), formFactor, outDir, json, strict };
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  const hostname = new URL(options.url).hostname;

  console.log(`Auditando ${options.url} (${options.formFactor})...`);

  const date = new Date().toISOString().slice(0, 10);
  const access = await preflight(options.url);

  if (access.status === "bloqueado") {
    const blockedPath = resolve(
      join(options.outDir, `${slugify(hostname)}-bloqueado-${date}.md`),
    );

    await mkdir(dirname(blockedPath), { recursive: true });
    await writeFile(blockedPath, buildBlockedReport(options.url, access), "utf8");

    console.log(`\nBloqueado: ${access.title}`);
    for (const item of access.evidence) {
      console.log(`  ${item.replace(/`/g, "")}`);
    }
    console.log(`\nRelatório: ${blockedPath}`);

    if (options.strict) process.exitCode = 1;
    return;
  }

  const [lighthouse, checks] = await Promise.all([
    runLighthouse(options.url, options.formFactor),
    runChecks(options.url),
  ]);

  const result: AuditResult = { lighthouse, checks };
  const baseName = `${slugify(hostname)}-${options.formFactor}-${date}`;
  const markdownPath = resolve(join(options.outDir, `${baseName}.md`));

  await mkdir(dirname(markdownPath), { recursive: true });
  await writeFile(markdownPath, buildReport(result), "utf8");

  if (options.json) {
    await writeFile(
      resolve(join(options.outDir, `${baseName}.json`)),
      JSON.stringify(result, null, 2),
      "utf8",
    );
  }

  for (const category of lighthouse.categories) {
    const score = category.score === null ? "—" : Math.round(category.score * 100).toString();
    console.log(`  ${category.label.padEnd(14)} ${score.padStart(3)}`);
  }

  const criticos = checks.filter((check) => check.severity === "critico");
  console.log(
    criticos.length > 0
      ? `\n${criticos.length} achado(s) crítico(s): ${criticos.map((c) => c.label).join(", ")}`
      : "\nNenhum achado crítico de fundação.",
  );
  console.log(`\nRelatório: ${markdownPath}`);

  if (options.strict && worstSeverity([...checks, ...lighthouse.metrics]) === "critico") {
    process.exitCode = 1;
  }
}

main().catch((error: unknown) => {
  console.error(`\nFalha na auditoria: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
