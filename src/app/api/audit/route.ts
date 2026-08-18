import { spawn } from "node:child_process";
import path from "node:path";

export const runtime = "nodejs";
export const maxDuration = 180;
export const dynamic = "force-dynamic";

function auditEnabled(): boolean {
  if (process.env.SITE_AUDIT_ENABLED === "1") return true;
  return process.env.NODE_ENV !== "production";
}

export async function POST(request: Request): Promise<Response> {
  if (!auditEnabled()) {
    return Response.json(
      {
        error:
          "O console de auditoria está desligado neste ambiente. Defina SITE_AUDIT_ENABLED=1 para ligar.",
      },
      { status: 403 },
    );
  }

  let body: { url?: string; formFactor?: string };
  try {
    body = (await request.json()) as { url?: string; formFactor?: string };
  } catch {
    return Response.json({ error: "JSON inválido." }, { status: 400 });
  }

  const url = body.url?.trim();
  if (!url) {
    return Response.json({ error: "Informe a URL do site." }, { status: 400 });
  }

  try {
    new URL(/^https?:\/\//i.test(url) ? url : `https://${url}`);
  } catch {
    return Response.json({ error: "URL inválida." }, { status: 400 });
  }

  const formFactor = body.formFactor === "desktop" ? "desktop" : "mobile";
  const tsxCli = path.join(process.cwd(), "node_modules/tsx/dist/cli.mjs");
  const script = path.join(process.cwd(), "scripts/site-audit/index.ts");
  const args = [tsxCli, script, url, "--events"];

  if (formFactor === "desktop") args.push("--desktop");

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const child = spawn(process.execPath, args, {
        cwd: process.cwd(),
        env: process.env,
        stdio: ["ignore", "pipe", "pipe"],
      });

      let buffer = "";
      let stderr = "";
      let closed = false;

      const sendLine = (line: string) => {
        if (!line.trim() || closed) return;
        controller.enqueue(encoder.encode(`data: ${line}\n\n`));
      };

      const fail = (message: string) => {
        sendLine(JSON.stringify({ type: "error", message }));
      };

      const close = () => {
        if (closed) return;
        closed = true;
        controller.close();
      };

      request.signal.addEventListener("abort", () => {
        child.kill("SIGKILL");
        close();
      });

      child.stdout.on("data", (chunk: Buffer) => {
        buffer += chunk.toString();
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (line.startsWith("{")) sendLine(line);
        }
      });

      child.stderr.on("data", (chunk: Buffer) => {
        stderr += chunk.toString();
      });

      child.on("error", (error) => {
        fail(error.message);
        close();
      });

      child.on("close", (code) => {
        if (buffer.trim()) sendLine(buffer);
        if (code !== 0 && code !== null) {
          const detail = stderr.trim().split("\n").slice(-3).join(" ");
          fail(detail || `O processo da auditoria saiu com código ${code}.`);
        }
        close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
