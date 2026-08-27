# Sitemap — NN Estética e Beleza

**Tipo:** sitemap · **Status:** lead / planejamento · **Versão:** 0.1

Pack: [00-projeto.md](00-projeto.md) · [03-copy.md](03-copy.md) · [05-brand-guide.md](05-brand-guide.md)

## Objetivo

Uma homepage que, no celular, responde em poucos scrolls: quem são, o que fazem, como agendar. Cada seção tem **uma função**. Conversão única: WhatsApp.

## Estrutura geral

```text
Home (one-page)
├── Navbar
├── Hero
├── Tratamentos
├── Sobre / profissionais
├── Como funciona
├── Espaço (se houver fotos)
├── FAQ
├── Local e horários
├── CTA final
└── Footer
```

Fase 2 (fora do MVP): `/tratamentos/[slug]`, `/privacidade`, blog.

## URL

```text
https://[domínio]/ 
```

Slug de âncoras:

```text
#tratamentos
#sobre
#como-funciona
#espaco
#faq
#local
#agendar
```

## Navbar

| Elemento | Conteúdo |
|----------|----------|
| Logo | NN Estética e Beleza (símbolo + nome, ou nome se não houver logo) |
| Links | Tratamentos · Sobre · Como funciona · Local |
| CTA | Agendar avaliação |

Fixa no scroll. Contraste sobre o hero. Menu compacto no mobile.

## Hero

**Função:** marca + proposta + CTA em segundos.

**Layout:** full-bleed. Sem cards sobre a mídia.

| Elemento | Fonte |
|----------|-------|
| Eyebrow | São Bernardo do Campo · Estética |
| Headline | [03-copy.md](03-copy.md) |
| Apoio | Três pilares da bio, sem inventar procedimento |
| CTA primário | Agendar avaliação |
| CTA secundário | Ver tratamentos |
| Mídia | Foto real do espaço ou da profissional — [04-assets.md](04-assets.md) |

## Tratamentos

**Função:** oferta principal com hierarquia. Vem **antes** de Sobre: quem chega pelo Instagram já conhece o rosto; precisa ver o que pode agendar.

Três categorias oficiais (bio):

1. Emagrecimento
2. Harmonização facial e corporal
3. Estrias

Cada card: nome + 1–2 frases de benefício responsável + CTA “Falar no WhatsApp” (mesmo destino, com procedimento no texto da mensagem).

Subprocedimentos só com lista confirmada. Sem preços no ar até autorização.

## Sobre / profissionais

**Função:** humanizar e credenciar.

- Parágrafo curto da clínica
- Card por profissional confirmada (foto, nome, conselho/número, uma frase)
- Dra. Natany e Dra. Haiana: incluir só com dados conferidos
- Terceira profissional: só se a descoberta confirmar

Sem biografia inventada. Se faltar conselho, o card espera — não publica “Dra.” solto.

## Como funciona

**Função:** reduzir medo da primeira visita.

Três passos (rascunho):

1. Agende a avaliação no WhatsApp
2. Conversa e indicação individual
3. Acompanhamento do protocolo

Não prometer “sem espera” nem resultado na sessão.

## Espaço

**Função:** prova visual. O visitante vê o lugar, não só o feed.

3–6 fotos reais do ambiente. Se não houver asset autorizado, **omitir a seção** no lançamento — não preencher com stock.

## FAQ

**Função:** objeções antes do WhatsApp.

Perguntas previstas (respostas só com aprovação):

- Preciso de avaliação antes do procedimento?
- Os protocolos são iguais para todo mundo?
- Onde fica a clínica e como chegar?
- Como agendo?
- Vocês atendem só em São Bernardo?

Não responder duração, preço, “quantos quilos” ou risco clínico sem texto da lead.

## Local e horários

**Função:** visita presencial.

- Endereço: `[endereço — confirmar]`
- Horário: `[horários — confirmar]`
- WhatsApp: `[número — confirmar]`
- Mapa: embed só com endereço confirmado

Não usar loja 10 / telefone do NN Liso Perfeito.

## CTA final

**Função:** última chance de agendar.

Headline curta + botão WhatsApp + menção de que a avaliação é o primeiro passo.

## Footer

- Nome da marca
- Links das âncoras
- Instagram `@nnestetica.beleza`
- WhatsApp
- Conselho(s) quando existirem
- Aviso: procedimentos estéticos sujeitos a avaliação individual; resultados variam
- Crédito discreto Dechen Web Studio, se a lead aprovar
- © ano · NN Estética e Beleza

Páginas legais (`/privacidade`) na fase 2, ou bloco curto no footer no MVP se houver CNPJ.

## Jornada principal

```text
Instagram ou Google
    ↓
Hero (reconhece a marca)
    ↓
Tratamentos (escolhe o motivo)
    ↓
Sobre (confia nas profissionais)
    ↓
FAQ / Local (tira dúvida)
    ↓
WhatsApp (agenda)
```

## Prioridade no scroll (mobile)

1. Hero + CTA
2. Tratamentos
3. CTA WhatsApp (repete no navbar)
4. Sobre
5. Como funciona
6. Espaço
7. FAQ
8. Local
9. CTA final

## Regras

- Nenhuma informação crítica a mais de dois toques
- Hero full-bleed; sem cards no hero
- Uma função por seção
- Seção sem conteúdo real = não renderiza
- WhatsApp acessível no navbar sem cobrir o texto (FAB só se não esconder conteúdo)
