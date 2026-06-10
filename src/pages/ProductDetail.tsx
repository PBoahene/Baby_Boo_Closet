import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StarIcon, ShoppingCart, Heart, Share2 } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  description: string;
  sizes: string[];
  colors: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  specs?: Record<string, string>;
}

// Mock product data - replace with API call
const mockProducts: Record<string, Product> = {
  "school-uniform-1": {
    id: "school-uniform-1",
    name: "Premium School Uniform Set",
    price: 89.99,
    images: ["/placeholder-product.jpg", "/placeholder-product.jpg"],
    category: "School Uniforms",
    description: "High-quality school uniform set featuring durable fabric and excellent comfort. Perfect for daily wear and special occasions.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Navy", "Green", "Black"],
    rating: 4.8,
    reviews: 234,
    inStock: true,
    specs: {
      Material: "100% Cotton Blend",
      Care: "Machine wash 40°C",
      Shipping: "24-48 hours",
    },
  },
};

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = mockProducts[productId || ""] || mockProducts["school-uniform-1"];

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color");
      return;
    }

    // Add to cart logic
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity,
    };

    // Store in localStorage or state management
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));

    toast.success("Added to cart!");
    navigate("/cart");
  };

  const handleCustomize = () => {
    navigate("/custom-design");
  };

  const renderStars = (rating: number) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <StarIcon
          key={i}
          className={`h-4 w-4 ${i < Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`}
        />
      ))}
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-black pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative bg-black/40 rounded-lg overflow-hidden aspect-square flex items-center justify-center border border-white/10">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 via-kids-blue/10 to-background flex items-center justify-center">
                <span className="text-6xl font-bold text-primary/30">{product.name.charAt(0)}</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    mainImage === idx ? "border-primary" : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-kids-blue/10 flex items-center justify-center text-primary/30 font-bold text-xs">{product.name.charAt(0)}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-3">
              <Badge className="w-fit">{product.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {renderStars(product.rating)}
                  <span className="text-sm text-gray-400">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
                <Badge variant="outline">
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>

              {/* Price */}
              <p className="text-4xl font-bold text-white">₵{product.price.toFixed(2)}</p>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-lg">{product.description}</p>

            {/* Selections */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-white block mb-2">Size *</label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-semibold text-white block mb-2">Color *</label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.colors.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-semibold text-white block mb-2">Quantity</label>
                <div className="flex items-center gap-4 w-fit">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                size="lg"
                className="flex-1 gap-2"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500" : ""}`} />
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Customization CTA */}
            <Card className="border-primary/30 bg-primary/10 p-4">
              <div className="space-y-3">
                <p className="text-sm text-white font-semibold">Need this personalized?</p>
                <p className="text-sm text-gray-400">
                  Add embroidery, custom designs, or special touches to make it unique.
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleCustomize}
                >
                  Upload Your Design
                </Button>
              </div>
            </Card>

            {/* Specs */}
            <Card className="border-white/10 bg-card/90">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {Object.entries(product.specs || {}).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-400">{key}</span>
                      <span className="text-white font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reviews & Related */}
        <Tabs defaultValue="reviews" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="related">Related Products</TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="space-y-6 mt-6">
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="border-white/10 bg-card/90">
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">Customer {i + 1}</span>
                        {renderStars(5)}
                      </div>
                      <p className="text-gray-400 text-sm">
                        Great quality and excellent service. Highly recommended!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="related" className="grid md:grid-cols-3 gap-6 mt-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="border-white/10 bg-card/90 overflow-hidden hover:border-primary/50 transition-colors cursor-pointer">
                <div className="aspect-square bg-black/40" />
                <CardContent className="pt-4 space-y-2">
                  <p className="font-semibold text-white">Related Product {i + 1}</p>
                  <p className="text-primary font-bold">₵89.99</p>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    {renderStars(4.5)} (128 reviews)
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default ProductDetail;
