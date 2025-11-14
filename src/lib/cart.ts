export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  size?: string;
  image?: string;
}

export function subtotal(cart: CartItem[]) {
  return cart.reduce((s, item) => s + item.price * item.qty, 0);
}

export function parseCart(raw: string | null): CartItem[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is CartItem =>
        typeof item === "object" && item !== null &&
        typeof (item as CartItem).id === "string" &&
        typeof (item as CartItem).name === "string" &&
        typeof (item as CartItem).price === "number" &&
        typeof (item as CartItem).qty === "number")
      .map((item) => ({ ...item, qty: Math.max(1, Math.round(item.qty)) }));
  } catch {
    return [];
  }
}

export function serializeCart(cart: CartItem[]) {
  return JSON.stringify(cart);
}
