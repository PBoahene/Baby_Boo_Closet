import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { apiUrl } from "@/lib/config";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(apiUrl("/api/featured"))
      .then((r) => r.json())
      .then(setProducts)
      .catch(() => {});
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Featured Picks</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl text-gray-900">Customer favorites this month</h2>
            <p className="mt-2 max-w-2xl text-gray-500">
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
            <Card key={product.id} className="group overflow-hidden border-gray-200 bg-white shadow-sm">
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <div className="h-full w-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-300 font-serif">{product.name.charAt(0)}</span>
                </div>
                {product.isCustomizable && (
                  <Badge className="absolute left-3 top-3 bg-primary text-white border-none">
                    Staff Pick
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <Badge variant="outline" className="border-gray-300 text-xs text-gray-600">
                    {product.category}
                  </Badge>
                  <span className="text-xs font-medium text-gray-400">In Stock</span>
                </div>
                <h3 className="mb-3 text-lg font-semibold text-gray-900">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">
                    GH₵{product.price.toFixed(2)}
                  </span>
                  <Link to={`/product/${product.id}`}>
                    <Button size="sm" className="rounded-full">
                      View Item
                    </Button>
                  </Link>
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
