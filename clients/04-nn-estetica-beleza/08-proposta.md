# Proposta — NN Estética e Beleza

**Tipo:** proposta · **Status:** rascunho interno / pré-descoberta · **Versão:** 0.1

Pack: [00-projeto.md](00-projeto.md) · [01-analise-presenca-digital.md](01-analise-presenca-digital.md) · [07-descoberta.md](07-descoberta.md) · Preview: `/proposta/nn-estetica-beleza`

> Rascunho para a Dechen Web Studio apresentar à lead. **Não envie como proposta final** até a [descoberta](07-descoberta.md) confirmar endereço, profissionais, WhatsApp numérico e lista de procedimentos. Investimento permanece `[a definir]`.

Estrutura alinhada a [`systems/sales/04-proposta.md`](../../systems/sales/04-proposta.md).

## Apresentação

A NN Estética e Beleza já conversa com o público no Instagram (`@nnestetica.beleza`): emagrecimento, harmonização facial e corporal e estrias, com a Dra. Natany Nascimento — e a Dra. Haiana Nascimento no bio — em São Bernardo do Campo. O agendamento hoje sai da bio para o WhatsApp.

O que não existe é um destino próprio: página que explique o cuidado, credencie as profissionais e receba Google, indicação e anúncio sem depender do algoritmo.

Esta proposta entrega esse destino: um site institucional de uma página, no tom da clínica, com conversão no WhatsApp que vocês já usam.

## Diagnóstico (resumo)

| Problema | Impacto |
|----------|---------|
| Autoridade só no Instagram | Conta, alcance ou link quebrado interrompem a captação |
| Sem site indexável | Quem busca a marca ou “estética São Bernardo” não chega em vocês |
| Bio curta demais para quem não segue | A conversa no WhatsApp começa do zero, sem confiança prévia |
| Listagens de terceiros misturam com salão de cabelo | Risco de paciente errada e marca confusa |

Oportunidade: a audiência já existe. O site não precisa “criar demanda”; precisa **segurar e converter** quem chega — e abrir o Google.

Objetivo estratégico da lead (hipótese, validar na descoberta): mais avaliações agendadas, com cara de consultório sério, sem parecer salão.

## Solução recomendada

**Site institucional one-page** (landing institucional), publicado em domínio próprio depois do contrato.

O visitante entende em poucos scrolls quem são, o que fazem e como agendar. O botão abre o WhatsApp — o mesmo canal de hoje — com mensagem pronta.

Preview interno (placeholders no lugar de endereço, conselho e fotos):

```text
/proposta/nn-estetica-beleza
```

O preview vive no repositório da agência só para esta conversa. O site real, no kickoff, sai para repositório próprio. Não entra em `showcase/` como peça fictícia de portfólio.

## Escopo

### Inclui (MVP)

- Homepage única, mobile first
- Hero, tratamentos (três pilares da bio), sobre, como funciona, espaço, FAQ, local, agendamento
- Navbar fixa, menu mobile, CTA repetido
- WhatsApp (link oficial da bio; número `wa.me/55…` quando confirmado)
- Formulário que monta a mensagem e abre o WhatsApp
- SEO técnico da home (title, description, headings, OG)
- Aviso clínico no rodapé (sem promessa de resultado)
- Deploy na VPS da DWS (Docker), SSL, domínio apontado quando existir
- Handoff: como alterar textos básicos e o link do WhatsApp

### Não inclui (salvo aditivo)

- Agenda online (Fresha, ClinicWeb, etc.)
- Blog ou CMS
- E-commerce
- Página por procedimento
- Produção fotográfica ou identidade visual do zero
- Gestão de Instagram / anúncios
- Antes/depois sem autorização por escrito
- Unificar marca com NN Liso Perfeito sem confirmação de vocês

## Preview x site publicado

| No preview | No ar (após descoberta) |
|------------|-------------------------|
| Paleta hipótese (areia / terracotta) | Paleta e logo oficiais |
| “Dra.” como no Instagram + `[conselho]` | Nome + conselho confirmados |
| Endereço e horários como placeholder | NAP real + mapa |
| Fotos do espaço como mosaico vazio | Fotos autorizadas; seção some se não houver |
| `noindex` neste domínio da DWS | Indexação no domínio da clínica |

## Cronograma de execução

Ordem, não calendário de marketing. Assets e respostas da descoberta determinam o ritmo.

```text
Descoberta  →  proposta fechada  →  contrato
        →  ajuste de copy e marca
        →  implementação no repo próprio
        →  testes (mobile, links, WhatsApp, SEO)
        →  aprovação da lead
        →  domínio + SSL + publicação
```

O esboço visual deste pack já cobre a etapa de estrutura. O que falta para o ar é dado real, não invenção de layout.

A DWS comunica sites deste porte como entrega ágil no site da agência; o prazo desta clínica só fecha quando logo, fotos e NAP estiverem na mesa.

## Investimento

**`[investimento — a definir após descoberta]`**

Forma de pagamento e entrada: `[condições — a definir]`.

Não há tabela pública de preço na DWS. O valor sai do escopo acima, do volume de assets e de extras (páginas de procedimento, agenda, etc.) se a lead pedir.

## Próximos passos

1. Reunião de [descoberta](07-descoberta.md)
2. Ajustar esta proposta (escopo, investimento, domínio)
3. Envio formal à lead
4. Se aprovada: contrato, pagamento inicial, kickoff, build no repositório próprio

## Checklist interno antes do envio à lead

- [ ] Descoberta feita; NAP e conselhos conferidos
- [ ] Relação com NN Liso Perfeito e Tayná resolvida por escrito
- [ ] Investimento e pagamento preenchidos
- [ ] Domínio escolhido
- [ ] Preview atualizado com logo/fotos se já tiverem chegado
- [ ] Esta página deixou de ser rascunho (`Status: enviada`)
