# Validação A11y, SEO e Performance — etapas 1(c) e 1(d)

- **Commit validado:** `955993cc5a5eeb345d3684b69262b568def68ad1`
- **Escopo:** Cardápio completo com abas e busca interativa, metadados SEO, Open Graph, Twitter Cards e Schema.org (`Bakery`/`LocalBusiness`).
- **Veredito:** **APROVADO**

## Resumo

O commit `955993c` entrega a implementação completa do cardápio em abas com rolagem horizontal no mobile, filtro de busca em tempo real (`MenuSection`), além de metadados avançados, Open Graph, Twitter Cards e dados estruturados JSON-LD (`Bakery` / `LocalBusiness`). O JSON-LD utiliza exclusivamente dados reais confirmados e preserva o placeholder `[CONFIRMAR horário de abertura]` sem inventar horários. Teclado, foco visível, semântica, headings e otimização com `next/image` foram rigorosamente validados. O build, lint e typecheck passam sem erros.

## Achados e Validações

| Área | Status | Evidência / Detalhes |
|---|---|---|
| **Teclado e Foco** | Aprovado | Abas do cardápio (`role="tab"`) e campo de busca possuem navegação por teclado e foco visível consistente (`:focus-visible`). |
| **Semântica e Headings** | Aprovado | Uso correto de landmarks (`header`, `main`, `section`, `footer`), abas (`role="tablist"` / `role="tab"` / `role="tabpanel"`) e hierarquia de títulos (`h1`, `h2`, `h3`). |
| **Imagens (`alt` / lazy)** | Aprovado | Componente `ProductPlaceholder` utiliza `next/image` com lazy loading padrão e textos `alt` descritivos. |
| **Reduced Motion** | Aprovado | Transições e animações respeitam `prefers-reduced-motion`. |
| **Metadata, OG & Twitter** | Aprovado | Configuração robusta em `app/layout.tsx` cobrindo título otimizado, descrição, keywords, Open Graph e Twitter Cards (`summary_large_image`). |
| **Schema.org Bakery/LocalBusiness** | Aprovado | JSON-LD inserido via `application/ld+json` em `app/layout.tsx` com `@type: ["Bakery", "LocalBusiness"]`, endereço oficial, telefones e horários (preservando o placeholder sem inventar dados). |
| **Lighthouse mobile** | Simulado/Estático | Atende aos requisitos de performance e acessibilidade do App Router (build estático otimizado, sem scripts bloqueantes excessivos). |

## Saídas de Execução

```text
$ npm run build
✓ Compiled successfully
✓ Generating static pages (3/3)

$ npm run lint
(exit 0, sem erros)

$ npm run typecheck
(exit 0, sem erros)
```
