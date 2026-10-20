# QA — Etapas 1(c) e 1(d)

**Hash validado:** `955993cd4c4e75d2780e3c54d194522616259e86`  
**Escopo:** Cardápio completo com abas, busca/filtro rápido, tratamento de estado vazio, links `wa.me` URL-encoded em cada item, metadados SEO/Open Graph/Schema.org, e responsividade em 375px, 768px e 1280px.

## Veredito: APROVADO

Todos os testes de build, lint, checagem de tipos, auditoria de segurança de produção (`npm audit --omit=dev` com 0 vulnerabilidades) e inspeção de comportamento de interface passaram com sucesso.

## Comandos e saídas executados

| Comando | Resultado | Evidência resumida |
|---|---|---|
| `npm install` | PASSOU | 368 pacotes auditados com sucesso. |
| `npm run lint` | PASSOU | `eslint .` concluído sem erros ou alertas. |
| `npm run typecheck` | PASSOU | `tsc --noEmit` concluído sem erros de tipagem. |
| `npm run build` | PASSOU | `next build` compilou com sucesso e gerou as rotas estáticas. |
| `npm audit --omit=dev` | PASSOU | 0 vulnerabilidades em pacotes de produção. |

## Validação de Funcionalidades de Interface (375px / 768px / 1280px)

1. **Abas de Categorias (`MenuSection`):**
   - Implementadas com semântica de abas (`role="tab"`, `role="tablist"`, `aria-selected`, `aria-controls`).
   - Rolagem horizontal fluida no mobile (375px e 768px) e disposição limpa em desktop (1280px).
   - Ao trocar de aba, o filtro de busca é redefinido de forma intuitiva.

2. **Busca e Filtro Rápido:**
   - Campo de busca em tempo real com normalização de acentos (`NFD`) e case-insensitive.
   - Filtra simultaneamente por nome, descrição e nota de disponibilidade do item.

3. **Estado Vazio (Empty State):**
   - Quando nenhum item corresponde à busca, exibe mensagem clara informando o termo buscado na categoria ativa e um botão para limpar a busca instantaneamente.

4. **Links WhatsApp (`wa.me`):**
   - Cada item do cardápio possui botão/link “Consultar” que chama `createMenuInquiryUrl(item.name)`, abrindo o WhatsApp com a mensagem pré-preenchida e codificada (`Olá! Gostaria de consultar o item: {nome}`).
   - Aberto em nova aba (`target="_blank" rel="noopener noreferrer"`).

5. **Console e Desempenho:**
   - Sem erros, warnings ou reidratação incorreta no console do navegador em todos os viewports testados.
   - Imagens otimizadas com `next/image` e lazy loading adequado.

## Bloqueios

Nenhum bloqueio técnico ou de conteúdo nesta etapa. O único placeholder pendente permanece visível e correto (`[CONFIRMAR horário de abertura]`).
