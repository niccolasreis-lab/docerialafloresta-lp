import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { menuCategories } from "../data/menu.ts";

const productDirectory = path.resolve("public/images/generated/products");
const categoryDirectory = path.resolve("public/images/generated/categories");

const palettes = [
  ["#981d3d", "#e8a92f", "#fff8ed", "#3f261f"],
  ["#713247", "#d89b36", "#f8e9d8", "#422a24"],
  ["#a92f52", "#efbe5d", "#fff5e8", "#4a2923"],
  ["#84364d", "#c98a2a", "#f9ead4", "#35231f"],
];

const categoryLabels = {
  bolos: "Bolos",
  doces: "Doces",
  docinhos: "Docinhos",
  "tortas-doces": "Tortas doces",
  salgados: "Salgados",
  "sorvetes-acai": "Sorvetes e Açaí",
  bebidas: "Bebidas",
};

function escapeXml(value) {
  return value.replace(/[<>&"']/g, (character) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "\"": "&quot;",
    "'": "&apos;",
  })[character]);
}

function hash(value) {
  let result = 2166136261;
  for (const character of value) {
    result ^= character.codePointAt(0);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

function wrapLabel(label, maximumLength = 23, maximumLines = 3) {
  const words = label.split(/\s+/);
  const lines = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maximumLength || !current) {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);

  if (lines.length <= maximumLines) return lines;
  const visible = lines.slice(0, maximumLines);
  visible[maximumLines - 1] = `${visible[maximumLines - 1].replace(/[. …]+$/, "")}…`;
  return visible;
}

function iconMarkup(categoryId, accent, dark) {
  const shared = `fill="none" stroke="${dark}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"`;

  switch (categoryId) {
    case "bolos":
      return `<g ${shared}><path d="M365 390h470l-50 190H415z" fill="${accent}" fill-opacity=".5"/><path d="M405 390c40-105 125-155 195-70 70-85 155-35 195 70"/><path d="M435 485h330"/><path d="M600 307v-72"/><path d="M570 235c10-28 30-43 30-72 25 25 38 48 0 72" fill="${accent}"/></g>`;
    case "doces":
      return `<g ${shared}><path d="M390 545h420"/><path d="M430 545c10-165 75-245 170-245s160 80 170 245" fill="${accent}" fill-opacity=".45"/><path d="M555 300c0-52 90-52 90 0"/><path d="M370 590h460"/></g>`;
    case "docinhos":
      return `<g ${shared}><path d="M420 520c0-120 75-205 180-205s180 85 180 205" fill="${accent}" fill-opacity=".55"/><path d="M395 520h410l-40 95H435z"/><path d="M490 365l-38-58M600 315v-70M710 365l38-58"/></g>`;
    case "tortas-doces":
      return `<g ${shared}><path d="M365 565h470"/><path d="M405 540l105-240h300L705 540z" fill="${accent}" fill-opacity=".5"/><path d="M510 300l195 240M475 380h300"/><circle cx="625" cy="260" r="31" fill="${accent}"/></g>`;
    case "salgados":
      return `<g ${shared}><path d="M410 565c0-175 80-285 190-285s190 110 190 285z" fill="${accent}" fill-opacity=".5"/><path d="M465 510c85 35 185 35 270 0"/><path d="M505 405c55 20 135 20 190 0"/></g>`;
    case "sorvetes-acai":
      return `<g ${shared}><path d="M505 420h190l-55 210h-80z" fill="${accent}" fill-opacity=".45"/><circle cx="530" cy="365" r="88" fill="${accent}" fill-opacity=".55"/><circle cx="670" cy="365" r="88" fill="${accent}" fill-opacity=".35"/><circle cx="600" cy="285" r="88" fill="${accent}" fill-opacity=".7"/></g>`;
    case "bebidas":
      return `<g ${shared}><path d="M455 300h260l-30 310H485z" fill="${accent}" fill-opacity=".4"/><path d="M520 300l35-105h130"/><path d="M700 365h45c95 0 95 150-15 150h-35"/><path d="M505 460h165"/></g>`;
    default:
      return "";
  }
}

function productKind(name, categoryId) {
  const value = name.toLowerCase();
  if (/brigadeiro de colher/.test(value)) return "brigadeiro-de-colher";
  if (/brigadeiro|bicho de pé|cajuzinho|beijinho|casadinho|camafeu|bombom|nega maluca|olho de sogra/.test(value)) return "docinho";
  if (/cone|canudo|pirulito|espeto/.test(value)) return "confeitado";
  if (/bomba|carolina/.test(value)) return "bomba";
  if (/pudim|quindim|quindão/.test(value)) return "pudim";
  if (/cheesecake/.test(value)) return "cheesecake";
  if (/torta|folhada|mil folhas|pavê/.test(value)) return "torta";
  if (/mousse|pote/.test(value)) return "taça";
  if (/sorvete|açaí|uva|pistache|papaya|morango|limão|iogurte|crocante|coco|chiclete|cereja|menta|maracujá|maçã|tangerina|creme|flocos|chocolate|banana|abacaxi/.test(value) && categoryId === "sorvetes-acai") return "sorvete";
  if (categoryId === "bebidas") return "bebida";
  if (categoryId === "salgados") return /coxinha|bolinha|bolinho/.test(value) ? "salgado-redondo" : "salgado";
  return "bolo";
}

function productIconMarkup(item, categoryId, accent, dark) {
  const stroke = `fill="none" stroke="${dark}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"`;
  const value = item.name.toLowerCase();
  const kind = productKind(item.name, categoryId);
  const sprinkle = `<circle cx="520" cy="390" r="9" fill="${accent}"/><circle cx="600" cy="355" r="9" fill="${accent}"/><circle cx="680" cy="400" r="9" fill="${accent}"/>`;

  switch (kind) {
    case "brigadeiro-de-colher":
      return `<g ${stroke}><path d="M475 420h250l-32 180H507z" fill="${accent}" fill-opacity=".5"/><path d="M510 420c30-85 150-85 180 0" fill="${accent}" fill-opacity=".75"/><path d="M680 320l105-105M705 340l-30-30"/><circle cx="545" cy="395" r="8" fill="#fff8ed"/><circle cx="600" cy="375" r="8" fill="#fff8ed"/><circle cx="655" cy="400" r="8" fill="#fff8ed"/></g>`;
    case "docinho": {
      const topping = value.includes("beijinho")
        ? `<path d="M510 390l20 13M555 365l18 16M610 360l17 18M660 385l20 12M695 425l20 6" stroke="#fff8ed" stroke-width="12" stroke-linecap="round"/><path d="M600 348v-38" stroke="#617348" stroke-width="12"/><path d="M600 310l-22-23M600 310l22-23" stroke="#617348" stroke-width="10"/>`
        : value.includes("casadinho")
          ? `<path d="M485 425c28-74 102-74 115 0" stroke="#fff8ed" stroke-width="32"/><path d="M600 425c13-74 87-74 115 0" stroke="${dark}" stroke-width="32"/>`
          : value.includes("cajuzinho")
            ? `<path d="M505 438c-34-78 38-142 95-97 57-45 129 19 95 97-36 48-154 48-190 0" fill="#d89b36" stroke="#d89b36" stroke-width="18"/><path d="M695 408c40-12 54 20 25 39" stroke="#d89b36" stroke-width="18"/><path d="M535 383l20 13M575 368l18 16M620 370l16 18" stroke="#fff8ed" stroke-width="10" stroke-linecap="round"/>`
            : value.includes("olho")
              ? `<ellipse cx="600" cy="400" rx="78" ry="58" fill="${dark}"/><ellipse cx="600" cy="400" rx="39" ry="35" fill="#fff8ed"/><path d="M570 364c15-26 45-26 60 0" stroke="#fff8ed" stroke-width="14"/>`
              : value.includes("camafeu")
                ? `<ellipse cx="600" cy="405" rx="92" ry="58" fill="#d89b36" stroke="#d89b36" stroke-width="18"/><path d="M545 395l55-40 55 40" stroke="#fff8ed" stroke-width="18"/><path d="M575 378l25-18 25 18" stroke="${dark}" stroke-width="12"/>`
                : sprinkle;
      return `<g ${stroke}><path d="M425 535c0-126 78-205 175-205s175 79 175 205" fill="${accent}" fill-opacity=".5"/><path d="M405 535h390l-38 92H443z"/><path d="M490 367l-34-55M600 330v-66M710 367l34-55"/></g>${topping}`;
    }
    case "confeitado":
      return value.includes("cone")
        ? `<g ${stroke}><path d="M505 350h190l-45 260h-100z" fill="${accent}" fill-opacity=".5"/><path d="M505 350c0-105 190-105 190 0"/><path d="M535 465h130M550 535h100"/></g>${sprinkle}`
        : `<g ${stroke}><path d="M420 535h360"/><path d="M465 520c35-125 235-125 270 0" fill="${accent}" fill-opacity=".5"/><path d="M600 385V250"/><circle cx="600" cy="225" r="44" fill="${accent}" fill-opacity=".65"/></g>`;
    case "bomba":
      return `<g ${stroke}><path d="M405 540h390"/><path d="M450 525c0-145 300-145 300 0" fill="${accent}" fill-opacity=".5"/><path d="M475 440c75 42 175 42 250 0"/><path d="M510 380c55-35 125-35 180 0"/></g>`;
    case "pudim":
      return `<g ${stroke}><ellipse cx="600" cy="530" rx="205" ry="42" fill="${accent}" fill-opacity=".28"/><path d="M455 510c0-180 38-245 145-245s145 65 145 245" fill="${accent}" fill-opacity=".48"/><ellipse cx="600" cy="265" rx="145" ry="42"/><path d="M500 355c64 28 136 28 200 0"/></g>`;
    case "cheesecake":
      return `<g ${stroke}><path d="M395 560h410"/><path d="M435 540l95-245h280l-95 245z" fill="${accent}" fill-opacity=".45"/><path d="M500 370h240M470 450h210"/><circle cx="635" cy="258" r="27" fill="${accent}"/></g>`;
    case "torta":
      return `<g ${stroke}><path d="M365 560h470"/><path d="M420 535l100-235h300l-105 235z" fill="${accent}" fill-opacity=".45"/><path d="M485 405h275M455 475h275"/><path d="M520 300l195 235"/></g>`;
    case "taça":
      return `<g ${stroke}><path d="M485 290h230l-32 220H517z" fill="${accent}" fill-opacity=".45"/><path d="M600 510v100M510 625h180"/><path d="M510 370c50-35 130-35 180 0M525 440c42-30 108-30 150 0"/></g>`;
    case "sorvete":
      return `<g ${stroke}><path d="M510 435h180l-45 210h-90z" fill="${accent}" fill-opacity=".45"/><circle cx="535" cy="370" r="82" fill="${accent}" fill-opacity=".4"/><circle cx="665" cy="370" r="82" fill="${accent}" fill-opacity=".55"/><circle cx="600" cy="295" r="82" fill="${accent}" fill-opacity=".7"/></g>`;
    case "bebida":
      return `<g ${stroke}><path d="M490 285h220l-25 325H515z" fill="${accent}" fill-opacity=".35"/><path d="M535 285l35-90h100"/><path d="M525 405h150M520 500h145"/><path d="M710 355h45c78 0 78 135-10 135h-42"/></g>`;
    case "salgado-redondo":
      return `<g ${stroke}><path d="M405 555h390"/><path d="M445 535c20-175 290-175 310 0" fill="${accent}" fill-opacity=".45"/><path d="M500 435c60 28 140 28 200 0"/></g>`;
    case "salgado":
      return `<g ${stroke}><path d="M415 555h370"/><path d="M445 535c0-170 70-255 155-255s155 85 155 255" fill="${accent}" fill-opacity=".45"/><path d="M485 440c75 32 155 32 230 0"/></g>`;
    default: {
      const fruit = /morango/.test(value) ? `<circle cx="600" cy="272" r="30" fill="${accent}"/><path d="M600 242c-22-35-52-30-60-53 35 4 47 14 60 35 13-21 25-31 60-35-8 23-38 18-60 53" fill="${accent}"/>` : "";
      const chocolate = /chocolate|brigadeiro|trufado|floresta/.test(value) ? `<path d="M430 460h340" stroke="${dark}" stroke-dasharray="12 18"/>` : "";
      return `<g ${stroke}><path d="M385 570h430"/><path d="M430 550l40-220h260l40 220z" fill="${accent}" fill-opacity=".45"/><path d="M450 420h300M465 490h270"/><path d="M470 330c35-80 95-105 130-45 35-60 95-35 130 45"/></g>${fruit}${chocolate}`;
    }
  }
}

function textMarkup(lines, y, fill, size) {
  return lines.map((line, index) => (
    `<text x="600" y="${y + index * (size + 12)}" text-anchor="middle" fill="${fill}" font-family="Georgia, 'Times New Roman', serif" font-size="${size}" font-weight="700">${escapeXml(line)}</text>`
  )).join("");
}

function productSvg(item, categoryId) {
  const palette = palettes[hash(item.slug) % palettes.length];
  const [primary, accent, cream, dark] = palette;
  const lines = wrapLabel(item.name);
  const titleY = lines.length === 1 ? 722 : lines.length === 2 ? 690 : 658;
  const patternOffset = hash(`${item.slug}-pattern`) % 90;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" role="img" aria-labelledby="title description">
<title id="title">Ilustração de ${escapeXml(item.name)}</title>
<desc id="description">Arte editorial identificada como ilustração; não representa uma fotografia do produto.</desc>
<rect width="1200" height="900" fill="${cream}"/>
<circle cx="${120 + patternOffset}" cy="${100 + patternOffset}" r="250" fill="${primary}" opacity=".08"/>
<circle cx="${1090 - patternOffset}" cy="${200 + patternOffset}" r="190" fill="${accent}" opacity=".16"/>
<path d="M0 800C220 690 380 850 610 770s380-70 590 30v100H0z" fill="${primary}" opacity=".08"/>
<rect x="64" y="58" width="1072" height="784" rx="42" fill="none" stroke="${primary}" stroke-opacity=".18" stroke-width="4"/>
<g transform="translate(0 -35)">${productIconMarkup(item, categoryId, accent, dark)}</g>
${textMarkup(lines, titleY, primary, 54)}
<g transform="translate(465 808)"><rect width="270" height="42" rx="21" fill="${primary}"/><text x="135" y="28" text-anchor="middle" fill="#fff" font-family="Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="3">ILUSTRAÇÃO</text></g>
</svg>`;
}

function categorySvg(category) {
  const palette = palettes[hash(category.id) % palettes.length];
  const [primary, accent, cream, dark] = palette;
  const lines = wrapLabel(categoryLabels[category.id] ?? category.name, 16, 2);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" role="img" aria-labelledby="title description">
<title id="title">Categoria ${escapeXml(category.name)}</title>
<desc id="description">Ilustração editorial para identificar a categoria.</desc>
<rect width="800" height="800" fill="${cream}"/>
<circle cx="400" cy="330" r="285" fill="${primary}" opacity=".08"/>
<circle cx="675" cy="120" r="95" fill="${accent}" opacity=".22"/>
<g transform="translate(0 20) scale(.6667)">${iconMarkup(category.id, accent, dark)}</g>
${textMarkup(lines, 635, primary, 48)}
</svg>`;
}

await Promise.all([
  mkdir(productDirectory, { recursive: true }),
  mkdir(categoryDirectory, { recursive: true }),
]);

const uniqueItems = new Map();
for (const category of menuCategories) {
  for (const item of category.items) {
    if (item.imageKind === "illustration" && !uniqueItems.has(item.slug)) {
      uniqueItems.set(item.slug, { item, categoryId: category.id });
    }
  }
}

await Promise.all([
  ...[...uniqueItems.values()].map(({ item, categoryId }) => writeFile(
    path.join(productDirectory, `${item.slug}.svg`),
    productSvg(item, categoryId),
    "utf8",
  )),
  ...menuCategories.map((category) => writeFile(
    path.join(categoryDirectory, `${category.id}.svg`),
    categorySvg(category),
    "utf8",
  )),
]);

console.log(`Geradas ${uniqueItems.size} ilustrações de produtos e ${menuCategories.length} capas de categorias.`);
