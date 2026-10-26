# Assets — NN Estética e Beleza

**Tipo:** assets · **Status:** aguardando lead · **Versão:** 0.1

Pack: [00-projeto.md](00-projeto.md) · [02-sitemap.md](02-sitemap.md) · [03-copy.md](03-copy.md) · [05-brand-guide.md](05-brand-guide.md) · Staging: [assets/README.md](assets/README.md)

## Objetivo

Listar o que o site precisa para sair do planejamento. Nenhum arquivo entra no ar sem pasta, nome claro e direito de uso.

## Staging neste repositório

```text
clients/04-nn-estetica-beleza/assets/
├── README.md
├── _inbox/          ← originais da lead
├── brand/
├── home/
├── tratamentos/
├── espaco/
├── equipe/
└── social-proof/
```

Destino futuro (repo do site, fora deste monorepo): `public/`.

## Estilo fotográfico desejado

| Atributo | Direção |
|----------|---------|
| Luz | Natural ou suave, pele verdadeira |
| Tom | Quente-neutro (pele, tecido, consultório) — não teal hospitalar |
| Composição | Hero horizontal; equipe em retrato; espaço em ambiente |
| Tratamento | Pouca edição; sem filtro “clínica de Instagram” pesado |

Evitar: banco de imagem no hero, HDR, antes/depois sem autorização, fotos de alisamento do salão.

## Hero

Prioridade: foto real do consultório ou da Dra. Natany em contexto de atendimento (autorizada).

Fallback aceitável no preview interno: atmosfera tipográfica com paleta da hipótese de marca — **não** no site publicado para a lead.

Checklist:

- [ ] Resolução ≥ 1920×1080
- [ ] Espaço para wash/gradiente e texto legível
- [ ] Sem logo de terceiros na cena

## Por seção

### Brand

- Logo SVG + PNG (claro / escuro / símbolo)
- Favicon
- Paleta oficial ou print do Instagram highlighting cores
- Tipografia se houver manual

### Home

- `hero.webp`
- `sobre.webp` (opcional se o hero já for retrato)

### Tratamentos

Uma imagem por pilar, só se for foto real do cuidado ou detalhe de pele/ambiente — sem “resultado” enganoso:

- `emagrecimento.webp`
- `harmonizacao.webp`
- `estrias.webp`

Ícones outline se a foto não existir.

### Espaço

3–6 fotos: recepção, sala de procedimento, detalhe (luz, macas, acolhimento). Nomes:

```text
espaco-01-recepcao.webp
espaco-02-sala.webp
…
```

### Equipe

Uma foto por profissional, fundo simples, autorização de uso no site (não só no Instagram).

### Social proof

Depoimentos **autorizados por escrito**. Prints de Direct só com consentimento. Antes/depois: termo específico; se não houver, a seção não existe.

## Pendentes (pedir na descoberta)

- [ ] Logo
- [ ] Cores oficiais
- [ ] Fotos do espaço
- [ ] Fotos das profissionais
- [ ] Autorização de depoimentos
- [ ] Autorização de antes/depois (se quiserem no site)
- [ ] Número de WhatsApp e e-mail
- [ ] Endereço para mapa
- [ ] Conselho/número para o rodapé
- [ ] CNPJ se for no footer

## Nomenclatura

Minúsculas, hífen, sem acento. Sem `IMG_1234`. Originais podem ficar em `_inbox/`.

## Regras

- Não usar foto do NN Liso Perfeito como se fosse a clínica
- Não inventar paciente, resultado ou ambiente
- Preview interno pode marcar placeholder; produção não
- Direitos: Instagram visível ≠ autorização para o site
