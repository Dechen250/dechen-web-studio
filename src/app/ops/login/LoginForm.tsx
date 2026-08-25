"use client";

import { useState, type FormEvent } from "react";

export function LoginForm({ needsSecret }: { needsSecret: boolean }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/ops/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error ?? "Não foi possível entrar.");
      }
      window.location.href = "/ops";
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Falha inesperada.");
      setLoading(false);
    }
  }

  if (needsSecret) {
    return (
      <p className="max-w-md text-sm text-[#A1A1AA]">
        Em produção o console exige a variável <code className="text-white">OPS_SECRET</code>{" "}
        (mínimo 8 caracteres). Defina no ambiente e recarregue.
      </p>
    );
  }

  return (
    <form onSubmit={(event) => void onSubmit(event)} className="w-full max-w-sm space-y-4">
      <label className="block space-y-2 text-sm" htmlFor="ops-password">
        <span className="text-[#A1A1AA]">Senha do console</span>
        <input
          id="ops-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="h-12 w-full rounded-xl border border-[#262626] bg-[#050505] px-4 text-white outline-none focus:border-[#0070F3]"
        />
      </label>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="h-12 w-full rounded-[18px] bg-[#0070F3] text-sm font-medium disabled:opacity-50"
      >
        {loading ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
