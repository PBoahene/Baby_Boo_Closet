import React from "react";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "233244495254";
const WHATSAPP_MESSAGE =
  "Hello Baby-Boo Closet, I would like to place a quick order for children's clothing.";

const WhatsAppQuickOrder = () => {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-4 z-[70] inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-[#1fb95a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/90"
      aria-label="Quick order on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Quick Order</span>
    </a>
  );
};

export default WhatsAppQuickOrder;
