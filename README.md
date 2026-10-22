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

## Vitrine e encomendas

- Busca em todo o cardápio (ignora acentos), com identificação da categoria.
- Fotos do cardápio, destaques e galeria abrem detalhes em diálogo nativo; Escape fecha.
- `components/order-builder.tsx` prepara uma consulta com data, ocasião, pessoas e preferências. O visitante revisa e envia no WhatsApp; o formulário não confirma pedidos e não salva dados.
- `lib/business-hours.ts` calcula o status com os horários de `data/business.ts`, no fuso de São Paulo.
- `public/social-preview.jpg` é a prévia de compartilhamento. Regenere com `node scripts/generate-social-preview.mjs` ao trocar logo/foto.
- Testes das regras de horário, data, busca e mensagem: `node --experimental-strip-types --test tests/customer-flow.test.mjs` (Node 22.6+).
