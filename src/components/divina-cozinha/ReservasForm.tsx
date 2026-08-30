"use client";

import { type FormEvent, type ReactNode, useState } from "react";
import { IconCheck } from "./icons";
import { Button } from "./ui";

type FormData = {
  nome: string;
  pessoas: string;
  data: string;
  horario: string;
  telefone: string;
};

const initialForm: FormData = {
  nome: "",
  pessoas: "2",
  data: "",
  horario: "",
  telefone: "",
};

export function ReservasForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <section id="reservas" className="py-24">
        <div className="mx-auto max-w-lg text-center">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-12 shadow-sm">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#e11d48]/10 text-[#e11d48]">
              <IconCheck />
            </div>
            <h2 className="font-serif text-3xl text-slate-900">
              Reserva realizada com sucesso.
            </h2>
            <p className="mt-4 text-base text-slate-500">
              Entraremos em contato em breve para confirmar sua mesa.
            </p>
            <p className="mt-2 font-mono text-[10px] tracking-widest text-slate-400 uppercase">
              Demonstração — sem envio real
            </p>
            <Button
              variant="secondary"
              className="mt-8"
              onClick={() => {
                setSubmitted(false);
                setForm(initialForm);
              }}
            >
              Nova reserva
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="reservas" className="py-24">
      <div className="mx-auto max-w-xl">
        <div className="mb-10 text-center">
          <span className="text-brand-rose mb-4 block font-mono text-xs font-semibold tracking-[0.2em] uppercase">
            Reservas
          </span>
          <h2 className="font-serif text-4xl tracking-tight text-slate-900 md:text-5xl">
            Reserve sua mesa.
          </h2>
          <p className="mt-4 text-slate-500">
            Garanta sua experiência na Divina Cozinha. Escolha a melhor data e
            horário, e deixe o restante conosco.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10"
        >
          <div className="space-y-5">
            <Field label="Nome" id="nome">
              <input
                id="nome"
                required
                value={form.nome}
                onChange={(e) => update("nome", e.target.value)}
                className={inputClass}
                placeholder="Seu nome completo"
              />
            </Field>

            <Field label="Quantidade de pessoas" id="pessoas">
              <select
                id="pessoas"
                required
                value={form.pessoas}
                onChange={(e) => update("pessoas", e.target.value)}
                className={inputClass}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={String(n)}>
                    {n} {n === 1 ? "pessoa" : "pessoas"}
                  </option>
                ))}
              </select>
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Data" id="data">
                <input
                  id="data"
                  type="date"
                  required
                  value={form.data}
                  onChange={(e) => update("data", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Horário" id="horario">
                <select
                  id="horario"
                  required
                  value={form.horario}
                  onChange={(e) => update("horario", e.target.value)}
                  className={inputClass}
                >
                  <option value="">Selecione</option>
                  {[
                    "12:00",
                    "12:30",
                    "13:00",
                    "19:00",
                    "19:30",
                    "20:00",
                    "20:30",
                    "21:00",
                  ].map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Telefone" id="telefone">
              <input
                id="telefone"
                type="tel"
                required
                value={form.telefone}
                onChange={(e) => update("telefone", e.target.value)}
                className={inputClass}
                placeholder="(11) 99999-9999"
              />
            </Field>
          </div>

          <Button
            type="submit"
            variant="solid"
            className={`mt-8 w-full ${loading ? "pointer-events-none opacity-70" : ""}`}
          >
            {loading ? "Enviando..." : "Reservar mesa"}
          </Button>
          <p className="mt-4 text-center font-mono text-[10px] tracking-widest text-slate-400 uppercase">
            Demonstração — formulário ilustrativo
          </p>
        </form>
      </div>
    </section>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-[#faf9f6] px-4 py-3.5 font-sans text-sm text-slate-800 placeholder:text-slate-400 transition-colors duration-300 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-[#e11d48]/20";

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-bold tracking-widest text-slate-800 uppercase"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
