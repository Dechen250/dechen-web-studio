import { buildDiscoveryMarkdown, type AgentLead } from "./discovery";
import { collectSiteFacts, type SiteFacts } from "./facts";
import { collectPageSpeedScores } from "./pagespeed";

export type AgentEngineResult = {
  facts: SiteFacts;
  markdown: string;
  website?: string;
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

export async function runCrmAgent(lead: AgentLead): Promise<AgentEngineResult> {
  const website = normalizeWebsite(lead.website);
  const facts = website
    ? await collectSiteFacts(website)
    : { contactChannels: [], measurement: [] };
  const audit = website ? await collectPageSpeedScores(website) : undefined;

  return {
    facts,
    website,
    markdown: buildDiscoveryMarkdown({
      lead: { ...lead, website },
      facts,
      auditMarkdown: audit?.markdown,
      generatedAt: new Date().toISOString(),
    }),
  };
}
