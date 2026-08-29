# Dechen Web Studio

**Tipo:** ops · **Status:** ativo · **Versão:** 2.1

Monorepo da Dechen Web Studio: site institucional, showcases de portfólio, documentação operacional da agência e **packs** (não o código) de projetos de clientes.

O site de cada cliente real vive em repositório **próprio**, irmão desta pasta. Regra: [`agency/10-isolamento-de-projetos.md`](agency/10-isolamento-de-projetos.md).

Não criamos apenas sites. Criamos presença digital que transmite confiança, autoridade e converte visitantes em oportunidades.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4

## Como rodar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Outros scripts: `npm run build`, `npm run start`, `npm run lint`.

## Mapa do repositório

| Pasta | Função |
|-------|--------|
| [`agency/`](agency/00-index.md) | Sistema operacional da agência (estratégia, marca, produto, comercial, operação) |
| [`systems/`](systems/client-acquisition/00-visao.md) | Captação de leads e processo comercial detalhado |
| [`clients/`](clients/01-vitta-serena/00-projeto.md) | Packs de clientes reais (brief, copy, assets, roadmap) — **não** o app |
| [`showcase/`](showcase/01-divina-cozinha.md/00-projeto.md) | Packs de projetos fictícios de portfólio |
| [`templates/showcase-template/`](templates/showcase-template/00-projeto.md) | Template em branco para novos showcases |
| `src/` | Código do site da **agência** e rotas `/showcase/...` |
| `public/` | Assets estáticos (imagens de showcase, etc.) |

## Documentação

Comece por [`agency/00-index.md`](agency/00-index.md).

Padrão editorial dos Markdown:

- Cabeçalho com tipo, status e versão
- Um `#` por arquivo; hierarquia real com `##` / `###`
- PT-BR
- Fatos comerciais e IDs legais não se inventam
- Showcases marcam conteúdo demonstrativo; clientes usam `[placeholders]` até confirmação

## Showcases no app

Rotas típicas sob `/showcase/...` (ex.: Divina Cozinha, Barbearia Royal). Os packs em `showcase/` são a fonte de brief e copy; o código vive em `src/`.

## Contribuição

1. Leia o Manual, o DWS AI OS e o [isolamento de projetos](agency/10-isolamento-de-projetos.md) antes de mudanças estruturais.
2. Para projeto novo de cliente: pack em `clients/`; código em `E:\DechenWebStudio\<slug>` com Git próprio. Para showcase, copie `templates/showcase-template/`.
3. Não preencha placeholders comerciais com dados inventados.
4. Não implemente site de cliente neste monorepo nem em pasta compartilhada com outro cliente.
