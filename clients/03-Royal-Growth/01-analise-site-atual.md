# Análise do Site Atual — Royal Growth

**Tipo:** diagnóstico · **Status:** legado documentado · **Versão:** 2.0

Pack: [00-projeto.md](00-projeto.md) · [02-sitemap.md](02-sitemap.md) · [03-copy.md](03-copy.md) · [04-assets.md](04-assets.md) · [05-design-system.md](05-design-system.md) · [06-roadmap.md](06-roadmap.md)

**URL:** [https://royalgrowth.com.br/](https://royalgrowth.com.br/)  
**Data da análise:** 28/07/2026

## Objetivo

Registrar o diagnóstico do site legado (WordPress vigente). Este arquivo **não** define o novo site.

> **Atualização:** o esboço do cliente em `SITE 2026/` definiu posicionamento, sitemap, copy e direção visual (azul royal, tom maduro, CTA “Solicitar diagnóstico”). A fonte da verdade do novo site é `00-projeto.md` + `02-sitemap.md` + `03-copy.md` + `05-design-system.md`. Em conflito, **`SITE 2026/` prevalece**. Refinamentos do esboço são tratados em outro fluxo (pasta `SITE 2026/`).

## Veredito

O site tem **personalidade e posicionamento fortes**, mas funciona mais como **manifesto** do que como **ferramenta de conversão**. O discurso de resultado é intenso; a prova e a clareza da oferta ainda são fracas.

## O que já funciona

| Ponto | Observação |
|-------|------------|
| Identidade | Logo com leão, nome Royal Growth, visual dark + verde menta |
| Tom de voz | Memorável, confrontador, anti-agência genérica |
| CTA único | “Falar com um assessor” aparece de forma consistente |
| Longevidade | Desde 2011 — ativo de confiança pouco explorado |
| Cases (início) | Cards com métricas (ex.: SBIE +500%, School of Healing, CEAGESP) |
| Parceiros | Badge de parceiro (ex.: Google Partner) no header |
| Método | “Método Growth” em 7 etapas citado em Soluções |

## Estrutura observada

### Páginas

| Página | URL (observada) | Conteúdo principal |
|--------|-----------------|--------------------|
| Início | `/` | Hero + manifesto longo + cards de resultado + Quem Somos |
| Soluções | `/solucoes/` | Método Growth, discurso anti-servicinhos, menção a lançamentos/infoprodutos |
| Sobre Nós | `/sobre-nos/` | Posicionamento “não somos agência”, história desde 2011 |
| Contato | `/contato/` | Formulário (Nome, E-mail, WhatsApp, Mensagem) |
| CTA intermediária | `/verdadeiro-marketing/` | Destino de “Falar com um assessor” |

### Homepage — fluxo de mensagem

1. Hero: **ROYAL GROWTH** + “Assessoria de Marketing Dedicada a Acelerar Negócios”
2. “Você não precisa de uma **AGÊNCIA** de marketing”
3. Bloco tipográfico forte em torno de **MARKETING** / investimento
4. Cards de resultados (percentuais)
5. Frases de confronto (“marketing de verdade”, anti-promessa vazia)
6. Gráficos decorativos de crescimento
7. “A verdade nua e crua” / compromisso com resultados
8. Quem Somos + reforço de missão desde 2011
9. CTA final

## Diagnóstico por área

### 1. Conteúdo e conversão

**Problema:** muito discurso, pouca decisão.

- A mesma ideia se repete: marketing ≠ gasto, charlatões, resultado, não prometemos.
- Visitante entende a **atitude**, mas não o **produto**.
- CTA leva a uma jornada pouco clara (página intermediária vs. contato direto).
- Formulário de contato com typo: **“Messagem”**.

**Melhoria:** enxugar manifesto → problema → prova → método → CTA. Uma ideia por seção.

### 2. Prova social

**Problema:** números sem contexto.

- Cards com percentuais grandes (+500%, 21.328%, 50%) sem explicar baseline, canal, prazo ou narrativa.
- Sem depoimentos com nome, foto ou cargo.
- Sem cases em página própria.
- Sem vídeo ou antes/depois estruturado.

**Melhoria:** cases com história curta (desafio → ação → resultado). Autorização do cliente obrigatória. No novo site, ver lista em `02-sitemap.md` e textos em `03-copy.md`.

### 3. Oferta / Soluções

**Problema:** Método Growth existe no texto, mas não na experiência.

- “7 etapas” mencionadas sem visualização sequencial.
- Lista de serviços ambígua (“temos todos esses e mais… mas isso é irrelevante”).
- Bom para postura; ruim para quem precisa saber **o que está comprando**.

**Melhoria:** página Sistema com fluxo operacional, etapas e critérios de fit — conforme `SITE 2026/`.

### 4. Visual e UX

**Problema:** estilo premium dark, porém barulhento.

- Tipografia outline, glow, blur no scroll, linhas tracejadas vermelhas.
- Header carregado (nav + logo central + badges + CTA).
- Hierarquia tipográfica compete consigo mesma.
- Dark mode total: exige contraste e legibilidade mais cuidadosos.

**Melhoria:** menos efeito, mais composição; hero limpo; prova cedo; tipografia legível em mobile. Nova direção: azul royal (`05-design-system.md`).

### 5. Confiança e operação

**Problema:** ativos de confiança subexplorados.

- Desde 2011 aparece tarde / de forma genérica.
- CNPJ no footer (bom), mas equipe, processo e critérios de fit ausentes.
- Sem FAQ ou objeções típicas.

### 6. Técnico

- Stack aparente: WordPress.
- SEO on-page básico existe (títulos por página).
- Animações/efeitos podem prejudicar performance e acessibilidade.
- Mobile: CTA e nav precisam ser prioridade (site de assessoria vende no celular).

## Oportunidades priorizadas

| Prioridade | Melhoria | Por quê |
|------------|----------|---------|
| Alta | Cases com narrativa + prova real | Sustenta o discurso de resultado |
| Alta | Sistema / método claros | Remove dúvida “o que eu compro?” |
| Alta | Hero direto (problema → promessa → CTA) | Acelera compreensão e conversão |
| Média | Design mais limpo e tipografia legível | Moderniza sem perder marca |
| Média | Processo + “como é trabalhar conosco” | Qualifica o lead e reduz atrito |
| Média | Contato polido + WhatsApp evidente | Fecha o funil |
| Baixa | Blog / conteúdo / SEO de inbound | Autoridade contínua (fase 2) |

## Tom de voz — decisão estratégica

O tom atual é um **diferencial** e um **risco**:

- **A favor:** marca memorável, corta ruído, atrai quem já está frustrado com agência.
- **Contra:** pode afastar públicos mais corporativos; cansa se repetido em toda a página.

**Decisão (SITE 2026):** tom maduro, preciso, anti-jargão — sem confronto performático do legado.

## O que preservar (hipótese — site antigo)

Até o cliente dizer o contrário, no legado valia preservar:

- Nome e símbolo do leão
- Posicionamento assessoria / crescimento / resultado
- CTA “Falar com um assessor” (substituído por **Solicitar diagnóstico** no novo site)
- Método Growth (conteúdo a esclarecer → virou **Sistema**)
- Referência a 2011 e prova de parceiros
- Personalidade da marca (calibrada no novo tom)

## O que evoluir

- Densidade e repetição de copy
- Efeitos visuais excessivos
- Prova social superficial
- Clareza de oferta
- Funil pós-CTA
- Estrutura de páginas (menos manifesto, mais decisão)

## Próximo passo

Usar este diagnóstico como referência histórica. Implementação segue `02-sitemap.md`, `03-copy.md` e `05-design-system.md`, com precedência de `SITE 2026/` em conflitos de conteúdo.
