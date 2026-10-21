# Imagens de Produtos — Doceria La Floresta

As imagens oficiais foram baixadas da fonte pública oficial Hubt (`s12748`) e permanecem preservadas, sem alterações, em `public/images/originals/products/`.

## Atribuição e origem

- **Fonte oficial (JSON):** `https://storage.googleapis.com/download/storage/v1/b/hassets/o/s12748%2Fprops-2c75ec71fc5b321dd4b45c874adbc3cd.json?generation=1792436173723210&alt=media`
- **Estabelecimento:** Doceria La Floresta (São Paulo - SP)
- **Uso:** exibição local dos produtos correspondentes ao briefing, mantendo os nomes oficiais.

## Pipeline derivado

Os arquivos `.webp` em `public/images/products/` são derivados pelos comandos:

```bash
npm run images:optimize
```

O script versionado `scripts/optimize-product-images.mjs` usa Sharp localmente, sem serviços externos ou IA generativa. Ele:

- lê apenas os originais preservados;
- normaliza o maior eixo para até 1024 px;
- usa WebP quality 88 e chroma subsampling 4:4:4;
- aplica somente sharpen leve;
- remove metadados do arquivo derivado por não chamar `withMetadata()`;
- não altera saturação ou brilho, pois os relatórios não justificam uma correção global uniforme.

Os originais possuem no máximo 512 px no maior eixo. Portanto, o redimensionamento para até 1024 px é um **upscale convencional para apresentação em telas de alta densidade**: pode suavizar a exibição e permitir tratamento consistente, mas não adiciona detalhe nativo nem reconstrói informação ausente.

## Correspondências

- `bolo-floresta-negra`: Bolo Floresta Negra
- `bolo-de-nozes`: Bolo de Nozes
- `bolo-de-brigadeiro`: Bolo de Brigadeiro
- `bolo-de-leite-ninho`: Bolo de Leite Ninho
- `bolo-rigo`: Bolo Rigo
- `bolo-de-doce-de-leite-com-morango`: Bolo de Doce de Leite com Morango
- `bolo-de-abacaxi`: Bolo de Abacaxi
- `bolo-mil-folhas`: Bolo Mil Folhas — o original tem conteúdo PNG apesar da extensão histórica `.jpg`; o derivado corrige a inconsistência ao gerar WebP.
- `bolo-trufado`: Bolo Trufado
- `bolo-de-kit-kat-com-morango`: Bolo de Kit-Kat com Morango
- `bolo-de-morango-com-cobertura-de-chantilly`: Bolo de Morango com Cobertura de Chantilly
- `torta-de-morango`: Torta de Morango
- `cheesecake-de-amora`: Cheesecake de Amora

## Ilustrações geradas para lacunas do catálogo

Os itens sem fotografia oficial usam artes editoriais SVG em `public/images/generated/products/`. As sete categorias usam capas próprias em `public/images/generated/categories/`.

```bash
npm run images:generate
```

O script versionado `scripts/generate-menu-illustrations.mjs` gera deterministicamente os arquivos a partir dos slugs e categorias de `data/menu.ts`. Ele não consulta serviços externos nem tenta simular fotografias. Cada arte de produto contém a identificação visual **ILUSTRAÇÃO**, e a interface reforça **Imagem ilustrativa**. Assim, a cobertura visual do cardápio não cria uma falsa representação fotográfica do produto.

Inventário atual:

- 142 entradas distribuídas entre 7 categorias;
- 128 produtos únicos (14 entradas são repetições entre categorias);
- 46 produtos únicos com fotografia (12 da fonte oficial anterior e 34 fornecidas pelo proprietário);
- 82 produtos únicos com ilustração gerada;
- 6 capas fotográficas de categoria e 1 capa ilustrada (Tortas doces).

As ilustrações são derivadas de dados do próprio cardápio e podem ser regeneradas. Fotografias oficiais nunca são sobrescritas pelo gerador.

## Fotos fornecidas pelo proprietário

As imagens adicionadas pelo proprietário em `imagens de produtos /` são preservadas, com nomes normalizados por produto, em `public/images/originals/supplied-products/`. As versões exibidas no site ficam em `public/images/products/supplied-*.webp`.

```bash
npm run images:optimize-supplied
```

O script `scripts/optimize-supplied-product-images.mjs` aceita somente os pares cujo nome de arquivo identifica de forma explícita o produto. Ele converte localmente para WebP de até 1024 px, sem IA generativa e sem alterar a composição culinária da foto.

Também são geradas capas fotográficas de categoria em `public/images/category-covers/` para **Bolos**, **Doces**, **Docinhos**, **Salgados**, **Sorvetes e Açaí** e **Bebidas**. Fotos de variedade são usadas exclusivamente como capas de categoria, nunca para representar um produto individual. A categoria **Tortas doces** continua usando ilustração: não foi fornecida uma foto mista cuja associação fosse segura.

Fotos fornecidas que não identificam inequivocamente um item do cardápio continuam fora dos cards individuais. Isso inclui fotos de bolo com cerejas/castanhas, copo de limão com cookies e torta de limão com biscoito de chocolate; elas só podem ser usadas como capa ampla quando o contexto permite.
