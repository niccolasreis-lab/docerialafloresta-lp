import { cp, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const suppliedDirectory = path.resolve("imagens de produtos ");
const originalsDirectory = path.resolve("public/images/originals/supplied-products");
const outputDirectory = path.resolve("public/images/products");
const categoryOutputDirectory = path.resolve("public/images/category-covers");

const categorySources = {
  bolos: "bolo de chocolate com cerejas",
  doces: "eclair mil folhas e flan caramelizado",
  docinhos: "brigadeiros beijinhos e bicho de pe",
  salgados: "salgados brasileiros dourados em prato",
  "sorvetes-acai": "acai e sorvetes artesanais",
  bebidas: "suco cafe e agua com gas",
};

// Source hints deliberately map only photos whose supplied filename identifies the product.
const imageSources = {
  "bolo-de-coco": "fatia de bolo de coco cremoso",
  "bolo-red-velvet": "fatia triangular de bolo red velvet",
  "pudim-de-leite-condensado": "mini pudim de leite condensado caramelizado",
  "torta-de-morango": "torta de morango com creme",
  "torta-de-limao": "fatia de torta de limao com merengue",
  "torta-holandesa": "fatia triangular de torta holandesa",
  "torta-pacoquinha": "fatia de torta de pacoca cremosa",
  "quindim": "quindim dourado em prato branco",
  "beijao": "beijao de coco com cravo",
  "brigadeirao": "mini brigadeirao de chocolate com granulado",
  "carolina-de-doce-de-leite": "carolina de doce de leite com chocolate",
  "coxinha-de-brigadeiro-com-morango": "coxinha de brigadeiro com morango",
  "pirulito-de-brigadeiro": "pirulito de brigadeiro com granulado",
  "mousse-de-chocolate": "mousse de chocolate em copo transparente",
  "mousse-de-maracuja": "mousse de maracuja com polpa dourada",
  "pave-de-morango": "pave de morango em camadas cremosas",
  "pave-tradicional": "pave de baunilha com ganache",
  "canudo-de-doce-de-leite": "canudo dourado de doce de leite",
  "espeto-de-morango-com-chocolate": "espetinho de morangos com chocolate amargo",
  "nega-maluca-grande": "nega maluca com cobertura brilhante",
  "camafeu-de-nozes-grande": "camafeu de nozes com fondant marfim",
  alfajor: "alfajor de chocolate com doce de leite",
  beijinho: "beijinhos de coco com cravo",
  brigadeiro: "brigadeiros artesanais em prato de marfim",
  "brigadeiro-de-colher": "brigadeiro de colher no potinho",
  "cone-de-doce-de-leite": "cones dourados de doce de leite",
  casadinho: "casadinhos bicolores de brigadeiro",
  "dan-top": "dan top de chocolate e marshmallow",
  "camafeu-de-nozes": "camafeus de nozes em fondant branco",
  "nega-maluca-pequena": "nega maluca pequena com brigadeiro",
  "bombom-de-prestigio": "bombons de prestigio com coco",
  "bicho-de-pe": "bicho de pe no acucar",
  cajuzinho: "cajuzinhos artesanais em prato marfim",
  "olho-de-sogra": "olho de sogra com coco cremoso",
};

const normalize = (value) => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/\.[^.]+$/, "")
  .replace(/[^a-z0-9]+/g, " ")
  .trim();

await Promise.all([
  mkdir(originalsDirectory, { recursive: true }),
  mkdir(outputDirectory, { recursive: true }),
  mkdir(categoryOutputDirectory, { recursive: true }),
]);
const suppliedFiles = (await readdir(suppliedDirectory)).filter((file) => /\.png$/i.test(file));
const resolved = [];

for (const [slug, hint] of Object.entries(imageSources)) {
  const matches = suppliedFiles.filter((file) => normalize(file).includes(hint));
  if (matches.length !== 1) throw new Error(`Fonte ambígua ou ausente para ${slug}: ${hint} (${matches.join(", ") || "nenhuma"})`);

  const inputName = matches[0];
  const originalName = `${slug}.png`;
  const originalPath = path.join(originalsDirectory, originalName);
  const outputPath = path.join(outputDirectory, `supplied-${slug}.webp`);

  await cp(path.join(suppliedDirectory, inputName), originalPath);
  const info = await sharp(originalPath, { failOn: "warning" })
    .resize({ width: 1024, height: 1024, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 88, chromaSubsampling: "4:4:4", smartSubsample: true })
    .toFile(outputPath);

  resolved.push({ slug, source: inputName, output: path.basename(outputPath), dimensions: `${info.width}x${info.height}` });
}

const categoryCovers = [];
for (const [categoryId, hint] of Object.entries(categorySources)) {
  const matches = suppliedFiles.filter((file) => normalize(file).includes(hint));
  if (matches.length !== 1) throw new Error(`Fonte ambígua ou ausente para capa ${categoryId}: ${hint} (${matches.join(", ") || "nenhuma"})`);

  const source = matches[0];
  const outputPath = path.join(categoryOutputDirectory, `${categoryId}.webp`);
  const info = await sharp(path.join(suppliedDirectory, source), { failOn: "warning" })
    .resize({ width: 512, height: 512, fit: "cover", position: "attention" })
    .webp({ quality: 88, chromaSubsampling: "4:4:4", smartSubsample: true })
    .toFile(outputPath);
  categoryCovers.push({ categoryId, source, output: path.basename(outputPath), dimensions: `${info.width}x${info.height}` });
}

console.table(resolved);
console.table(categoryCovers);
console.log(`Otimizadas ${resolved.length} fotos de produto e ${categoryCovers.length} capas fornecidas pelo proprietário.`);
