export function getSaoPauloDate(date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}

export function createOrderMessage(order: { occasion: string; date: string; guests: number; product: string; fulfillment: string; notes: string }): string {
  const formattedDate = order.date.split("-").reverse().join("/");
  return ["Olá, La Floresta! Gostaria de consultar uma encomenda:", `Ocasião: ${order.occasion}`, `Data desejada: ${formattedDate}`, `Pessoas: ${order.guests}`, `Produtos: ${order.product}`, `Recebimento: ${order.fulfillment}`, order.notes.trim() ? `Observações: ${order.notes.trim()}` : "", "Podem confirmar as opções, disponibilidade e valores?"].filter(Boolean).join("\n");
}
