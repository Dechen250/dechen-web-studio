export type SiteFacts = {
  url?: string;
  finalUrl?: string;
  title?: string;
  description?: string;
  h1?: string;
  lang?: string;
  ogImage?: string;
  contactChannels: string[];
  measurement: string[];
  fetchError?: string;
};

export type FetchedPage = {
  url: string;
  finalUrl: string;
  html: string;
  facts: SiteFacts;
};

export const SITE_USER_AGENT =
  "Mozilla/5.0 (compatible; CRM-Core-Agent/1.0; +https://crm.dechenwebstudio.com.br)";
const REQUEST_TIMEOUT_MS = 20_000;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function metaContent(html: string, value: string): string | undefined {
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
  return undefined;
}

function textOf(html: string, tag: string): string | undefined {
  const match = html.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  if (!match) return undefined;
  return match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() || undefined;
}

export function factsFromHtml(url: string, finalUrl: string, html: string): SiteFacts {
  const contactChannels = [
    /wa\.me\/|api\.whatsapp\.com|whatsapp:\/\//i.test(html) ? "WhatsApp" : null,
    /href\s*=\s*["']tel:/i.test(html) ? "telefone clicável" : null,
    /<form\b/i.test(html) ? "formulário" : null,
  ].filter((item): item is string => Boolean(item));
  const measurement = [
    /googletagmanager\.com|google-analytics\.com|gtag\(|GTM-[A-Z0-9]/i.test(html)
      ? "Analytics/GTM"
      : null,
    /connect\.facebook\.net|fbq\(/i.test(html) ? "Meta Pixel" : null,
  ].filter((item): item is string => Boolean(item));

  return {
    url,
    finalUrl,
    title: textOf(html, "title"),
    description: metaContent(html, "description"),
    h1: textOf(html, "h1"),
    lang: html.match(/<html[^>]+lang\s*=\s*["']([^"']+)["']/i)?.[1]?.trim(),
    ogImage: metaContent(html, "og:image"),
    contactChannels,
    measurement,
  };
}

export async function fetchSitePage(url: string): Promise<FetchedPage> {
  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: { "user-agent": SITE_USER_AGENT, accept: "text/html,*/*" },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    const html = await response.text();
    const finalUrl = response.url || url;
    return {
      url,
      finalUrl,
      html,
      facts: factsFromHtml(url, finalUrl, html),
    };
  } catch (error) {
    return {
      url,
      finalUrl: url,
      html: "",
      facts: {
        url,
        contactChannels: [],
        measurement: [],
        fetchError: error instanceof Error ? error.message : String(error),
      },
    };
  }
}

export async function collectSiteFacts(url: string): Promise<SiteFacts> {
  const page = await fetchSitePage(url);
  return page.facts;
}
