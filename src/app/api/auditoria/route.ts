import { collectPagespeedAudit } from "@/lib/site-audit/run-pagespeed";
import { listPriorities, normalizeUrl } from "@/lib/site-audit/format";
import { allowRequest, clientKey } from "@/lib/ops/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 90;
export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  if (!allowRequest(clientKey(request, "auditoria"), 4, 60 * 60 * 1000)) {
    return Response.json(
      { error: "Limite de auditorias públicas atingido. Tente de novo mais tarde." },
      { status: 429 },
    );
  }

  let body: { url?: string; formFactor?: string };
  try {
    body = (await request.json()) as { url?: string; formFactor?: string };
  } catch {
    return Response.json({ error: "JSON inválido." }, { status: 400 });
  }

  const rawUrl = body.url?.trim();
  if (!rawUrl) {
    return Response.json({ error: "Informe a URL do site." }, { status: 400 });
  }

  let url: string;
  try {
    url = normalizeUrl(rawUrl);
  } catch {
    return Response.json({ error: "URL inválida." }, { status: 400 });
  }

  const formFactor = body.formFactor === "desktop" ? "desktop" : "mobile";

  try {
    const collected = await collectPagespeedAudit(url, formFactor);

    if (collected.blocked) {
      return Response.json({
        status: "blocked",
        url,
        title: collected.blocked.title,
        summary: collected.blocked.summary,
        evidence: collected.blocked.evidence,
        priority: collected.blocked.priority,
      });
    }

    if (!collected.result) {
      return Response.json({ error: "A auditoria terminou sem relatório." }, { status: 500 });
    }

    const { lighthouse, checks } = collected.result;
    return Response.json({
      status: "ok",
      url,
      engine: "pagespeed",
      categories: lighthouse.categories,
      metrics: lighthouse.metrics,
      checks,
      priorities: listPriorities(collected.result),
      fetchedAt: lighthouse.fetchedAt,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha na medição.";
    const quota = /429|Quota exceeded/i.test(message);
    return Response.json(
      {
        error: quota
          ? "A cota pública do PageSpeed Insights esgotou neste servidor. Tente de novo mais tarde, ou use o console interno."
          : message,
      },
      { status: quota ? 429 : 502 },
    );
  }
}
