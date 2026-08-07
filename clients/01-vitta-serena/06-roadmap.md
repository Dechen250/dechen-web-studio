# Roadmap — Vitta Serena

**Tipo:** roadmap · **Status:** em andamento · **Versão:** 2.0

Pack: [00-projeto.md](00-projeto.md) · [01-brand-guide.md](01-brand-guide.md) · [02-sitemap.md](02-sitemap.md) · [03-copy.md](03-copy.md) · [04-assets.md](04-assets.md) · [05-prompts.md](05-prompts.md)

## Objetivo

Definir a evolução do site da Vitta Serena desde o planejamento até uma operação de e-commerce completa.

O roadmap deve acompanhar a maturidade real da marca. Funcionalidades não devem ser antecipadas sem necessidade operacional.

## Status atual

### Concluído

- Nome definitivo: Vitta Serena
- Instagram definido: @vittaserena.semijoias
- Posicionamento geral aprovado
- Direção elegante, delicada e minimalista
- Processo comercial e funil já estruturados
- Decisão de criar o site como ativo estratégico
- Estrutura inicial da documentação

### Em andamento

- Definição da primeira coleção
- Pesquisa de fornecedores
- Definição de produtos
- Definição de custos e preços
- Construção da identidade visual
- Preparação de operação e conteúdo
- Área de staging de assets pronta em `clients/01-vitta-serena/assets/`

### Marco próximo

Visita à região da 25 de Março em **22 de julho de 2026** para pesquisa e definição de fornecedores e produtos.

## Fase 0 — Descoberta e validação

### Objetivo

Reunir dados reais antes de desenvolver o catálogo definitivo.

### Tarefas

- Mapear fornecedores
- Comparar qualidade e custo
- Registrar materiais e acabamentos
- Definir primeira coleção
- Definir SKUs
- Definir quantidades
- Calcular preços e margens
- Definir embalagem
- Definir atendimento
- Definir entrega
- Definir troca
- Fotografar ou planejar ensaio
- Confirmar canais oficiais

### Saída

- Planilha de produtos
- Operação inicial definida
- Pendências documentadas
- Conteúdo mínimo disponível

## Fase 1 — Fundação técnica

### Objetivo

Criar uma base independente e profissional.

### Tarefas

- Criar repositório `vitta-serena`
- Criar projeto Next.js
- Configurar TypeScript
- Configurar Tailwind
- Configurar lint
- Criar estrutura de rotas
- Criar design system
- Configurar fontes
- Configurar tokens
- Configurar metadados base
- Preparar `Dockerfile` + Compose (`standalone`)
- Configurar ambiente de preview/staging na VPS
- Definir variáveis de ambiente no servidor

### Critério de conclusão

- Build funcionando
- Estrutura aprovada
- Sem dados fictícios apresentados como reais
- Design system documentado
- Repositório separado da agência
- Deploy de staging acessível na VPS (ainda sem domínio final, se necessário)

## Fase 2 — MVP comercial

### Objetivo

Publicar um site capaz de apresentar produtos e gerar pedidos.

### Entregas

#### Home

- Navbar
- Hero
- Coleção em destaque
- Categorias
- Benefícios
- Produtos em destaque
- Sobre
- FAQ
- CTA final
- Footer

#### Catálogo

- Todos os produtos
- Categorias
- Filtros essenciais
- Ordenação
- Estados vazios
- Responsividade

#### Produto

- Galeria
- Dados
- Disponibilidade
- Variações
- CTA de WhatsApp
- Produtos relacionados

#### Institucional

- Sobre
- Cuidados
- Entregas
- Trocas
- Contato
- Privacidade
- Termos

#### Técnico

- SEO
- Open Graph
- Sitemap
- robots.txt
- Analytics
- Acessibilidade
- Performance
- Testes

## Fase 3 — Preparação de lançamento

### Objetivo

Eliminar riscos antes de apontar o domínio.

### Checklist de conteúdo

- Todos os nomes corretos
- Preços conferidos
- Estoque conferido
- SKUs únicos
- Fotos corretas
- Materiais confirmados
- Cuidados confirmados
- Entrega confirmada
- Troca confirmada
- Contatos corretos
- Nenhum placeholder

### Checklist técnico

- Lint
- Typecheck
- Testes
- Build
- Links
- WhatsApp
- Analytics
- SEO
- Open Graph
- Imagens
- 404
- Mobile real
- Navegação por teclado
- Formulários

### Checklist comercial

- Atendimento preparado
- Respostas rápidas preparadas
- Catálogo alinhado com estoque
- Processo de pagamento definido
- Processo de entrega definido
- Pós-venda definido

## Fase 4 — Lançamento

### Objetivo

Publicar com controle e acompanhar a jornada real.

### Ações

- Aprovar preview/staging final na VPS
- Apontar DNS do domínio para a VPS
- Verificar SSL (HTTPS)
- Confirmar proxy e restart do container
- Enviar sitemap
- Testar conversão real
- Publicar links no Instagram
- Atualizar bio
- Criar destaques
- Acompanhar analytics
- Registrar dúvidas frequentes
- Registrar falhas operacionais

### Primeiros indicadores

- Visitas
- Origem
- Visualizações de produto
- Cliques no WhatsApp
- Pedidos
- Conversão
- Produtos mais procurados
- Dúvidas mais frequentes
- Tempo de resposta

## Fase 5 — Otimização pós-lançamento

### Objetivo

Melhorar com base em comportamento real.

### Possíveis melhorias

- Ajustar hero
- Reordenar produtos
- Melhorar fotos
- Refinar descrições
- Destacar categorias
- Reduzir dúvidas
- Melhorar FAQ
- Melhorar mensagens de WhatsApp
- Criar reposição
- Criar lista de interesse
- Adicionar prova social real
- Criar kits
- Criar sugestões de combinação

Toda mudança deve ser comparada com dados anteriores.

## Fase 6 — E-commerce completo

### Condição para iniciar

Só iniciar quando a operação conseguir manter:

- Estoque confiável
- Separação de pedidos
- Pagamento
- Entrega
- Troca
- Atendimento
- Atualização de produtos

### Funcionalidades

- Carrinho
- Checkout
- Pagamentos
- Cálculo de frete
- Controle de estoque
- Confirmação de pedido
- E-mails transacionais
- Cupons reais
- Área de acompanhamento
- Painel de produtos
- Integração com analytics
- Recuperação de carrinho dentro das regras aplicáveis

## Fase 7 — Crescimento

### Possibilidades

- Coleções sazonais
- Programa de indicação
- Lista VIP
- Campanhas de reposição
- Conteúdo editorial
- Guias de combinação
- Presentes
- Recompra
- Remarketing
- UGC autorizado
- Parcerias com criadoras
- Automação de pós-venda
- Internacionalização futura, se fizer sentido

## Backlog priorizado

### Prioridade alta

- Dados reais dos produtos
- Fotografias
- WhatsApp
- Catálogo
- Página de produto
- Políticas
- Mobile
- Analytics
- SEO
- Performance

### Prioridade média

- Newsletter
- Produtos relacionados
- Depoimentos
- Compartilhamento
- Lista de reposição
- Busca

### Prioridade baixa no início

- Blog
- Programa de fidelidade
- Aplicativo
- Animações complexas
- Personalização avançada
- Área de cliente
- Integrações pesadas

## Critérios de qualidade

Antes de considerar o MVP concluído:

- Responsividade excelente
- Navegação clara
- Build sem erro
- Sem bugs críticos
- Sem dados falsos
- Conteúdo revisado
- Produtos completos
- Imagens otimizadas
- CTA funcionando
- Políticas acessíveis
- Acessibilidade básica
- SEO configurado
- Analytics configurado
- Código organizado
- Componentes reutilizáveis
- Boa performance
- Manutenção simples

## Bloqueadores de publicação

O site não pode entrar em produção com:

- Número de WhatsApp errado
- Produto sem preço
- Produto sem imagem
- Produto com material inventado
- Estoque desatualizado no lançamento
- Política provisória apresentada como final
- Link quebrado
- Formulário sem destino
- Placeholder visível
- Imagem sem direito de uso
- Erro crítico em celular
- Domínio apontado para preview incorreto

## Métricas

### Aquisição

- Sessões
- Origem
- Campanha
- Dispositivo
- Página de entrada

### Interesse

- Visualização de coleção
- Visualização de produto
- Categoria selecionada
- Produto compartilhado
- Retorno ao site

### Conversão

- Clique no WhatsApp
- Clique por produto
- Pedido iniciado
- Pedido concluído
- Receita
- Conversão

### Operação

- Tempo de resposta
- Produto indisponível solicitado
- Motivo de desistência
- Trocas
- Dúvidas
- Recompra

## Processo de revisão

A cada versão:

1. Revisar documentação
2. Atualizar pendências
3. Implementar
4. Executar testes
5. Validar conteúdo
6. Gerar preview
7. Obter aprovação
8. Publicar
9. Medir
10. Registrar aprendizado

## Objetivo final

A Vitta Serena deve possuir uma presença digital que cresça junto com a operação.

O primeiro site precisa vender e gerar confiança. As versões futuras devem melhorar essa função, não transformar o projeto em uma coleção de funcionalidades sem propósito.
