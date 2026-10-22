# Imagens individuais nos cards

## Resultado

82 produtos únicos receberam imagens WebP individuais, extraídas das seis pranchas aprovadas. A correspondência usa o nome exato e o slug do cadastro. Cheesecake de Goiabada aparece em duas categorias, somando 83 entradas atualizadas. As 46 imagens anteriores de produtos foram preservadas.

As novas imagens usam enquadramento `contain`, para preservar o produto completo. Não exibem as legendas, divisórias ou rodapé das pranchas. Conforme solicitado pelo proprietário, os cards não mostram etiqueta de imagem ilustrativa nem menção a IA; o texto alternativo usa apenas o nome do produto. A origem permanece registrada internamente no tipo `generated`.

## Reprodutibilidade

- `scripts/product-crops.json`: nome, slug, prancha original, SHA-256 e retângulo de cada recorte.
- `scripts/extract-product-cards.mjs`: extrai os recortes e exporta o mapa de imagens; recebe a pasta das seis pranchas originais como argumento.
- `data/generated-product-images.json`: associação do slug ao arquivo individual.
- `public/images/generated/products/*.webp`: 82 arquivos finais. As pranchas completas não são baixadas pelo visitante.

As imagens recortadas mantêm a resolução disponível nas pranchas. A conversão não acrescenta detalhe que não exista na origem.

## Validação

- Inspeção visual das 82 imagens em pranchas de conferência.
- Auditoria de todas as 142 entradas: 128 produtos únicos; 46 com imagens anteriores e 82 com as novas imagens; nenhum produto continua referenciando SVG.
- Auditoria verifica nome, slug, caminho, dimensões e ausência de arquivos individuais duplicados.
- Auditoria de descrições, TypeScript e build de produção aprovados.
- Prévia local de navegador indisponível no ambiente: supervisor injeta argumentos incompatíveis com Next.js, conforme registrado anteriormente. Não houve validação interativa em navegador.
