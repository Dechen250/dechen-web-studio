import type { Metadata } from "next";

import { AuditConsole } from "./AuditConsole";

export const metadata: Metadata = {
  title: "Console de auditoria",
  robots: { index: false, follow: false },
};

export default function AuditOpsPage() {
  return <AuditConsole />;
}
