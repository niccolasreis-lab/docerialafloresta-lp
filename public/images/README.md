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
