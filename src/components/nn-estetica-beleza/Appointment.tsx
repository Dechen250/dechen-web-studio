"use client";

import { FormEvent, useState, type ReactNode } from "react";
import {
  buildAppointmentMessage,
  treatments,
  whatsappUrl,
} from "@/data/nn-estetica-beleza";
import { Button, FadeIn, SectionHeading } from "./ui";

const inputClass =
  "w-full rounded-xl border border-[#E6DCD4] bg-[#F7F1EB] px-4 py-3.5 font-sans text-sm text-[#2B2420] outline-none transition focus:border-[#9A6B5A] focus:bg-[#FFFBFA] focus:ring-2 focus:ring-[#9A6B5A]/15";

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="font-sans text-sm font-medium text-[#2B2420]">{label}</span>
      {children}
    </label>
  );
}

export function Appointment() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [treatment, setTreatment] = useState(treatments[0].title);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const text = buildAppointmentMessage({ name, phone, treatment, message });
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* o chat da bio ainda abre; colar a mensagem é extra */
    }
    window.open(whatsappUrl(), "_blank", "noopener,noreferrer");
    setTimeout(() => setLoading(false), 800);
  }

  return (
    <section
      id="agendar"
      className="border-t border-[#E6DCD4]/80 bg-[#FFFBFA] px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
        <FadeIn>
          <SectionHeading
            label="Agendar"
            title="Pronta para conversar?"
            description="Chame no WhatsApp para agendar sua avaliação. No preview, o botão abre o mesmo chat da bio do Instagram."
          />
          <ul className="mt-2 space-y-3">
            <li className="flex gap-3 font-sans text-sm leading-relaxed text-[#7A716A]">
              <span
                aria-hidden
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9A6B5A]"
              />
              Avaliação antes de qualquer protocolo
            </li>
            <li className="flex gap-3 font-sans text-sm leading-relaxed text-[#7A716A]">
              <span
                aria-hidden
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9A6B5A]"
              />
              Mensagem pronta — sem cadastro no site
            </li>
            <li className="flex gap-3 font-sans text-sm leading-relaxed text-[#7A716A]">
              <span
                aria-hidden
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9A6B5A]"
              />
              Número wa.me/55… entra quando a lead confirmar
            </li>
          </ul>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 font-sans text-sm font-medium text-[#9A6B5A] transition hover:text-[#825845]"
          >
            Ou chame direto no WhatsApp →
          </a>
        </FadeIn>

        <FadeIn delayMs={120}>
          <form
            onSubmit={onSubmit}
            className="rounded-3xl border border-[#E6DCD4] bg-[#F7F1EB]/85 p-7 shadow-[0_8px_40px_rgba(43,36,32,0.06)] md:p-10"
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
              <Field label="Tratamento">
                <select
                  value={treatment}
                  onChange={(e) => setTreatment(e.target.value)}
                  className={`${inputClass} cursor-pointer`}
                >
                  {treatments.map((item) => (
                    <option key={item.id} value={item.title}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Mensagem">
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${inputClass} resize-y`}
                  placeholder="O que você gostaria de cuidar?"
                />
              </Field>
              <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                {loading ? "Abrindo WhatsApp..." : "Agendar no WhatsApp"}
              </Button>
              <p className="font-sans text-xs text-[#7A716A]/90">
                Preview — copia a mensagem e abre o chat da bio. Com o número
                confirmado, a conversa já nasce preenchida.
              </p>
            </div>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
