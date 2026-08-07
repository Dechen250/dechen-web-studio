# Banco de Dados — Sistema de Captação

**Tipo:** Banco de dados · **Status:** ativo · **Versão:** 2.0

## Objetivo

Definir a estrutura do banco que armazena leads recebidos pela Dechen Web Studio. Simples na v1, preparado para CRM completo.

Documentação relacionada: [01-arquitetura.md](./01-arquitetura.md) · [03-api.md](./03-api.md) · [05-roadmap.md](./05-roadmap.md)

## Tecnologia

| Item | Valor |
|------|-------|
| Plataforma | Supabase |
| Modelo | PostgreSQL |

## Tabela principal: `leads`

### Campos

| Campo | Tipo | Obrigatório | Padrão | Descrição |
|-------|------|-------------|--------|-----------|
| `id` | UUID | Sim | auto | Identificador único |
| `created_at` | Timestamp | Sim | auto | Data/hora de criação |
| `updated_at` | Timestamp | Sim | auto | Última atualização |
| `status` | Text | Sim | `novo` | Status atual do lead |
| `nome` | Text | Sim | — | Nome do contato |
| `empresa` | Text | Não | — | Empresa |
| `email` | Text | Sim | — | E-mail |
| `whatsapp` | Text | Sim | — | WhatsApp |
| `servico` | Text | Sim | — | Serviço solicitado |
| `objetivo` | Text | Não | — | Objetivo do projeto |
| `prazo` | Text | Não | — | Prazo desejado |
| `orcamento` | Text | Não | — | Orçamento previsto |
| `mensagem` | Text | Sim | — | Mensagem do lead |
| `origem` | Text | Sim | `website` | Canal de origem |

### Enum `status`

- `novo`
- `contatado`
- `reunião marcada`
- `proposta enviada`
- `fechado`
- `perdido`

### Valores de `servico` (exemplos)

- Landing Page
- Site Institucional
- Portfólio
- Manutenção
- Outro

### Valores de `origem` (exemplos)

- `website`
- `instagram`
- `indicação`
- `linkedin`

## Índices

Criar índices em:

- `email`
- `status`
- `created_at`

## Regras de integridade

- Todo lead possui UUID
- E-mail com formato válido
- `nome` e `mensagem` não vazios
- `created_at` preenchido automaticamente

## Campos futuros (evolução)

- `telefone_secundario`
- `cidade`, `estado`
- `segmento`, `tamanho_empresa`, `faturamento`
- `observacoes`, `ultima_interacao`
- `responsavel`, `prioridade`, `origem_detalhada`

## Tabelas futuras

| Tabela | Finalidade |
|--------|------------|
| `usuarios` | Equipe da agência |
| `propostas` | Orçamentos enviados |
| `reunioes` | Reuniões com clientes |
| `tarefas` | Acompanhamento interno |
| `interacoes` | Histórico de contatos |

## Objetivo

Servir como base do CRM da Dechen Web Studio, rastreando cada cliente do primeiro contato ao fechamento ([Sistema Comercial](../sales/01-funil.md)).
