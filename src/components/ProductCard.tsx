import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CartItem, parseCart, serializeCart } from "@/lib/cart";
import { formatCurrency } from "@/lib/currency";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isCustomizable?: boolean;
  colors?: string[];
  sizes?: string[];
}

const ProductCard = ({ 
  id,
  name, 
  price, 
  originalPrice, 
  image, 
  category, 
  isCustomizable = false,
  colors = [],
  sizes = []
}: ProductCardProps) => {
  const { toast } = useToast();
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  function addToCart() {
    try {
      const raw = localStorage.getItem("cart");
      const cart = parseCart(raw);

      const existing = cart.find((item) => item.id === id);
      if (existing) {
        existing.qty += 1;
      } else {
        const newItem: CartItem = {
          id,
          name,
          price,
          qty: 1,
          image,
        };
        cart.push(newItem);
      }

      localStorage.setItem("cart", serializeCart(cart));
      try {
        window.dispatchEvent(new Event("storage"));
      } catch (err) {
        // ignore
      }
      toast({ title: "Added to cart", description: `${name} has been added to your cart.` });
    } catch (err) {
      // ignore localStorage errors
    }
  }

  return (
    <Card className="group cursor-pointer overflow-hidden border-white/60 bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discount > 0 && (
              <Badge variant="destructive" className="rounded-full px-2.5">
                {discount}% OFF
              </Badge>
            )}
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-3 top-3 bg-background/85 opacity-0 transition-opacity hover:bg-background group-hover:opacity-100"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary/85">{category}</p>
              <h3 className="text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                {name}
              </h3>
            </div>
          </div>

          {colors.length > 0 && (
            <div className="flex gap-1 mb-3">
              {colors.slice(0, 4).map((color, index) => (
                <div 
                  key={index}
                  className="w-4 h-4 rounded-full border border-border"
                  style={{ backgroundColor: color }}
                />
              ))}
              {colors.length > 4 && (
                <span className="text-xs text-muted-foreground ml-1">
                  +{colors.length - 4} more
                </span>
              )}
            </div>
          )}

          {sizes.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {sizes.map((size, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {size}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">
              {formatCurrency(price)}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatCurrency(originalPrice)}
              </span>
            )}
          </div>

          <div className="flex gap-2 pt-1">
            <Button onClick={addToCart} className="h-10 flex-1 rounded-full">
              Add to Cart
            </Button>
            {isCustomizable && (
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" aria-label="Customizable item">
                <Palette className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;