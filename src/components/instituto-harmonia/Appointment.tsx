"use client";

import { FormEvent, useState, type ReactNode } from "react";
import {
  buildAppointmentMessage,
  specialties,
  trustPoints,
  whatsappUrl,
} from "@/data/instituto-harmonia";
import { Button, FadeIn, SectionHeading } from "./ui";

const inputClass =
  "w-full rounded-xl border border-[#D5E4E0] bg-[#F4F8F7] px-4 py-3.5 font-sans text-sm text-[#1A2E2B] outline-none transition focus:border-[#2A7A6E] focus:bg-white focus:ring-2 focus:ring-[#2A7A6E]/15";

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="font-sans text-sm font-medium text-[#1A2E2B]">{label}</span>
      {children}
    </label>
  );
}

export function Appointment() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [specialty, setSpecialty] = useState(specialties[0].title);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const text = buildAppointmentMessage({ name, phone, specialty, message });
    window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
    setTimeout(() => setLoading(false), 800);
  }

  return (
    <section
      id="agendar"
      className="border-t border-[#D5E4E0]/70 bg-white px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
        <FadeIn>
          <SectionHeading
            label="Agendar"
            title="Marque sua consulta pelo WhatsApp."
            description="Preencha o formulário — abrimos a conversa com sua mensagem pronta, sem burocracia."
          />
          <ul className="mt-2 space-y-3">
            {trustPoints.map((point) => (
              <li
                key={point}
                className="flex gap-3 font-sans text-sm leading-relaxed text-[#5A6F6A]"
              >
                <span
                  aria-hidden
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2A7A6E]"
                />
                {point}
              </li>
            ))}
          </ul>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 font-sans text-sm font-medium text-[#2A7A6E] transition hover:text-[#24685E]"
          >
            Ou chame direto no WhatsApp →
          </a>
        </FadeIn>

        <FadeIn delayMs={120}>
          <form
            onSubmit={onSubmit}
            className="rounded-3xl border border-[#D5E4E0] bg-[#F4F8F7]/80 p-7 shadow-[0_8px_40px_rgba(26,46,43,0.06)] backdrop-blur-sm md:p-10"
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
              <Field label="Especialidade">
                <select
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className={`${inputClass} cursor-pointer`}
                >
                  {specialties.map((item) => (
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
                  placeholder="Conte brevemente o motivo da consulta"
                />
              </Field>
              <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                {loading ? "Abrindo WhatsApp..." : "Enviar no WhatsApp"}
              </Button>
              <p className="font-sans text-xs text-[#5A6F6A]/80">
                Demonstração — agendamento ilustrativo via WhatsApp.
              </p>
            </div>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
