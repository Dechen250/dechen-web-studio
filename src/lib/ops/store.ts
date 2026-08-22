import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.join(process.cwd(), "data", "ops");

export type LeadRecord = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  whatsapp: string;
  company: string;
  website?: string;
  message: string;
  origin: "contact-form" | "ops";
  auditJobId?: string;
  discoveryJobId?: string;
};

export type JobKind = "audit" | "discovery";
export type JobStatus = "queued" | "running" | "done" | "error";

export type JobRecord = {
  id: string;
  kind: JobKind;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
  leadId?: string;
  url?: string;
  error?: string;
  resultPath?: string;
  engine?: "lighthouse" | "pagespeed";
};

export function nowIso(): string {
  return new Date().toISOString();
}

export function newId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function dirFor(kind: "leads" | JobKind): string {
  return path.join(ROOT, kind);
}

async function ensureDir(kind: "leads" | JobKind): Promise<string> {
  const dir = dirFor(kind);
  await mkdir(dir, { recursive: true });
  return dir;
}

async function writeJson(filePath: string, data: unknown): Promise<void> {
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

async function readJson<T>(filePath: string): Promise<T | null> {
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function saveLead(lead: LeadRecord): Promise<void> {
  const dir = await ensureDir("leads");
  await writeJson(path.join(dir, `${lead.id}.json`), lead);
}

export async function getLead(id: string): Promise<LeadRecord | null> {
  return readJson<LeadRecord>(path.join(dirFor("leads"), `${id}.json`));
}

export async function saveJob(job: JobRecord): Promise<void> {
  const dir = await ensureDir(job.kind);
  await writeJson(path.join(dir, `${job.id}.json`), job);
}

export async function getJob(
  kind: JobKind,
  id: string,
): Promise<JobRecord | null> {
  return readJson<JobRecord>(path.join(dirFor(kind), `${id}.json`));
}

export async function listJobs(kind: JobKind, limit = 40): Promise<JobRecord[]> {
  const dir = dirFor(kind);
  let names: string[] = [];
  try {
    names = await readdir(dir);
  } catch {
    return [];
  }
  const items = await Promise.all(
    names
      .filter((name) => name.endsWith(".json"))
      .map((name) => readJson<JobRecord>(path.join(dir, name))),
  );
  return items
    .filter((item): item is JobRecord => item != null && item.kind === kind)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
}

export async function listLeads(limit = 40): Promise<LeadRecord[]> {
  const dir = dirFor("leads");
  let names: string[] = [];
  try {
    names = await readdir(dir);
  } catch {
    return [];
  }
  const items = await Promise.all(
    names
      .filter((name) => name.endsWith(".json"))
      .map((name) => readJson<LeadRecord>(path.join(dir, name))),
  );
  return items
    .filter((item): item is LeadRecord => Boolean(item))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
}

export async function patchJob(
  kind: JobKind,
  id: string,
  patch: Partial<JobRecord>,
): Promise<JobRecord | null> {
  const current = await getJob(kind, id);
  if (!current) return null;
  const next: JobRecord = {
    ...current,
    ...patch,
    id: current.id,
    kind: current.kind,
    updatedAt: nowIso(),
  };
  await saveJob(next);
  return next;
}

export async function saveJobMarkdown(kind: JobKind, id: string, markdown: string): Promise<string> {
  const dir = await ensureDir(kind);
  const filePath = path.join(dir, `${id}.md`);
  await writeFile(filePath, markdown.endsWith("\n") ? markdown : `${markdown}\n`, "utf8");
  return filePath;
}

export async function readJobMarkdown(kind: JobKind, id: string): Promise<string | null> {
  return readFile(path.join(dirFor(kind), `${id}.md`), "utf8").catch(() => null);
}
