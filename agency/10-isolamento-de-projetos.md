# Isolamento de projetos

**Tipo:** ops · **Status:** ativo · **Versão:** 2.1 · **Vigência:** 28/08/2026

Cada cliente é um produto independente. Packs de brief continuam no repositório da agência; o **código do site** não.

## A regra

A partir de 28/08/2026, nenhum site de cliente compartilha repositório, `package.json`, `node_modules`, componentes, tokens, `.env` ou pipeline de deploy com outro cliente — nem com o site da Dechen Web Studio.

Dois clientes no mesmo app, na mesma pasta `clientes/` ou com import cruzado é erro de arquitetura, não atalho.

Documentação irmã: [Processo de Desenvolvimento](07-processo-desenvolvimento.md) · [DWS AI OS](04-dws-ai-operating-system.md).

## O que fica onde

| Camada | Onde | Git |
|--------|------|-----|
| Site da agência, showcases, `agency/`, `systems/` | `dechen-web-studio/` | Repo da DWS |
| Pack do cliente (brief, copy, assets de staging, roadmap) | `dechen-web-studio/clients/<n>-<slug>/` | Repo da DWS |
| **Código do site do cliente** | `E:\DechenWebStudio\<slug>/` (irmão da agência, nunca filho dela) | **Repo próprio** |
| Deploy, domínio, analytics, secrets | Só daquele cliente | — |

Showcases fictícios de portfólio **podem** viver em `dechen-web-studio/src/app/showcase/`. Cliente real **não**.

## Como abrir um cliente novo

1. Criar o pack em `dechen-web-studio/clients/` (documentação).
2. Criar a pasta do site em `E:\DechenWebStudio\<slug>` — não usar `clientes/` compartilhada.
3. `git init` (ou clonar o remoto próprio) **dentro dessa pasta**.
4. Scaffold Next.js **nessa pasta**, com `package.json` só dela.
5. No Cursor, trabalhar com root = pasta do cliente quando a tarefa for o site. O pack da agência é referência, não o app.

Nome da pasta = slug estável (ex.: `iris-prospect`, `royal-growth`, `rene-bradock`). Sem espaços, sem misturar dois marcas.

## Proibido

- Implementar site de cliente dentro de `dechen-web-studio/src`
- Colocar dois (ou mais) apps de cliente sob `E:\DechenWebStudio\clientes\`
- Importar componentes, tokens, hooks ou copy de outro cliente
- Reusar `.env`, conta Vercel, domínio ou analytics de outro projeto “só para testar”
- Tratar o Design System da DWS como visual padrão de cliente (o DS do **cliente** manda)
- Continuar um site novo copiando a pasta de outro cliente como base acoplada — clonar estrutura vazia (create-next-app) é o caminho; copiar marca/código de outro cliente não

Componentes reutilizáveis existem **dentro** do repo daquele cliente, não entre clientes.

## Segredos e dados

Cada repo tem o próprio `.env`. Nada de credencial, lead ou asset exclusivo de um cliente no repo de outro — nem no da agência, salvo staging explícito em `clients/<slug>/assets/`.

## Legado

O que já estava fora deste desenho em 28/08/2026 (ex.: implementação em `clientes/rene-bradock`) **não vira modelo**. Projeto novo segue esta regra. Migração de legado só com pedido explícito.

Royal Growth (`E:\DechenWebStudio\royal-growth`, Git próprio) é o formato correto de implementação.

## Checklist rápido (IA ou humano)

- [ ] Este código é do cliente X e só do cliente X?
- [ ] A pasta do app é irmã de `dechen-web-studio`, não filha e não `clientes/`?
- [ ] Há Git próprio (ou está claro que será inicializado neste diretório)?
- [ ] Nenhum import aponta para outro cliente?
- [ ] O pack em `clients/` não está sendo usado como app?
