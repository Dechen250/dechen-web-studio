type ChromeTarget = {
  type?: string;
  url?: string;
  webSocketDebuggerUrl?: string;
};

type CdpResponse = {
  id?: number;
  result?: { data?: string };
  error?: { message?: string };
};

const CAPTURE_TIMEOUT_MS = 4_000;

/**
 * Tira um JPEG da aba ativa via Chrome DevTools Protocol.
 * Sessão curta: conecta, captura, fecha — o Lighthouse usa o mesmo Chrome em paralelo.
 */
export async function capturePageScreenshot(port: number): Promise<string | null> {
  const targets = await listTargets(port);
  const page = pickPage(targets);

  if (!page?.webSocketDebuggerUrl) return null;

  return captureViaCdp(page.webSocketDebuggerUrl);
}

async function listTargets(port: number): Promise<ChromeTarget[]> {
  const response = await fetch(`http://127.0.0.1:${port}/json/list`, {
    signal: AbortSignal.timeout(1_500),
  });

  if (!response.ok) return [];

  const payload = (await response.json()) as unknown;

  return Array.isArray(payload) ? (payload as ChromeTarget[]) : [];
}

function pickPage(targets: ChromeTarget[]): ChromeTarget | undefined {
  const pages = targets.filter((target) => target.type === "page" && target.webSocketDebuggerUrl);

  return (
    pages.find((target) => (target.url ?? "").startsWith("http")) ?? pages[pages.length - 1]
  );
}

function captureViaCdp(debuggerUrl: string): Promise<string | null> {
  return new Promise((resolve) => {
    let settled = false;

    const finish = (value: string | null) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      try {
        socket.close();
      } catch {
        /* já fechou */
      }
      resolve(value);
    };

    const timeout = setTimeout(() => finish(null), CAPTURE_TIMEOUT_MS);
    const socket = new WebSocket(debuggerUrl);

    socket.addEventListener("open", () => {
      socket.send(
        JSON.stringify({
          id: 1,
          method: "Page.captureScreenshot",
          params: { format: "jpeg", quality: 35 },
        }),
      );
    });

    socket.addEventListener("message", (event) => {
      try {
        const message = JSON.parse(String(event.data)) as CdpResponse;
        if (message.id !== 1) return;
        if (message.result?.data) {
          finish(`data:image/jpeg;base64,${message.result.data}`);
          return;
        }
        finish(null);
      } catch {
        finish(null);
      }
    });

    socket.addEventListener("error", () => finish(null));
  });
}
