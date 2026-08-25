import type { AuditResult } from "@/lib/site-audit/types";

export const TO_CONFIRM = "[a confirmar na reunião]";

export type DiscoveryLeadInput = {
  name: string;
  email: string;
  whatsapp: string;
  company: string;
  role?: string;
  website?: string;
  segment?: string;
  message?: string;
};

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

export type DiscoveryInput = {
  lead: DiscoveryLeadInput;
  facts?: SiteFacts;
  audit?: AuditResult;
  auditMarkdown?: string;
  blockedTitle?: string;
};

export type DiscoveryPack = {
  generatedAt: string;
  lead: DiscoveryLeadInput;
  facts: SiteFacts;
  markdown: string;
};
