# Sistema de Captação de Leads

**Tipo:** Visão do sistema · **Status:** ativo · **Versão:** 2.0

## Objetivo

Transformar visitantes do site em leads registrados, notificados e prontos para o [Sistema Comercial](../sales/00-visao.md). O formulário centraliza solicitações, elimina processos manuais e prepara a base para um CRM próprio.

## Documentação relacionada

| Documento | Conteúdo |
|-----------|----------|
| [01-arquitetura.md](./01-arquitetura.md) | Fluxo técnico e stack |
| [02-banco.md](./02-banco.md) | Schema da tabela `leads` |
| [03-api.md](./03-api.md) | `POST /api/contact` |
| [04-email.md](./04-email.md) | Notificações via Resend |
| [05-roadmap.md](./05-roadmap.md) | Evolução planejada |

## Fluxo geral

```
Visitante → Homepage → Formulário → POST /api/contact → Supabase → Resend → contato@dechenwebstudio.com.br → CRM (futuro)
```

## Objetivos operacionais

- Capturar informações de potenciais clientes
- Armazenar todos os leads no Supabase (PostgreSQL)
- Notificar a equipe por e-mail imediatamente
- Preparar estrutura para CRM e automações futuras
- Eliminar perda de leads e retrabalho manual

## Princípios

### Simplicidade

O visitante solicita orçamento em poucos minutos. Campos obrigatórios mínimos; opcionais enriquecem o primeiro contato.

### Confiabilidade

Nenhum lead pode ser perdido. Toda solicitação é persistida antes da resposta ao usuário.

### Escalabilidade

Arquitetura permite novos serviços, integrações e automações sem reconstrução.

### Organização

Informações centralizadas na tabela `leads`, com status rastreável e histórico consultável.

## Integração com o funil comercial

Após captação, o lead entra na etapa **Lead** do [funil comercial](../sales/01-funil.md):

```
Lead → Descoberta → Diagnóstico → Proposta → Cliente → Build → Entrega → Pós-venda → Cliente Recorrente
```

## Visão de longo prazo

Evoluir para CRM próprio com status de leads, reuniões, propostas, negociações, métricas e automações — integrado ao [Sistema Comercial](../sales/08-roadmap.md).

## Resultado esperado

Base sólida para receber, organizar e acompanhar novos clientes de forma profissional e escalável.
