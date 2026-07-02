"use client";

import { type FormEvent, type ReactNode, useState } from "react";
import { Button, SectionHeading } from "./ui";

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
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <section id="reservas" className="bg-[#FFFDF8] px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-lg text-center">
          <div className="rounded-3xl border border-[#E8E0D4] bg-[#FAF9F6] p-12 shadow-[0_8px_40px_rgba(61,56,50,0.06)]">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#8B9A7D]/15">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M5 13l4 4L19 7"
                  stroke="#8B9A7D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="font-display text-2xl font-medium text-[#3D3832]">
              Reserva realizada com sucesso.
            </h2>
            <p className="mt-4 font-sans text-base text-[#6B6560]">
              Entraremos em contato em breve para confirmar sua mesa.
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
    <section id="reservas" className="bg-[#FFFDF8] px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-xl">
        <SectionHeading
          label="Reservas"
          title="Reserve sua mesa."
          description="Garanta sua experiência na Divina Cozinha. Escolha a melhor data e horário, e deixe o restante conosco."
        />

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-[#E8E0D4] bg-[#FAF9F6] p-8 shadow-[0_8px_40px_rgba(61,56,50,0.06)] md:p-10"
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
                  {["12:00", "12:30", "13:00", "19:00", "19:30", "20:00", "20:30", "21:00"].map(
                    (t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ),
                  )}
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
            className={`mt-8 w-full ${loading ? "pointer-events-none opacity-70" : ""}`}
          >
            {loading ? "Enviando..." : "Reservar Mesa"}
          </Button>
        </form>
      </div>
    </section>
  );
}

const inputClass =
  "w-full rounded-2xl border border-[#E8E0D4] bg-[#FFFDF8] px-4 py-3.5 font-sans text-sm text-[#3D3832] placeholder:text-[#9C958D] transition-colors duration-300 focus:border-[#8B9A7D] focus:outline-none focus:ring-2 focus:ring-[#8B9A7D]/20";

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
        className="mb-2 block font-sans text-sm font-medium text-[#3D3832]"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
