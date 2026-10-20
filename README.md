# Doceria La Floresta

Landing page em Next.js (App Router), TypeScript, Tailwind CSS e Framer Motion.

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Onde editar

- Contatos, horário, links sociais e placeholders: `data/business.ts`
- Categorias e itens do cardápio (sem preços): `data/menu.ts`
- Cores: `tailwind.config.ts` e `app/globals.css`
- Placeholder visual do logo: `public/logo.png` (fonte editável em `public/logo-placeholder.svg`; substituir pelo logo oficial quando fornecido)
- Fotos de produtos: `public/images/`

> O horário de abertura permanece visível como `[CONFIRMAR horário de abertura]` até confirmação do proprietário.
