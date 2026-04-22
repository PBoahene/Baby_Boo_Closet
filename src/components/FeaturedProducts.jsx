import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Featured Picks</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Customer favorites this month</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Curated pieces that combine comfort, quality fabric, and a polished look for school and weekend wear.
            </p>
          </div>
          <Link to="/shop">
            <Button variant="outline" className="rounded-full">
              Browse all products <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id} className="group overflow-hidden border-white/10 bg-card/90 shadow-soft">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.featured && (
                  <Badge className="absolute left-3 top-3 bg-gradient-hero text-white">
                    Staff Pick
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <Badge variant="outline" className="border-primary/35 text-xs text-primary">
                    {product.category}
                  </Badge>
                  <span className="text-xs font-medium text-muted-foreground">In Stock</span>
                </div>
                <h3 className="mb-3 text-lg font-semibold">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">
                    GH₵{product.price.toFixed(2)}
                  </span>
                  <Button size="sm" className="rounded-full">
                    View Item
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
