import { runChecks } from "./checks";
import { normalizeUrl } from "./format";
import { runPageSpeed } from "./pagespeed";
import { preflight } from "./preflight";
import { PRIORITY_ZERO, buildBlockedReport, buildReport } from "./report";
import type { AuditEvent, AuditResult, FormFactor } from "./types";

export type RunPagespeedOptions = {
  formFactor?: FormFactor;
  emit: (event: AuditEvent) => void;
};

export async function runPagespeedAudit(
  inputUrl: string,
  options: RunPagespeedOptions,
): Promise<void> {
  const { emit } = options;
  const formFactor = options.formFactor ?? "mobile";
  const url = normalizeUrl(inputUrl);

  emit({
    type: "status",
    step: "acesso",
    message: `Conferindo se ${new URL(url).hostname} abre no navegador…`,
  });

  const access = await preflight(url);

  if (access.status === "bloqueado") {
    emit({
      type: "status",
      step: "bloqueado",
      message: access.title,
    });
    emit({
      type: "blocked",
      title: access.title,
      summary: access.summary,
      evidence: access.evidence,
      reason: access.reason,
      priority: PRIORITY_ZERO[access.reason],
      markdown: buildBlockedReport(url, access),
    });
    return;
  }

  emit({
    type: "status",
    step: "fundacao",
    message: "Lendo o HTML: título, contato, prévia de link, medição…",
  });

  const checksPromise = runChecks(url).then((checks) => {
    for (const check of checks) {
      emit({ type: "check", check });
    }
    return checks;
  });

  emit({
    type: "status",
    step: "pagespeed",
    message: "Pedindo a medição ao PageSpeed Insights (sem Chrome local)…",
  });

  const lighthouseRun = await runPageSpeed({ url, formFactor });

  emit({
    type: "status",
    step: "notas",
    message: "Notas prontas. Montando o relatório…",
  });

  const { screenshots, ...lighthouse } = lighthouseRun;
  const checks = await checksPromise;
  const result: AuditResult = { lighthouse, checks, screenshots };

  emit({
    type: "complete",
    result,
    markdown: buildReport(result, "pagespeed"),
  });
}

export async function collectPagespeedAudit(
  url: string,
  formFactor: FormFactor = "mobile",
): Promise<{
  markdown: string;
  result?: AuditResult;
  blocked?: Extract<AuditEvent, { type: "blocked" }>;
}> {
  let markdown = "";
  let result: AuditResult | undefined;
  let blocked: Extract<AuditEvent, { type: "blocked" }> | undefined;
  let error: string | undefined;

  await runPagespeedAudit(url, {
    formFactor,
    emit: (event) => {
      if (event.type === "complete") {
        result = event.result;
        markdown = event.markdown;
      } else if (event.type === "blocked") {
        blocked = event;
        markdown = event.markdown;
      } else if (event.type === "error") {
        error = event.message;
      }
    },
  });

  if (error) throw new Error(error);
  return { markdown, result, blocked };
}
