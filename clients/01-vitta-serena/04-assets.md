# Assets — Vitta Serena

## Objetivo

Definir todos os arquivos visuais, dados e recursos necessários para desenvolver e manter o site da Vitta Serena.

Nenhum asset deve ser adicionado sem organização, nome claro e finalidade definida.

---

# Área de recebimento (staging)

Enquanto o repositório do site ainda não existir, receber e organizar arquivos em:

```text
clients/01-vitta-serena/assets/
├── README.md          ← guia rápido de entrega
├── _inbox/            ← soltar originais / ZIP aqui
├── brand/
├── home/
├── categories/
├── products/          ← uma pasta por SKU
├── packaging/
├── social-proof/
└── cadastro/
    ├── produtos-template.csv
    └── produtos.csv   ← criar a partir do template
```

Fluxo:

1. Entregar fotos em `_inbox/` ou já renomeadas nas pastas finais.
2. Preencher `cadastro/produtos.csv` só com dados confirmados.
3. Quando o repo `vitta-serena` existir, copiar o conteúdo organizado para `public/vitta-serena/`.

---

# Estrutura Recomendada

No repositório do site (destino final):

```text
public/
└── vitta-serena/
    ├── brand/
    │   ├── logo-principal.svg
    │   ├── logo-clara.svg
    │   ├── logo-escura.svg
    │   ├── simbolo.svg
    │   └── favicon.png
    ├── home/
    │   ├── hero.webp
    │   ├── sobre.webp
    │   └── colecao-destaque.webp
    ├── categories/
    │   ├── brincos.webp
    │   ├── colares.webp
    │   ├── pulseiras.webp
    │   ├── aneis.webp
    │   └── kits-presentes.webp
    ├── products/
    │   └── [sku]/
    │       ├── 01-principal.webp
    │       ├── 02-detalhe.webp
    │       ├── 03-uso.webp
    │       └── 04-embalagem.webp
    ├── packaging/
    └── social-proof/
```

---

# Regras de Nomenclatura

- Usar minúsculas
- Não usar espaços
- Não usar acentos
- Separar palavras por hífen
- Incluir SKU na pasta do produto
- Numerar imagens na ordem de exibição
- Não usar nomes como `IMG_1234`
- Não duplicar o mesmo arquivo em várias pastas

Exemplo:

```text
products/br-001/01-principal.webp
products/br-001/02-fecho.webp
products/br-001/03-uso.webp
```

---

# Identidade Visual

## Arquivos obrigatórios

- Logo principal em SVG
- Logo clara em SVG
- Logo escura em SVG
- Símbolo em SVG
- PNG transparente em alta resolução
- Favicon
- Arquivo editável original
- Documento com cores
- Documento com tipografias
- Regras de área de proteção

## Validação

Antes de usar:

- Confirmar que é a versão final
- Verificar contraste
- Verificar legibilidade em celular
- Testar em fundo claro e escuro
- Não converter SVG limpo em imagem raster sem necessidade

---

# Fotografias de Produto

## Quantidade mínima recomendada

Cada produto deve possuir ao menos:

1. Foto principal
2. Foto de detalhe
3. Foto em uso ou referência de escala

Quando possível:

4. Foto lateral ou do fecho
5. Foto da embalagem
6. Foto em composição com outra peça

## Requisitos

- Fundo limpo
- Cor fiel
- Foco correto
- Iluminação consistente
- Sem marcas d’água
- Sem elementos que confundam o produto vendido
- Mesma proporção entre produtos
- Espaço seguro para recorte
- Imagens próprias ou com direito de uso

---

# Proporções

## Cards de produto

Preferência:

- `4:5`
- `1:1` somente se todas as fotos seguirem o mesmo padrão

## Hero

Preferência:

- Desktop: horizontal
- Mobile: versão vertical ou recorte planejado

## Open Graph

- `1200 × 630 px`

## Favicon

- Múltiplos tamanhos gerados a partir do símbolo oficial

---

# Formatos e Otimização

Preferir:

- AVIF para alta compressão quando suportado
- WebP como formato principal
- SVG para logos e ícones
- PNG apenas quando transparência raster for necessária

Evitar:

- JPG sem otimização
- Imagens gigantes
- SVG exportado com dados desnecessários
- Upload direto de arquivos originais pesados

## Meta de peso

- Card de produto: preferencialmente abaixo de 200 KB
- Imagem principal: preferencialmente abaixo de 400 KB
- Hero: equilibrar qualidade e performance
- Logo SVG: manter limpo e pequeno

Os limites são metas, não justificativa para destruir a qualidade visual.

---

# Alt Text

O texto alternativo deve descrever o produto com objetividade.

Exemplos:

```text
Brinco dourado pequeno com formato oval sobre fundo claro
Colar delicado dourado com pingente circular usado no pescoço
Pulseira fina prateada com detalhe central
```

Evitar:

```text
imagem1
foto de produto
semijoia linda barata
```

Não repetir palavras-chave artificialmente.

---

# Dados de Produto

Criar uma fonte única de dados.

## Campos obrigatórios

- ID
- SKU
- Slug
- Nome
- Categoria
- Preço
- Disponibilidade
- Descrição curta
- Descrição completa
- Imagens
- Destaque
- Novidade

## Campos condicionais

- Preço promocional
- Material
- Acabamento
- Dimensões
- Peso
- Cor
- Tamanho
- Variações
- Cuidados
- Estoque
- Coleção
- Produtos relacionados

---

# Planilha de Cadastro

Antes do desenvolvimento, criar uma planilha com colunas:

```text
sku
nome
slug
categoria
colecao
preco
preco_promocional
estoque
disponivel
material
acabamento
dimensoes
descricao_curta
descricao_completa
cuidados
variacoes
imagem_01
imagem_02
imagem_03
destaque
novidade
```

A planilha deve ser a base de conferência, mesmo que os dados sejam convertidos para TypeScript ou CMS.

---

# Códigos de Produto

Criar um padrão simples.

Exemplo:

- `BR-001` para brincos
- `CL-001` para colares
- `PL-001` para pulseiras
- `AN-001` para anéis
- `KT-001` para kits

Não alterar códigos depois que os produtos começarem a ser vendidos, salvo necessidade real.

---

# Imagens da Home

## Hero

Deve transmitir:

- Delicadeza
- Uso real
- Elegância cotidiana
- Identidade da marca

Não usar montagem genérica de banco de imagem como se representasse a coleção.

## Categorias

Usar produtos reais de cada categoria.

## Sobre

Preferir:

- Foto da fundadora
- Bastidor da curadoria
- Preparação de pedidos
- Embalagem
- Mesa de trabalho

A escolha deve ser aprovada pela Gabi.

---

# Embalagem

Registrar:

- Caixa ou saquinho
- Cartão
- Etiqueta
- Papel
- Fita
- Manual de cuidados
- Brinde, se existir

Fotografar somente a embalagem definitiva.

---

# Ícones

Preferir uma única biblioteca consistente ou ícones próprios.

Ícones previstos:

- Menu
- Fechar
- Busca
- Filtro
- Instagram
- WhatsApp
- E-mail
- Compartilhar
- Seta
- Disponibilidade
- Cuidados
- Entrega
- Troca

Não misturar estilos filled, outline e duotone sem regra.

---

# Vídeos

Vídeos são opcionais no MVP.

Possibilidades futuras:

- Produto em movimento
- Bastidores
- Embalagem
- Combinações
- Lançamentos

Regras:

- Sem autoplay com áudio
- Sem bloquear carregamento
- Com poster
- Com legenda quando necessário
- Otimizado para mobile

---

# Dados Institucionais

Reunir:

- Nome oficial
- Instagram
- WhatsApp
- E-mail
- Cidade ou região
- Horário de atendimento
- Formas de pagamento
- Entrega
- Trocas
- Privacidade
- Termos
- Dados fiscais aplicáveis

Não deixar dados fictícios no site de produção.

---

# Assets Pendentes

Após a ida aos fornecedores, depositar em `clients/01-vitta-serena/assets/`:

- Fotografar produtos → `_inbox/` ou `products/[sku]/`
- Confirmar SKUs → pastas em `products/` + `cadastro/produtos.csv`
- Confirmar categorias → `categories/` (só categorias com produto)
- Registrar materiais, dimensões, preços, estoque, cuidados → `cadastro/produtos.csv`
- Definir embalagem → `packaging/`
- Definir coleção de lançamento → `home/colecao-destaque.webp` + planilha
- Logos oficiais → `brand/`
- Hero / sobre → `home/`

---

# Checklist de Qualidade

Antes de publicar:

- Logo correta
- Fotos com cor fiel
- Nenhum arquivo quebrado
- Nenhum nome genérico
- Alt texts preenchidos
- Imagens otimizadas
- Proporções consistentes
- Dados conferidos
- Direitos de uso confirmados
- Sem informações fictícias
- Sem arquivos duplicados
- Sem imagens de teste no build final

---

# Objetivo Final

Os assets devem fazer a Vitta Serena parecer consistente e profissional em qualquer tela.

A fotografia e a organização dos dados devem facilitar tanto a venda quanto a manutenção futura do catálogo.
