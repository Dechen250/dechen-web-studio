import { runDiscovery } from "@/lib/discovery/run";
import type { DiscoveryLeadInput } from "@/lib/discovery/types";
import { collectPagespeedAudit } from "@/lib/site-audit/run-pagespeed";
import type { AuditResult } from "@/lib/site-audit/types";

import {
  type JobRecord,
  type LeadRecord,
  newId,
  nowIso,
  patchJob,
  saveJob,
  saveJobMarkdown,
  saveLead,
} from "./store";

function leadToDiscovery(lead: LeadRecord): DiscoveryLeadInput {
  return {
    name: lead.name,
    email: lead.email,
    whatsapp: lead.whatsapp,
    company: lead.company,
    website: lead.website,
    segment: lead.company,
    message: lead.message,
  };
}

export async function createQueuedJobs(lead: LeadRecord): Promise<{
  auditJob?: JobRecord;
  discoveryJob: JobRecord;
}> {
  const createdAt = nowIso();
  let auditJob: JobRecord | undefined;

  if (lead.website) {
    auditJob = {
      id: newId("audit"),
      kind: "audit",
      status: "queued",
      createdAt,
      updatedAt: createdAt,
      leadId: lead.id,
      url: lead.website,
      engine: "pagespeed",
    };
    await saveJob(auditJob);
  }

  const discoveryJob: JobRecord = {
    id: newId("disc"),
    kind: "discovery",
    status: "queued",
    createdAt,
    updatedAt: createdAt,
    leadId: lead.id,
    url: lead.website,
  };
  await saveJob(discoveryJob);

  lead.auditJobId = auditJob?.id;
  lead.discoveryJobId = discoveryJob.id;
  await saveLead(lead);

  return { auditJob, discoveryJob };
}

export async function processLeadJobs(
  lead: LeadRecord,
  jobs: { auditJob?: JobRecord; discoveryJob: JobRecord },
): Promise<void> {
  let audit: AuditResult | undefined;
  let auditMarkdown: string | undefined;
  let blockedTitle: string | undefined;

  if (lead.website && jobs.auditJob) {
    await patchJob("audit", jobs.auditJob.id, { status: "running" });
    try {
      const collected = await collectPagespeedAudit(lead.website, "mobile");
      audit = collected.result;
      auditMarkdown = collected.markdown;
      blockedTitle = collected.blocked?.title;
      const resultPath = await saveJobMarkdown("audit", jobs.auditJob.id, collected.markdown);
      await patchJob("audit", jobs.auditJob.id, {
        status: "done",
        resultPath,
        engine: "pagespeed",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      await patchJob("audit", jobs.auditJob.id, { status: "error", error: message });
    }
  }

  await patchJob("discovery", jobs.discoveryJob.id, { status: "running" });
  try {
    const pack = await runDiscovery({
      lead: leadToDiscovery(lead),
      audit,
      auditMarkdown,
      blockedTitle,
    });
    const resultPath = await saveJobMarkdown("discovery", jobs.discoveryJob.id, pack.markdown);
    await patchJob("discovery", jobs.discoveryJob.id, { status: "done", resultPath });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await patchJob("discovery", jobs.discoveryJob.id, { status: "error", error: message });
  }
}

export function startLeadJobs(lead: LeadRecord, jobs: { auditJob?: JobRecord; discoveryJob: JobRecord }): void {
  void processLeadJobs(lead, jobs).catch((error: unknown) => {
    console.error("[ops] falha ao processar jobs do lead", error);
  });
}
