import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Boys School Shirt - White",
      price: 45.00,
      image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=400&fit=crop",
      category: "Boys",
      featured: true
    },
    {
      id: 2,
      name: "Girls School Dress - Navy",
      price: 55.00,
      image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=400&fit=crop",
      category: "Girls",
      featured: true
    },
    {
      id: 3,
      name: "School Polo Shirt - Blue",
      price: 40.00,
      image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=400&fit=crop",
      category: "School Gears",
      featured: true
    },
    {
      id: 4,
      name: "Kids T-Shirt - Pink",
      price: 35.00,
      image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=400&fit=crop",
      category: "Girls",
      featured: true
    },
    {
      id: 5,
      name: "Boys Shorts - Khaki",
      price: 38.00,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop",
      category: "Boys",
      featured: true
    },
    {
      id: 6,
      name: "School Sweater - Gray",
      price: 60.00,
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop",
      category: "School Gears",
      featured: true
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="bg-gradient-hero bg-clip-text text-transparent">Products</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quality kids clothing designed for comfort, style, and durability
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {products.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.featured && (
                  <Badge className="absolute top-3 right-3 bg-kids-yellow text-black">
                    Featured
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                </div>
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    GH₵{product.price.toFixed(2)}
                  </span>
                  <Button size="sm" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/shop">
            <Button size="lg" className="bg-gradient-hero">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
