"use client";

import { useState, type FormEvent } from "react";
import type { Lead } from "@/lib/types";

export default function Home() {
  const [secret, setSecret] = useState("");
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [error, setError] = useState("");

  async function load(event: FormEvent) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/leads", {
      headers: { Authorization: `Bearer ${secret}` },
    });
    if (!response.ok) {
      setLeads(null);
      setError("Não autorizado ou falha ao ler os leads.");
      return;
    }
    const data = (await response.json()) as { leads: Lead[] };
    setLeads(data.leads);
  }

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <p className="text-sm text-[#8a8a93]">Dechen Web Studio</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">CRM</h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-[#8a8a93]">
        Ingestão em <code className="text-white">POST /api/ingest/leads</code>. O site
        institucional já envia neste contrato.
      </p>

      <form onSubmit={(event) => void load(event)} className="mt-8 flex gap-2">
        <input
          type="password"
          name="ops"
          placeholder="OPS_SECRET"
          value={secret}
          onChange={(event) => setSecret(event.target.value)}
          className="min-w-0 flex-1 rounded-md border border-[#262626] bg-[#0c0c0c] px-3 py-2 text-sm outline-none focus:border-[#0070F3]"
        />
        <button
          type="submit"
          className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black"
        >
          Abrir
        </button>
      </form>

      {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}

      {leads ? (
        <ul className="mt-8 space-y-3">
          {leads.length === 0 ? (
            <li className="text-sm text-[#8a8a93]">Nenhum lead ainda.</li>
          ) : (
            leads.map((lead) => (
              <li
                key={lead.id}
                className="rounded-lg border border-[#262626] bg-[#0c0c0c] px-4 py-3"
              >
                <p className="text-sm font-medium">{lead.name}</p>
                <p className="mt-1 text-sm text-[#8a8a93]">
                  {lead.email} · {lead.whatsapp}
                </p>
                {lead.company ? (
                  <p className="mt-1 text-sm text-[#8a8a93]">{lead.company}</p>
                ) : null}
                <p className="mt-2 whitespace-pre-wrap text-sm">{lead.message}</p>
                <p className="mt-2 text-xs text-[#5c5c66]">
                  {lead.origin} · {new Date(lead.createdAt).toLocaleString("pt-BR")}
                </p>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </main>
  );
}
