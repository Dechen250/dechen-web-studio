import type { SiteFacts } from "./types";

const USER_AGENT =
  "Mozilla/5.0 (compatible; DechenWebStudio-Discovery/1.0; +https://dechenwebstudio.com.br)";

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

function langOf(html: string): string | undefined {
  return html.match(/<html[^>]+lang\s*=\s*["']([^"']+)["']/i)?.[1]?.trim();
}

export async function collectSiteFacts(url: string): Promise<SiteFacts> {
  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: { "user-agent": USER_AGENT, accept: "text/html,*/*" },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    const html = await response.text();
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
      finalUrl: response.url || url,
      title: textOf(html, "title"),
      description: metaContent(html, "description"),
      h1: textOf(html, "h1"),
      lang: langOf(html),
      ogImage: metaContent(html, "og:image"),
      contactChannels,
      measurement,
    };
  } catch (error) {
    return {
      url,
      contactChannels: [],
      measurement: [],
      fetchError: error instanceof Error ? error.message : String(error),
    };
  }
}
