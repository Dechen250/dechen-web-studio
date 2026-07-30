# Prompts — Barbearia Royal

## Objetivo

Este documento reúne os prompts utilizados durante o desenvolvimento do projeto Barbearia Royal.

Todos os prompts devem seguir rigorosamente a documentação existente nesta pasta.

Antes de gerar qualquer código, a IA deve obrigatoriamente ler:

- [00-projeto.md](http://00-projeto.md)

- [01-brand-guide.md](http://01-brand-guide.md)

- [02-sitemap.md](http://02-sitemap.md)

- [03-copy.md](http://03-copy.md)

- [04-assets.md](http://04-assets.md)

Nenhuma decisão deve contrariar esses documentos.

---

# Prompt 01 — Desenvolvimento Inicial

Você é o Lead Product Designer e Front-end Engineer da Dechen Web Studio.

Sua missão é desenvolver o projeto Barbearia Royal seguindo rigorosamente toda a documentação desta pasta.

Objetivo:

Criar um site premium para uma barbearia de alto padrão.

O resultado deve parecer um projeto entregue para um cliente real.

Diretrizes obrigatórias:

- Tema escuro (#0C0A09) com dourado (#C4A35A) — nunca tema claro
- Hero atmosférico abstrato (grain + círculos geométricos dourados) — sem foto hero
- Tipografia: Playfair Display (display) + DM Sans (corpo)
- Seções: Hero → Diferenciais → Serviços → Experiência → Depoimentos → Galeria → FinalCTA → Footer
- Nav: Diferenciais, Serviços, Experiência, Depoimentos, Ambiente
- CTA principal: Agendar horário
- Dados centralizados em `src/data/barbearia-royal.ts`
- Componentes em `src/components/barbearia-royal/`
- CSS scoped em `barbearia-royal.css` com tokens `--br-*`

Prioridades:

- Experiência do usuário

- Performance

- Sofisticação masculina

- Responsividade

- Código limpo

Nunca alterar a identidade da marca.

---

# Prompt 02 — Melhorias

Sua missão é melhorar o projeto existente.

Não refaça o site.

Mantenha toda a identidade visual escura e dourada.

Melhore apenas:

- UX

- Performance

- Microinterações

- Responsividade

- Organização do código

- Acessibilidade

Evite alterações desnecessárias.

Nunca introduza tema claro ou foto hero.

---

# Prompt 03 — Componentes

Crie componentes reutilizáveis para o projeto.

Seguir toda a documentação.

Componentes esperados:

- Navbar (fixa, scroll-aware, menu mobile)
- Hero (atmosfera abstrata)
- Differentials (grid 4 cards)
- Services (grid 6 cards com preços)
- Experience (timeline 4 etapas)
- Testimonials (3 blockquotes)
- Gallery (4 imagens com overlay)
- FinalCTA (agendamento demonstrativo)
- Footer (contato + créditos Dechen)
- UI: Button, SectionHeading, FadeIn

Priorizar:

- Legibilidade

- Reutilização

- Organização

- Tokens CSS `--br-*`

Não instalar bibliotecas sem necessidade.

---

# Prompt 04 — Animações

Adicionar microinterações elegantes.

Nunca exagerar.

Priorizar:

- fadeInUp no scroll/entrada

- Hover suave em cards (border, background)

- Scale 1.05 em imagens da galeria

- Transições de 300–700ms

- Navbar com transição de estado no scroll

Toda animação deve parecer sofisticada e controlada.

Respeitar `prefers-reduced-motion`.

Nunca utilizar animações agressivas, bounce ou parallax pesado.

---

# Prompt 05 — Responsividade

Revisar completamente a responsividade.

Garantir excelente experiência em:

- Desktop (max-w-6xl)

- Notebook

- Tablet

- Smartphone

Pontos críticos:

- Menu hamburger funcional no mobile

- Grid de serviços: 3 → 2 → 1 colunas

- Grid de diferenciais: 4 → 2 → 1 colunas

- Galeria: primeira imagem full-width, demais 2 colunas

- Hero legível em telas pequenas (text-4xl → text-6xl)

Nenhum componente deve quebrar.

---

# Prompt 06 — Performance e SEO

Revisar o projeto buscando:

- Performance

- SEO

- Acessibilidade

- Código limpo

Implementar:

- Metadata (title, description, Open Graph)

- Schema.org HairSalon (JSON-LD)

- Imagens otimizadas (WebP onde possível)

- `prefers-reduced-motion`

- aria-labels em links externos

- Focus visible nos botões

Eliminar código duplicado.

Melhorar organização sempre que possível.

---

# Prompt 07 — Documentação Retroativa

Este prompt foi utilizado para criar a documentação deste projeto após o site já ter sido entregue.

Objetivo:

Escrever os 7 arquivos do docs pack seguindo o template oficial Dechen (referência: Divina Cozinha).

Requisitos:

- Extrair copy, estrutura e tokens do código implementado
- Marcar docs structure + v1.0 como concluídos no roadmap
- Profundidade equivalente à Divina Cozinha
- Sem placeholders
- Refletir fielmente o site shipped

Arquivos:

- 00-projeto.md
- 01-brand-guide.md
- 02-sitemap.md
- 03-copy.md
- 04-assets.md
- 05-prompts.md
- 06-roadmap.md

---

# Regras Gerais

Sempre seguir a documentação.

Nunca criar elementos que contrariem a identidade da marca.

Nunca utilizar tema claro.

Nunca utilizar foto hero — hero é atmosfera abstrata.

Toda melhoria deve aumentar a percepção de qualidade do projeto.

A experiência do usuário deve ter prioridade sobre efeitos visuais.

O objetivo é criar um projeto que possa ser apresentado como um case real da Dechen Web Studio no segmento de beleza masculina premium.
