import { formatScore, listPriorities } from "@/lib/site-audit/format";
import type { AuditResult } from "@/lib/site-audit/types";

import { TO_CONFIRM, type DiscoveryInput, type SiteFacts } from "./types";

function cell(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\s+/g, " ").trim();
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(iso));
}

function orConfirm(value: string | undefined | null): string {
  const trimmed = value?.replace(/\s+/g, " ").trim();
  return trimmed ? trimmed : TO_CONFIRM;
}

function fromSite(facts: SiteFacts, label: string, value: string | undefined): string {
  if (!value) return TO_CONFIRM;
  return `${value} (observado no site${facts.finalUrl ? `: ${facts.finalUrl}` : ""} — ${label})`;
}

function auditBlurb(result: AuditResult | undefined, blockedTitle?: string): string {
  if (blockedTitle) {
    return `Acesso ao site atual bloqueado na pré-checagem: ${blockedTitle}.`;
  }
  if (!result) return TO_CONFIRM;

  const performance = result.lighthouse.categories.find((item) => item.id === "performance");
  const critical = result.checks.filter((item) => item.severity === "critico").map((item) => item.label);
  const priorities = listPriorities(result).slice(0, 4);

  const parts = [
    `Performance ${formatScore(performance?.score ?? null)} em ${
      result.lighthouse.formFactor === "mobile" ? "celular" : "desktop"
    }`,
    critical.length > 0
      ? `falhas críticas de fundação: ${critical.join(", ")}`
      : "nenhuma falha crítica de fundação",
  ];

  if (priorities.length > 0) {
    parts.push(`prioridades técnicas: ${priorities.join(" | ")}`);
  }

  return parts.join(". ") + ".";
}

function statedFromMessage(message: string | undefined, keywords: RegExp): string {
  if (!message) return TO_CONFIRM;
  const sentences = message
    .split(/[\n.!?]+/)
    .map((item) => item.trim())
    .filter(Boolean);
  const hit = sentences.find((sentence) => keywords.test(sentence));
  return hit ? `${hit} (dito no formulário)` : TO_CONFIRM;
}

export function buildDiscoveryMarkdown(input: DiscoveryInput, generatedAt: string): string {
  const { lead, facts = { contactChannels: [], measurement: [] } } = input;
  const siteLine = lead.website || facts.finalUrl || facts.url;

  return `# Rascunho de Descoberta — ${cell(lead.company || lead.name)}

**Tipo:** descoberta · **Status:** rascunho automático · **Versão:** 1.0

Pack gerado a partir do lead e do que o site declara. **Não substitui a reunião.** O que não foi observado fica marcado como ${TO_CONFIRM}. Orçamento e prazo nunca são inventados.

| Campo | Valor |
|-------|-------|
| Gerado em | ${formatDate(generatedAt)} |
| Site observado | ${cell(siteLine ?? TO_CONFIRM)} |

## Informações obrigatórias

| Campo | Valor | Origem |
|-------|-------|--------|
| Nome | ${cell(orConfirm(lead.name))} | formulário |
| Empresa | ${cell(orConfirm(lead.company))} | formulário |
| Cargo | ${cell(orConfirm(lead.role))} | ${lead.role ? "formulário" : "pendente"} |
| E-mail | ${cell(orConfirm(lead.email))} | formulário |
| WhatsApp | ${cell(orConfirm(lead.whatsapp))} | formulário |
| Segmento | ${cell(orConfirm(lead.segment || lead.company))} | formulário |
| Objetivos | ${cell(statedFromMessage(lead.message, /objetivo|quero|preciso|vender|lead|agenda|marcar/i))} | ${lead.message ? "formulário, se explícito" : "pendente"} |
| Público-alvo | ${TO_CONFIRM} | reunião |
| Problemas relatados pelo cliente | ${cell(statedFromMessage(lead.message, /problema|lento|não|nao |dificuldade|hoje o site/i))} | ${lead.message ? "formulário, se explícito" : "pendente"} |
| Prazo | ${TO_CONFIRM} | reunião — nunca inventar |
| Orçamento | ${TO_CONFIRM} | reunião — nunca inventar |
| Observações | ${cell(orConfirm(lead.message))} | formulário |

## Roteiro da reunião (pré-preenchido)

### 1. Apresentação

Ainda não houve reunião. Usar o roteiro de `systems/sales/02-descoberta.md`.

### 2. Conhecendo a empresa

- O que a empresa faz? ${cell(fromSite(facts, "título", facts.title))}
- Como o site se descreve? ${cell(fromSite(facts, "meta description", facts.description))}
- Título principal visível (H1): ${cell(fromSite(facts, "H1", facts.h1))}
- Há quanto tempo existe? ${TO_CONFIRM}
- Principais serviços? ${TO_CONFIRM}
- Diferenciais frente à concorrência? ${TO_CONFIRM}

### 3. Público-alvo

- Quem é o cliente ideal? ${TO_CONFIRM}
- Onde está? Como encontra a empresa? ${TO_CONFIRM}
- O que procura? ${TO_CONFIRM}

### 4. Objetivos

- Principal objetivo do projeto? ${cell(statedFromMessage(lead.message, /objetivo|quero|preciso|site|landing|agenda/i))}
- O que espera alcançar? ${TO_CONFIRM}
- Como medirá o sucesso? ${TO_CONFIRM}

### 5. Situação atual

- Já possui site? ${siteLine ? `Sim — ${siteLine}` : TO_CONFIRM}
- Canais de contato no HTML inicial: ${facts.contactChannels.length > 0 ? facts.contactChannels.join(", ") : siteLine ? "nenhum WhatsApp, telefone ou formulário detectado no HTML inicial" : TO_CONFIRM}
- Medição instalada: ${facts.measurement.length > 0 ? facts.measurement.join(", ") : siteLine ? "nenhum Analytics/Pixel detectado no HTML inicial" : TO_CONFIRM}
- Idioma declarado: ${facts.lang ?? TO_CONFIRM}
- Prévia de link (og:image): ${facts.ogImage ? "presente" : siteLine ? "ausente no HTML inicial" : TO_CONFIRM}
- O que funciona? ${TO_CONFIRM}
- O que precisa melhorar? ${TO_CONFIRM}
- Dificuldades atuais? ${TO_CONFIRM}
${facts.fetchError ? `- Falha ao ler o site: ${facts.fetchError}` : ""}

### 6. Concorrência

- Principais concorrentes? ${TO_CONFIRM}
- Sites de referência ou admiração? ${TO_CONFIRM}

### 7. Escopo inicial

- Páginas imaginadas? ${TO_CONFIRM}
- Funcionalidades essenciais? ${TO_CONFIRM}
- Integrações necessárias? ${TO_CONFIRM}

### 8. Cronograma

- Data limite? ${TO_CONFIRM}
- Eventos importantes? ${TO_CONFIRM}

### 9. Orçamento

- Orçamento previsto? ${TO_CONFIRM}

Não insistir se a pessoa não souber. Pode ser definido depois.

### 10. Encerramento

Explicar próximos passos:

\`\`\`
Descoberta → Diagnóstico → Proposta → Build → Entrega
\`\`\`

## Insumo técnico (não é Diagnóstico)

${auditBlurb(input.audit, input.blockedTitle)}

Achados técnicos entram na reunião como pergunta ("isso bate com a dor de vocês?"), não como proposta de preço.

## Limites deste rascunho

- Só registra o que o lead escreveu ou o que o HTML inicial do site declara.
- Não estima receita, prazo, preço nem tamanho de equipe.
- Não avalia copy, marca ou conversão real.
- A reunião confirma, corrige e completa cada campo marcado como ${TO_CONFIRM}.
`;
}
