import { contactPageUrls, extractContactsFromHtml, type ExtractedContact } from "./contacts";
import { buildDiscoveryMarkdown, type AgentLead } from "./discovery";
import { fetchSitePage, type SiteFacts } from "./facts";
import { collectPageSpeedScores } from "./pagespeed";

export type AgentEngineResult = {
  facts: SiteFacts;
  markdown: string;
  website?: string;
  extractedContacts: ExtractedContact[];
};

function normalizeWebsite(value?: string): string | undefined {
  const raw = value?.trim();
  if (!raw) return undefined;
  try {
    const url = new URL(raw.includes("://") ? raw : `https://${raw}`);
    if (url.protocol !== "http:" && url.protocol !== "https:") return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

function mergeFacts(pages: SiteFacts[]): SiteFacts {
  const home = pages[0] ?? { contactChannels: [], measurement: [] };
  const channels = new Set<string>();
  const measurement = new Set<string>();
  for (const page of pages) {
    for (const item of page.contactChannels) channels.add(item);
    for (const item of page.measurement) measurement.add(item);
  }
  return {
    ...home,
    contactChannels: [...channels],
    measurement: [...measurement],
  };
}

export async function runCrmAgent(lead: AgentLead): Promise<AgentEngineResult> {
  const website = normalizeWebsite(lead.website);
  if (!website) {
    const facts = { contactChannels: [], measurement: [] };
    return {
      facts,
      website,
      extractedContacts: [],
      markdown: buildDiscoveryMarkdown({
        lead,
        facts,
        extractedContacts: [],
        generatedAt: new Date().toISOString(),
      }),
    };
  }

  const home = await fetchSitePage(website);
  const extraUrls = home.html ? contactPageUrls(home.html, home.finalUrl || website) : [];
  const extras = await Promise.all(extraUrls.map((url) => fetchSitePage(url)));
  const pages = [home, ...extras];
  const facts = mergeFacts(pages.map((page) => page.facts));
  const extractedContacts = extractContactsFromHtml(
    pages.map((page) => page.html).join("\n"),
    home.finalUrl || website,
  );
  const audit = await collectPageSpeedScores(website);

  return {
    facts,
    website,
    extractedContacts,
    markdown: buildDiscoveryMarkdown({
      lead: { ...lead, website },
      facts,
      extractedContacts,
      auditMarkdown: audit.markdown,
      generatedAt: new Date().toISOString(),
    }),
  };
}
