import { describeFetchFailure } from "./preflight";
import type { CheckResult, Severity } from "./types";

const USER_AGENT =
  "Mozilla/5.0 (compatible; DechenWebStudio-SiteAudit/1.0; +https://dechenwebstudio.com.br)";

const REQUEST_TIMEOUT_MS = 20_000;

type Page = {
  finalUrl: string;
  status: number;
  html: string;
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function metaContent(html: string, value: string): string | null {
  for (const attr of ["name", "property"]) {
    const tagPattern = new RegExp(
      `<meta[^>]+${attr}\\s*=\\s*["']${escapeRegExp(value)}["'][^>]*>`,
      "i",
    );
    const tag = html.match(tagPattern)?.[0];
    if (!tag) continue;

    const content = tag.match(/content\s*=\s*["']([^"']*)["']/i)?.[1]?.trim();
    if (content) return content;
  }

  return null;
}

function textOf(html: string, tag: string): string | null {
  const match = html.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  if (!match) return null;

  return match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() || null;
}

async function fetchPage(url: string): Promise<Page> {
  let response: Response;

  try {
    response = await fetch(url, {
      redirect: "follow",
      headers: { "user-agent": USER_AGENT, accept: "text/html,*/*" },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    throw new Error(describeFetchFailure(error, url));
  }

  return {
    finalUrl: response.url || url,
    status: response.status,
    html: await response.text(),
  };
}

async function exists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      headers: { "user-agent": USER_AGENT },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    return response.ok;
  } catch {
    return false;
  }
}

async function checkHttps(url: string): Promise<CheckResult> {
  const target = new URL(url);
  const why = "Navegador marca site sem HTTPS como não seguro, e isso derruba confiança na hora.";

  if (target.protocol !== "https:") {
    return {
      label: "HTTPS",
      severity: "critico",
      detail: `A URL auditada usa ${target.protocol.replace(":", "")}.`,
      why,
    };
  }

  const insecure = new URL(target.toString());
  insecure.protocol = "http:";

  try {
    const response = await fetch(insecure.toString(), {
      redirect: "follow",
      headers: { "user-agent": USER_AGENT },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!response.url.startsWith("https:")) {
      return {
        label: "HTTPS",
        severity: "atencao",
        detail: "Responde em HTTPS, mas a versão HTTP não redireciona para a segura.",
        why,
      };
    }
  } catch {
    return {
      label: "HTTPS",
      severity: "ok",
      detail: "Responde em HTTPS. A versão HTTP não respondeu (aceitável).",
    };
  }

  return {
    label: "HTTPS",
    severity: "ok",
    detail: "Responde em HTTPS e o HTTP redireciona para a versão segura.",
  };
}

function checkTitle(html: string): CheckResult {
  const title = textOf(html, "title");
  const why = "É a primeira linha que o cliente lê no Google. Título fraco custa clique.";

  if (!title) {
    return { label: "Título da página", severity: "critico", detail: "Não encontrado.", why };
  }

  if (title.length < 30 || title.length > 65) {
    return {
      label: "Título da página",
      severity: "atencao",
      detail: `${title.length} caracteres (ideal entre 30 e 65): "${title}".`,
      why,
    };
  }

  return {
    label: "Título da página",
    severity: "ok",
    detail: `${title.length} caracteres: "${title}".`,
  };
}

function checkDescription(html: string): CheckResult {
  const description = metaContent(html, "description");
  const why = "É o texto de venda que aparece embaixo do título no Google.";

  if (!description) {
    return { label: "Meta description", severity: "atencao", detail: "Não encontrada.", why };
  }

  if (description.length < 70 || description.length > 165) {
    return {
      label: "Meta description",
      severity: "atencao",
      detail: `${description.length} caracteres (ideal entre 70 e 165).`,
      why,
    };
  }

  return {
    label: "Meta description",
    severity: "ok",
    detail: `${description.length} caracteres.`,
  };
}

function checkSocialPreview(html: string): CheckResult {
  const present = ["og:title", "og:description", "og:image"].filter((tag) =>
    Boolean(metaContent(html, tag)),
  );

  const why =
    "Sem essas tags o link colado no WhatsApp e no Instagram aparece sem imagem nem descrição.";

  if (present.length === 0) {
    return {
      label: "Prévia de link (Open Graph)",
      severity: "critico",
      detail: "Nenhuma tag og: encontrada.",
      why,
    };
  }

  if (present.length < 3) {
    return {
      label: "Prévia de link (Open Graph)",
      severity: "atencao",
      detail: `Só ${present.join(", ")} presente(s).`,
      why,
    };
  }

  return {
    label: "Prévia de link (Open Graph)",
    severity: "ok",
    detail: "og:title, og:description e og:image presentes.",
  };
}

function checkViewport(html: string): CheckResult {
  const viewport = metaContent(html, "viewport");

  if (!viewport) {
    return {
      label: "Viewport mobile",
      severity: "critico",
      detail: "Meta viewport ausente: o site provavelmente abre desproporcional no celular.",
      why: "A maior parte do tráfego de negócio local vem de celular.",
    };
  }

  return { label: "Viewport mobile", severity: "ok", detail: viewport };
}

function checkLang(html: string): CheckResult {
  const lang = html.match(/<html[^>]*\slang\s*=\s*["']([^"']+)["']/i)?.[1];

  if (!lang) {
    return {
      label: "Idioma declarado",
      severity: "atencao",
      detail: "Atributo lang ausente no <html>.",
      why: "Ajuda buscador e leitor de tela a tratar o conteúdo como português.",
    };
  }

  return { label: "Idioma declarado", severity: "ok", detail: `lang="${lang}".` };
}

function checkHeadings(html: string): CheckResult {
  const count = html.match(/<h1[\s>]/gi)?.length ?? 0;

  if (count === 0) {
    return {
      label: "Título principal (H1)",
      severity: "atencao",
      detail: "Nenhum H1 encontrado.",
      why: "O H1 diz ao buscador qual é o assunto central da página.",
    };
  }

  if (count > 1) {
    return {
      label: "Título principal (H1)",
      severity: "atencao",
      detail: `${count} H1 na mesma página.`,
      why: "O H1 diz ao buscador qual é o assunto central da página.",
    };
  }

  return { label: "Título principal (H1)", severity: "ok", detail: "Exatamente um H1." };
}

function checkImageAlt(html: string): CheckResult {
  const images = html.match(/<img\b[^>]*>/gi) ?? [];
  const withoutAlt = images.filter((tag) => !/\salt\s*=/i.test(tag));

  if (images.length === 0) {
    return {
      label: "Texto alternativo em imagens",
      severity: "ok",
      detail: "Nenhuma tag <img> no HTML inicial.",
    };
  }

  if (withoutAlt.length > 0) {
    return {
      label: "Texto alternativo em imagens",
      severity: "atencao",
      detail: `${withoutAlt.length} de ${images.length} imagens sem alt.`,
      why: "Alt é acessibilidade e também contexto para o Google entender a imagem.",
    };
  }

  return {
    label: "Texto alternativo em imagens",
    severity: "ok",
    detail: `Todas as ${images.length} imagens têm alt.`,
  };
}

function checkContactChannel(html: string): CheckResult {
  const hasWhatsapp = /wa\.me\/|api\.whatsapp\.com|whatsapp:\/\//i.test(html);
  const hasPhone = /href\s*=\s*["']tel:/i.test(html);
  const hasForm = /<form\b/i.test(html);

  const found = [
    hasWhatsapp ? "WhatsApp" : null,
    hasPhone ? "telefone clicável" : null,
    hasForm ? "formulário" : null,
  ].filter(Boolean);

  const why = "Visitante interessado desiste rápido se não achar como falar com a empresa.";

  if (found.length === 0) {
    return {
      label: "Canal de contato direto",
      severity: "critico",
      detail: "Nenhum WhatsApp, telefone clicável ou formulário detectado.",
      why,
    };
  }

  if (!hasWhatsapp && !hasPhone) {
    return {
      label: "Canal de contato direto",
      severity: "atencao",
      detail: "Só formulário: sem WhatsApp nem telefone clicável.",
      why,
    };
  }

  return { label: "Canal de contato direto", severity: "ok", detail: found.join(", ") + "." };
}

function checkMeasurement(html: string): CheckResult {
  const hasAnalytics = /googletagmanager\.com|google-analytics\.com|gtag\(|GTM-[A-Z0-9]/i.test(html);
  const hasPixel = /connect\.facebook\.net|fbq\(/i.test(html);

  const found = [hasAnalytics ? "Analytics/GTM" : null, hasPixel ? "Meta Pixel" : null].filter(
    Boolean,
  );

  if (found.length === 0) {
    return {
      label: "Medição instalada",
      severity: "atencao",
      detail: "Nenhum Analytics ou Pixel detectado.",
      why: "Sem medição não há como provar retorno nem saber de onde vem o cliente.",
    };
  }

  return { label: "Medição instalada", severity: "ok", detail: found.join(", ") + "." };
}

function checkFavicon(html: string): CheckResult {
  const hasIcon = /<link[^>]+rel\s*=\s*["'][^"']*icon[^"']*["']/i.test(html);

  return hasIcon
    ? { label: "Favicon", severity: "ok", detail: "Declarado no HTML." }
    : {
        label: "Favicon",
        severity: "atencao",
        detail: "Não declarado.",
        why: "Aparece na aba e nos favoritos; ausência passa desleixo.",
      };
}

async function checkCrawlFiles(finalUrl: string): Promise<CheckResult> {
  const origin = new URL(finalUrl).origin;
  const [robots, sitemap] = await Promise.all([
    exists(`${origin}/robots.txt`),
    exists(`${origin}/sitemap.xml`),
  ]);

  const missing = [robots ? null : "robots.txt", sitemap ? null : "sitemap.xml"].filter(Boolean);

  if (missing.length === 0) {
    return { label: "robots.txt e sitemap.xml", severity: "ok", detail: "Ambos disponíveis." };
  }

  return {
    label: "robots.txt e sitemap.xml",
    severity: "atencao",
    detail: `Ausente(s): ${missing.join(" e ")}.`,
    why: "Orientam o Google sobre o que rastrear e indexar.",
  };
}

export async function runChecks(url: string): Promise<CheckResult[]> {
  const page = await fetchPage(url);

  const statusCheck: CheckResult = page.status === 200
    ? { label: "Resposta do servidor", severity: "ok", detail: `HTTP ${page.status}.` }
    : {
        label: "Resposta do servidor",
        severity: page.status >= 400 ? "critico" : "atencao",
        detail: `HTTP ${page.status} em ${page.finalUrl}.`,
      };

  const [https, crawlFiles] = await Promise.all([
    checkHttps(page.finalUrl),
    checkCrawlFiles(page.finalUrl),
  ]);

  return [
    statusCheck,
    https,
    checkViewport(page.html),
    checkTitle(page.html),
    checkDescription(page.html),
    checkSocialPreview(page.html),
    checkHeadings(page.html),
    checkLang(page.html),
    checkImageAlt(page.html),
    checkContactChannel(page.html),
    checkMeasurement(page.html),
    checkFavicon(page.html),
    crawlFiles,
  ];
}

export function worstSeverity(items: Array<{ severity: Severity }>): Severity {
  if (items.some((item) => item.severity === "critico")) return "critico";
  if (items.some((item) => item.severity === "atencao")) return "atencao";

  return "ok";
}
