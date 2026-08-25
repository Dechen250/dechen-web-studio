import { collectSiteFacts } from "./facts";
import { buildDiscoveryMarkdown } from "./report";
import type { DiscoveryInput, DiscoveryPack } from "./types";

export async function runDiscovery(input: DiscoveryInput): Promise<DiscoveryPack> {
  const generatedAt = new Date().toISOString();
  const facts =
    input.facts ??
    (input.lead.website ? await collectSiteFacts(input.lead.website) : { contactChannels: [], measurement: [] });

  return {
    generatedAt,
    lead: input.lead,
    facts,
    markdown: buildDiscoveryMarkdown({ ...input, facts }, generatedAt),
  };
}
