export type MenuCategoryId =
  | "bolos"
  | "doces"
  | "docinhos"
  | "tortas-doces"
  | "salgados"
  | "sorvetes-acai"
  | "bebidas";

export type MenuItem = {
  slug: string;
  name: string;
  description?: string;
  image: string | null;
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

const imageMap: Record<string, string> = {
  "bolo-floresta-negra": "/images/products/bolo-floresta-negra.jpg",
  "bolo-de-nozes": "/images/products/bolo-de-nozes.jpg",
  "bolo-de-brigadeiro": "/images/products/bolo-de-brigadeiro.jpg",
  "bolo-de-leite-ninho": "/images/products/bolo-de-leite-ninho.jpg",
  "bolo-rigo": "/images/products/bolo-rigo.jpg",
  "bolo-de-doce-de-leite-com-morango": "/images/products/bolo-de-doce-de-leite-com-morango.jpg",
  "bolo-de-abacaxi": "/images/products/bolo-de-abacaxi.jpg",
  "bolo-mil-folhas": "/images/products/bolo-mil-folhas.jpg",
  "bolo-trufado": "/images/products/bolo-trufado.jpg",
  "bolo-de-kit-kat-com-morango": "/images/products/bolo-de-kit-kat-com-morango.jpg",
  "bolo-de-morango-com-cobertura-de-chantilly": "/images/products/bolo-de-morango-com-cobertura-de-chantilly.jpg",
  "torta-de-morango": "/images/products/torta-de-morango.jpg",
  "cheesecake-de-amora": "/images/products/cheesecake-de-amora.jpg",
};

const item = (name: string, description?: string, availabilityNote?: string): MenuItem => {
  const slug = slugify(name);
  return {
    slug,
    name,
    ...(description ? { description } : {}),
    image: imageMap[slug] || null,
    ...(availabilityNote ? { availabilityNote } : {}),
  };
};

export const menuCategories: readonly MenuCategory[] = [
  {
    id: "bolos",
    name: "Bolos",
    servingNote: "Serve aproximadamente 12 pessoas · sob consulta",
    items: [
      item("Bolo Floresta Negra", "Massa de chocolate, recheio de chantilly e cereja"),
      item("Bolo de Nozes", "Massa branca, doce de leite, nozes, cobertura de marshmallow"),
      item("Bolo de Brigadeiro", "Massa de chocolate, brigadeiro mole, granulado"),
      item("Bolo de Leite Ninho", "Massa branca, creme de leite ninho, raspas de chocolate branco"),
      item("Bolo Rigo", "Pão de ló de chocolate, mousse de chocolate, ganache"),
      ...["Bolo de Doce de Leite com Morango", "Bolo de Abacaxi", "Bolo de Abacaxi com Coco", "Bolo de Limão", "Bolo de Chocolate com Morango", "Bolo Diplomata", "Bolo de Doce de Leite com Ameixa", "Bolo Folhado de Morango", "Bolo Floresta Branca", "Bolo de Frutas", "Bolo de Kit-Kat", "Bolo de Creme de Leite Ninho", "Bolo Maracolate", "Bolo de Maracujá", "Bolo Mil Folhas", "Bolo de Morango", "Bolo Paris", "Bolo de Creme de Coco", "Bolo Sonho de Valsa", "Bolo Trufado", "Bolo de Kit-Kat com Morango", "Bolo de Morango com Cobertura de Chantilly"].map((name) => item(name)),
    ],
  },
  {
    id: "doces",
    name: "Doces",
    servingNote: "Unidade · sob consulta",
    items: [
      ...["Bolo de Brigadeiro", "Bolo de Nozes", "Bolo Prestígio", "Bolo Rigo", "Bolo de Leite Ninho", "Bolo Mil Folhas", "Bomba de Baunilha", "Bomba de Chocolate", "Bomba de Doce de Leite", "Cheesecake de Amora", "Cheesecake de Goiabada", "Cheesecake de Doce de Leite", "Cheesecake de Chocolate", "Cheesecake de Morango", "Cheesecake de Oreo", "Pudim de Leite Condensado", "Torta de Morango", "Torta de Limão", "Torta Holandesa", "Torta Paçoquinha", "Bolo Red Velvet", "Bolo Trufado", "Bolo de Coco", "Bolo Floresta Negra", "Quindim", "Torta Negresco com Limão", "Beijão", "Brigadeirão", "Carolina de Doce de Leite", "Coxinha de Brigadeiro com Morango", "Pirulito de Brigadeiro", "Mousse de Chocolate", "Mousse de Maracujá", "Pavê de Morango", "Pavê Tradicional", "Canudo de Doce de Leite", "Espeto de Morango com Chocolate", "Pote Negresco com Limão", "Nega Maluca Grande", "Camafeu de Nozes Grande", "Alfajor"].map((name) => item(name)),
    ],
  },
  { id: "docinhos", name: "Docinhos", servingNote: "Sob consulta", items: ["Beijinho", "Brigadeiro", "Brigadeiro de Colher", "Cone de Doce de Leite", "Casadinho", "Dan Top", "Camafeu de Nozes", "Nega Maluca Pequena", "Bombom de Brigadeiro", "Bombom Negresco", "Bombom de Prestígio", "Bicho de Pé", "Cajuzinho", "Olho de Sogra"].map((name) => item(name)) },
  { id: "tortas-doces", name: "Tortas doces", servingNote: "8 fatias · sob consulta", items: ["Cheesecake de Amora", "Pudim de Leite Condensado", "Torta Dois Sabores", "Torta Paçoquinha", "Torta de Morango", "Torta Holandesa", "Cheesecake de Goiabada", "Torta de Limão", "Torta Negresco", "Torta de Banana Folhada", "Torta de Frutas", "Torta de Maçã Folhada", "Quindão"].map((name) => item(name)) },
  { id: "salgados", name: "Salgados", servingNote: "Sob consulta", items: [item("Empada de Palmito"), item("Bolinho de Carne"), item("Coxinha de Frango"), item("Coxinha de Frango com Catupiry"), item("Enroladinho de Salsicha"), item("Mini Salgados (30 un.)"), item("Risoles de Queijo"), item("Risoles de Presunto e Queijo"), item("Torta de Frango (fatia e inteira, 12 fatias)"), item("Bolinha de Queijo"), item("Empada de Frango"), item("Assado de Frango")] },
  { id: "sorvetes-acai", name: "Sorvetes e Açaí", servingNote: "Sorvetes 200g · sob consulta", items: ["Uva", "Pistache", "Passas ao Rum", "Papaya", "Morango", "Limão", "Leite Condensado", "Iogurte com Framboesa", "Crocante", "Coco", "Chiclete", "Cereja", "Menta com Flocos", "Maracujá", "Maçã Verde", "Tangerina", "Creme", "Flocos", "Chocolate", "Banana", "Abacaxi"].map((name) => item(name, undefined, "Sorvete 200g" )).concat([item("Açaí com Morango", undefined, "250g + complementos")]) },
  { id: "bebidas", name: "Bebidas", servingNote: "Sob consulta", items: ["Coca-Cola", "Guaraná Antarctica", "Fanta", "Schweppes", "Sufresh", "Água mineral", "Água com gás", "Água de coco", "H2OH!", "Cerveja Skol", "Cerveja Itaipava", "Água tônica", "Café expresso"].map((name) => item(name)) },
] as const;

export const featuredMenuItems = [
  "bolo-floresta-negra",
  "bolo-de-brigadeiro",
  "torta-de-morango",
  "cheesecake-de-amora",
] as const;
