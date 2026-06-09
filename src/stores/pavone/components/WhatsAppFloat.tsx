import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/stores/pavone/lib/whatsapp";

export function WhatsAppFloat() {
  return (
    <a
      href={buildWhatsAppUrl("Hello Pavone 🌸 I'd like to order / get styling help.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Order on WhatsApp"
      className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-soft hover:scale-105 active:scale-95 transition-transform"
    >
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-40 animate-ping" />
      <MessageCircle className="relative h-6 w-6" />
    </a>
  );
}
