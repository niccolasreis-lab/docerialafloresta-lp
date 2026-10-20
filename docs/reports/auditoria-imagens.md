# Relatório de Auditoria Visual de Imagens — Doceria La Floresta

- **Escopo:** Auditoria item a item de todas as imagens em `public/images/products/`, avaliando dimensões, compressão, nitidez aparente, proporção, enquadramento e consistência em 375, 768 e 1280 px.
- **Data:** Outubro de 2026
- **Status:** Concluído (Sem edição de arquivos nesta etapa)

---

## 1. Visão Geral e Diretrizes Técnicas

As fotografias oficiais extraídas do catálogo Hubt (`public/images/products/`) apresentam boa qualidade cromática e apelo visual alinhado à confeitaria artesanal. No entanto, por terem origens diversas, variam em resolução, proporção e densidade de detalhes. 

Para assegurar uma experiência premium e fluida em dispositivos móveis (375px), tablets (768px) e desktops (1280px), recomenda-se adotar o padrão de layout **`object-fit: cover`** com alinhamento focal individualizado (`object-position`) e tratamentos não destrutivos de nitidez e balanço de cor.

---

## 2. Análise Item a Item e Recomendações de Tratamento

| Arquivo | Tamanho (Bytes) | Nitidez Aparente & Enquadramento | Proporção / Risco de Corte | Tratamento Recomendado & `object-position` | Prioridade |
|---|---|---|---|---|---|
| `bolo-floresta-negra.jpg` | 74.696 | Boa nitidez central; destaque excelente para cerejas e chantilly. | Proporção equilibrada (retangular horizontal); baixo risco de corte. | Leve realce de contraste (+5%) e nitidez moderada (Unsharp Mask 1.0px). `object-position: center center`. | **Alta** (Destaque principal) |
| `bolo-de-brigadeiro.jpg` | 88.231 | Excelente definição do granulado e cobertura de brigadeiro. | Formato padrão de vitrine; excelente leitura em mobile. | Ajuste sutil de brilho nas sombras para evidenciar textura do chocolate. `object-position: center 45%`. | **Alta** (Destaque) |
| `torta-de-morango.jpg` | 66.039 | Boa disposição dos morangos na superfície; leve granulação nas bordas. | Composição centralizada; bom comportamento em grid. | Correção leve de saturação de vermelhos (+8%) para realçar o brilho da fruta. `object-position: center center`. | **Alta** (Destaque) |
| `cheesecake-de-amora.jpg` | 59.232 | Textura cremosa visível, cobertura de amora bem contrastada. | Formato adequado; leitura clara em cards compactos. | Leve aumento de nitidez para realçar as sementes da amora. `object-position: center 50%`. | **Alta** (Destaque) |
| `bolo-de-abacaxi.jpg` | 56.811 | Boa iluminação natural; camadas de recheio visíveis. | Ligeiramente descentralizado para a esquerda. | Crop focal centralizado e ajuste de balanço de branco (aquecer levemente). `object-position: 52% center`. | **Média** |
| `bolo-de-doce-de-leite-com-morango.jpg` | 67.168 | Excelente contraste entre o doce de leite e o vermelho do morango. | Enquadramento amplo. | Manter proporção original com `object-fit: cover`. `object-position: center 48%`. | **Média** |
| `bolo-de-kit-kat-com-morango.jpg` | 63.288 | Alta complexidade visual (barreiras de Kit-Kat e topo decorado). | Requer atenção em 375px para não ocultar os detalhes laterais. | Aplicar padding interno no card ou `object-fit: contain` opcional se houver risco de perda das bordas. `object-position: center center`. | **Alta** |
| `bolo-de-leite-ninho.jpg` | 46.530 | Boa visibilidade das raspas de chocolate branco e pó de ninho. | Imagem mais leve; resolução menor que as demais. | **Risco de ampliação excessiva em telas grandes (1280px):** upscale por IA (Real-ESRGAN 2x) recomendado para evitar serrilhado. `object-position: center 50%`. | **Alta** |
| `bolo-mil-folhas.jpg` | 212.084 | O arquivo mais pesado do diretório; excelente resolução e nitidez. | Formato ideal; altíssima fidelidade de camadas. | Redimensionamento para formato final otimizado (WebP/JPG máx. 1200px largura) para ganho de performance LCP. `object-position: center center`. | **Baixa** (Performance) |
| `bolo-rigo.jpg` | 33.310 | Nitidez mediana; arquivo mais leve e com menor faixa dinâmica. | **Risco de ampliação em desktop:** suporta redução e exibição em mobile, mas pode apresentar perda de nitidez em telas retina (1280px+). | Aplicar sharp moderado e evitar upscale forçado. `object-position: center center`. | **Média** |
| `bolo-trufado.jpg` | 54.477 | Bom contraste nas texturas de trufa de chocolate. | Enquadramento fechado, excelente para cards de menu. | Ajuste fino de curvas (midtones) para destacar o brilho da ganache. `object-position: center 50%`. | **Média** |
| `bolo-de-morango-com-cobertura-de-chantilly.jpg` | 52.299 | Boa nitidez no chantilly; leve estouro de luz nas áreas brancas (highlights). | Composição padrão. | Recuperação de highlights (-10% altas luzes) para preservar os detalhes do chantilly. `object-position: center center`. | **Média** |
| `bolo-de-nozes.jpg` | 70.983 | Excelente definição das nozes caramelizadas no topo. | Enquadramento estável. | Realce de contraste tonal. `object-position: center 45%`. | **Média** |

---

## 3. Alertas sobre Imagens com Restrição de Ampliação

1. **`bolo-de-leite-ninho.jpg` (46 KB) e `bolo-rigo.jpg` (33 KB):**
   - Possuem menor resolução nativa em comparação ao `bolo-mil-folhas.jpg` (212 KB).
   - **Risco:** Ao serem esticadas em monitores ultrawide ou de alta densidade de pixels (1280px+), podem exibir leve suavização (softness) ou artefatos de compressão JPEG originais.
   - **Mitigação:** Limitar a largura máxima de renderização no CSS do card (`max-width: 100%`) e aplicar filtro de nitidez não destrutivo. Evitar upscale mecânico grosseiro.

---

## 4. Recomendações Finais de Pipeline e Formatos

- **Formatos Finais:** Manter em JPEG otimizado (qualidade 85) ou converter para **WebP** com fallback, reduzindo o peso médio em ~40% sem perda perceptível de qualidade.
- **Responsividade (375 / 768 / 1280 px):** Garantir que o container do card utilize `aspect-ratio` fixo (ex.: `4/3` ou `1/1`) combinado com `overflow: hidden` e `object-fit: cover`, prevenindo qualquer distorção geométrica independentemente da tela.
