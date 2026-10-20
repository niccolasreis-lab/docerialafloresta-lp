# Briefing — Landing Page Doceria La Floresta

## Objetivo
Criar uma landing page completa, responsiva e de alta conversão para a **Doceria La Floresta**, doceria tradicional de São Paulo (bairro Jaçanã), para converter visitantes — principalmente vindos do Instagram, no celular — em pedidos.

- CTA principal: **Pedir pelo WhatsApp**
- CTA secundário: **Pedir no iFood**

## Stack
- Next.js (App Router) + TypeScript + Tailwind CSS
- Framer Motion (animações sutis; respeitar `prefers-reduced-motion`)
- `next/image` com lazy loading
- SEO completo: metadata, Open Graph, schema.org (`Bakery`/`LocalBusiness` com endereço, telefone e horário)
- Mobile-first
- Sem backend: cardápio em `data/menu.ts` e dados do negócio em `data/business.ts`, fáceis de editar

## Dados reais do negócio
- Nome: Doceria La Floresta ("Doces e Sorvetes")
- Slogan base: "Mais de 20 anos de tradição em bolos, doces e salgados"
- Endereço: Avenida Guapira, 1650 - Jaçanã, São Paulo - SP, CEP 02265-002
- WhatsApp / celular: (11) 94809-4770 (`wa.me/5511948094770`)
- Telefones fixos: (11) 2249-1380 e (11) 2243-0861
- Horário: aberto todos os dias, até as 02:00 **[CONFIRMAR horário de abertura]**
- Instagram: https://www.instagram.com/doceria.lafloresta
- iFood: https://www.ifood.com.br/delivery/sao-paulo-sp/doceria-la-floresta-tucuruvi/b09689a3-352c-43a3-8387-2dd13de01ab5?UTM_Medium=share
- Preços: "sob consulta". **NÃO exibir preços**; os botões de cada item levam ao WhatsApp para consultar disponibilidade e valor.

## Identidade visual
- Logo: fundo laranja/amarelo estilo “sunburst” com o texto “La Floresta” em preto (versão do Hubt) e versão circular carmim com “La Floresta” em branco (versão do Instagram). Usar como placeholder `/public/logo.png`.
- Paleta: carmim/vermelho-framboesa (primária, igual ao logo do Instagram), creme quente (fundo), marrom-cacau (texto) e laranja-dourado (destaques). Remete a morango, chocolate e confeitaria artesanal.
- Tipografia: títulos com serifa elegante (ex.: Playfair Display), corpo em sans-serif legível (ex.: Inter ou Nunito).
- Tom de voz: acolhedor, tradicional, de bairro, “feito com carinho”; frases curtas em português do Brasil.
- Fotos: usar as imagens reais dos produtos (bolos, morangos, brigadeiros, tortas) em `/public/images`; enquanto não existirem, placeholders claramente identificados.

## Seções, nesta ordem
1. **Header fixo:** logo, âncoras (Cardápio, Encomendas, Sobre, Contato), botão WhatsApp, hambúrguer no mobile e badge “Aberto agora” calculado pelo horário.
2. **Hero:** foto de impacto (bolo com chantilly e cereja ou torta de morango), título “Doceria La Floresta”, subtítulo do slogan e CTAs WhatsApp/iFood.
3. **Faixa de confiança:** “+20 anos de tradição”, “Bolos, doces, salgados e sorvetes”, “Aberto todos os dias”, “Delivery pelo iFood”.
4. **Mais pedidos:** quatro cards com foto: Bolo Floresta Negra, Bolo de Brigadeiro, Torta de Morango e Cheesecake de Amora.
5. **Cardápio por categorias:** abas com scroll horizontal no mobile; cada item com foto ou placeholder, nome, descrição e botão “Consultar” que abre o WhatsApp com “Olá! Gostaria de consultar o item: {nome}”.
6. **Encomendas e festas:** bolos para aniversários e eventos (bolos serve ~12 pessoas), mini salgados (30 un.), tortas inteiras (8 ou 12 fatias), botão “Pedir orçamento”.
7. **Sobre:** história de tradição de bairro e doces artesanais; texto curto marcado como rascunho para revisão do dono.
8. **Como pedir:** três passos (escolha o item; chame no WhatsApp ou iFood; receba ou retire).
9. **Galeria:** 6 a 9 fotos linkando para o Instagram e botão “Seguir @doceria.lafloresta”.
10. **Localização e contato:** endereço, telefones, horário, mapa Google Maps embed da Av. Guapira, 1650 e botões WhatsApp, iFood, Instagram e Facebook.
11. **Rodapé:** logo, links, redes e copyright.

## Cardápio (`data/menu.ts`)

### Bolos (serve ~12 pessoas, preço sob consulta)
- Bolo Floresta Negra: massa de chocolate, recheio de chantilly e cereja
- Bolo de Nozes: massa branca, doce de leite, nozes, cobertura de marshmallow
- Bolo de Brigadeiro: massa de chocolate, brigadeiro mole, granulado
- Bolo de Leite Ninho: massa branca, creme de leite ninho, raspas de chocolate branco
- Bolo Rigo: pão de ló de chocolate, mousse de chocolate, ganache
- Bolo de Doce de Leite com Morango
- Bolo de Abacaxi
- Bolo de Abacaxi com Coco
- Bolo de Limão
- Bolo de Chocolate com Morango
- Bolo Diplomata
- Bolo de Doce de Leite com Ameixa
- Bolo Folhado de Morango
- Bolo Floresta Branca
- Bolo de Frutas
- Bolo de Kit-Kat
- Bolo de Creme de Leite Ninho
- Bolo Maracolate
- Bolo de Maracujá
- Bolo Mil Folhas
- Bolo de Morango
- Bolo Paris
- Bolo de Creme de Coco
- Bolo Sonho de Valsa
- Bolo Trufado
- Bolo de Kit-Kat com Morango
- Bolo de Morango com Cobertura de Chantilly

### Doces (unidade)
Bolo de Brigadeiro, Bolo de Nozes, Bolo Prestígio, Bolo Rigo, Bolo de Leite Ninho, Bolo Mil Folhas, Bomba de Baunilha, Bomba de Chocolate, Bomba de Doce de Leite, Cheesecake (amora, goiabada, doce de leite, chocolate, morango, Oreo), Pudim de Leite Condensado, Torta de Morango, Torta de Limão, Torta Holandesa, Torta Paçoquinha, Bolo Red Velvet, Bolo Trufado, Bolo de Coco, Bolo Floresta Negra, Quindim, Torta Negresco com Limão, Beijão, Brigadeirão, Carolina de Doce de Leite, Coxinha de Brigadeiro com Morango, Pirulito de Brigadeiro, Mousse (chocolate, maracujá), Pavê (morango, tradicional), Canudo de Doce de Leite, Espeto de Morango com Chocolate, Pote Negresco com Limão, Nega Maluca Grande, Camafeu de Nozes Grande, Alfajor.

### Docinhos
Beijinho, Brigadeiro, Brigadeiro de Colher, Cone de Doce de Leite, Casadinho, Dan Top, Camafeu de Nozes, Nega Maluca Pequena, Bombom de Brigadeiro, Bombom Negresco, Bombom de Prestígio, Bicho de Pé, Cajuzinho, Olho de Sogra.

### Tortas doces (8 fatias)
Cheesecake de Amora, Pudim de Leite Condensado, Torta Dois Sabores, Torta Paçoquinha, Torta de Morango, Torta Holandesa, Cheesecake de Goiabada, Torta de Limão, Torta Negresco, Torta de Banana Folhada, Torta de Frutas, Torta de Maçã Folhada, Quindão.

### Salgados
Empada de Palmito, Bolinho de Carne, Coxinha de Frango, Coxinha de Frango com Catupiry, Enroladinho de Salsicha, Mini Salgados (30 un.), Risoles de Queijo, Risoles de Presunto e Queijo, Torta de Frango (fatia e inteira, 12 fatias), Bolinha de Queijo, Empada de Frango, Assado de Frango.

### Sorvetes e Açaí (200g)
Uva, Pistache, Passas ao Rum, Papaya, Morango, Limão, Leite Condensado, Iogurte com Framboesa, Crocante, Coco, Chiclete, Cereja, Menta com Flocos, Maracujá, Maçã Verde, Tangerina, Creme, Flocos, Chocolate, Banana, Abacaxi. Açaí com Morango (250g + complementos).

### Bebidas
Refrigerantes (Coca-Cola, Guaraná Antarctica, Fanta, Schweppes, Sufresh), água (mineral, com gás, de coco, H2OH!), cervejas (Skol, Itaipava), água tônica e café expresso.

## Requisitos de UX e conversão
- Botão flutuante de WhatsApp em todas as telas.
- Links `wa.me` com mensagem pré-preenchida (URL-encoded).
- Busca/filtro rápido no cardápio.
- Contraste AA, alt em todas as imagens, foco visível.
- Lighthouse acima de 90 no mobile.
- Itens sem foto usam card com ícone/gradiente da marca; nunca bloco azul vazio.

## Entrega
- Projeto rodando com `npm run dev`.
- README curto: onde editar contato, cardápio, cores e imagens.
- Não inventar informações: tudo marcado **[CONFIRMAR]** permanece como placeholder visível.
