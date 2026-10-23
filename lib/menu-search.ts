import type { MenuCategory, MenuCategoryId } from "../data/menu";

const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

export function findMenuItems(categories: readonly MenuCategory[], activeCategory: MenuCategoryId, query: string) {
  const normalizedQuery = normalize(query);
  const selected = categories.find((category) => category.id === activeCategory) ?? categories[0];
  const candidates = (normalizedQuery ? categories : selected ? [selected] : []).flatMap((category) => category.items.map((item) => ({ ...item, categoryName: category.name, categoryId: category.id, servingNote: category.servingNote })));
  return normalizedQuery ? candidates.filter((item) => normalize(`${item.name} ${item.description} ${item.availabilityNote ?? ""}`).includes(normalizedQuery)) : candidates;
}
