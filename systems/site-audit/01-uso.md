# Uso — Auditoria Técnica de Site

**Tipo:** Guia de uso · **Status:** ativo · **Versão:** 1.0

Visão do sistema: [00-visao.md](./00-visao.md)

## Requisito

Google Chrome instalado na máquina. A ferramenta o localiza sozinha e o roda em modo headless — nenhuma janela abre e o navegador do dia a dia não é usado.

Se o Chrome estiver em caminho fora do padrão, aponte com a variável `CHROME_PATH`.

## Comando

```bash
npm run audit -- <url> [opções]
```

O `--` é obrigatório: separa os argumentos do npm dos da ferramenta.

## Opções

| Opção | Efeito |
|-------|--------|
| `--desktop` | Simula desktop em vez de celular |
| `--out <pasta>` | Pasta de saída (padrão: `reports`) |
| `--json` | Salva também o resultado bruto em JSON |
| `--strict` | Sai com código 1 se houver achado crítico |
| `-h`, `--help` | Mostra a ajuda |

O padrão é celular porque é de onde vem a maior parte do tráfego dos negócios atendidos. Use `--desktop` quando o site tiver público majoritariamente de escritório.

## Exemplos

```bash
# Prospect, medição padrão em celular
npm run audit -- dechenwebstudio.com.br

# Desktop, guardando o JSON para comparar depois
npm run audit -- https://exemplo.com.br --desktop --json

# Verificação de qualidade que falha em achado crítico
npm run audit -- exemplo.com.br --strict
```

## Saída

Um arquivo Markdown em `reports/`, nomeado `<dominio>-<dispositivo>-<data>.md`. Relatórios bloqueados saem como `<dominio>-bloqueado-<data>.md`.

A pasta `reports/` não é versionada: relatório de prospect é dado de terceiro e não deve entrar no Git sem motivo. Para arquivar a auditoria de um cliente, mova o arquivo para o pack dele em `clients/`.

No terminal aparecem as quatro notas e a lista de achados críticos. O relatório completo fica no arquivo.

## Situações no relatório

| Situação | Significado |
|----------|-------------|
| OK | Dentro do alvo de referência |
| Atenção | Fora do ideal, sem impedir o funcionamento |
| Crítico | Prejudica acesso, indexação ou contato — trate primeiro |

## Quando o relatório sai bloqueado

Acontece quando o domínio não resolve em DNS, o servidor não completa a conexão, ou o certificado SSL é inválido. Não é erro da ferramenta: é o achado. O relatório traz a evidência técnica e o que precisa ser corrigido antes de qualquer medição fazer sentido.

## Uso em CI

`--strict` devolve código 1 em achado crítico, o que permite rodar a auditoria como etapa de verificação antes de publicar. Vale para o site da DWS e para sites de clientes com manutenção contratada.
