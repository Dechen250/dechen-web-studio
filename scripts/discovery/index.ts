import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import { runDiscovery } from "../../src/lib/discovery/run";
import { collectSiteFacts } from "../../src/lib/discovery/facts";
import type { DiscoveryLeadInput } from "../../src/lib/discovery/types";

const USAGE = `
Rascunho de Descoberta — Dechen Web Studio

Monta o pack da reunião a partir do que o lead disse e do que o site declara.
Não inventa orçamento nem prazo. O que faltar vira [a confirmar na reunião].

Uso:
  npm run discovery -- --name "Nome" --email a@b.com --whatsapp 11999999999 --company "Empresa" [--website dominio.com.br]

Opções:
  --name, --email, --whatsapp, --company   obrigatórios
  --role, --segment, --message, --website  opcionais
  --out <arquivo>                          Markdown de saída (padrão: stdout)
  -h, --help

Exemplos:
  npm run discovery -- --name "Maria" --email maria@exemplo.com --whatsapp 11999999999 --company "Exemplo" --website dechenwebstudio.com.br
`.trim();

function argValue(argv: string[], name: string): string | undefined {
  const index = argv.indexOf(name);
  if (index === -1) return undefined;
  const value = argv[index + 1];
  if (!value || value.startsWith("-")) {
    throw new Error(`${name} exige um valor.`);
  }
  return value;
}

function parseLead(argv: string[]): DiscoveryLeadInput {
  const name = argValue(argv, "--name");
  const email = argValue(argv, "--email");
  const whatsapp = argValue(argv, "--whatsapp");
  const company = argValue(argv, "--company");

  if (!name || !email || !whatsapp || !company) {
    throw new Error("Informe --name, --email, --whatsapp e --company. Use --help.");
  }

  let website = argValue(argv, "--website");
  if (website && !/^https?:\/\//i.test(website)) website = `https://${website}`;

  return {
    name,
    email,
    whatsapp,
    company,
    role: argValue(argv, "--role"),
    segment: argValue(argv, "--segment"),
    message: argValue(argv, "--message"),
    website,
  };
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  if (argv.includes("-h") || argv.includes("--help")) {
    console.log(USAGE);
    return;
  }

  const lead = parseLead(argv);
  const facts = lead.website ? await collectSiteFacts(lead.website) : undefined;
  const pack = await runDiscovery({ lead, facts });
  const out = argValue(argv, "--out");

  if (out) {
    const path = resolve(out);
    await writeFile(path, pack.markdown, "utf8");
    console.log(`Rascunho: ${path}`);
    return;
  }

  process.stdout.write(pack.markdown);
}

main().catch((error: unknown) => {
  console.error(`\nFalha na Descoberta: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
