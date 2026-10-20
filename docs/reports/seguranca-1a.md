# Revisão de Segurança e Código — Etapa 1(a)

- **Commit validado:** `9553e40cbd739995ae272142dc8e89cb04535296`
- **Escopo:** exclusivamente o conteúdo introduzido neste commit (scaffold, dados tipados e helper de WhatsApp).
- **Veredito:** **BLOQUEADO**

## Achados

### Alta — dependência vulnerável transitiva em produção

**Evidência**

- `package-lock.json` fixa `next` em `15.5.28` e sua cópia transitiva de `postcss` em `8.4.31` (`node_modules/next/node_modules/postcss`).
- `npm audit --omit=dev --json` reportou 2 vulnerabilidades: **1 alta** e **1 moderada**. A vulnerabilidade alta é `postcss <= 8.5.22`, alcançada por `next`.
- Alertas reportados pelo audit: `GHSA-6g55-p6wh-862q` e `GHSA-r28c-9q8g-f849` (leitura/divulgação arbitrária de arquivos por `sourceMappingURL` controlada pelo atacante), além de alertas moderados de PostCSS.
- O audit indica correção disponível ao atualizar `next` para `16.4.2` (mudança major), ou para uma linha compatível que já transporte PostCSS corrigido.

**Correção exigida**

Atualizar `next` para uma versão suportada que não inclua PostCSS vulnerável, regenerar `package-lock.json` com `npm install`/`npm ci` conforme a política do projeto e executar `npm audit --omit=dev` novamente. Só avançar sem vulnerabilidades alta/crítica no grafo de produção.

## Verificações aprovadas

| Área | Evidência | Resultado |
|---|---|---|
| Segredos | Busca no commit por padrões de chaves, tokens, senhas e chaves privadas não encontrou segredos. `.gitignore` cobre `.env*`. | Aprovado |
| Dados e URLs | `data/business.ts` reproduz WhatsApp, telefones, endereço, Instagram e iFood do briefing. O horário de abertura permanece visível como `[CONFIRMAR horário de abertura]`. | Aprovado |
| Helper WhatsApp | `lib/whatsapp.ts` remove caracteres não numéricos, valida 8–15 dígitos, cria URL sob base fixa `https://wa.me/` e usa `URLSearchParams` para codificar `text`. `createMenuInquiryUrl` rejeita nome vazio. | Aprovado |
| HTML inseguro | Não há uso de `dangerouslySetInnerHTML` no commit. | Aprovado |
| Links externos | Não há links com `target="_blank"` nesta etapa; portanto não há ocorrência sem `rel="noopener noreferrer"`. | Aprovado |
| Tipagem | `tsconfig.json` usa `strict: true`; não foram encontrados `any`, `@ts-ignore` ou `@ts-expect-error` no TypeScript/TSX introduzido. `npm run typecheck` passou. | Aprovado |
| Lint | `npm run lint` passou. | Aprovado |
| Estrutura | App Router, `data/`, `lib/`, `docs/reports/`, `public/images/` e README foram criados conforme o escopo da etapa. | Aprovado |

## Observação de manutenção

`business.whatsapp.url` duplica a URL que o helper deriva com segurança de `business.whatsapp.number`. Não é falha de segurança no commit, mas recomenda-se escolher uma única fonte de verdade antes de os CTAs serem adicionados, evitando divergência futura entre os dois valores.
