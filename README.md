# Doceria La Floresta

Landing page em Next.js (App Router), TypeScript, Tailwind CSS e Framer Motion.

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Onde editar

- Contatos, horário e links sociais: `data/business.ts`
- Categorias e itens do cardápio (sem preços): `data/menu.ts`
- Cores: `tailwind.config.ts` e `app/globals.css`
- Placeholder visual do logo: `public/logo.png` (fonte editável em `public/logo-placeholder.svg`; substituir pelo logo oficial quando fornecido)
- Fotos de produtos: `public/images/`

> Horário confirmado: todos os dias, das 10:00 às 02:00 (America/Sao_Paulo).

## Imagens individuais dos produtos

O mapa `data/generated-product-images.json` associa os produtos às imagens WebP extraídas das pranchas selecionadas. Para refazer os recortes com os mesmos originais, rode `node scripts/extract-product-cards.mjs /caminho/das/pranchas`; o manifesto `scripts/product-crops.json` verifica os hashes e registra os enquadramentos. Os nomes e demais dados continuam em `data/menu.ts`.
