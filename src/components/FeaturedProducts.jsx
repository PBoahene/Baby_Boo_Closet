import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import schoolUniform from "@/assets/school-uniform.jpg";
import casualWear from "@/assets/casual-wear.jpg";

const FeaturedProducts = () => {
  const products = [
    {
      id: "1",
      name: "Custom School Polo Shirt",
      price: 24.99,
      originalPrice: 34.99,
      image: schoolUniform,
      category: "School Uniforms",
      isCustomizable: true,
      colors: ["#1e40af", "#ffffff", "#dc2626", "#059669"],
      sizes: ["XS", "S", "M", "L", "XL"]
    },
    {
      id: "2",
      name: "Personalized T-Shirt",
      price: 19.99,
      image: casualWear,
      category: "Casual Wear",
      isCustomizable: true,
      colors: ["#f59e0b", "#ec4899", "#3b82f6", "#10b981"],
      sizes: ["XS", "S", "M", "L"]
    },
    {
      id: "3",
      name: "School Pinafore Dress",
      price: 32.99,
      originalPrice: 42.99,
      image: schoolUniform,
      category: "School Uniforms",
      isCustomizable: true,
      colors: ["#1e293b", "#dc2626", "#059669"],
      sizes: ["XS", "S", "M", "L", "XL"]
    },
    {
      id: "4",
      name: "Custom Hoodie",
      price: 34.99,
      image: casualWear,
      category: "Casual Wear",
      isCustomizable: true,
      colors: ["#7c3aed", "#f59e0b", "#ef4444", "#06b6d4"],
      sizes: ["S", "M", "L", "XL"]
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Featured Products
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular customizable items, loved by families and schools nationwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="group">
            View All Products
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;