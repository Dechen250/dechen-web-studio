"use client";

import Image from "next/image";
import { type FormEvent, useState } from "react";
import { booking, services, team } from "@/data/barbearia-royal";
import { IconArrowRight } from "./icons";
import { SectionTag } from "./ui";

type FormState = {
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  servico: string;
  barbeiro: string;
  data: string;
  horario: string;
};

const initial: FormState = {
  nome: "",
  sobrenome: "",
  email: "",
  telefone: "",
  servico: "",
  barbeiro: "",
  data: "",
  horario: "",
};

const fieldClass =
  "w-full border-0 border-b border-[#C8A97E]/30 bg-transparent py-3 text-sm text-[#FAFAF9] outline-none transition placeholder:text-[#6B6B6B] focus:border-[#C8A97E]";

export function Booking() {
  const [form, setForm] = useState(initial);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <section className="px-5 py-20 md:px-12 lg:px-20 lg:py-32" id="agendar">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative min-h-[320px] lg:min-h-[640px]">
          <Image
            src={booking.image}
            alt={booking.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="pointer-events-none absolute inset-0 translate-x-4 translate-y-4 border border-[#C8A97E] max-lg:hidden" />
        </div>
        <div>
          <SectionTag text={booking.tag} />
          <h2 className="font-bebas mb-10 text-[clamp(2.2rem,4vw,4rem)] leading-[1.05] tracking-[0.05em]">
            {booking.title}{" "}
            <span className="font-serif text-[0.72em] font-normal text-[#C8A97E] italic">
              {booking.italic}
            </span>
          </h2>
          {submitted ? (
            <div className="space-y-6">
              <p className="text-[15px] leading-8 text-[#999]">
                Horário registrado nesta demonstração. Na operação real, a
                confirmação seguiria por WhatsApp.
              </p>
              <p className="text-[10px] tracking-[0.22em] text-[#999] uppercase">
                Demonstração — sem envio real
              </p>
              <button
                type="button"
                className="inline-flex items-center gap-3 bg-[#C8A97E] px-8 py-4 text-[11px] font-semibold tracking-[0.25em] text-[#0A0A0A] uppercase"
                onClick={() => {
                  setSubmitted(false);
                  setForm(initial);
                }}
              >
                Novo agendamento
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={onSubmit}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-[10px] tracking-[0.28em] text-[#C8A97E] uppercase">
                    Nome
                  </span>
                  <input
                    required
                    placeholder="João"
                    value={form.nome}
                    onChange={(e) => update("nome", e.target.value)}
                    className={fieldClass}
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-[10px] tracking-[0.28em] text-[#C8A97E] uppercase">
                    Sobrenome
                  </span>
                  <input
                    required
                    placeholder="Silva"
                    value={form.sobrenome}
                    onChange={(e) => update("sobrenome", e.target.value)}
                    className={fieldClass}
                  />
                </label>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-[10px] tracking-[0.28em] text-[#C8A97E] uppercase">
                    E-mail
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="joao@email.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={fieldClass}
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-[10px] tracking-[0.28em] text-[#C8A97E] uppercase">
                    Telefone
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="(11) 90000-0000"
                    value={form.telefone}
                    onChange={(e) => update("telefone", e.target.value)}
                    className={fieldClass}
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-1 block text-[10px] tracking-[0.28em] text-[#C8A97E] uppercase">
                  Selecionar serviço
                </span>
                <select
                  required
                  value={form.servico}
                  onChange={(e) => update("servico", e.target.value)}
                  className={`${fieldClass} appearance-none`}
                >
                  <option value="">Escolha um serviço...</option>
                  {services.map((service) => (
                    <option key={service.name} value={service.name}>
                      {service.name} — {service.price}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-[10px] tracking-[0.28em] text-[#C8A97E] uppercase">
                  Barbeiro preferido
                </span>
                <select
                  value={form.barbeiro}
                  onChange={(e) => update("barbeiro", e.target.value)}
                  className={`${fieldClass} appearance-none`}
                >
                  <option value="">Sem preferência</option>
                  {team.map((member) => (
                    <option key={member.name} value={member.name}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </label>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-[10px] tracking-[0.28em] text-[#C8A97E] uppercase">
                    Data
                  </span>
                  <input
                    type="date"
                    required
                    value={form.data}
                    onChange={(e) => update("data", e.target.value)}
                    className={fieldClass}
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-[10px] tracking-[0.28em] text-[#C8A97E] uppercase">
                    Horário
                  </span>
                  <select
                    required
                    value={form.horario}
                    onChange={(e) => update("horario", e.target.value)}
                    className={`${fieldClass} appearance-none`}
                  >
                    <option value="">Selecione</option>
                    {booking.slots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <button
                className="mt-4 inline-flex w-full items-center justify-center gap-4 bg-[#C8A97E] px-8 py-4 text-[11px] font-semibold tracking-[0.25em] text-[#0A0A0A] uppercase transition-colors hover:bg-[#A8885E] disabled:opacity-70"
                type="submit"
                disabled={loading}
              >
                <span>{loading ? "Registrando..." : "Confirmar agendamento"}</span>
                <IconArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
