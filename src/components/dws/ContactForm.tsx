"use client";

import { useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import { FOCUS } from "@/components/dws/ui";
import { buildQuoteMessage, whatsappUrl } from "@/lib/site";

type ContactFormData = {
  nome: string;
  email: string;
  whatsapp: string;
  negocio: string;
  empresa: string;
  website: string;
  mensagem: string;
};

const initialForm: ContactFormData = {
  nome: "",
  email: "",
  whatsapp: "",
  negocio: "",
  empresa: "",
  website: "",
  mensagem: "",
};

const businessTypes = [
  "Clínica / Consultório",
  "Loja / Comércio local",
  "Restaurante / Alimentação",
  "Consultoria / Serviços",
  "Profissional autônomo",
  "Outro",
];

const inputClass = `w-full rounded-md border border-[#262626] bg-[#0c0c0c] px-3.5 py-3 text-sm text-white placeholder:text-[#5c5c66] transition-colors duration-200 focus:border-[#0070F3]/60 focus:outline-none focus:ring-2 focus:ring-[#0070F3]/30`;

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm text-[#C4C4CC]">
        {label}
      </label>
      {children}
    </div>
  );
}

function useSitePrefill(): string {
  return useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("popstate", onStoreChange);
      return () => window.removeEventListener("popstate", onStoreChange);
    },
    () => new URLSearchParams(window.location.search).get("site") ?? "",
    () => "",
  );
}

export function ContactForm() {
  const sitePrefill = useSitePrefill();
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "opened">("idle");

  const update = (field: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (status === "opened") setStatus("idle");
  };

  const website = form.website || sitePrefill;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const payload = { ...form, website, honeypot };
    const text = buildQuoteMessage({
      name: form.nome,
      email: form.email,
      whatsapp: form.whatsapp,
      business: form.negocio,
      company: form.empresa || undefined,
      website: website || undefined,
      message: form.mensagem,
    });

    window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
    setStatus("opened");

    window.setTimeout(() => {
      void fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {
        /* CRM lento ou fora do ar — o WhatsApp já abriu */
      });
    }, 0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="hidden" aria-hidden>
        <label htmlFor="contact-website-hp">Site</label>
        <input
          id="contact-website-hp"
          name="website_hp"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Seu nome" htmlFor="contact-nome">
          <input
            id="contact-nome"
            name="nome"
            type="text"
            required
            autoComplete="name"
            placeholder="Como podemos te chamar?"
            value={form.nome}
            onChange={(e) => update("nome", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="E-mail" htmlFor="contact-email">
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="seu@email.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="WhatsApp" htmlFor="contact-whatsapp">
          <input
            id="contact-whatsapp"
            name="whatsapp"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            placeholder="(00) 00000-0000"
            value={form.whatsapp}
            onChange={(e) => update("whatsapp", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Tipo de negócio" htmlFor="contact-negocio">
          <select
            id="contact-negocio"
            name="negocio"
            required
            value={form.negocio}
            onChange={(e) => update("negocio", e.target.value)}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="" disabled className="bg-[#0c0c0c]">
              Selecione...
            </option>
            {businessTypes.map((type) => (
              <option key={type} value={type} className="bg-[#0c0c0c]">
                {type}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Empresa (opcional)" htmlFor="contact-empresa">
        <input
          id="contact-empresa"
          name="empresa"
          type="text"
          autoComplete="organization"
          placeholder="Nome da empresa"
          value={form.empresa}
          onChange={(e) => update("empresa", e.target.value)}
          className={inputClass}
        />
      </Field>
      <Field label="Site atual (opcional)" htmlFor="contact-website">
        <input
          id="contact-website"
          name="website"
          type="text"
          autoComplete="url"
          placeholder="seudominio.com.br"
          value={website}
          onChange={(e) => update("website", e.target.value)}
          className={inputClass}
        />
      </Field>
      <Field label="Sobre o projeto" htmlFor="contact-mensagem">
        <textarea
          id="contact-mensagem"
          name="mensagem"
          required
          rows={4}
          placeholder="O que você precisa? Qual o objetivo do site?"
          value={form.mensagem}
          onChange={(e) => update("mensagem", e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </Field>
      <button
        type="submit"
        className={`inline-flex h-12 w-full items-center justify-center rounded-md bg-[#0070F3] px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#0064d8] active:bg-[#0058c0] sm:w-auto ${FOCUS}`}
      >
        Enviar no WhatsApp
      </button>
      <p className="text-xs leading-relaxed text-[#6B6B76]" role="status" aria-live="polite">
        {status === "opened"
          ? "WhatsApp aberto com a mensagem pronta. Se a janela foi bloqueada, permita pop-ups e envie de novo."
          : "Ao enviar, abrimos o WhatsApp com a sua mensagem — sem cadastro."}
      </p>
    </form>
  );
}
