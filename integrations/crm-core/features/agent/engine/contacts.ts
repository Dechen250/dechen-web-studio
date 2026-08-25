export type ExtractedContact = {
  name?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  jobTitle?: string;
  sourceUrl: string;
};

const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const JUNK_LOCAL =
  /^(noreply|no-reply|no_reply|donotreply|mailer-daemon|webmaster|postmaster|privacy|abuse|newsletter|noretornar|sentry|webpack)(\+.*)?$/i;
const JUNK_DOMAIN =
  /(example\.com|email\.com|sentry\.io|wixpress\.com|cloudflare\.com|schema\.org|googleapis\.com|gstatic\.com|w3\.org|placeholder\.com)$/i;
const FILE_EMAIL = /\.(png|jpe?g|gif|webp|svg|css|js|woff2?|map)$/i;
const CONTACT_PATH =
  /\/(contato|contact|fale-conosco|faleconosco|atendimento|fale-connosco)(\.html)?\/?(\?|#|$)/i;

function decodeHtml(value: string): string {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#0*64;/g, "@")
    .replace(/&#x0*40;/gi, "@")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) =>
      String.fromCharCode(Number.parseInt(code, 16)),
    );
}

function stripNoise(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ");
}

function normalizeEmail(raw: string): string | undefined {
  const email = decodeHtml(raw)
    .replace(/^mailto:/i, "")
    .split("?")[0]
    .trim()
    .toLowerCase();
  if (!email.includes("@") || email.length > 120) return undefined;
  if (FILE_EMAIL.test(email)) return undefined;
  const [local, domain] = email.split("@");
  if (!local || !domain) return undefined;
  if (JUNK_LOCAL.test(local) || JUNK_DOMAIN.test(domain)) return undefined;
  if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email)) return undefined;
  return email;
}

function normalizeDigits(raw: string): string | undefined {
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13) return undefined;
  return digits;
}

function pushUnique(list: string[], value: string | undefined) {
  if (value && !list.includes(value)) list.push(value);
}

function emailsFromHtml(html: string): string[] {
  const text = decodeHtml(stripNoise(html));
  const found: string[] = [];
  for (const match of text.matchAll(/mailto:([^"'?\s>]+)/gi)) {
    pushUnique(found, normalizeEmail(match[1] ?? ""));
  }
  for (const match of text.matchAll(EMAIL_RE)) {
    pushUnique(found, normalizeEmail(match[0] ?? ""));
  }
  return found;
}

function phonesFromHtml(html: string): string[] {
  const text = decodeHtml(stripNoise(html));
  const found: string[] = [];
  for (const match of text.matchAll(/tel:([^"'\s>]+)/gi)) {
    pushUnique(found, normalizeDigits(decodeURIComponent(match[1] ?? "")));
  }
  return found;
}

function whatsappFromHtml(html: string): string[] {
  const text = decodeHtml(stripNoise(html));
  const found: string[] = [];
  for (const match of text.matchAll(
    /(?:wa\.me\/|api\.whatsapp\.com\/send\?[^"'\s>]*phone=)(\+?\d[\d%\s-]{8,20})/gi,
  )) {
    pushUnique(found, normalizeDigits(decodeURIComponent(match[1] ?? "")));
  }
  return found;
}

function jsonLdBlocks(html: string): unknown[] {
  const blocks: unknown[] = [];
  for (const match of html.matchAll(
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    const raw = match[1]?.trim();
    if (!raw) continue;
    try {
      blocks.push(JSON.parse(decodeHtml(raw)));
    } catch {
      /* JSON-LD inválido no site */
    }
  }
  return blocks;
}

function walkJsonLd(node: unknown, visit: (item: Record<string, unknown>) => void) {
  if (!node) return;
  if (Array.isArray(node)) {
    for (const item of node) walkJsonLd(item, visit);
    return;
  }
  if (typeof node !== "object") return;
  const record = node as Record<string, unknown>;
  visit(record);
  walkJsonLd(record["@graph"], visit);
}

function stringField(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (Array.isArray(value)) {
    const first = value.find((item) => typeof item === "string" && item.trim());
    return typeof first === "string" ? first.trim() : undefined;
  }
  return undefined;
}

function typeList(value: unknown): string[] {
  if (typeof value === "string") return [value.toLowerCase()];
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string").map((item) => item.toLowerCase());
  }
  return [];
}

function contactsFromJsonLd(html: string, sourceUrl: string): ExtractedContact[] {
  const found: ExtractedContact[] = [];
  for (const block of jsonLdBlocks(html)) {
    walkJsonLd(block, (item) => {
      const types = typeList(item["@type"]);
      const isPerson = types.some((type) => type.includes("person"));
      const isOrg = types.some((type) => type.includes("organization") || type.includes("localbusiness"));
      if (!isPerson && !isOrg) return;
      const email = normalizeEmail(stringField(item.email) ?? "");
      const phone = normalizeDigits(stringField(item.telephone) ?? stringField(item.phone) ?? "");
      const name = isPerson ? stringField(item.name) : undefined;
      if (!email && !phone && !name) return;
      found.push({
        name,
        email,
        phone,
        jobTitle: isPerson ? stringField(item.jobTitle) : undefined,
        sourceUrl,
      });
    });
  }
  return found;
}

function mergeContacts(items: ExtractedContact[]): ExtractedContact[] {
  const merged: ExtractedContact[] = [];

  const same = (a: ExtractedContact, b: ExtractedContact) => {
    if (a.email && b.email && a.email === b.email) return true;
    if (a.whatsapp && b.whatsapp && a.whatsapp === b.whatsapp) return true;
    if (a.phone && b.phone && a.phone === b.phone) return true;
    if (a.whatsapp && b.phone && a.whatsapp === b.phone) return true;
    if (a.phone && b.whatsapp && a.phone === b.whatsapp) return true;
    return false;
  };

  for (const item of items) {
    const existing = merged.find((row) => same(row, item));
    if (!existing) {
      merged.push({ ...item });
      continue;
    }
    existing.name = existing.name || item.name;
    existing.email = existing.email || item.email;
    existing.phone = existing.phone || item.phone;
    existing.whatsapp = existing.whatsapp || item.whatsapp;
    existing.jobTitle = existing.jobTitle || item.jobTitle;
  }

  return merged.filter((item) => item.email || item.phone || item.whatsapp).slice(0, 5);
}

export function extractContactsFromHtml(html: string, sourceUrl: string): ExtractedContact[] {
  const fromLd = contactsFromJsonLd(html, sourceUrl);
  const emails = emailsFromHtml(html);
  const phones = phonesFromHtml(html);
  const whatsapps = whatsappFromHtml(html);
  const fragments: ExtractedContact[] = [...fromLd];

  const usedEmails = new Set(fromLd.map((item) => item.email).filter(Boolean));
  const usedPhones = new Set(
    [...fromLd.map((item) => item.phone), ...fromLd.map((item) => item.whatsapp)].filter(Boolean),
  );

  for (const email of emails) {
    if (usedEmails.has(email)) continue;
    fragments.push({ email, sourceUrl });
    usedEmails.add(email);
  }
  for (const whatsapp of whatsapps) {
    if (usedPhones.has(whatsapp)) continue;
    fragments.push({ whatsapp, phone: whatsapp, sourceUrl });
    usedPhones.add(whatsapp);
  }
  for (const phone of phones) {
    if (usedPhones.has(phone)) continue;
    fragments.push({ phone, sourceUrl });
    usedPhones.add(phone);
  }

  return mergeContacts(fragments);
}

export function contactPageUrls(html: string, pageUrl: string): string[] {
  let origin: URL;
  try {
    origin = new URL(pageUrl);
  } catch {
    return [];
  }

  const found = new Set<string>();
  const currentPath = origin.pathname.replace(/\/+$/, "") || "/";

  for (const match of html.matchAll(/href\s*=\s*["']([^"']+)["']/gi)) {
    const href = match[1]?.trim();
    if (!href || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) {
      continue;
    }
    try {
      const next = new URL(href, origin);
      if (next.origin !== origin.origin) continue;
      if (!CONTACT_PATH.test(next.pathname)) continue;
      const path = next.pathname.replace(/\/+$/, "") || "/";
      if (path === currentPath) continue;
      found.add(`${next.origin}${next.pathname}`);
    } catch {
      /* href relativo inválido */
    }
  }

  for (const path of ["/contato", "/contact", "/fale-conosco"]) {
    if ((origin.pathname.replace(/\/+$/, "") || "/") === path) continue;
    found.add(`${origin.origin}${path}`);
  }

  return [...found].slice(0, 2);
}
