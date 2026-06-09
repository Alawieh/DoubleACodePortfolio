export const WHATSAPP_NUMBER = "96176540004"; // +961 76 540 004
export const BRAND_NAME = "Pavone.lb";
export const BRAND_TAGLINE = "Modest luxury, redefined.";

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export interface OrderLine {
  name: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}

export function buildOrderMessage(lines: OrderLine[], total: number, name?: string, phone?: string) {
  const items = lines
    .map((l) => {
      const opts = [l.size, l.color].filter(Boolean).join(" / ");
      return `• ${l.name}${opts ? ` (${opts})` : ""} × ${l.quantity} — $${(l.price * l.quantity).toFixed(2)}`;
    })
    .join("\n");
  return [
    `Hello ${BRAND_NAME} 🌸`,
    "",
    "I would like to place this order:",
    "",
    items,
    "",
    `Total: $${total.toFixed(2)}`,
    "",
    `Name: ${name ?? ""}`,
    `Phone: ${phone ?? ""}`,
    "",
    "Thank you!",
  ].join("\n");
}
