# Banco de Dados — Sistema de Captação

## Objetivo

Definir a estrutura do banco de dados responsável por armazenar todos os leads recebidos pela Dechen Web Studio.

O banco deve ser simples inicialmente, mas preparado para evoluir para um CRM completo.

---

# Tecnologia

Banco de Dados

Supabase

Modelo

PostgreSQL

---

# Tabela Principal

Nome da tabela

```txt

leads

```

---

# Estrutura

## id

Tipo

UUID

Descrição

Identificador único do lead.

---

## created_at

Tipo

Timestamp

Descrição

Data e horário de criação.

---

## updated_at

Tipo

Timestamp

Descrição

Última atualização do registro.

---

## status

Tipo

Text

Valor padrão

```txt

novo

```

Descrição

Status atual do lead.

Valores previstos:

- novo

- contatado

- reunião marcada

- proposta enviada

- fechado

- perdido

---

## nome

Tipo

Text

Obrigatório

Sim

---

## empresa

Tipo

Text

Obrigatório

Não

---

## email

Tipo

Text

Obrigatório

Sim

---

## whatsapp

Tipo

Text

Obrigatório

Sim

---

## servico

Tipo

Text

Obrigatório

Sim

Exemplos

- Landing Page

- Site Institucional

- Portfólio

- Manutenção

- Outro

---

## objetivo

Tipo

Text

Obrigatório

Não

---

## prazo

Tipo

Text

Obrigatório

Não

---

## orcamento

Tipo

Text

Obrigatório

Não

---

## mensagem

Tipo

Text

Obrigatório

Sim

---

## origem

Tipo

Text

Valor padrão

```txt

website

```

Descrição

Origem do lead.

Exemplos:

- website

- instagram

- indicação

- linkedin

---

# Índices

Criar índices para:

- email

- status

- created_at

Isso melhora consultas futuras.

---

# Integridade

Regras:

- Todo lead deve possuir um UUID.

- Email deve possuir formato válido.

- Nome não pode estar vazio.

- Mensagem não pode estar vazia.

- created_at deve ser preenchido automaticamente.

---

# Evolução Futura

Campos previstos para futuras versões:

- telefone_secundario

- cidade

- estado

- segmento

- tamanho_empresa

- faturamento

- observacoes

- ultima_interacao

- responsavel

- prioridade

- origem_detalhada

---

# Relacionamentos Futuros

O banco deve permitir a criação das seguintes tabelas:

```txt

usuarios

```

Equipe da agência.

---

```txt

propostas

```

Orçamentos enviados.

---

```txt

reunioes

```

Reuniões com clientes.

---

```txt

tarefas

```

Acompanhamento interno.

---

```txt

interacoes

```

Histórico completo de contatos com cada lead.

---

# Objetivo Final

O banco de dados deve servir como a base do futuro CRM da Dechen Web Studio, permitindo armazenar, organizar e acompanhar toda a jornada de cada cliente desde o primeiro contato até o fechamento do projeto.