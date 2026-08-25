# Auditoria Técnica de Site

**Tipo:** Visão do sistema · **Status:** ativo · **Versão:** 1.1

## Objetivo

Medir a fundação técnica de um site — velocidade, acessibilidade, SEO técnico e pontos de conversão — e devolver um relatório em Markdown pronto para virar insumo da etapa de [Diagnóstico](../sales/03-diagnostico.md) do funil comercial.

Serve para dois usos: qualificar prospect antes da reunião e verificar site de cliente antes e depois da [Entrega](../sales/06-entrega.md).

## Documentação relacionada

| Documento | Conteúdo |
|-----------|----------|
| [01-uso.md](./01-uso.md) | Comandos, opções e saída |
| [exemplo-relatorio.md](./exemplo-relatorio.md) | Relatório real gerado pela ferramenta |
| [Preparador de Descoberta](../discovery/00-visao.md) | Rascunho da reunião a partir do lead + site |
| [Diagnóstico](../sales/03-diagnostico.md) | Etapa do funil que consome o relatório |

## Fluxo geral

```
URL → verificação de acesso (DNS, TLS) → Lighthouse (console/CLI) ou PageSpeed Insights (público) + checagens de HTML → relatório
```

Duas superfícies internas e uma pública:

- **Console web** em `/ops/audit`: Lighthouse com Chrome no servidor, tela ao vivo, log e relatório. Protegido por `OPS_SECRET` em produção.
- **CLI** `npm run audit -- <url>`: mesma medição, saída em Markdown na pasta `reports/`.
- **Auditoria pública** em `/auditoria`: PageSpeed Insights API + checagens de HTML, sem Chrome no pedido do visitante. O site da DWS hospeda isso na VPS ([hospedagem](../hosting/00-vps.md)).

A verificação de acesso vem antes de propósito. Se o domínio não resolve ou o certificado é inválido, o navegador nem carrega a página: medir performance seria irreal, e o achado relevante já é o próprio bloqueio. Nesse caso o relatório sai como **bloqueado**, com a evidência técnica e a prioridade zero.

## O que é medido

| Bloco | Origem | Conteúdo |
|-------|--------|----------|
| Notas por categoria | Lighthouse | Performance, acessibilidade, boas práticas, SEO técnico |
| Velocidade percebida | Lighthouse | LCP, CLS, TBT, FCP, Speed Index contra os alvos de Core Web Vitals |
| Oportunidades | Lighthouse | Ganhos estimados de carregamento, em tempo e em bytes |
| Fundação | Checagens próprias | HTTPS e redirecionamento, viewport, título, meta description, Open Graph, H1, idioma, alt de imagens, canal de contato, medição instalada, favicon, robots.txt e sitemap.xml |

As checagens próprias existem para cobrir o que decide venda e não aparece em nota do Lighthouse: se o link colado no WhatsApp mostra prévia, se há WhatsApp ou telefone clicável na página, e se existe alguma medição instalada.

## Princípios

### Fato antes de opinião

O relatório mostra o que foi medido e o alvo de referência. Não estima receita perdida, não inventa percentual de abandono e não cita dado de mercado que a ferramenta não mediu.

### Linguagem de dono de negócio

Cada achado relevante carrega uma frase de impacto real ("sem essas tags o link no WhatsApp aparece sem imagem"), não só o nome técnico do problema.

### Reprodutibilidade

Chrome headless com rede simulada, sempre nas mesmas condições. Duas execuções do mesmo site são comparáveis entre si — dentro da variação natural de laboratório.

### Honestidade sobre o alcance

O relatório declara os próprios limites: uma página, um carregamento, fundação técnica. Não avalia copy, oferta, design nem conversão real.

## Limites conhecidos

- Audita uma URL por execução, não o site inteiro.
- Medição de laboratório: os números variam entre execuções e não são dados de usuários reais.
- Detecção de tags, canais de contato e scripts de medição é heurística, feita sobre o HTML inicial. Conteúdo inserido só depois por JavaScript pode não ser detectado.
- Não substitui a análise humana do Diagnóstico.

## Evolução planejada

| Etapa | Escopo |
|-------|--------|
| 1.1 | Auditar várias URLs numa execução e comparar com a medição anterior |
| 1.2 | Execução agendada nos sites de clientes ativos, avisando quando algo regride |
| 2.0 | `/auditoria` pública via PageSpeed Insights — feito |

## Resultado esperado

Diagnóstico técnico defensável em minutos, sem depender de leitura manual de painel, e material concreto para mostrar ao prospect qual é o problema antes de falar de preço.
