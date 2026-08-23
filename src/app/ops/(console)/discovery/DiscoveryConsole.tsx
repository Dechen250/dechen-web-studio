"use client";

import { useState, type FormEvent } from "react";

const inputClass =
  "w-full rounded-xl border border-[#262626] bg-[#050505] px-4 py-3 text-sm text-white placeholder:text-[#6B6B76] outline-none focus:border-[#0070F3]";

export function DiscoveryConsole() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    company: "",
    website: "dechenwebstudio.com.br",
    message: "",
  });
  const [running, setRunning] = useState(false);
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setRunning(true);
    setError(null);
    setMarkdown(null);

    try {
      const response = await fetch("/api/ops/discovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = (await response.json()) as { markdown?: string; error?: string };
      if (!response.ok) throw new Error(payload.error ?? `HTTP ${response.status}`);
      setMarkdown(payload.markdown ?? "");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Falha inesperada.");
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-5 py-8 md:px-8 md:py-10">
      <header className="space-y-2">
        <h1 className="font-sans text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
          Preparador de Descoberta
        </h1>
        <p className="max-w-2xl text-base text-[#A1A1AA]">
          Ferramenta interna da DWS. Para vender o CRM, o agente mora em{" "}
          <a
            href="https://crm.dechenwebstudio.com.br/app/agent"
            className="text-[#5ec8f2] underline-offset-2 hover:underline"
          >
            Contatos, Empresas e Agente
          </a>
          . Aqui o rascunho ainda sai local; o produto é o CRM.
        </p>
      </header>

      <form
        onSubmit={(event) => void onSubmit(event)}
        className="grid gap-4 rounded-[24px] border border-[#262626] bg-[#101010] p-5 md:grid-cols-2"
      >
        <Field label="Nome" htmlFor="disc-name">
          <input
            id="disc-name"
            required
            className={inputClass}
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
          />
        </Field>
        <Field label="E-mail" htmlFor="disc-email">
          <input
            id="disc-email"
            type="email"
            required
            className={inputClass}
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
          />
        </Field>
        <Field label="WhatsApp" htmlFor="disc-whatsapp">
          <input
            id="disc-whatsapp"
            required
            className={inputClass}
            value={form.whatsapp}
            onChange={(event) => update("whatsapp", event.target.value)}
          />
        </Field>
        <Field label="Empresa" htmlFor="disc-company">
          <input
            id="disc-company"
            required
            className={inputClass}
            value={form.company}
            onChange={(event) => update("company", event.target.value)}
          />
        </Field>
        <Field label="Site atual (opcional)" htmlFor="disc-website">
          <input
            id="disc-website"
            className={inputClass}
            placeholder="dominio.com.br"
            value={form.website}
            onChange={(event) => update("website", event.target.value)}
          />
        </Field>
        <Field label="Mensagem do lead" htmlFor="disc-message">
          <textarea
            id="disc-message"
            rows={3}
            className={`${inputClass} resize-none`}
            value={form.message}
            onChange={(event) => update("message", event.target.value)}
          />
        </Field>
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={running}
            className="h-12 rounded-[18px] bg-[#0070F3] px-6 text-sm font-medium disabled:opacity-50"
          >
            {running ? "Montando rascunho…" : "Gerar rascunho"}
          </button>
        </div>
      </form>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      {markdown ? (
        <section className="rounded-[24px] border border-[#262626] bg-[#101010] p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-medium">Rascunho</h2>
            <button
              type="button"
              className="text-sm text-[#0070F3]"
              onClick={() => void navigator.clipboard.writeText(markdown)}
            >
              Copiar
            </button>
          </div>
          <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-[#ededed]">
            {markdown}
          </pre>
        </section>
      ) : null}
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2 text-sm" htmlFor={htmlFor}>
      <span className="text-[#A1A1AA]">{label}</span>
      {children}
    </label>
  );
}
