import { business } from "@/data/business";

const WHATSAPP_BASE_URL = "https://wa.me/";

/** Builds a validated wa.me URL and encodes the message with URLSearchParams. */
export function createWhatsAppUrl(message?: string): string {
  const number = business.whatsapp.number.replace(/\D/g, "");

  if (!/^\d{8,15}$/.test(number)) {
    throw new Error("Número de WhatsApp inválido.");
  }

  const url = new URL(`${WHATSAPP_BASE_URL}${number}`);
  if (message?.trim()) url.searchParams.set("text", message.trim());

  return url.toString();
}

export function createMenuInquiryUrl(itemName: string): string {
  const normalizedName = itemName.trim();
  if (!normalizedName) throw new Error("O nome do item é obrigatório.");

  return createWhatsAppUrl(`Olá! Gostaria de consultar o item: ${normalizedName}`);
}
