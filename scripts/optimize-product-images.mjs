import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDirectory = path.resolve("public/images/originals/products");
const outputDirectory = path.resolve("public/images/products");
const maximumDimension = 1024;

await mkdir(outputDirectory, { recursive: true });

const sourceFiles = (await readdir(sourceDirectory))
  .filter((file) => /\.(jpe?g|png)$/i.test(file))
  .sort();

if (sourceFiles.length === 0) {
  throw new Error(`Nenhuma imagem original encontrada em ${sourceDirectory}`);
}

const results = [];

for (const file of sourceFiles) {
  const sourcePath = path.join(sourceDirectory, file);
  const outputName = `${path.parse(file).name}.webp`;
  const outputPath = path.join(outputDirectory, outputName);
  const input = sharp(sourcePath, { failOn: "warning" });
  const metadata = await input.metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error(`Dimensões ausentes em ${file}`);
  }

  const shouldUpscale = Math.max(metadata.width, metadata.height) < maximumDimension;

  // Resize convencional melhora a apresentação em telas de alta densidade, mas não
  // cria detalhe nativo. O sharpen é deliberadamente leve e não usa IA generativa.
  const info = await input
    .resize({
      width: metadata.width >= metadata.height ? maximumDimension : undefined,
      height: metadata.height > metadata.width ? maximumDimension : undefined,
      fit: "inside",
      withoutEnlargement: false,
      kernel: sharp.kernel.lanczos3,
    })
    .sharpen({ sigma: 0.65, m1: 0.45, m2: 0.2, x1: 2, y2: 10, y3: 20 })
    .webp({ quality: 88, chromaSubsampling: "4:4:4", smartSubsample: true })
    .toFile(outputPath);

  const sourceStats = await stat(sourcePath);
  const outputStats = await stat(outputPath);
  results.push({
    source: file,
    sourceFormat: metadata.format,
    sourceDimensions: `${metadata.width}x${metadata.height}`,
    sourceBytes: sourceStats.size,
    output: outputName,
    outputDimensions: `${info.width}x${info.height}`,
    outputBytes: outputStats.size,
    upscaled: shouldUpscale,
  });
}

console.table(results);
