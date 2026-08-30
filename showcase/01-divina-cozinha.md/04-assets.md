**Tipo:** ops · **Status:** ativo · **Versão:** 3.0

> Referências visuais e tokens do showcase Divina Cozinha — alinhados ao código em `src/`.

# Divina Cozinha — Assets

Pack: [00-projeto.md](00-projeto.md) · [01-brand-guide.md](01-brand-guide.md) · [03-copy.md](03-copy.md) · [05-prompts.md](05-prompts.md)

## Tokens de cor

Definidos em `src/app/showcase/divina-cozinha/divina-cozinha.css`:

| Token | Valor | Uso |
|-------|-------|-----|
| `--dc-bg` | `#FAF9F6` | Fundo principal |
| `--dc-rose` | `#E11D48` | Acento |
| `--dc-black` | `#0B0B0B` | CTAs, marca |
| `--dc-text` | `#1E293B` | Texto principal |
| `--dc-muted` | `#64748B` | Texto secundário |
| `--dc-border` | `#E2E8F0` | Bordas |

## Tipografia

### Playfair Display

- Variável: `--font-playfair`
- Pesos: 400, 500, 600, 700 + itálico
- Uso: títulos, headlines, wordmark
- Classe: `.font-serif`

### Plus Jakarta Sans

- Variável: `--font-plus-jakarta`
- Pesos: 400–800
- Uso: corpo, labels, botões, navegação
- Classe: `.font-sans`

### Geist Mono

- Variável: `--font-geist-mono` (root)
- Uso: eyebrows, meta, badges
- Classe: `.font-mono`

## Hero

Imagem principal via `hero` em `src/data/divina-cozinha.ts` (Unsplash).

Alt: "Prato sofisticado em mesa elegante no Divina Cozinha"

Layout: bento 8+4 com card sazonal e carta de vinhos.

## Fotografias — cardápio

Caminho base: `public/showcase/divina-cozinha/cardapio/`

| Categoria | Arquivo | Prato |
|-----------|---------|-------|
| Entradas | `entradas/bruschetta-tomate-confit.webp` | Bruschetta de tomate confit |
| Entradas | `entradas/burrata-com-figos.webp` | Burrata com figos |
| Entradas | `entradas/carpaccio-de-vitela.webp` | Carpaccio de vitela |
| Principais | `pratos-principais/risoto-de-funghi.webp` | Risoto de funghi |
| Principais | `pratos-principais/linguine-frutos-do-mar.webp` | Linguine ao frutos do mar |
| Principais | `pratos-principais/file-ao-molho-de-vinho.webp` | Filé ao molho de vinho |
| Sobremesas | `sobremesas/cheesecake-frutas-vermelhas.webp` | Cheesecake de frutas vermelhas |
| Sobremesas | `sobremesas/tiramisu-classico.webp` | Tiramisù clássico |
| Sobremesas | `sobremesas/petit-gateau.webp` | Petit gâteau |
| Bebidas | `bebidas/selecao-de-vinhos.webp` | Seleção de vinhos |
| Bebidas | `bebidas/spritz-divina.webp` | Spritz Divina |
| Bebidas | `bebidas/espresso-digestivos.webp` | Espresso & digestivos |

Regra: exibir imagem apenas com asset local real (`.webp`, `.jpg`, `.png`) — nunca SVG ou URL externa no card.

## Fotografias — ambiente

Caminho: `public/showcase/divina-cozinha/ambiente/`

| Arquivo | Título |
|---------|--------|
| `salao-principal.jpg` | Salão principal |
| `mesas.jpg` | Mesas |
| `cozinha-aberta.webp` | Cozinha aberta |
| `iluminacao.jpg` | Iluminação |
| `decoracao.webp` | Decoração |
| `adega.webp` | Adega |

Capa do portfólio: `public/showcase/divina-cozinha/capa/capa.png`

Estilo: elegância, naturalidade, luz natural, ambiente acolhedor. Evitar stock genérico.

## Cardápio — interação

Navegação por pills de categoria e setas. Cards 3:4 com hover scale, badge e preço.

**Reduced motion:** `prefers-reduced-motion: reduce` → 0.01ms.

## Ícones

Minimalistas, traço fino, outline, SVG inline. Sem ícones exagerados ou coloridos.

## Texturas

Discretas: papel, linho, madeira, cerâmica, mármore claro. Nunca texturas pesadas.

## Componentes

- Cards: cantos arredondados (`rounded-3xl`), bordas `#E8E0D4`, sombras suaves
- Botões: tons pastéis, hover suave, transições elegantes
- Espaçamento: py-24 md:py-32 entre seções
- Formulário reservas: confirmação com ícone check olive, loader 1200ms simulado

## Animações

| Nome | Spec |
|------|------|
| fadeInUp | translateY 24px → 0 |
| Cardápio flip | rotateY, 10s interval |
| Hover | scale suave, fade |

**Reduced motion:** `prefers-reduced-motion: reduce` → 0.01ms.

## Schema.org

Tipo: `Restaurant`

- name: Divina Cozinha
- description: Restaurante de culinária contemporânea com ingredientes selecionados e ambiente acolhedor.
- servesCuisine: Contemporânea
- priceRange: $$$
- telephone: +55-11-3456-7890
- address: Rua das Oliveiras, 128, São Paulo, SP, 01415-000, BR

## Responsividade

Desktop · notebook · tablet · smartphone. Cardápio legível em mobile. Galeria adaptável. Nenhuma animação deve prejudicar mobile.

## Inspirações

Apple, Airbnb, Awwwards, restaurantes Michelin, bistrôs franceses, restaurantes italianos contemporâneos.

## Stack de implementação

- Rota: `/showcase/divina-cozinha`
- Dados: `src/data/divina-cozinha.ts`
- Componentes: `src/components/divina-cozinha/`
- CSS: `divina-cozinha.css`
- Metadata: `src/app/showcase/divina-cozinha/layout.tsx`
