import type { SiteFacts } from "./facts";

export const TO_CONFIRM = "[a confirmar na reunião]";

export type AgentLead = {
  name: string;
  email?: string;
  whatsapp?: string;
  company: string;
  website?: string;
  segment?: string;
  message?: string;
};

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

function statedFromMessage(message: string | undefined, pattern: RegExp): string {
  const text = message?.replace(/\s+/g, " ").trim();
  if (!text) return TO_CONFIRM;
  return pattern.test(text) ? text : TO_CONFIRM;
}

export function buildDiscoveryMarkdown(input: {
  lead: AgentLead;
  facts: SiteFacts;
  auditMarkdown?: string;
  generatedAt: string;
}): string {
  const { lead, facts, generatedAt } = input;
  const siteLine = lead.website || facts.finalUrl || facts.url;
  const objetivos = statedFromMessage(
    lead.message,
    /objetivo|quero|preciso|vender|lead|agenda|marcar/i,
  );
  const problemas = statedFromMessage(
    lead.message,
    /problema|lento|não|nao |dificuldade|hoje o site/i,
  );

  return `# Rascunho de Descoberta — ${cell(lead.company || lead.name)}

**Tipo:** descoberta · **Status:** rascunho do agente · **Versão:** 1.0

Gerado pelo agente do CRM a partir do contato e do que o site declara. **Não substitui a reunião.** O que não foi observado fica ${TO_CONFIRM}. Orçamento e prazo nunca são inventados.

| Campo | Valor |
|-------|-------|
| Gerado em | ${formatDate(generatedAt)} |
| Site observado | ${cell(siteLine ?? TO_CONFIRM)} |

## Informações do contato

| Campo | Valor |
|-------|-------|
| Nome | ${cell(orConfirm(lead.name))} |
| Empresa | ${cell(orConfirm(lead.company))} |
| E-mail | ${cell(orConfirm(lead.email))} |
| WhatsApp | ${cell(orConfirm(lead.whatsapp))} |
| Segmento | ${cell(orConfirm(lead.segment || lead.company))} |
| Objetivos | ${cell(objetivos)} |
| Problemas relatados | ${cell(problemas)} |
| Prazo | ${TO_CONFIRM} |
| Orçamento | ${TO_CONFIRM} |
| Observações | ${cell(orConfirm(lead.message))} |

## Roteiro da reunião

### Empresa
- O que a empresa faz? ${cell(fromSite(facts, "título", facts.title))}
- Como o site se descreve? ${cell(fromSite(facts, "meta description", facts.description))}
- Título principal (H1): ${cell(fromSite(facts, "H1", facts.h1))}

### Situação atual
- Já possui site? ${siteLine ? `Sim — ${siteLine}` : TO_CONFIRM}
- Canais de contato no HTML: ${facts.contactChannels.length > 0 ? facts.contactChannels.join(", ") : siteLine ? "nenhum WhatsApp, telefone ou formulário detectado" : TO_CONFIRM}
- Medição: ${facts.measurement.length > 0 ? facts.measurement.join(", ") : siteLine ? "nenhum Analytics/Pixel detectado" : TO_CONFIRM}
${facts.fetchError ? `- Falha ao ler o site: ${facts.fetchError}` : ""}

### Público, escopo, prazo e orçamento
Tudo ${TO_CONFIRM} — só a reunião preenche.

## Insumo técnico
${input.auditMarkdown?.trim() || TO_CONFIRM}

Achados técnicos entram na reunião como pergunta, não como proposta de preço.
`;
}
