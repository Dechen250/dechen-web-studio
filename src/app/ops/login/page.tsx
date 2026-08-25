import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { isOpsAuthenticated, opsAuthRequired, opsSecretConfigured } from "@/lib/ops/auth";

import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Entrar no console",
  robots: { index: false, follow: false },
};

export default async function OpsLoginPage() {
  if (await isOpsAuthenticated()) {
    redirect("/ops");
  }

  const needsSecret = opsAuthRequired() && !opsSecretConfigured();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] px-5 text-white">
      <p className="mb-3 text-[13px] tracking-[0.18em] text-[#A1A1AA] uppercase">
        Dechen Web Studio · interno
      </p>
      <h1 className="mb-8 text-3xl font-semibold tracking-[-0.04em]">Console</h1>
      <LoginForm needsSecret={needsSecret} />
    </div>
  );
}
