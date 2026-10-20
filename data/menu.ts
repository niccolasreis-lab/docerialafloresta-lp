export type MenuCategoryId =
  | "bolos"
  | "doces"
  | "docinhos"
  | "tortas-doces"
  | "salgados"
  | "sorvetes-acai"
  | "bebidas";

export type ProductImagePosition =
  | "center center"
  | "center 45%"
  | "center 48%"
  | "center 50%"
  | "52% center";

export type ProductImageFit = "cover" | "contain";

export type MenuItem = {
  slug: string;
  name: string;
  description: string;
  image: string | null;
  imagePosition?: ProductImagePosition;
  imageFit?: ProductImageFit;
  availabilityNote?: string;
};

export type MenuCategory = {
  id: MenuCategoryId;
  name: string;
  servingNote?: string;
  items: readonly MenuItem[];
};

const slugify = (name: string) =>
  name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const productImages: Record<
  string,
  { image: string; imagePosition: ProductImagePosition; imageFit?: ProductImageFit }
> = {
  "bolo-floresta-negra": { image: "/images/products/bolo-floresta-negra.webp", imagePosition: "center center" },
  "bolo-de-nozes": { image: "/images/products/bolo-de-nozes.webp", imagePosition: "center 45%" },
  "bolo-de-brigadeiro": { image: "/images/products/bolo-de-brigadeiro.webp", imagePosition: "center 45%" },
  "bolo-de-leite-ninho": { image: "/images/products/bolo-de-leite-ninho.webp", imagePosition: "center 50%" },
  "bolo-rigo": { image: "/images/products/bolo-rigo.webp", imagePosition: "center center" },
  "bolo-de-doce-de-leite-com-morango": { image: "/images/products/bolo-de-doce-de-leite-com-morango.webp", imagePosition: "center 48%" },
  "bolo-de-abacaxi": { image: "/images/products/bolo-de-abacaxi.webp", imagePosition: "52% center" },
  "bolo-mil-folhas": { image: "/images/products/bolo-mil-folhas.webp", imagePosition: "center center" },
  "bolo-trufado": { image: "/images/products/bolo-trufado.webp", imagePosition: "center 50%" },
  "bolo-de-kit-kat-com-morango": { image: "/images/products/bolo-de-kit-kat-com-morango.webp", imagePosition: "center center", imageFit: "contain" },
  "bolo-de-morango-com-cobertura-de-chantilly": { image: "/images/products/bolo-de-morango-com-cobertura-de-chantilly.webp", imagePosition: "center center" },
  "torta-de-morango": { image: "/images/products/torta-de-morango.webp", imagePosition: "center center" },
  "cheesecake-de-amora": { image: "/images/products/cheesecake-de-amora.webp", imagePosition: "center 50%" },
};

const item = (
  name: string,
  description: string,
  availabilityNote?: string,
): MenuItem => {
  const slug = slugify(name);
  const imageMetadata = productImages[slug];

  return {
    slug,
    name,
    description,
    image: imageMetadata?.image ?? null,
    ...(imageMetadata?.imagePosition ? { imagePosition: imageMetadata.imagePosition } : {}),
    ...(imageMetadata?.imageFit ? { imageFit: imageMetadata.imageFit } : {}),
    ...(availabilityNote ? { availabilityNote } : {}),
  };
};

const confirmedCakeDescriptions: Readonly<Record<string, string>> = {
  "Bolo Floresta Negra": "Massa de chocolate, recheio de chantilly e cereja",
  "Bolo de Nozes": "Massa branca, doce de leite, nozes, cobertura de marshmallow",
  "Bolo de Brigadeiro": "Massa de chocolate, brigadeiro mole, granulado",
  "Bolo de Leite Ninho": "Massa branca, creme de leite ninho, raspas de chocolate branco",
  "Bolo Rigo": "Pão de ló de chocolate, mousse de chocolate, ganache",
};

const cakeItem = (name: string) =>
  item(
    name,
    confirmedCakeDescriptions[name] ?? `${name}, opção de bolo para compartilhar em encontros e comemorações.`,
  );

const sweetItem = (name: string) =>
  item(name, `${name}, opção da categoria de doces vendida por unidade.`);

const partySweetItem = (name: string) =>
  item(name, `${name}, opção da categoria de docinhos sob consulta.`);

const pieItem = (name: string) =>
  item(name, `${name}, opção de torta doce com rendimento de 8 fatias.`);

const savoryItem = (name: string) =>
  item(name, `${name}, opção da categoria de salgados sob consulta.`);

const iceCreamItem = (name: string) =>
  item(name, `Sorvete sabor ${name}, porção de 200g sob consulta.`, "Sorvete 200g");

const beverageItem = (name: string) =>
  item(name, `${name}, bebida para acompanhar o pedido.`);

export const menuCategories: readonly MenuCategory[] = [
  {
    id: "bolos",
    name: "Bolos",
    servingNote: "Serve aproximadamente 12 pessoas · sob consulta",
    items: [
      "Bolo Floresta Negra", "Bolo de Nozes", "Bolo de Brigadeiro", "Bolo de Leite Ninho", "Bolo Rigo", "Bolo de Doce de Leite com Morango", "Bolo de Abacaxi", "Bolo de Abacaxi com Coco", "Bolo de Limão", "Bolo de Chocolate com Morango", "Bolo Diplomata", "Bolo de Doce de Leite com Ameixa", "Bolo Folhado de Morango", "Bolo Floresta Branca", "Bolo de Frutas", "Bolo de Kit-Kat", "Bolo de Creme de Leite Ninho", "Bolo Maracolate", "Bolo de Maracujá", "Bolo Mil Folhas", "Bolo de Morango", "Bolo Paris", "Bolo de Creme de Coco", "Bolo Sonho de Valsa", "Bolo Trufado", "Bolo de Kit-Kat com Morango", "Bolo de Morango com Cobertura de Chantilly",
    ].map(cakeItem),
  },
  {
    id: "doces",
    name: "Doces",
    servingNote: "Unidade · sob consulta",
    items: [
      "Bolo de Brigadeiro", "Bolo de Nozes", "Bolo Prestígio", "Bolo Rigo", "Bolo de Leite Ninho", "Bolo Mil Folhas", "Bomba de Baunilha", "Bomba de Chocolate", "Bomba de Doce de Leite", "Cheesecake de Amora", "Cheesecake de Goiabada", "Cheesecake de Doce de Leite", "Cheesecake de Chocolate", "Cheesecake de Morango", "Cheesecake de Oreo", "Pudim de Leite Condensado", "Torta de Morango", "Torta de Limão", "Torta Holandesa", "Torta Paçoquinha", "Bolo Red Velvet", "Bolo Trufado", "Bolo de Coco", "Bolo Floresta Negra", "Quindim", "Torta Negresco com Limão", "Beijão", "Brigadeirão", "Carolina de Doce de Leite", "Coxinha de Brigadeiro com Morango", "Pirulito de Brigadeiro", "Mousse de Chocolate", "Mousse de Maracujá", "Pavê de Morango", "Pavê Tradicional", "Canudo de Doce de Leite", "Espeto de Morango com Chocolate", "Pote Negresco com Limão", "Nega Maluca Grande", "Camafeu de Nozes Grande", "Alfajor",
    ].map(sweetItem),
  },
  {
    id: "docinhos",
    name: "Docinhos",
    servingNote: "Sob consulta",
    items: ["Beijinho", "Brigadeiro", "Brigadeiro de Colher", "Cone de Doce de Leite", "Casadinho", "Dan Top", "Camafeu de Nozes", "Nega Maluca Pequena", "Bombom de Brigadeiro", "Bombom Negresco", "Bombom de Prestígio", "Bicho de Pé", "Cajuzinho", "Olho de Sogra"].map(partySweetItem),
  },
  {
    id: "tortas-doces",
    name: "Tortas doces",
    servingNote: "8 fatias · sob consulta",
    items: ["Cheesecake de Amora", "Pudim de Leite Condensado", "Torta Dois Sabores", "Torta Paçoquinha", "Torta de Morango", "Torta Holandesa", "Cheesecake de Goiabada", "Torta de Limão", "Torta Negresco", "Torta de Banana Folhada", "Torta de Frutas", "Torta de Maçã Folhada", "Quindão"].map(pieItem),
  },
  {
    id: "salgados",
    name: "Salgados",
    servingNote: "Sob consulta",
    items: ["Empada de Palmito", "Bolinho de Carne", "Coxinha de Frango", "Coxinha de Frango com Catupiry", "Enroladinho de Salsicha", "Mini Salgados (30 un.)", "Risoles de Queijo", "Risoles de Presunto e Queijo", "Torta de Frango (fatia e inteira, 12 fatias)", "Bolinha de Queijo", "Empada de Frango", "Assado de Frango"].map(savoryItem),
  },
  {
    id: "sorvetes-acai",
    name: "Sorvetes e Açaí",
    servingNote: "Sorvetes 200g · sob consulta",
    items: ["Uva", "Pistache", "Passas ao Rum", "Papaya", "Morango", "Limão", "Leite Condensado", "Iogurte com Framboesa", "Crocante", "Coco", "Chiclete", "Cereja", "Menta com Flocos", "Maracujá", "Maçã Verde", "Tangerina", "Creme", "Flocos", "Chocolate", "Banana", "Abacaxi"].map(iceCreamItem).concat([
      item("Açaí com Morango", "Açaí com morango em porção de 250g, com complementos.", "250g + complementos"),
    ]),
  },
  {
    id: "bebidas",
    name: "Bebidas",
    servingNote: "Sob consulta",
    items: ["Coca-Cola", "Guaraná Antarctica", "Fanta", "Schweppes", "Sufresh", "Água mineral", "Água com gás", "Água de coco", "H2OH!", "Cerveja Skol", "Cerveja Itaipava", "Água tônica", "Café expresso"].map(beverageItem),
  },
] as const;

export const featuredMenuItems = [
  "bolo-floresta-negra",
  "bolo-de-brigadeiro",
  "torta-de-morango",
  "cheesecake-de-amora",
] as const;
