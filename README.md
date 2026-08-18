# Dechen Web Studio

**Tipo:** ops · **Status:** ativo · **Versão:** 2.0

Monorepo da Dechen Web Studio: site institucional, showcases de portfólio, documentação operacional da agência e packs de projetos de clientes.

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

Auditoria técnica de um site (Chrome headless, relatório em `reports/`):

```bash
npm run audit -- dechenwebstudio.com.br
```

Rascunho da reunião de Descoberta (fatos do lead + HTML do site):

```bash
npm run discovery -- --name "Maria" --email maria@exemplo.com --whatsapp 11999999999 --company "Exemplo" --website dechenwebstudio.com.br
```

Para ver os agentes no console interno — auditoria com tela do Chrome, Descoberta e histórico — rode `npm run dev` e abra [http://localhost:3000/ops](http://localhost:3000/ops). A auditoria pública (PageSpeed, sem Chrome) está em [http://localhost:3000/auditoria](http://localhost:3000/auditoria).

Detalhes em [`systems/site-audit/`](systems/site-audit/00-visao.md) e [`systems/discovery/`](systems/discovery/00-visao.md).

## Mapa do repositório

| Pasta | Função |
|-------|--------|
| [`agency/`](agency/00-index.md) | Sistema operacional da agência (estratégia, marca, produto, comercial, operação) |
| [`systems/`](systems/client-acquisition/00-visao.md) | Captação de leads, processo comercial, [auditoria técnica](systems/site-audit/00-visao.md) e [preparador de Descoberta](systems/discovery/00-visao.md) |
| [`clients/`](clients/01-vitta-serena/00-projeto.md) | Packs de clientes reais (brief, copy, assets, roadmap) |
| [`showcase/`](showcase/01-divina-cozinha.md/00-projeto.md) | Packs de projetos fictícios de portfólio |
| [`templates/showcase-template/`](templates/showcase-template/00-projeto.md) | Template em branco para novos showcases |
| `src/` | Código da aplicação (páginas, componentes, dados) |
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

1. Leia o Manual e o DWS AI OS antes de mudanças estruturais.
2. Para projeto novo de cliente ou showcase, copie `templates/showcase-template/` (ou o pack de cliente mais próximo).
3. Não preencha placeholders comerciais com dados inventados.
