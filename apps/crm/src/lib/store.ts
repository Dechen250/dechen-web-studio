import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Lead } from "@/lib/types";

const dataFile = path.join(process.cwd(), "data", "leads.json");

async function readAll(): Promise<Lead[]> {
  try {
    const raw = await readFile(dataFile, "utf8");
    const parsed = JSON.parse(raw) as Lead[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeAll(leads: Lead[]) {
  await mkdir(path.dirname(dataFile), { recursive: true });
  await writeFile(dataFile, JSON.stringify(leads, null, 2), "utf8");
}

export async function listLeads(): Promise<Lead[]> {
  const leads = await readAll();
  return leads.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addLead(lead: Lead): Promise<Lead> {
  const leads = await readAll();
  leads.push(lead);
  await writeAll(leads);
  return lead;
}
