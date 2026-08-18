# Auditoria técnica — www.dechenwebstudio.com.br

**Tipo:** auditoria · **Status:** exemplo real gerado pela ferramenta · **Versão:** 1.0

| Campo | Valor |
|-------|-------|
| URL auditada | https://dechenwebstudio.com.br/ |
| URL final | https://www.dechenwebstudio.com.br/ |
| Dispositivo simulado | Celular (rede móvel simulada) |
| Data da medição | 17/08/2026, 21:05 |
| Ferramenta | Lighthouse 12.8.2 |
| Situação geral | Atenção |

## Resumo

Performance 88/100 em celular, métricas de carregamento dentro do alvo, nenhuma falha crítica de fundação.

| Categoria | Nota | Situação |
|-----------|------|----------|
| Performance | 88/100 | Atenção |
| Acessibilidade | 96/100 | OK |
| Boas práticas | 100/100 | OK |
| SEO técnico | 92/100 | OK |

Peso da página: 276 KB em 18 requisições.

## Velocidade percebida

| Métrica | Resultado | Alvo | Situação |
|---------|-----------|------|----------|
| LCP — maior elemento visível | 3,4 s | até 2,5 s | Atenção |
| CLS — estabilidade visual | 0 | até 0,1 | OK |
| TBT — bloqueio de interação | 70 ms | até 200 ms | OK |
| FCP — primeiro conteúdo | 2,4 s | até 1,8 s | Atenção |
| Speed Index — velocidade percebida | 2,4 s | até 3,4 s | OK |

## Checagens de fundação

| Item | Situação | Observação |
|------|----------|------------|
| Resposta do servidor | OK | HTTP 200. |
| HTTPS | OK | Responde em HTTPS e o HTTP redireciona para a versão segura. |
| Viewport mobile | OK | width=device-width, initial-scale=1 |
| Título da página | OK | 54 caracteres: "Dechen Web Studio \| Sites premium para negócios locais". |
| Meta description | OK | 157 caracteres. |
| Prévia de link (Open Graph) | Atenção | Só og:title, og:description presente(s). |
| Título principal (H1) | OK | Exatamente um H1. |
| Idioma declarado | OK | lang="pt-BR". |
| Texto alternativo em imagens | OK | Todas as 4 imagens têm alt. |
| Canal de contato direto | OK | WhatsApp, formulário. |
| Medição instalada | Atenção | Nenhum Analytics ou Pixel detectado. |
| Favicon | OK | Declarado no HTML. |
| robots.txt e sitemap.xml | Atenção | Ausente(s): sitemap.xml. |

### Impacto de negócio dos achados

- **Prévia de link (Open Graph):** Sem essas tags o link colado no WhatsApp e no Instagram aparece sem imagem nem descrição.
- **Medição instalada:** Sem medição não há como provar retorno nem saber de onde vem o cliente.
- **robots.txt e sitemap.xml:** Orientam o Google sobre o que rastrear e indexar.

## Oportunidades de carregamento

| Oportunidade | Ganho estimado |
|--------------|----------------|
| Evite redirecionamentos múltiplos de página | 847 ms |
| Reduza o JavaScript não usado | 300 ms · 51 KB |
| Evitar a exibição de JavaScript legado em navegadores modernos | 14 KB |

## Prioridades sugeridas

1. **Evite redirecionamentos múltiplos de página** — ganho estimado de 847 ms no carregamento.
2. **Prévia de link (Open Graph)** — Só og:title, og:description presente(s).
3. **Medição instalada** — Nenhum Analytics ou Pixel detectado.
4. **robots.txt e sitemap.xml** — Ausente(s): sitemap.xml.

## Limites deste relatório

- Medição de laboratório: um carregamento, uma página, rede simulada. Números variam entre execuções.
- Avalia fundação técnica. Não avalia qualidade de copy, design, oferta ou conversão real.
- Detecção de tags e canais de contato é heurística, feita sobre o HTML inicial.
- Insumo para a etapa de Diagnóstico do funil comercial — não substitui a análise humana.
