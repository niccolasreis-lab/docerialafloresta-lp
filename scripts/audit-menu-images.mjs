import { access, readdir, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import sharp from "sharp";
import { menuCategories } from "../data/menu.ts";

const publicDirectory = path.resolve("public");
const failures = [];
const uniqueProducts = new Map();

for (const category of menuCategories) {
  const expectedCategoryPrefix = category.imageKind === "photo"
    ? "/images/category-covers/"
    : "/images/generated/categories/";
  const expectedCategoryExtension = category.imageKind === "photo" ? ".webp" : ".svg";
  if (!category.image.startsWith(expectedCategoryPrefix) || !category.image.endsWith(expectedCategoryExtension)) {
    failures.push(`Capa inválida para a categoria ${category.id}: ${category.image}`);
  }

  for (const item of category.items) {
    const previous = uniqueProducts.get(item.slug);
    if (previous && (previous.image !== item.image || previous.imageKind !== item.imageKind)) {
      failures.push(`Metadados divergentes para o slug repetido ${item.slug}`);
    }
    uniqueProducts.set(item.slug, item);
  }
}

const referencedPaths = [
  ...menuCategories.map((category) => category.image),
  ...[...uniqueProducts.values()].map((item) => item.image),
];

for (const image of referencedPaths) {
  const filePath = path.join(publicDirectory, image);
  try {
    await access(filePath);
    const metadata = await sharp(filePath, { failOn: "warning" }).metadata();
    if (!metadata.width || !metadata.height) failures.push(`Imagem sem dimensões: ${image}`);
  } catch (error) {
    failures.push(`Imagem ausente ou inválida: ${image} (${error.message})`);
  }
}

for (const item of uniqueProducts.values()) {
  const expectedPrefix = item.imageKind === "photo"
    ? "/images/products/"
    : "/images/generated/";
  const expectedExtension = item.imageKind === "illustration" ? ".svg" : ".webp";
  if (!item.image.startsWith(expectedPrefix) || !item.image.endsWith(expectedExtension)) {
    failures.push(`Tipo e arquivo incompatíveis em ${item.slug}: ${item.imageKind} -> ${item.image}`);
  }
}

const generatedProductDirectory = path.join(publicDirectory, "images/generated/products");
const generatedFiles = (await readdir(generatedProductDirectory)).filter((file) => file.endsWith(".svg"));
const expectedGeneratedNames = new Set(
  [...uniqueProducts.values()]
    .filter((item) => item.imageKind === "illustration")
    .map((item) => `${item.slug}.svg`),
);

for (const file of generatedFiles) {
  if (!expectedGeneratedNames.has(file)) continue;
  const source = await readFile(path.join(generatedProductDirectory, file), "utf8");
  if (!source.includes("ILUSTRAÇÃO") || !source.includes("não representa uma fotografia")) {
    failures.push(`Rotulagem de ilustração ausente: ${file}`);
  }
}
for (const expected of expectedGeneratedNames) {
  if (!generatedFiles.includes(expected)) failures.push(`Ilustração não gerada: ${expected}`);
}

const generatedHashes = new Map();
for (const file of generatedFiles) {
  const hash = createHash("sha256")
    .update(await readFile(path.join(generatedProductDirectory, file)))
    .digest("hex");
  const existing = generatedHashes.get(hash);
  if (existing) failures.push(`Ilustrações provisórias reutilizadas: ${existing} e ${file}`);
  generatedHashes.set(hash, file);
}

const cropManifest = JSON.parse(await readFile("scripts/product-crops.json", "utf8"));
const generatedItems = [...uniqueProducts.values()].filter((item) => item.imageKind === "generated" && item.image.startsWith("/images/generated/products/"));
if (cropManifest.length !== 82 || generatedItems.length !== 82) failures.push("Esperados 82 produtos recortados individualmente.");
const rasterHashes = new Set();
for (const crop of cropManifest) {
  const item = uniqueProducts.get(crop.slug);
  if (!item || item.name !== crop.name || item.imageKind !== "generated" || item.image !== `/images/generated/products/${crop.slug}.webp` || item.imageFit !== "contain") {
    failures.push(`Correspondência incorreta para ${crop.name}`);
    continue;
  }
  const bytes = await readFile(path.join(publicDirectory, item.image));
  const hash = createHash("sha256").update(bytes).digest("hex");
  if (rasterHashes.has(hash)) failures.push(`Recorte duplicado: ${crop.name}`);
  rasterHashes.add(hash);
  const metadata = await sharp(bytes).metadata();
  if (metadata.width !== crop.crop.width || metadata.height !== crop.crop.height) failures.push(`Dimensões do recorte divergentes: ${crop.name}`);
}

const refreshed = JSON.parse(await readFile("data/refreshed-product-images.json", "utf8"));
if (Object.keys(refreshed).length !== 12) failures.push("Esperadas 12 imagens antigas renovadas.");
for (const [slug, replacement] of Object.entries(refreshed)) {
  const item = uniqueProducts.get(slug);
  if (!item || item.name !== replacement.name || item.image !== replacement.image || item.imageKind !== "generated" || item.imageFit !== "contain") failures.push(`Substituição incorreta: ${slug}`);
  await access(path.join(publicDirectory, replacement.original));
  const metadata = await sharp(path.join(publicDirectory, replacement.image)).metadata();
  if (metadata.width !== 1024 || metadata.height !== 1024) failures.push(`Nova imagem sem resolução esperada: ${slug}`);
}

const counts = {
  categories: menuCategories.length,
  entries: menuCategories.flatMap((category) => category.items).length,
  uniqueProducts: uniqueProducts.size,
  photos: [...uniqueProducts.values()].filter((item) => item.imageKind === "photo").length,
  illustrations: expectedGeneratedNames.size,
  generated: [...uniqueProducts.values()].filter((item) => item.imageKind === "generated").length,
  categoryCovers: menuCategories.length,
};

if (counts.entries !== 142 || counts.uniqueProducts !== 128 || counts.photos < 13 || counts.illustrations + counts.generated + counts.photos !== counts.uniqueProducts) {
  failures.push(`Inventário inesperado: ${JSON.stringify(counts)}`);
}

if (failures.length > 0) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log("Auditoria de imagens aprovada:", counts);
