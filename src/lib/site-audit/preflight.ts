import { lookup } from "node:dns/promises";
import { connect } from "node:tls";

const TLS_TIMEOUT_MS = 15_000;

export type BlockReason = "dns" | "certificado" | "conexao";

export type Preflight =
  | { status: "ok" }
  | {
      status: "bloqueado";
      reason: BlockReason;
      title: string;
      summary: string;
      evidence: string[];
    };

type PeerCertificate = {
  subject?: { CN?: string };
  issuer?: { CN?: string; O?: string };
  subjectaltname?: string;
  valid_from?: string;
  valid_to?: string;
};

type TlsInspection = {
  authorized: boolean;
  authorizationError: string | null;
  certificate: PeerCertificate | null;
};

/** `authorizationError` vem como string de código ou como Error, dependendo do caso. */
function normalizeAuthorizationError(raw: unknown): string | null {
  if (!raw) return null;
  if (typeof raw === "string") return raw;

  const error = raw as NodeJS.ErrnoException;

  return error.code ?? error.message ?? null;
}

function formatCertDate(value: string): string {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) return value;

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(parsed);
}

function inspectTls(hostname: string, port: number): Promise<TlsInspection> {
  return new Promise((resolvePromise, rejectPromise) => {
    const socket = connect({
      host: hostname,
      port,
      servername: hostname,
      // Precisamos ver o certificado inválido para descrevê-lo, não confiar nele.
      rejectUnauthorized: false,
      timeout: TLS_TIMEOUT_MS,
    });

    const fail = (error: Error) => {
      socket.destroy();
      rejectPromise(error);
    };

    socket.once("secureConnect", () => {
      const certificate = socket.getPeerCertificate() as PeerCertificate;

      resolvePromise({
        authorized: socket.authorized,
        authorizationError: normalizeAuthorizationError(socket.authorizationError),
        certificate: Object.keys(certificate ?? {}).length > 0 ? certificate : null,
      });

      socket.end();
    });

    socket.once("timeout", () => fail(new Error("Tempo esgotado no handshake TLS.")));
    socket.once("error", fail);
  });
}

function certificateEvidence(inspection: TlsInspection, hostname: string): string[] {
  const certificate = inspection.certificate;
  const evidence: string[] = [];

  if (inspection.authorizationError) {
    evidence.push(`Erro de validação: \`${inspection.authorizationError}\``);
  }

  if (!certificate) {
    return evidence;
  }

  const subject = certificate.subject?.CN;
  const issuer = [certificate.issuer?.CN, certificate.issuer?.O].filter(Boolean).join(" — ");

  if (subject) {
    evidence.push(
      subject === hostname
        ? `Emitido para: \`${subject}\``
        : `Emitido para \`${subject}\`, mas o domínio acessado é \`${hostname}\``,
    );
  }

  if (issuer) {
    const autoassinado = certificate.issuer?.CN && certificate.issuer.CN === subject;
    evidence.push(
      autoassinado
        ? `Emissor: \`${issuer}\` — é o próprio certificado se assinando (autoassinado)`
        : `Emissor: \`${issuer}\``,
    );
  }

  if (certificate.subjectaltname) {
    evidence.push(`Domínios cobertos: \`${certificate.subjectaltname}\``);
  }

  if (certificate.valid_from && certificate.valid_to) {
    evidence.push(
      `Validade: de ${formatCertDate(certificate.valid_from)} até ${formatCertDate(certificate.valid_to)}`,
    );
  }

  return evidence;
}

function causeCode(error: unknown): string | null {
  if (!(error instanceof Error)) return null;

  const cause = (error as { cause?: unknown }).cause;
  if (cause && typeof cause === "object" && "code" in cause) {
    return String((cause as { code: unknown }).code);
  }

  return (error as NodeJS.ErrnoException).code ?? null;
}

/**
 * Roda antes do Lighthouse. Se o próprio navegador travaria no acesso — DNS,
 * conexão ou certificado — não faz sentido medir performance: o achado é esse.
 */
export async function preflight(url: string): Promise<Preflight> {
  const target = new URL(url);
  const hostname = target.hostname;

  try {
    await lookup(hostname);
  } catch {
    return {
      status: "bloqueado",
      reason: "dns",
      title: "Domínio não resolve",
      summary: `O domínio \`${hostname}\` não aponta para nenhum servidor: nenhum visitante consegue abrir o site.`,
      evidence: ["Consulta de DNS falhou (registro A/AAAA ausente ou domínio expirado)."],
    };
  }

  if (target.protocol === "https:") {
    const port = target.port ? Number(target.port) : 443;

    try {
      const inspection = await inspectTls(hostname, port);

      if (!inspection.authorized) {
        return {
          status: "bloqueado",
          reason: "certificado",
          title: "Certificado SSL inválido",
          summary: `O navegador exibe tela cheia de aviso de segurança antes do site carregar. Na prática o visitante vê "sua conexão não é particular" em vez da página.`,
          evidence: certificateEvidence(inspection, hostname),
        };
      }
    } catch (error) {
      return {
        status: "bloqueado",
        reason: "conexao",
        title: "Falha ao estabelecer conexão segura",
        summary: `O servidor de \`${hostname}\` não completou a conexão HTTPS.`,
        evidence: [`Detalhe: ${error instanceof Error ? error.message : String(error)}`],
      };
    }
  }

  return { status: "ok" };
}

export function describeFetchFailure(error: unknown, url: string): string {
  const code = causeCode(error);

  const explanations: Record<string, string> = {
    ENOTFOUND: "o domínio não resolve em DNS",
    EAI_AGAIN: "a consulta de DNS falhou temporariamente",
    ECONNREFUSED: "o servidor recusou a conexão",
    ECONNRESET: "o servidor encerrou a conexão no meio da resposta",
    ETIMEDOUT: "o servidor não respondeu no tempo limite",
    CERT_HAS_EXPIRED: "o certificado SSL está expirado",
    DEPTH_ZERO_SELF_SIGNED_CERT: "o certificado SSL é autoassinado",
    SELF_SIGNED_CERT_IN_CHAIN: "há certificado autoassinado na cadeia SSL",
    UNABLE_TO_VERIFY_LEAF_SIGNATURE: "a cadeia do certificado SSL está incompleta",
    ERR_TLS_CERT_ALTNAME_INVALID: "o certificado SSL não cobre este domínio",
  };

  const explanation = code ? explanations[code] : null;

  if (explanation) {
    return `não foi possível acessar ${url}: ${explanation} (${code}).`;
  }

  return `não foi possível acessar ${url}${code ? ` (${code})` : ""}.`;
}
