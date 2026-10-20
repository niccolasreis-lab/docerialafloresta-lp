# Relatório de validação — Fases 1(c) e 1(d)

Data: 20/10/2026

## Escopo implementado

### Fase 1(c) — Cardápio completo
- Sete categorias em abas: Bolos, Doces, Docinhos, Tortas doces, Salgados, Sorvetes e Açaí e Bebidas.
- Abas com rolagem horizontal em telas pequenas.
- Busca em tempo real por nome, descrição ou nota de disponibilidade dentro da categoria ativa.
- Estado vazio com ação para limpar a busca.
- Cards com nome, descrição quando disponível, imagem oficial ou placeholder explícito e CTA “Consultar”.
- CTAs usam `createMenuInquiryUrl`, gerando URL `wa.me` com mensagem URL-encoded e nome exato do item.
- Navegação das abas expõe semântica `tablist`/`tab` e `aria-selected`.

### Fase 1(d) — SEO e dados estruturados
- Metadata com título, descrição, palavras-chave, autoria, publisher e regras de indexação.
- `metadataBase` usa `NEXT_PUBLIC_SITE_URL` (ou a URL de produção fornecida pela Vercel); localmente, usa `http://localhost:3000`, sem inventar domínio comercial.
- Open Graph completo com título, descrição, localidade, tipo, nome do site e imagem real.
- Twitter Card `summary_large_image` com título, descrição e imagem.
- JSON-LD na rota `/`, com tipos `Bakery` e `LocalBusiness`, nome, descrição, endereço completo, WhatsApp, dois telefones, redes e horário.
- O horário de abertura permanece honestamente como `[CONFIRMAR horário de abertura]`; fechamento às 02:00 e funcionamento diário são informados sem inventar dado.
- Nenhum domínio/canonical comercial foi inventado, pois não há domínio de produção confirmado no briefing.

## Validações automatizadas

Executadas na raiz do projeto após as alterações:

- `npm run lint` — aprovado.
- `npm run typecheck` — aprovado.
- `npm run build` — aprovado; rota `/` gerada como conteúdo estático.

## Verificação manual sugerida

1. Executar `npm run dev`.
2. Abrir `/` em 375 px, 768 px e 1280 px.
3. Acessar “Cardápio” no header e alternar todas as sete abas.
4. Em mobile, rolar horizontalmente a lista de categorias.
5. Buscar termos como `brigadeiro`, `morango` e um termo inexistente.
6. Abrir “Consultar” e confirmar mensagem no formato `Olá! Gostaria de consultar o item: {nome}`.
7. Inspecionar o HTML da página para `application/ld+json`, tags Open Graph e Twitter.
