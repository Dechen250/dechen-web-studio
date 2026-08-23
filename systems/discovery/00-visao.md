# Preparador de Descoberta

**Tipo:** Visão do sistema · **Status:** ativo · **Versão:** 1.0

## Objetivo

Transformar um lead (formulário ou entrada manual) num **rascunho do pack** da reunião de [Descoberta](../sales/02-descoberta.md). O agente não conduz a reunião e não fecha diagnóstico: só registra o que já é fato e marca o resto.

## Documentação relacionada

| Documento | Conteúdo |
|-----------|----------|
| [01-uso.md](./01-uso.md) | Console, CLI e regras de preenchimento |
| [exemplo-rascunho.md](./exemplo-rascunho.md) | Pack gerado a partir do site da DWS |
| [Descoberta](../sales/02-descoberta.md) | Roteiro e campos obrigatórios da reunião |
| [Auditoria técnica](../site-audit/00-visao.md) | Insumo técnico opcional |

## Fluxo

```
Lead (nome, contato, empresa, mensagem, site opcional)
        ↓
HTML inicial do site, se houver URL
        ↓
Auditoria PageSpeed em segundo plano, se houver URL
        ↓
Rascunho Markdown com os campos da Descoberta
```

O rascunho segue a estrutura da reunião (apresentação → empresa → público → objetivos → situação atual → concorrência → escopo → cronograma → orçamento). Cada linha ou é fato observado, ou é `[a confirmar na reunião]`.

## O que conta como fato

- Campos que a pessoa preencheu no formulário
- Título, descrição, H1, canais de contato e tags de medição lidos no HTML inicial
- Achados da auditoria técnica, quando existir, apresentados como pergunta — não como proposta

## O que nunca é inventado

- Orçamento
- Prazo, data limite, eventos
- Público-alvo, concorrentes, diferenciais, cargo — salvo se o lead escreveu isso
- Promessa de solução ou preço

## Superfícies

- **Produto:** agente do CRM em `/app/agent`, no contato e na empresa
- CLI da agência: `npm run discovery -- …`
- Site da DWS: `POST /api/contact` só envia o lead ao CRM; o agente roda lá

## Resultado esperado

A reunião começa com um pack já estruturado. A conversa confirma, corrige e completa — em vez de começar do zero.
