import test from "node:test";
import assert from "node:assert/strict";
import { getSaoPauloDate, createOrderMessage } from "../lib/orders.ts";
import { isOpenAt } from "../lib/business-hours.ts";
import { findMenuItems } from "../lib/menu-search.ts";
import { menuCategories } from "../data/menu.ts";

test("the minimum order date follows São Paulo around UTC midnight", () => {
  assert.equal(getSaoPauloDate(new Date("2026-10-23T01:00:00Z")), "2026-10-22");
  assert.equal(getSaoPauloDate(new Date("2026-10-23T03:00:00Z")), "2026-10-23");
});
test("order inquiry preserves details, accents and date without a confirmation promise", () => {
  const message = createOrderMessage({ occasion: "Aniversário", date: "2026-11-10", guests: 12, product: "Bolo inteiro", fulfillment: "Retirada na loja", notes: "  Morango & chocolate\nConsultar tamanho  " });
  assert.match(message, /10\/11\/2026/);
  assert.match(message, /Pessoas: 12/);
  assert.match(message, /Morango & chocolate\nConsultar tamanho/);
  assert.match(message, /confirmar as opções, disponibilidade e valores/);
  assert.equal(new URLSearchParams({ text: message }).get("text"), message);
});
test("opening hours use inclusive opening and exclusive closing across midnight", () => {
  const hours = { openingTime: "10:00", closingTime: "02:00" };
  for (const [time, expected] of [["09:59", false], ["10:00", true], ["23:59", true], ["00:00", true], ["01:59", true], ["02:00", false]]) {
    assert.equal(isOpenAt(new Date(`2026-10-22T${time}:00-03:00`), hours), expected, time);
  }
  assert.equal(isOpenAt(new Date("2026-10-22T15:00:00-03:00"), { openingTime: "09:00", closingTime: "18:00" }), true);
  assert.equal(isOpenAt(new Date("2026-10-22T20:00:00-03:00"), { openingTime: "09:00", closingTime: "18:00" }), false);
});
test("search finds products outside the selected category, ignoring accents", () => {
  const items = findMenuItems(menuCategories, "bolos", "acai");
  assert.ok(items.length > 0);
  assert.ok(items.some((item) => item.categoryId === "sorvetes-acai"));
  assert.equal(findMenuItems(menuCategories, "bolos", "").length, menuCategories[0].items.length);
  assert.equal(findMenuItems(menuCategories, "bolos", "qzx-not-a-product").length, 0);
});
test("products repeated across categories retain distinct keys and serving information", () => {
  const results = findMenuItems(menuCategories, "bolos", "morango");
  const keys = results.map((item) => `${item.categoryId}-${item.slug}`);
  assert.equal(new Set(keys).size, keys.length);
  assert.ok(results.some((item) => item.servingNote));
});
