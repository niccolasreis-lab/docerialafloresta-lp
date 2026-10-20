import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../data/menu.ts", import.meta.url), "utf8");
const forbiddenDescriptions = [
  "Item tradicional da casa.",
  "Deliciosa opção tradicional da nossa vitrine.",
];

for (const description of forbiddenDescriptions) {
  if (source.includes(description)) {
    throw new Error(`Descrição genérica proibida encontrada: ${description}`);
  }
}

if (/description\?\s*:/.test(source)) {
  throw new Error("MenuItem.description não pode ser opcional.");
}

if (!/description:\s*string;/.test(source)) {
  throw new Error("MenuItem.description deve ser uma string obrigatória.");
}

const helperNames = [
  "cakeItem",
  "sweetItem",
  "partySweetItem",
  "pieItem",
  "savoryItem",
  "iceCreamItem",
  "beverageItem",
];
for (const helperName of helperNames) {
  if (!source.includes(`const ${helperName}`)) {
    throw new Error(`Fábrica de descrições ausente: ${helperName}`);
  }
}

const directItemCalls = [...source.matchAll(/\bitem\(([^\n]+)\)/g)];
for (const match of directItemCalls) {
  if (!match[1].includes(",")) {
    throw new Error(`Chamada direta sem descrição: item(${match[1]})`);
  }
}

console.log("Auditoria de descrições aprovada: descrição obrigatória e fallbacks genéricos ausentes.");
