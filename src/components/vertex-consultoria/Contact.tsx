"use client";

import { FormEvent, useState, type ReactNode } from "react";
import { buildLeadMessage, siteInfo, whatsappUrl } from "@/data/vertex-consultoria";
import { Button, FadeIn, SectionHeading } from "./ui";

const inputClass =
  "w-full border border-[rgba(34,211,238,0.18)] bg-[#0B1118] px-4 py-3.5 font-sans text-sm text-[#E8EEF4] outline-none transition placeholder:text-[#8B9AAB]/55 focus:border-[#22D3EE] focus:ring-1 focus:ring-[#22D3EE]/30";

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="font-sans text-xs font-semibold tracking-wide text-[#8B9AAB] uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}

export function Contact() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [challenge, setChallenge] = useState("");
  const [loading, setLoading] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const text = buildLeadMessage({ name, company, phone, challenge });
    window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
    setTimeout(() => setLoading(false), 800);
  }

  return (
    <section
      id="contato"
      className="border-t border-[rgba(34,211,238,0.1)] px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
        <FadeIn>
          <SectionHeading
            label="Contato"
            title="Solicite um diagnóstico."
            description="Conte o momento da empresa. Abrimos o WhatsApp com sua mensagem pronta."
          />
          <ul className="mt-2 space-y-3 font-sans text-sm text-[#8B9AAB]">
            <li>
              Telefone:{" "}
              <a
                href={`tel:+55${siteInfo.whatsapp.slice(2)}`}
                className="font-semibold text-[#E8EEF4] hover:text-[#22D3EE]"
              >
                {siteInfo.phone}
              </a>
            </li>
            <li>
              E-mail:{" "}
              <a
                href={`mailto:${siteInfo.email}`}
                className="font-semibold text-[#E8EEF4] hover:text-[#22D3EE]"
              >
                {siteInfo.email}
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex font-semibold text-[#22D3EE] transition hover:text-[#67E8F9]"
              >
                Ou fale direto no WhatsApp →
              </a>
            </li>
          </ul>
        </FadeIn>

        <FadeIn delayMs={120}>
          <form
            onSubmit={onSubmit}
            className="border border-[rgba(34,211,238,0.16)] bg-[#121A24] p-7 shadow-[0_0_48px_rgba(34,211,238,0.05)] md:p-10"
          >
            <div className="space-y-5">
              <Field label="Nome">
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                  placeholder="Seu nome"
                />
              </Field>
              <Field label="Empresa">
                <input
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={inputClass}
                  placeholder="Nome da empresa"
                />
              </Field>
              <Field label="Telefone / WhatsApp">
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                  placeholder="(11) 90000-0000"
                />
              </Field>
              <Field label="Desafio atual">
                <textarea
                  required
                  rows={4}
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                  className={`${inputClass} resize-y`}
                  placeholder="O que precisa resolver agora?"
                />
              </Field>
              <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                {loading ? "Abrindo WhatsApp..." : "Enviar no WhatsApp"}
              </Button>
              <p className="font-sans text-xs text-[#8B9AAB]/70">
                Demonstração — conversão ilustrativa via WhatsApp.
              </p>
            </div>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
