import { runChecks } from "./checks";
import { normalizeUrl } from "./format";
import { runLighthouse } from "./lighthouse";
import { preflight } from "./preflight";
import { PRIORITY_ZERO, buildBlockedReport, buildReport } from "./report";
import type { AuditEvent, AuditResult, FormFactor } from "./types";

export type RunAuditOptions = {
  formFactor?: FormFactor;
  visible?: boolean;
  emit: (event: AuditEvent) => void;
};

export async function runAudit(inputUrl: string, options: RunAuditOptions): Promise<void> {
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
    step: "chrome",
    message: "Abrindo o Chrome e medindo a página como se fosse um celular…",
  });

  const lighthouseRun = await runLighthouse(url, formFactor, {
    visible: options.visible,
    onScreenshot: (src) => {
      const payload = src.split(",")[1] ?? "";
      // Quadros quase vazios (about:blank, throttle) não entram na tela ao vivo.
      if (payload.length < 8_000) return;
      emit({ type: "screenshot", src, caption: "O Chrome carregando a página" });
    },
  });

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
    markdown: buildReport(result),
  });
}
