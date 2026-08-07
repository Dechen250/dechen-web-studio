# Prompts — Instituto Harmonia

**Tipo:** showcase · **Status:** ativo · **Versão:** 2.0

Prompts para desenvolvimento do showcase. Antes de gerar código, ler toda a pasta:

- [00-projeto.md](00-projeto.md)
- [01-brand-guide.md](01-brand-guide.md)
- [02-sitemap.md](02-sitemap.md)
- [03-copy.md](03-copy.md)
- [04-assets.md](04-assets.md)
- [06-roadmap.md](06-roadmap.md)

Nenhuma decisão de UI ou copy deve contradizer esses documentos.

## Regras gerais (todas as fases)

1. **Hero full-bleed** — foto de ambiente com wash; sem cards sobre a imagem
2. **Marca primeiro** — Instituto Harmonia legível no hero e navbar
3. **Uma função por seção**
4. **Conteúdo demonstrativo rotulado** — clínica, equipe e contatos são ficção
5. **Tom clínico calmo** — sem overclaims médicos ou promessas absolutas
6. Copy exata de [03-copy.md](03-copy.md) — não reescrever
7. Lighthouse Performance / SEO / Best Practices ≥ 95

---

## Prompt 01 — Desenvolvimento inicial

```
Você é o desenvolvedor front-end da Dechen Web Studio.

Desenvolva o showcase Instituto Harmonia (clínica multidisciplinar fictícia)
seguindo rigorosamente os arquivos desta pasta.

Leia antes de codar:
- 00-projeto.md, 01-brand-guide.md, 02-sitemap.md, 03-copy.md, 04-assets.md

Regras de layout:
- Hero full-bleed; wash à esquerda; sem cards no hero
- Tema claro: off-white #F4F8F7 + teal #2A7A6E
- Fraunces (display) + Outfit (corpo)
- Seções: Hero → Especialidades → Equipe → Como funciona → Agendar → Local → Footer
- Formulário Nome, Telefone, Especialidade, Mensagem → WhatsApp

Evitar: #0070F3, cream+terracotta, roxo, visual frio/burocrático.
Copy sem overclaims médicos.

Stack: Next.js (App Router), React, TypeScript, Tailwind CSS.

DoD: parece cliente real; ficção rotulada no footer.
```

---

## Prompt 02 — Melhorias incrementais

```
Melhore o showcase Instituto Harmonia existente.

NÃO refaça o site do zero. Mantenha identidade visual e sitemap.

Melhorar apenas:
- UX e fluxo de agendamento
- Microinterações (hover, fade, scroll reveal — sem exagero)
- Responsividade e acessibilidade (focus, contraste, teclado)
- Performance e organização do código

Consulte 01-brand-guide.md e 04-assets.md para motion.

DoD: parece cliente real.
```

---

## Prompt 03 — Componentes

```
Extraia componentes reutilizáveis do showcase Instituto Harmonia.

Seguir tokens de 01-brand-guide.md e anatomia de 04-assets.md.

Componentes esperados:
- Navbar (fixa, logo, links, CTA Agendar consulta)
- Hero (full-bleed, wash, sem cards)
- Specialties (grid 6 especialidades)
- Team (3 profissionais fictícios)
- HowItWorks (3 passos)
- Appointment (form → WhatsApp)
- Location (endereço, horários, galeria)
- Footer (nota demonstrativa)

Estados: default, hover, focus, disabled.
Não instalar bibliotecas sem necessidade.
```

---

## Prompt 04 — Animações

```
Adicione motion ao showcase Instituto Harmonia.

Referência: 04-assets.md (Motion).

Permitido:
- Hover em botões (200–300ms, ease-out)
- Fade in no scroll (Intersection Observer)
- Wash e gradiente no hero

Proibido:
- Parallax pesado, bounce, shake
- Animações agressivas ou que atrasem leitura
- Cards animados no hero

Toda animação deve transmitir calma e sofisticação.
```

---

## Prompt 05 — Responsividade

```
Revise responsividade completa do showcase Instituto Harmonia.

Breakpoints: mobile (~390px), tablet (768px), desktop (≥1280px).

Verificar:
- Hero full-bleed legível em todas as larguras
- Navbar → menu mobile funcional
- CTAs tocáveis (min 44px)
- Formulário de agendamento usável no mobile
- Grid de especialidades adaptável
- Nenhum overflow horizontal
```

---

## Prompt 06 — Performance e SEO

```
Audite performance e SEO do showcase Instituto Harmonia.

Metas: Lighthouse Performance, SEO, Best Practices ≥ 95.

Verificar:
- Meta title e description de 03-copy.md
- OG tags e favicon
- Imagens: lazy load, priority no hero
- HTML semântico (header, main, section, footer)
- Alt text em todas as imagens
- Footer: "Projeto demonstrativo."
```

---

## Contato demonstrativo

| Canal | Valor |
|-------|-------|
| Telefone | (11) 3088-4410 |
| WhatsApp | 551130884410 |
| E-mail | contato@institutoharmonia.com.br |
| Endereço | Rua Oscar Freire, 742 — Jardins, São Paulo — SP |

Assets: `public/showcase/instituto-harmonia/{capa,ambiente,equipe}`

## Checklist antes de entregar

- [ ] Documentação da pasta lida e respeitada
- [ ] Hero full-bleed; sem cards no hero
- [ ] Demonstrativos rotulados; copy sem overclaims
- [ ] Responsivo e Lighthouse ≥ 95
- [ ] **Parece cliente real**
