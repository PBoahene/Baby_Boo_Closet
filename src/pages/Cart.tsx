import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { CartItem, parseCart, serializeCart, subtotal as subtotalCart } from "@/lib/cart";
import { formatCurrency } from "@/lib/currency";

const FREE_DELIVERY_THRESHOLD = 300;

const CartImage = ({ item }: { item: CartItem }) => {
  const [failed, setFailed] = useState(false);
  if (item.image && !failed) {
    return <img src={item.image} alt="" className="h-full w-full object-cover" onError={() => setFailed(true)} />;
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 to-kids-pink/10">
      <span className="font-logo text-3xl font-bold text-[#B57BEF]/60">{item.name.charAt(0)}</span>
    </div>
  );
};

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(parseCart(localStorage.getItem("cart")));
  }, []);

  function save(nextCart: CartItem[]) {
    setCart(nextCart);
    try {
      localStorage.setItem("cart", serializeCart(nextCart));
      window.dispatchEvent(new Event("storage"));
    } catch {
      // ignore storage errors
    }
  }

  function updateQty(idx: number, delta: number) {
    const copy = [...cart];
    copy[idx] = { ...copy[idx], qty: Math.max(1, copy[idx].qty + delta) };
    save(copy);
  }

  function removeItem(idx: number) {
    save(cart.filter((_, i) => i !== idx));
  }

  const subtotal = subtotalCart(cart);
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);
  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);

  if (cart.length === 0) {
    return (
      <main className="container mx-auto min-h-[60vh] px-4 py-16">
        <h1 className="border-b border-gray-200 pb-5 text-2xl text-gray-900">My cart</h1>
        <div className="flex flex-col items-center py-20 text-center">
          <ShoppingBag className="h-12 w-12 text-gray-300" strokeWidth={1.25} />
          <p className="mt-4 text-lg text-gray-900">Your cart is empty</p>
          <p className="mt-1 text-sm text-gray-500">Find uniforms, everyday wear and essentials for your little ones.</p>
          <Link
            to="/shop"
            className="mt-6 rounded-full border border-gray-900 px-8 py-2.5 text-sm text-gray-900 hover:bg-gray-900 hover:text-white"
          >
            Continue Browsing
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto min-h-[60vh] px-4 py-10 md:py-16">
      <div className="grid gap-10 lg:grid-cols-[1fr_340px] xl:gap-16">
        <section aria-labelledby="cart-heading">
          <h1 id="cart-heading" className="border-b border-gray-200 pb-5 text-2xl text-gray-900">
            My cart <span className="text-base text-gray-500">({itemCount} {itemCount === 1 ? "item" : "items"})</span>
          </h1>

          <ul>
            {cart.map((item, idx) => (
              <li key={`${item.id}-${item.size ?? ""}`} className="flex gap-4 border-b border-gray-200 py-6 sm:gap-6">
                <Link to={`/product/${item.id}`} className="h-24 w-24 shrink-0 overflow-hidden bg-gray-50 sm:h-28 sm:w-28">
                  <CartImage item={item} />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <Link to={`/product/${item.id}`} className="text-[15px] text-gray-900 hover:underline">
                      {item.name}
                    </Link>
                    <p className="mt-1 text-[15px] text-gray-500">{formatCurrency(item.price)}</p>
                    {item.size && <p className="mt-1 text-sm text-gray-500">Size: {item.size}</p>}
                  </div>

                  <div className="flex items-center gap-3 sm:gap-10">
                    <div className="flex h-9 items-center border border-gray-400">
                      <button
                        onClick={() => updateQty(idx, -1)}
                        disabled={item.qty <= 1}
                        className="flex h-full w-9 items-center justify-center text-gray-700 disabled:text-gray-300"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm" aria-live="polite">{item.qty}</span>
                      <button
                        onClick={() => updateQty(idx, 1)}
                        className="flex h-full w-9 items-center justify-center text-gray-700"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="w-20 text-right text-[15px] text-gray-900 sm:w-24">
                      {formatCurrency(item.price * item.qty)}
                    </span>
                    <button
                      onClick={() => removeItem(idx)}
                      className="text-gray-400 hover:text-gray-900"
                      aria-label={`Remove ${item.name}`}
                    >
                      <X className="h-5 w-5" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <Link to="/shop" className="mt-6 inline-block text-sm text-gray-900 underline underline-offset-4">
            Continue shopping
          </Link>
        </section>

        <aside aria-labelledby="summary-heading" className="h-fit lg:sticky lg:top-40">
          <h2 id="summary-heading" className="border-b border-gray-200 pb-5 text-2xl text-gray-900">Order summary</h2>

          <div className="space-y-3 border-b border-gray-200 py-5 text-[15px]">
            <div className="flex justify-between">
              <span className="text-gray-700">Subtotal</span>
              <span className="text-gray-900">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Delivery</span>
              <span className="text-gray-900">{remaining === 0 ? "Free" : "Calculated at checkout"}</span>
            </div>
            <div className="pt-1">
              <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-2 text-xs text-gray-500">
                {remaining === 0
                  ? "You've unlocked free delivery."
                  : `Add ${formatCurrency(remaining)} more for free delivery.`}
              </p>
            </div>
          </div>

          <div className="flex justify-between py-5 text-xl text-gray-900">
            <span>Total</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full rounded-full bg-gray-900 py-3.5 text-[15px] font-medium text-white transition hover:bg-gray-800"
          >
            Checkout
          </button>
          <Link
            to="/cart/summary"
            className="mt-3 block w-full rounded-full border border-gray-900 py-3 text-center text-[15px] text-gray-900 hover:bg-gray-50"
          >
            View order summary
          </Link>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-sm text-gray-500">
            <Lock className="h-3.5 w-3.5" /> Secure checkout · Mobile Money accepted
          </p>
        </aside>
      </div>
    </main>
  );
};

export default Cart;
