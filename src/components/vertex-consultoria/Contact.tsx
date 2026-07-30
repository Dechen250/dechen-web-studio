"use client";

import { FormEvent, useState } from "react";
import { buildLeadMessage, whatsappUrl } from "@/data/vertex-consultoria";
import { Button, FadeIn, SectionHeading } from "./ui";

const inputClass =
  "w-full border border-[rgba(34,211,238,0.18)] bg-[#0B1118] px-4 py-3 font-sans text-sm text-[#E8EEF4] outline-none transition placeholder:text-[#8B9AAB]/60 focus:border-[#22D3EE] focus:ring-1 focus:ring-[#22D3EE]/30";

export function Contact() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [challenge, setChallenge] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = buildLeadMessage({ name, company, phone, challenge });
    window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
  }

  return (
    <section id="contato" className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-start">
        <FadeIn>
          <SectionHeading
            label="Contato"
            title="Solicite um diagnóstico."
            description="Conte o momento da empresa. Abrimos o WhatsApp com sua mensagem pronta."
          />
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex font-sans text-sm font-semibold text-[#22D3EE] transition hover:text-[#67E8F9]"
          >
            Ou fale direto no WhatsApp →
          </a>
        </FadeIn>

        <FadeIn>
          <form onSubmit={onSubmit} className="space-y-5">
            <label className="grid gap-2">
              <span className="font-sans text-xs font-semibold tracking-wide text-[#8B9AAB] uppercase">
                Nome
              </span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                placeholder="Seu nome"
              />
            </label>
            <label className="grid gap-2">
              <span className="font-sans text-xs font-semibold tracking-wide text-[#8B9AAB] uppercase">
                Empresa
              </span>
              <input
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className={inputClass}
                placeholder="Nome da empresa"
              />
            </label>
            <label className="grid gap-2">
              <span className="font-sans text-xs font-semibold tracking-wide text-[#8B9AAB] uppercase">
                Telefone / WhatsApp
              </span>
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
                placeholder="(11) 90000-0000"
              />
            </label>
            <label className="grid gap-2">
              <span className="font-sans text-xs font-semibold tracking-wide text-[#8B9AAB] uppercase">
                Desafio atual
              </span>
              <textarea
                required
                rows={4}
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                className={`${inputClass} resize-y`}
                placeholder="O que precisa resolver agora?"
              />
            </label>
            <Button type="submit">Enviar no WhatsApp</Button>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
