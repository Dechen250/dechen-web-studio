export type FormFactor = "mobile" | "desktop";

export type Severity = "ok" | "atencao" | "critico";

export type CategoryScore = {
  id: string;
  label: string;
  score: number | null;
};

export type MetricResult = {
  id: string;
  label: string;
  display: string;
  numericValue: number | null;
  severity: Severity;
  target: string;
};

export type Opportunity = {
  id: string;
  label: string;
  description: string;
  savingsMs: number | null;
  savingsBytes: number | null;
};

export type CheckResult = {
  label: string;
  severity: Severity;
  detail: string;
  /** Por que isso importa comercialmente, em uma frase. */
  why?: string;
};

export type LighthouseResult = {
  requestedUrl: string;
  finalUrl: string;
  fetchedAt: string;
  lighthouseVersion: string;
  formFactor: FormFactor;
  categories: CategoryScore[];
  metrics: MetricResult[];
  opportunities: Opportunity[];
  diagnostics: {
    totalByteWeight: number | null;
    requestCount: number | null;
  };
};

export type AuditResult = {
  lighthouse: LighthouseResult;
  checks: CheckResult[];
};
