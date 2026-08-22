import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { isOpsAuthenticated } from "@/lib/ops/auth";

import { OpsNav } from "./OpsNav";

export const metadata: Metadata = {
  title: "Console interno",
  robots: { index: false, follow: false },
};

export default async function OpsConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isOpsAuthenticated())) {
    redirect("/ops/login");
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <OpsNav />
      {children}
    </div>
  );
}
