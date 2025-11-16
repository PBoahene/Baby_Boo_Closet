import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CartItem, parseCart, serializeCart } from "@/lib/cart";

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
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-card hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={image} 
            alt={name}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Overlay badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discount > 0 && (
              <Badge variant="destructive">
                {discount}% OFF
              </Badge>
            )}
          </div>

          {/* Heart icon */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide">{category}</p>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {name}
              </h3>
            </div>
          </div>

          {/* Color options */}
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

          {/* Sizes */}
          {sizes.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {sizes.map((size, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {size}
                </Badge>
              ))}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-primary">
              ${price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <Button onClick={addToCart} className="flex-1">
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;