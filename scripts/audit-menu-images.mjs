import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { menuCategories } from "../data/menu.ts";

const publicDirectory = path.resolve("public");
const failures = [];
const uniqueProducts = new Map();

for (const category of menuCategories) {
  if (!category.image.startsWith("/images/generated/categories/") || !category.image.endsWith(".svg")) {
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
    : "/images/generated/products/";
  const expectedExtension = item.imageKind === "photo" ? ".webp" : ".svg";
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
  if (!expectedGeneratedNames.has(file)) failures.push(`Ilustração órfã: ${file}`);
  const source = await readFile(path.join(generatedProductDirectory, file), "utf8");
  if (!source.includes("ILUSTRAÇÃO") || !source.includes("não representa uma fotografia")) {
    failures.push(`Rotulagem de ilustração ausente: ${file}`);
  }
}
for (const expected of expectedGeneratedNames) {
  if (!generatedFiles.includes(expected)) failures.push(`Ilustração não gerada: ${expected}`);
}

const counts = {
  categories: menuCategories.length,
  entries: menuCategories.flatMap((category) => category.items).length,
  uniqueProducts: uniqueProducts.size,
  photos: [...uniqueProducts.values()].filter((item) => item.imageKind === "photo").length,
  illustrations: expectedGeneratedNames.size,
  categoryCovers: menuCategories.length,
};

if (counts.entries !== 142 || counts.uniqueProducts !== 128 || counts.photos !== 13 || counts.illustrations !== 115) {
  failures.push(`Inventário inesperado: ${JSON.stringify(counts)}`);
}

if (failures.length > 0) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log("Auditoria de imagens aprovada:", counts);
