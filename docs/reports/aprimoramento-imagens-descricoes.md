# Implementação — aprimoramento de imagens e descrições

Data: 20/10/2026

## Pipeline

- Os 13 arquivos oficiais foram copiados sem modificação para `public/images/originals/products/`.
- `scripts/optimize-product-images.mjs` gera WebP local com Sharp 0.35.5, quality 88, chroma subsampling 4:4:4, Lanczos3 e sharpen leve.
- Nenhum serviço externo, IA generativa, recorte destrutivo ou fabricação de detalhe foi usado.
- Nenhuma correção global de saturação/brilho foi aplicada: as recomendações eram específicas por foto e não justificavam alterar uniformemente o conjunto.
- Os derivados não contêm EXIF, ICC ou XMP segundo inspeção via `sharp().metadata()`.
- O maior eixo original é de até 512 px; o upscale convencional para até 1024 px melhora consistência de apresentação em telas densas, mas não cria detalhe nativo.

## Métricas por arquivo

| Imagem | Original | Bytes antes | Derivado | Bytes depois | Variação |
|---|---:|---:|---:|---:|---:|
| bolo-de-abacaxi | 410×512 | 56.811 | 820×1024 | 69.080 | +21,6% |
| bolo-de-brigadeiro | 512×341 | 88.231 | 1024×682 | 155.826 | +76,6% |
| bolo-de-doce-de-leite-com-morango | 512×341 | 67.168 | 1024×682 | 110.626 | +64,7% |
| bolo-de-kit-kat-com-morango | 512×384 | 63.288 | 1024×768 | 87.398 | +38,1% |
| bolo-de-leite-ninho | 471×512 | 46.530 | 942×1024 | 59.966 | +28,9% |
| bolo-de-morango-com-cobertura-de-chantilly | 384×512 | 52.299 | 768×1024 | 69.020 | +32,0% |
| bolo-de-nozes | 341×512 | 70.983 | 682×1024 | 95.310 | +34,3% |
| bolo-floresta-negra | 512×407 | 74.696 | 1024×814 | 125.408 | +67,9% |
| bolo-mil-folhas | 461×512 PNG | 212.084 | 922×1024 WebP | 63.042 | −70,3% |
| bolo-rigo | 288×512 | 33.310 | 576×1024 | 40.322 | +21,0% |
| bolo-trufado | 512×406 | 54.477 | 1024×812 | 77.190 | +41,7% |
| cheesecake-de-amora | 512×402 | 59.232 | 1024×804 | 86.916 | +46,7% |
| torta-de-morango | 512×341 | 66.039 | 1024×682 | 101.970 | +54,4% |

O aumento em parte dos derivados é deliberado: dimensões dobradas, chroma 4:4:4 e qualidade 88 priorizam apresentação premium. O Next/Image ainda entrega variantes responsivas menores conforme `sizes`; o caso pesado `bolo-mil-folhas` caiu 70,3%.

## Enquadramento e carregamento

- Foco tipado por produto em `data/menu.ts` e aplicado em menu, destaques, hero, encomendas e galeria.
- `contain` é usado apenas no Bolo de Kit-Kat com Morango para preservar as bordas; os demais usam `cover`.
- `sizes` varia por contexto: hero, destaques, menu, encomendas e galeria.
- Apenas o hero usa `loading="eager"` e `fetchPriority="high"`; demais imagens permanecem lazy e prioridade automática.

## Descrições

- `MenuItem.description` passou a ser obrigatória.
- Os cinco bolos confirmados preservam literalmente as composições do briefing.
- Demais descrições usam apenas nome, categoria e quantidade confirmada, sem inventar ingredientes, textura, frescor ou método de preparo.
- O fallback `Item tradicional da casa.` e a alternativa genérica dos destaques foram removidos.
- `npm run audit:descriptions` falha se a descrição voltar a ser opcional, se os fallbacks proibidos voltarem ou se chamadas diretas não fornecerem descrição.

## Validações

- `npm run audit:descriptions` — aprovado.
- `npm run lint` — aprovado.
- `npm run typecheck` — aprovado.
- `npm run build` — aprovado; `/` permanece estática.

## Limitações

- Os originais têm resolução baixa/moderada e não contêm detalhe nativo acima de 512 px no maior eixo.
- O pipeline não recupera detalhes ausentes nem corrige problemas fortes de exposição.
- Qualidade visual final e LCP real ainda devem ser medidos em navegador pelos validadores nos viewports e perfil de rede definidos no plano de QA.
