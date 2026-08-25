import { and, eq, ilike, isNull, or } from "drizzle-orm";
import { companies, contacts } from "@/database/schema";
import type { Database } from "@/lib/db";
import {
  emptyToNull,
  normalizePhone,
  optionalNormalizedEmail,
} from "@/lib/utils/commercial";

export type SiteLeadInput = {
  name: string;
  email?: string;
  whatsapp?: string;
  company: string;
  segment?: string;
  website?: string;
  message?: string;
  origin?: string;
  leadId?: string;
};

export type SiteLeadResult = {
  companyId: string;
  contactId: string;
  companyCreated: boolean;
  contactCreated: boolean;
  agentRunId?: string;
};

function splitName(name: string): { firstName: string; lastName: string | null } {
  const parts = name.replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  const firstName = (parts[0] ?? "Lead").slice(0, 80);
  const lastName = parts.slice(1).join(" ").slice(0, 80) || null;
  return { firstName, lastName };
}

function notesFromLead(input: SiteLeadInput): string {
  const lines = [
    input.message?.trim() || null,
    input.segment ? `Segmento: ${input.segment}` : null,
    input.leadId ? `Lead DWS: ${input.leadId}` : null,
  ].filter(Boolean);
  return lines.join("\n").slice(0, 5000);
}

async function findCompany(
  db: Database,
  organizationId: string,
  name: string,
  website?: string,
) {
  const match = [ilike(companies.name, name)];
  if (website) match.push(eq(companies.website, website));

  const [row] = await db
    .select({ id: companies.id, website: companies.website, notes: companies.notes })
    .from(companies)
    .where(
      and(
        eq(companies.organizationId, organizationId),
        isNull(companies.archivedAt),
        or(...match),
      ),
    )
    .limit(1);
  return row ?? null;
}

async function findContact(
  db: Database,
  organizationId: string,
  emailNormalized: string | null,
  phoneNormalized: string | null,
) {
  if (!emailNormalized && !phoneNormalized) return null;
  const match = [];
  if (emailNormalized) match.push(eq(contacts.emailNormalized, emailNormalized));
  if (phoneNormalized) match.push(eq(contacts.phoneNormalized, phoneNormalized));

  const [row] = await db
    .select()
    .from(contacts)
    .where(
      and(
        eq(contacts.organizationId, organizationId),
        isNull(contacts.archivedAt),
        or(...match),
      ),
    )
    .limit(1);
  return row ?? null;
}

export async function ingestSiteLead(
  db: Database,
  organizationId: string,
  ownerId: string,
  raw: SiteLeadInput,
): Promise<SiteLeadResult> {
  const companyName = raw.company.trim().slice(0, 160);
  if (!companyName) throw new Error("COMPANY_REQUIRED");

  const email = emptyToNull(raw.email ?? null);
  const phone = emptyToNull(raw.whatsapp ?? null);
  const emailNormalized = optionalNormalizedEmail(email);
  const phoneNormalized = normalizePhone(phone);
  const website = emptyToNull(raw.website ?? null);
  const source = (raw.origin === "ops" ? "ops-descoberta" : "website").slice(0, 120);
  const note = notesFromLead(raw);
  const { firstName, lastName } = splitName(raw.name);

  let companyCreated = false;
  let existingCompany = await findCompany(db, organizationId, companyName, website ?? undefined);

  if (!existingCompany) {
    const [created] = await db
      .insert(companies)
      .values({
        organizationId,
        ownerId,
        name: companyName,
        website,
        industry: emptyToNull(raw.segment ?? null),
        phone,
        phoneNormalized,
        email,
        emailNormalized,
        notes: note || null,
      })
      .returning({ id: companies.id, website: companies.website, notes: companies.notes });
    existingCompany = created;
    companyCreated = true;
  } else if (website && !existingCompany.website) {
    await db
      .update(companies)
      .set({ website, updatedAt: new Date() })
      .where(eq(companies.id, existingCompany.id));
  }

  const existingContact = await findContact(db, organizationId, emailNormalized, phoneNormalized);
  if (existingContact) {
    const mergedNotes = [existingContact.notes, note].filter(Boolean).join("\n---\n").slice(0, 5000);
    const [updated] = await db
      .update(contacts)
      .set({
        companyId: existingContact.companyId ?? existingCompany.id,
        whatsapp: existingContact.whatsapp ?? phone,
        phone: existingContact.phone ?? phone,
        phoneNormalized: existingContact.phoneNormalized ?? phoneNormalized,
        email: existingContact.email ?? email,
        emailNormalized: existingContact.emailNormalized ?? emailNormalized,
        source: existingContact.source ?? source,
        notes: mergedNotes || null,
        updatedAt: new Date(),
      })
      .where(eq(contacts.id, existingContact.id))
      .returning({ id: contacts.id });

    return {
      companyId: existingCompany.id,
      contactId: updated.id,
      companyCreated,
      contactCreated: false,
    };
  }

  const [createdContact] = await db
    .insert(contacts)
    .values({
      organizationId,
      ownerId,
      companyId: existingCompany.id,
      firstName,
      lastName,
      email,
      emailNormalized,
      phone,
      phoneNormalized,
      whatsapp: phone,
      source,
      status: "lead",
      notes: note || null,
    })
    .returning({ id: contacts.id });

  return {
    companyId: existingCompany.id,
    contactId: createdContact.id,
    companyCreated,
    contactCreated: true,
  };
}
