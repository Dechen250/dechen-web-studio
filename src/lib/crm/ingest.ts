export type CrmLeadInput = {
  name: string;
  email: string;
  whatsapp: string;
  company: string;
  segment?: string;
  website?: string;
  message?: string;
  origin: "contact-form" | "ops";
  leadId?: string;
};

export type CrmIngestResult = {
  companyId: string;
  contactId: string;
  companyCreated: boolean;
  contactCreated: boolean;
};

function configuredUrl(): string | null {
  const url = process.env.CRM_INGEST_URL?.trim();
  return url || null;
}

function configuredSecret(): string | null {
  const secret = process.env.CRM_INGEST_SECRET?.trim();
  return secret && secret.length >= 8 ? secret : null;
}

export function crmIngestEnabled(): boolean {
  return Boolean(configuredUrl() && configuredSecret());
}

export async function ingestLeadToCrm(
  lead: CrmLeadInput,
): Promise<CrmIngestResult | null> {
  const url = configuredUrl();
  const secret = configuredSecret();
  if (!url || !secret) return null;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secret}`,
    },
    body: JSON.stringify(lead),
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`CRM recusou o lead (${response.status}). ${body.slice(0, 240)}`);
  }

  return (await response.json()) as CrmIngestResult;
}
