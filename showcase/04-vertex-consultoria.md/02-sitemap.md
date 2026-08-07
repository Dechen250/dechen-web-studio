# Sitemap — Vertex Consultoria

**Tipo:** showcase · **Status:** ativo · **Versão:** 2.0

Estrutura de navegação e função de cada seção. Brief: [00-projeto.md](00-projeto.md). Copy: [03-copy.md](03-copy.md). Brand: [01-brand-guide.md](01-brand-guide.md).

## Objetivo

Homepage intuitiva, elegante e orientada à conversão B2B. Cada seção tem **uma função** — informação crítica em poucos scrolls.

## Estrutura geral

```
Home
├── Hero              → autoridade imediata
├── Método            → processo em 4 etapas
├── Serviços          → frentes de atuação
├── Resultados        → métricas demonstrativas + galeria
├── Sobre             → posicionamento
├── Contato           → conversão WhatsApp
└── Footer            → contato + nota demonstrativa
```

## Navbar

| Elemento | Conteúdo |
|----------|----------|
| Logo | VERTEX. (ponto em ciano) |
| Links | Método · Serviços · Resultados · Sobre · Contato |
| CTA | Falar com consultor |

Fixa no scroll. Ao rolar: fundo semi-transparente com blur e borda inferior ciano. Menu mobile: hamburger + drawer compacto.

## Hero

**Função:** autoridade, proposta e CTA em segundos.

**Layout:** tipográfico full-bleed com grade geométrica. Sem foto de stock central.

| Elemento | Fonte |
|----------|-------|
| Label | Vertex Consultoria |
| Headline | [03-copy.md](03-copy.md) — Decisões melhores. Resultados reais. |
| Apoio | Estruturação de operação, números e crescimento |
| CTA primário | Falar com consultor |
| CTA secundário | Ver o método |
| Atmosfera | Grade 64×64px ciano 6%; glow radial; quadrado decorativo (desktop) |

## Método

**Função:** apresentar processo de consultoria em grid visual.

| Elemento | Conteúdo |
|----------|----------|
| Label | Método |
| Título | Um sistema. Quatro etapas. |
| Etapas | 01 Diagnóstico · 02 Arquitetura · 03 Execução · 04 Escala |
| Layout | Grid 1→2→4 colunas; separadores verticais (desktop) |
| Interação | Fade-in up ao entrar na viewport |

Copy por etapa em [03-copy.md](03-copy.md).

## Serviços

**Função:** apresentar quatro frentes de atuação.

| Elemento | Conteúdo |
|----------|----------|
| Título | Onde a Vertex atua. |
| Categorias | Planejamento estratégico · Gestão financeira · Operações & processos · Mentoria executiva |
| Layout | Grid 2×2 com gap 1px ciano; hover em surface alternada |

## Resultados

**Função:** demonstrar impacto. **Métricas fictícias — demonstrativas.**

| Métrica | Descrição |
|---------|-----------|
| **38%** | Aumento médio de margem |
| **2.4x** | Mais previsibilidade no forecast |
| **90 dias** | Primeiros ganhos com foco em gargalos |

Galeria: 3 imagens (escritório, reunião, análise). Paths em [04-assets.md](04-assets.md).

## Sobre

**Função:** posicionamento e diferenciais.

| Elemento | Conteúdo |
|----------|----------|
| Label | Sobre |
| Título | Consultoria para quem precisa decidir. |
| Diferenciais | 3 pontos com borda ciano à esquerda |
| Endereço | Av. Brigadeiro Faria Lima, 3477 — Itaim Bibi, São Paulo — SP (**demonstrativo**) |

## Contato

**Função:** converter visitante em lead via WhatsApp.

| Elemento | Conteúdo |
|----------|----------|
| Título | Solicite um diagnóstico. |
| Campos | Nome · Empresa · Telefone/WhatsApp · Desafio atual |
| CTA | Enviar no WhatsApp |
| Alternativa | Ou fale direto no WhatsApp → |
| Contato | (11) 3045-8890 · contato@vertexconsultoria.com.br |

Templates WhatsApp em [03-copy.md](03-copy.md).

## Footer

- Logo VERTEX. + tagline: Decisões melhores. Resultados reais.
- LinkedIn: linkedin.com/company/vertexconsultoria
- WhatsApp · Telefone · Endereço
- © Vertex Consultoria. **Projeto demonstrativo.**
- Crédito Dechen Web Studio

## Jornada do visitante

```
Entrada (Hero)
    ↓ autoridade
Método
    ↓ entende o processo
Serviços
    ↓ conhece a oferta
Resultados
    ↓ valida impacto (demonstrativo)
Sobre
    ↓ contexto
Contato
    ↓ conversão WhatsApp
Footer
```

## Prioridade da informação

1. Hero — marca + CTA
2. Método — processo
3. Serviços — oferta
4. Resultados — prova (demonstrativa)
5. Contato — conversão
6. Sobre — contexto

## Regras

- Hero tipográfico; sem stock no centro; botões `rounded-none`
- Métricas rotuladas como **demonstrativas**
- Conteúdo fictício rotulado
- DoD: **parece cliente real** — ver [00-projeto.md](00-projeto.md)
