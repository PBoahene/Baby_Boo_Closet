import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, ArrowLeft, Truck, Shield, CreditCard } from "lucide-react";
import { CartItem, parseCart, subtotal as calculateSubtotal } from "@/lib/cart";

const CartSummary = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const raw = localStorage.getItem("cart");
    setCart(parseCart(raw));
  }, []);

  const subtotal = calculateSubtotal(cart);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax - discount;

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "babyboo10") {
      setDiscount(subtotal * 0.1); // 10% discount
    } else if (promoCode.toLowerCase() === "freeship") {
      setDiscount(shipping);
    } else {
      setDiscount(0);
    }
  };

  const proceedToCheckout = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          cart, 
          success_url: "http://localhost:5173/checkout/success?session_id={CHECKOUT_SESSION_ID}", 
          cancel_url: "http://localhost:5173/cart/summary" 
        }),
      });
      const data = await res.json();
      const url = data?.url;
      if (url) {
        localStorage.removeItem("cart");
        window.location.href = url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/cart">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Order Summary</h1>
            <p className="text-muted-foreground">Review your order before checkout</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Order Items ({cart.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.map((item, index) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      {item.size && <p className="text-sm text-muted-foreground">Size: {item.size}</p>}
                      <p className="text-sm text-muted-foreground">Qty: {item.qty}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${(item.price * item.qty).toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Promo Code */}
            <Card>
              <CardHeader>
                <CardTitle>Promo Code</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-md"
                  />
                  <Button onClick={applyPromoCode} variant="outline">
                    Apply
                  </Button>
                </div>
                {discount > 0 && (
                  <div className="mt-2 text-sm text-green-600">
                    Promo code applied! You saved ${discount.toFixed(2)}
                  </div>
                )}
                <div className="mt-2 text-xs text-muted-foreground">
                  Try: BABYBOO10 (10% off) or FREESHIP (Free shipping)
                </div>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-kids-blue/10 rounded-lg">
                  <Shield className="h-5 w-5 text-kids-blue" />
                  <div>
                    <p className="font-medium">Safe & Secure Delivery</p>
                    <p className="text-sm text-muted-foreground">All orders are carefully packed and tracked</p>
                  </div>
                </div>
                <div className="text-sm space-y-1">
                  <p><strong>Estimated Delivery:</strong> 3-5 business days</p>
                  <p><strong>Shipping Method:</strong> Standard Delivery</p>
                  <p><strong>Tracking:</strong> Email confirmation with tracking number</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Price Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-600" : ""}>
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                
                <Separator />
                
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Including all taxes and fees
                </div>

                <Button onClick={proceedToCheckout} className="w-full mt-4" size="lg">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Proceed to Payment
                </Button>

                <div className="text-center text-xs text-muted-foreground mt-2">
                  Secure checkout powered by Stripe
                </div>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <Card>
              <CardContent className="p-4">
                <div className="text-center space-y-2">
                  <h4 className="font-medium">Why shop with BBY-BOO CLOSET?</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span>100% Secure Payment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-blue-600" />
                      <span>Free shipping on orders $50+</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="h-4 w-4" />
                      <span>Easy 30-day returns</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;