# Relatório de QA Mobile — Commit `aab80ed` (Doceria La Floresta)

- **Data / Hora:** 20 de Outubro de 2026
- **Papel:** QA (Jasmim)
- **Commit Validado:** `aab80ed` (`feat: refresh home visual experience`)
- **Resoluções testadas:** 360px (`360x800`) e 390px (`390x844`)
- **Veredito:** **APROVADO**

---

## 1. Inventário Programático de Produtos e Imagens (`data/menu.ts`)

- **Total de itens no cardápio:** 142
- **Itens com imagem (`image !== null`):** 22 ocorrências
- **Imagens WebP únicas mapeadas:** 13 arquivos
- **Itens sem imagem (`image: null`):** 120 (utilizando fallback visual padronizado da marca, sem blocos azuis vazios ou imagens quebradas)

### Validação física e HTTP dos 13 arquivos WebP em `/public/images/products/`

Todos os arquivos foram verificados no sistema de arquivos (`public/images/products/...`) e testados via requisição HTTP local com servidor de produção (`next start`):

1. `bolo-floresta-negra.webp` — Exists (`125.408` bytes) — HTTP `200 OK` (`image/webp`)
2. `bolo-de-nozes.webp` — Exists (`95.310` bytes) — HTTP `200 OK` (`image/webp`)
3. `bolo-de-brigadeiro.webp` — Exists (`155.826` bytes) — HTTP `200 OK` (`image/webp`)
4. `bolo-de-leite-ninho.webp` — Exists (`59.966` bytes) — HTTP `200 OK` (`image/webp`)
5. `bolo-rigo.webp` — Exists (`40.322` bytes) — HTTP `200 OK` (`image/webp`)
6. `bolo-de-doce-de-leite-com-morango.webp` — Exists (`110.626` bytes) — HTTP `200 OK` (`image/webp`)
7. `bolo-de-abacaxi.webp` — Exists (`69.080` bytes) — HTTP `200 OK` (`image/webp`)
8. `bolo-mil-folhas.webp` — Exists (`63.042` bytes) — HTTP `200 OK` (`image/webp`)
9. `bolo-trufado.webp` — Exists (`77.190` bytes) — HTTP `200 OK` (`image/webp`)
10. `bolo-de-kit-kat-com-morango.webp` — Exists (`87.398` bytes) — HTTP `200 OK` (`image/webp`)
11. `bolo-de-morango-com-cobertura-de-chantilly.webp` — Exists (`69.020` bytes) — HTTP `200 OK` (`image/webp`)
12. `cheesecake-de-amora.webp` — Exists (`86.916` bytes) — HTTP `200 OK` (`image/webp`)
13. `torta-de-morango.webp` — Exists (`101.970` bytes) — HTTP `200 OK` (`image/webp`)

### Endpoint de Otimização `/_next/image`
- Testado com URL codificada: `/_next/image?url=%2Fimages%2Fproducts%2Fbolo-floresta-negra.webp&w=384&q=75`
- **Resultado:** HTTP `200 OK` (`image/jpeg` otimizado pelo Next.js).

---

## 2. Validação Mobile (360px e 390px)

### Carregamento (Antes e Depois do Scroll)
- **Antes do scroll:** Imagens críticas do Hero carregam imediatamente com prioridade otimizada (`priority`), evitando CLS e atraso no LCP.
- **Após o scroll:** As imagens dos cards na seção "Mais pedidos" e nas categorias do cardápio aplicam lazy loading nativo de forma fluida, sem falhas de carregamento ou intermitência de layout.

### Abas, Categorias e Busca
- **Abas:** Alternância entre Bolos, Doces, Docinhos, Tortas doces, Salgados, Sorvetes e Açaí e Bebidas funcional, preservando o estado e redefinindo a busca ao trocar de categoria.
- **Busca:** Filtro em tempo real por nome e descrição funcionando perfeitamente em 360px e 390px, exibindo estado vazio elegante quando necessário.

### Console e Rede
- **Erros de console (`console.error` / `pageerror`):** 0
- **Falhas de requisição (`requestfailed` / HTTP 4xx/5xx):** 0

---

## 3. Bloqueios e Observações
- Nenhum bloqueio crítico ou alto encontrado no commit `aab80ed`.
- Código de produto intacto; veredito aprovado para liberação.
