"use client";

import { FormEvent, useState } from "react";
import {
  buildAppointmentMessage,
  specialties,
  whatsappUrl,
} from "@/data/instituto-harmonia";
import { Button, FadeIn, SectionHeading } from "./ui";

const inputClass =
  "w-full rounded-xl border border-[#D5E4E0] bg-white px-4 py-3 font-sans text-sm text-[#1A2E2B] outline-none transition focus:border-[#2A7A6E] focus:ring-2 focus:ring-[#2A7A6E]/15";

export function Appointment() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [specialty, setSpecialty] = useState(specialties[0].title);
  const [message, setMessage] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = buildAppointmentMessage({ name, phone, specialty, message });
    window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
  }

  return (
    <section id="agendar" className="bg-white px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <FadeIn>
          <SectionHeading
            label="Agendar"
            title="Marque sua consulta pelo WhatsApp."
            description="Preencha o formulário — abrimos a conversa com sua mensagem pronta."
          />
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-sm font-medium text-[#2A7A6E] transition hover:text-[#24685E]"
          >
            Ou chame direto no WhatsApp
          </a>
        </FadeIn>

        <FadeIn>
          <form onSubmit={onSubmit} className="space-y-5">
            <label className="grid gap-2">
              <span className="font-sans text-sm font-medium text-[#1A2E2B]">Nome</span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                placeholder="Seu nome"
              />
            </label>
            <label className="grid gap-2">
              <span className="font-sans text-sm font-medium text-[#1A2E2B]">
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
              <span className="font-sans text-sm font-medium text-[#1A2E2B]">
                Especialidade
              </span>
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className={`${inputClass} cursor-pointer`}
              >
                {specialties.map((item) => (
                  <option key={item.title} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2">
              <span className="font-sans text-sm font-medium text-[#1A2E2B]">
                Mensagem
              </span>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`${inputClass} resize-y`}
                placeholder="Conte brevemente o motivo da consulta"
              />
            </label>
            <Button type="submit">Enviar no WhatsApp</Button>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
