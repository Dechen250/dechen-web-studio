"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import type { FormActionResult } from "@/features/contacts/actions";
import { createAndRunAgent, leadFromRecords } from "@/features/agent/queries";
import { requireActiveOrganization } from "@/server/session";

function emptyToNull(value: FormDataEntryValue | null): string | null {
  const text = String(value ?? "").trim();
  return text || null;
}

export async function runAgentAction(formData: FormData): Promise<void> {
  const { user, organizationId } = await requireActiveOrganization();
  const contactId = emptyToNull(formData.get("contactId"));
  const companyId = emptyToNull(formData.get("companyId"));
  const website = emptyToNull(formData.get("website"));

  const lead = await leadFromRecords(db, organizationId, {
    contactId,
    companyId,
    website,
  });

  const name = emptyToNull(formData.get("name"));
  const email = emptyToNull(formData.get("email"));
  const whatsapp = emptyToNull(formData.get("whatsapp"));
  const company = emptyToNull(formData.get("company"));
  const message = emptyToNull(formData.get("message"));

  if (name) lead.name = name;
  if (email) lead.email = email;
  if (whatsapp) lead.whatsapp = whatsapp;
  if (company) lead.company = company;
  if (message) lead.message = message;
  if (website) lead.website = website;

  if (!lead.name || !lead.company) {
    throw new Error("Informe contato ou empresa para o agente.");
  }

  const run = await createAndRunAgent(db, user.id, organizationId, lead);
  revalidatePath("/app/agent");
  if (lead.contactId) revalidatePath(`/app/contacts/${lead.contactId}`);
  if (lead.companyId) revalidatePath(`/app/companies/${lead.companyId}`);
  redirect(`/app/agent/${run.id}`);
}

export async function runAgentFromRecordAction(
  _prev: FormActionResult | undefined,
  formData: FormData,
): Promise<FormActionResult> {
  try {
    await runAgentAction(formData);
    return { ok: true, message: "Agente em execução." };
  } catch (error) {
    if (error && typeof error === "object" && "digest" in error) {
      throw error;
    }
    const message = error instanceof Error ? error.message : "Não foi possível rodar o agente.";
    return { ok: false, error: message };
  }
}
