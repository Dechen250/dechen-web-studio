"use client";

import { useEffect, useRef, useState } from "react";

import {
  SEVERITY_LABEL,
  formatScore,
  listPriorities,
  scoreSeverity,
} from "@/lib/site-audit/format";
import type {
  AuditEvent,
  AuditResult,
  CheckResult,
  FormFactor,
  Severity,
} from "@/lib/site-audit/types";

type LogLine = { id: number; at: string; message: string };

type BlockedState = Extract<AuditEvent, { type: "blocked" }>;

const SEVERITY_TONE: Record<Severity, string> = {
  ok: "text-emerald-400",
  atencao: "text-amber-300",
  critico: "text-red-400",
};

const SEVERITY_DOT: Record<Severity, string> = {
  ok: "bg-emerald-400",
  atencao: "bg-amber-300",
  critico: "bg-red-400",
};

function nowClock(): string {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "America/Sao_Paulo",
  }).format(new Date());
}

async function readAuditStream(
  response: Response,
  onEvent: (event: AuditEvent) => void,
): Promise<void> {
  if (!response.body) {
    throw new Error("O servidor não enviou o fluxo da auditoria.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  const consume = (chunk: string) => {
    const parts = chunk.split("\n\n");
    buffer = parts.pop() ?? "";

    for (const part of parts) {
      const data = part
        .split("\n")
        .filter((line) => line.startsWith("data:"))
        .map((line) => line.slice(5).trim())
        .join("");

      if (!data) continue;

      try {
        onEvent(JSON.parse(data) as AuditEvent);
      } catch {
        // Evento cortado no meio — devolve para o buffer e espera o resto.
        buffer = `${part}\n\n${buffer}`;
        return;
      }
    }
  };

  while (true) {
    const { done, value } = await reader.read();
    buffer += decoder.decode(value, { stream: !done });
    consume(buffer);
    if (done) break;
  }
}

let autorunConsumed = false;

export function AuditConsole() {
  const [url, setUrl] = useState("dechenwebstudio.com.br");
  const [formFactor, setFormFactor] = useState<FormFactor>("mobile");
  const [running, setRunning] = useState(false);
  const [log, setLog] = useState<LogLine[]>([]);
  const [liveFrame, setLiveFrame] = useState<string | null>(null);
  const [checks, setChecks] = useState<CheckResult[]>([]);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [blocked, setBlocked] = useState<BlockedState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const lineId = useRef(0);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [log]);

  useEffect(() => {
    if (autorunConsumed) return;
    const params = new URLSearchParams(window.location.search);
    const queryUrl = params.get("url");
    if (params.get("run") !== "1" && !queryUrl) return;
    autorunConsumed = true;
    window.setTimeout(() => {
      if (queryUrl) setUrl(queryUrl);
      if (params.get("run") === "1") void startAudit(queryUrl ?? undefined);
    }, 400);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function pushLog(message: string) {
    lineId.current += 1;
    setLog((current) => [...current, { id: lineId.current, at: nowClock(), message }]);
  }

  async function startAudit(overrideUrl?: string) {
    const target = (overrideUrl ?? url).trim();
    if (!target) return;

    setRunning(true);
    setLog([]);
    setLiveFrame(null);
    setChecks([]);
    setResult(null);
    setBlocked(null);
    setError(null);
    pushLog(`Pedido recebido: ${target}`);

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: target, formFactor }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? `O servidor respondeu ${response.status}.`);
      }

      await readAuditStream(response, (event) => {
        if (event.type === "status") {
          pushLog(event.message);
        } else if (event.type === "screenshot") {
          setLiveFrame(event.src);
        } else if (event.type === "check") {
          setChecks((current) => [...current, event.check]);
        } else if (event.type === "blocked") {
          setBlocked(event);
          pushLog(event.title);
        } else if (event.type === "complete") {
          setResult(event.result);
          const frames = event.result.screenshots;
          if (frames.length > 0) {
            const best = [...frames].sort((a, b) => b.length - a.length)[0];
            setLiveFrame(best);
          }
          pushLog("Relatório pronto.");
        } else if (event.type === "error") {
          setError(event.message);
          pushLog(event.message);
        }
      });
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Falha inesperada.";
      setError(message);
      pushLog(message);
    } finally {
      setRunning(false);
    }
  }

  const lastScreenshot =
    liveFrame ?? result?.screenshots[result.screenshots.length - 1] ?? null;

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-5 py-8 md:px-8 md:py-10">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-[13px] tracking-[0.18em] text-[#A1A1AA] uppercase">
              Dechen Web Studio · interno
            </p>
            <h1 className="font-sans text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
              Console de auditoria
            </h1>
            <p className="max-w-xl text-base text-[#A1A1AA]">
              Cole o domínio, aperte auditar e fique nesta tela. O Chrome abre no servidor, a
              medição aparece aqui, e o relatório chega sozinho.
            </p>
          </div>
        </header>

        <form
          className="flex flex-col gap-3 rounded-[24px] border border-[#262626] bg-[#101010] p-3 md:flex-row md:items-center"
          onSubmit={(event) => {
            event.preventDefault();
            if (!running && url.trim()) void startAudit();
          }}
        >
          <label className="sr-only" htmlFor="audit-url">
            URL do site
          </label>
          <input
            id="audit-url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="dominio.com.br"
            autoComplete="url"
            className="h-14 flex-1 rounded-[18px] border border-transparent bg-[#050505] px-4 font-mono text-[15px] text-white outline-none placeholder:text-[#A1A1AA] focus:border-[#0070F3]"
          />
          <div className="flex h-14 rounded-[18px] border border-[#262626] p-1">
            {(["mobile", "desktop"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFormFactor(option)}
                className={`min-w-[96px] rounded-[14px] px-3 text-sm ${
                  formFactor === option ? "bg-[#0070F3] text-white" : "text-[#A1A1AA]"
                }`}
              >
                {option === "mobile" ? "Celular" : "Desktop"}
              </button>
            ))}
          </div>
          <button
            type="submit"
            disabled={running || !url.trim()}
            className="h-14 min-w-[148px] rounded-[18px] bg-[#0070F3] px-6 text-sm font-medium disabled:opacity-50"
          >
            {running ? "Medindo…" : "Auditar"}
          </button>
        </form>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
          <div className="overflow-hidden rounded-[24px] border border-[#262626] bg-[#101010]">
            <div className="flex items-center justify-between border-b border-[#262626] px-5 py-3">
              <p className="text-sm text-[#A1A1AA]">Tela do agente</p>
              <p className="font-mono text-xs text-[#A1A1AA]">
                {running ? "ao vivo" : lastScreenshot ? "última captura" : "aguardando"}
              </p>
            </div>
            <div className="relative flex min-h-[320px] items-center justify-center bg-[#050505] lg:min-h-[380px]">
              {lastScreenshot ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={lastScreenshot}
                  alt="Captura da página sendo medida"
                  className="max-h-[640px] w-full object-contain"
                />
              ) : (
                <p className="max-w-sm px-6 text-center text-sm text-[#A1A1AA]">
                  {running
                    ? "Abrindo o Chrome. A primeira captura chega em alguns segundos."
                    : "Nada na tela ainda. Dispare uma auditoria para ver o Chrome trabalhar."}
                </p>
              )}
              {running ? (
                <span className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1 text-xs text-red-300">
                  <span className="size-1.5 animate-pulse rounded-full bg-red-400" />
                  REC
                </span>
              ) : null}
            </div>
          </div>

          <div className="flex min-h-[420px] flex-col overflow-hidden rounded-[24px] border border-[#262626] bg-[#101010]">
            <div className="border-b border-[#262626] px-5 py-3">
              <p className="text-sm text-[#A1A1AA]">Atividade</p>
            </div>
            <div ref={logRef} className="flex-1 space-y-2 overflow-y-auto p-4 font-mono text-[13px]">
              {log.length === 0 ? (
                <p className="text-[#A1A1AA]">O agente escreve aqui cada passo que der.</p>
              ) : (
                log.map((line) => (
                  <p key={line.id} className="leading-relaxed">
                    <span className="text-[#0070F3]">{line.at}</span>{" "}
                    <span className="text-[#ededed]">{line.message}</span>
                  </p>
                ))
              )}
              {running ? <p className="animate-pulse text-[#A1A1AA]">trabalhando…</p> : null}
            </div>
          </div>
        </section>

        {blocked ? (
          <section className="space-y-4 rounded-[24px] border border-red-400/30 bg-[#101010] p-6">
            <p className="text-sm tracking-wide text-red-300 uppercase">Acesso bloqueado</p>
            <h2 className="text-2xl font-semibold tracking-[-0.03em]">{blocked.title}</h2>
            <p className="text-[#A1A1AA]">{blocked.summary}</p>
            <ul className="space-y-2 font-mono text-sm text-[#ededed]">
              {blocked.evidence.map((item) => (
                <li key={item}>{item.replace(/`/g, "")}</li>
              ))}
            </ul>
            <p className="text-sm text-white">Prioridade zero: {blocked.priority}</p>
          </section>
        ) : null}

        {result ? <Results result={result} checks={result.checks} /> : null}
        {!result && checks.length > 0 ? <ChecksTable checks={checks} pending /> : null}

        {error ? <p className="text-sm text-red-400">{error}</p> : null}
      </div>
    </div>
  );
}

function Results({ result, checks }: { result: AuditResult; checks: CheckResult[] }) {
  const priorities = listPriorities(result);

  return (
    <section className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {result.lighthouse.categories.map((category) => {
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
          <caption className="sr-only">Velocidade percebida</caption>
          <thead className="bg-[#101010] text-[#A1A1AA]">
            <tr>
              <th className="px-5 py-3 font-medium">Métrica</th>
              <th className="px-5 py-3 font-medium">Resultado</th>
              <th className="px-5 py-3 font-medium">Alvo</th>
              <th className="px-5 py-3 font-medium">Situação</th>
            </tr>
          </thead>
          <tbody>
            {result.lighthouse.metrics.map((metric) => (
              <tr key={metric.id} className="border-t border-[#262626]">
                <td className="px-5 py-3">{metric.label}</td>
                <td className="px-5 py-3 font-mono">{metric.display}</td>
                <td className="px-5 py-3 text-[#A1A1AA]">{metric.target}</td>
                <td className={`px-5 py-3 ${SEVERITY_TONE[metric.severity]}`}>
                  {SEVERITY_LABEL[metric.severity]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ChecksTable checks={checks} />

      {priorities.length > 0 ? (
        <div className="rounded-[24px] border border-[#262626] bg-[#101010] p-6">
          <h2 className="text-lg font-medium">Prioridades sugeridas</h2>
          <ol className="mt-4 space-y-3 text-sm text-[#ededed]">
            {priorities.map((item, index) => (
              <li key={item} className="flex gap-3">
                <span className="font-mono text-[#0070F3]">{index + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      {result.screenshots.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {result.screenshots.slice(-8).map((src, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${index}-${src.slice(-12)}`}
              src={src}
              alt={`Quadro ${index + 1} da medição`}
              className="h-28 rounded-xl border border-[#262626] object-cover"
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

function ChecksTable({ checks, pending = false }: { checks: CheckResult[]; pending?: boolean }) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-[#262626]">
      <div className="flex items-center justify-between bg-[#101010] px-5 py-3">
        <p className="text-sm text-[#A1A1AA]">Checagens de fundação</p>
        {pending ? <p className="text-xs text-amber-300">chegando…</p> : null}
      </div>
      <ul>
        {checks.map((check) => (
          <li
            key={check.label}
            className="flex flex-col gap-1 border-t border-[#262626] px-5 py-3 sm:flex-row sm:items-baseline sm:justify-between"
          >
            <span className="flex items-center gap-2 text-sm">
              <span className={`size-1.5 rounded-full ${SEVERITY_DOT[check.severity]}`} />
              {check.label}
            </span>
            <span className="text-sm text-[#A1A1AA] sm:max-w-[60%] sm:text-right">{check.detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
