"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import {
  SEVERITY_LABEL,
  formatScore,
  scoreSeverity,
} from "@/lib/site-audit/format";
import type { CategoryScore, CheckResult, MetricResult, Severity } from "@/lib/site-audit/types";

const SEVERITY_TONE: Record<Severity, string> = {
  ok: "text-emerald-400",
  atencao: "text-amber-300",
  critico: "text-red-400",
};

type OkResult = {
  status: "ok";
  url: string;
  categories: CategoryScore[];
  metrics: MetricResult[];
  checks: CheckResult[];
  priorities: string[];
};

type BlockedResult = {
  status: "blocked";
  title: string;
  summary: string;
  evidence: string[];
  priority: string;
};

export function AuditoriaPublica() {
  const [url, setUrl] = useState("dechenwebstudio.com.br");
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<OkResult | null>(null);
  const [blocked, setBlocked] = useState<BlockedResult | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setRunning(true);
    setError(null);
    setOk(null);
    setBlocked(null);

    try {
      const response = await fetch("/api/auditoria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, formFactor: "mobile" }),
      });
      const payload = (await response.json()) as OkResult | BlockedResult | { error?: string };
      if (!response.ok) {
        throw new Error(
        "error" in payload && payload.error ? payload.error : `HTTP ${response.status}`,
      );
      }
      if ("status" in payload && payload.status === "blocked") {
        setBlocked(payload);
        return;
      }
      if ("status" in payload && payload.status === "ok") {
        setOk(payload);
        return;
      }
      throw new Error("Resposta inesperada.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Falha inesperada.");
    } finally {
      setRunning(false);
    }
  }

  const contactHref = `/?site=${encodeURIComponent(url)}#contato`;

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10">
      <form
        onSubmit={(event) => void onSubmit(event)}
        className="flex flex-col gap-3 rounded-[24px] border border-[#262626] bg-[#101010] p-3 sm:flex-row sm:items-center"
      >
        <label className="sr-only" htmlFor="auditoria-url">
          URL do site
        </label>
        <input
          id="auditoria-url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="seudominio.com.br"
          autoComplete="url"
          className="h-14 flex-1 rounded-[18px] border border-transparent bg-[#050505] px-4 font-mono text-[15px] text-white outline-none placeholder:text-[#A1A1AA] focus:border-[#0070F3]"
        />
        <button
          type="submit"
          disabled={running || !url.trim()}
          className="h-14 min-w-[148px] rounded-[18px] bg-[#0070F3] px-6 text-sm font-medium disabled:opacity-50"
        >
          {running ? "Medindo…" : "Auditar"}
        </button>
      </form>

      {running ? (
        <p className="text-sm text-[#A1A1AA]">
          Pedindo a medição ao PageSpeed Insights e lendo a fundação do HTML. Costuma levar menos
          de um minuto.
        </p>
      ) : null}

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      {blocked ? (
        <section className="space-y-3 rounded-[24px] border border-red-400/30 bg-[#101010] p-6">
          <h2 className="text-2xl font-semibold">{blocked.title}</h2>
          <p className="text-[#A1A1AA]">{blocked.summary}</p>
          <ul className="space-y-1 font-mono text-sm">
            {blocked.evidence.map((item) => (
              <li key={item}>{item.replace(/`/g, "")}</li>
            ))}
          </ul>
          <p className="text-sm">Prioridade zero: {blocked.priority}</p>
        </section>
      ) : null}

      {ok ? (
        <section className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ok.categories.map((category) => {
              const severity = scoreSeverity(category.score);
              return (
                <div
                  key={category.id}
                  className="rounded-[24px] border border-[#262626] bg-[#101010] px-5 py-4"
                >
                  <p className="text-sm text-[#A1A1AA]">{category.label}</p>
                  <p className={`mt-2 text-3xl font-semibold ${SEVERITY_TONE[severity]}`}>
                    {formatScore(category.score)}
                  </p>
                  <p className="mt-1 text-xs text-[#A1A1AA]">{SEVERITY_LABEL[severity]}</p>
                </div>
              );
            })}
          </div>

          <div className="overflow-hidden rounded-[24px] border border-[#262626]">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#101010] text-[#A1A1AA]">
                <tr>
                  <th className="px-5 py-3 font-medium">Métrica</th>
                  <th className="px-5 py-3 font-medium">Resultado</th>
                  <th className="px-5 py-3 font-medium">Alvo</th>
                </tr>
              </thead>
              <tbody>
                {ok.metrics.map((metric) => (
                  <tr key={metric.id} className="border-t border-[#262626]">
                    <td className="px-5 py-3">{metric.label}</td>
                    <td className="px-5 py-3 font-mono">{metric.display}</td>
                    <td className={`px-5 py-3 ${SEVERITY_TONE[metric.severity]}`}>
                      {metric.target}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="overflow-hidden rounded-[24px] border border-[#262626]">
            {ok.checks.map((check) => (
              <li
                key={check.label}
                className="flex flex-col gap-1 border-t border-[#262626] px-5 py-3 first:border-t-0 sm:flex-row sm:justify-between"
              >
                <span className="text-sm">{check.label}</span>
                <span className="text-sm text-[#A1A1AA] sm:max-w-[60%] sm:text-right">
                  {check.detail}
                </span>
              </li>
            ))}
          </ul>

          {ok.priorities.length > 0 ? (
            <div className="rounded-[24px] border border-[#262626] bg-[#101010] p-6">
              <h2 className="text-lg font-medium">O que tratar primeiro</h2>
              <ol className="mt-4 space-y-3 text-sm">
                {ok.priorities.map((item, index) => (
                  <li key={item} className="flex gap-3">
                    <span className="font-mono text-[#0070F3]">{index + 1}.</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}

          <p className="text-sm text-[#A1A1AA]">
            Isto é fundação técnica (PageSpeed Insights + HTML), não um diagnóstico comercial.{" "}
            <Link href={contactHref} className="text-[#0070F3]">
              Fale com a Dechen
            </Link>{" "}
            se quiser transformar isso em site novo.
          </p>
        </section>
      ) : null}
    </div>
  );
}
