/** Extract the user-selected product regions; no regeneration or invented detail. */
import sharp from "sharp";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const sourceDirectory = process.argv[2];
if (!sourceDirectory) throw new Error("Informe a pasta com as seis pranchas originais.");
const crops = JSON.parse(await readFile(new URL("./product-crops.json", import.meta.url), "utf8"));
const outputDirectory = path.resolve("public/images/generated/products");
await mkdir(outputDirectory, { recursive: true });
const sources = new Map();
const mapping = {};
for (const item of crops) {
  let input = sources.get(item.source);
  if (!input) {
    input = await readFile(path.join(sourceDirectory, item.source));
    if (createHash("sha256").update(input).digest("hex") !== item.sourceSha256) throw new Error(`Prancha diferente da aprovada: ${item.source}`);
    sources.set(item.source, input);
  }
  await sharp(input).extract(item.crop).webp({ quality: 92, effort: 6 }).toFile(path.join(outputDirectory, `${item.slug}.webp`));
  mapping[item.slug] = `/images/generated/products/${item.slug}.webp`;
}
if (Object.keys(mapping).length !== 82) throw new Error("Esperados 82 produtos únicos.");
await writeFile("data/generated-product-images.json", JSON.stringify(mapping, null, 2) + "\n");
console.log(`Extraídos ${Object.keys(mapping).length} produtos de ${sources.size} pranchas.`);
