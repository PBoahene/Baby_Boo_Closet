import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CartItem, parseCart, serializeCart, subtotal as subtotalCart } from "@/lib/cart";

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("cart");
    setCart(parseCart(raw));
  }, []);

  function save(nextCart: CartItem[]) {
    setCart(nextCart);
    localStorage.setItem("cart", serializeCart(nextCart));
    // dispatch storage event for other tabs/components
    try {
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      // ignore
    }
  }

  function updateQty(idx: number, delta: number) {
    const copy = [...cart];
    copy[idx] = { ...copy[idx], qty: Math.max(1, copy[idx].qty + delta) };
    save(copy);
  }

  function removeItem(idx: number) {
    const copy = [...cart];
    copy.splice(idx, 1);
    save(copy);
  }

  async function proceedToCheckout() {
    if (cart.length === 0) return;

    try {
      const res = await fetch("http://localhost:4000/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, success_url: "http://localhost:5173/checkout/success?session_id={CHECKOUT_SESSION_ID}", cancel_url: "http://localhost:5173/cart" }),
      });
      const data = await res.json();
      const url = data?.url;
      if (url) {
        // Clear cart before redirecting (optional UX choice)
        localStorage.removeItem("cart");
        window.location.href = url;
      } else {
        console.error(data);
        alert("Could not create checkout session. See console for details.");
      }
    } catch (err) {
      console.error(err);
      alert("Could not create checkout session. Check server logs.");
    }
  }

  return (
    <main className="min-h-screen container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="bg-muted p-8 rounded text-center">
          <p className="text-lg mb-4">Your cart is empty.</p>
          <Link to="/">
            <Button variant="secondary">Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, idx) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg bg-white shadow-sm">
                <div className="w-full sm:w-28 h-28 bg-muted rounded overflow-hidden flex items-center justify-center">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                  ) : (
                    <div className="text-sm text-muted-foreground">No image</div>
                  )}
                </div>

                <div className="flex-1 w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      {item.size && <div className="text-sm text-muted-foreground">Size: {item.size}</div>}
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${(item.price || 0).toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">each</div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex items-center border rounded-md overflow-hidden">
                      <button onClick={() => updateQty(idx, -1)} className="px-3 py-1">-</button>
                      <div className="px-4">{item.qty || 1}</div>
                      <button onClick={() => updateQty(idx, 1)} className="px-3 py-1">+</button>
                    </div>

                    <button onClick={() => removeItem(idx)} className="text-sm text-destructive">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="p-6 rounded-lg bg-gradient-to-b from-kids-pink/10 to-kids-blue/5 border">
            <div className="mb-6">
              <div className="text-sm text-muted-foreground">Subtotal</div>
              <div className="text-2xl font-bold">${subtotalCart(cart).toFixed(2)}</div>
            </div>

            <div className="mb-4 text-sm text-muted-foreground">
              Shipping calculated at checkout.
            </div>

            <Button onClick={proceedToCheckout} className="w-full mb-3">
              Proceed to Checkout
            </Button>

            <Link to="/cart/summary">
              <Button variant="outline" className="w-full mb-3">
                View Order Summary
              </Button>
            </Link>

            <Button variant="outline" onClick={() => navigate(-1)} className="w-full">
              Continue Shopping
            </Button>
          </aside>
        </div>
      )}
    </main>
  );
};

export default Cart;
