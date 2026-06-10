import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye } from "lucide-react";

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const portfolioItems = [
    {
      id: 1,
      title: "School Uniform Sets",
      category: "school",
      image: "/placeholder-portfolio-1.jpg",
      description: "Premium quality school uniforms with custom embroidery",
      featured: true,
    },
    {
      id: 2,
      title: "Kids Underwear Collection",
      category: "underwear",
      image: "/placeholder-portfolio-2.jpg",
      description: "Comfortable and durable kids underwear",
      featured: true,
    },
    {
      id: 3,
      title: "Custom Dresses",
      category: "dresses",
      image: "/placeholder-portfolio-3.jpg",
      description: "Personalized custom dresses for special occasions",
      featured: true,
    },
    {
      id: 4,
      title: "Embroidered School Badges",
      category: "embroidery",
      image: "/placeholder-portfolio-4.jpg",
      description: "Custom embroidered school badges and logos",
      featured: false,
    },
    {
      id: 5,
      title: "Corporate Uniforms",
      category: "corporate",
      image: "/placeholder-portfolio-5.jpg",
      description: "Professional corporate uniform solutions",
      featured: false,
    },
    {
      id: 6,
      title: "Infant Wear",
      category: "infant",
      image: "/placeholder-portfolio-6.jpg",
      description: "Soft and safe infant clothing options",
      featured: false,
    },
    {
      id: 7,
      title: "Cardigan Collection",
      category: "cardigan",
      image: "/placeholder-portfolio-7.jpg",
      description: "Stylish cardigans for kids and adults",
      featured: false,
    },
    {
      id: 8,
      title: "Custom Event Wear",
      category: "dresses",
      image: "/placeholder-portfolio-8.jpg",
      description: "Personalized event and celebration wear",
      featured: false,
    },
  ];

  const categories = [
    { id: "all", label: "All Products" },
    { id: "school", label: "School Uniforms" },
    { id: "underwear", label: "Kids Underwear" },
    { id: "dresses", label: "Dresses" },
    { id: "embroidery", label: "Embroidery" },
    { id: "corporate", label: "Corporate" },
    { id: "infant", label: "Infant Wear" },
    { id: "cardigan", label: "Cardigans" },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Portfolio
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Explore our diverse collection of custom clothing and personalized apparel creations
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="inline-flex bg-transparent gap-2">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-black bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Featured Items (3 columns grid) */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {filteredItems
            .filter((item) => item.featured)
            .slice(0, 3)
            .map((item) => (
              <Card
                key={item.id}
                className="border-white/10 bg-card/90 overflow-hidden group cursor-pointer hover:border-primary/50 transition-all"
              >
                <div className="relative overflow-hidden aspect-video bg-black/40">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center">
                    <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <CardContent className="pt-6 space-y-3">
                  <Badge className="w-fit">{item.category}</Badge>
                  <h3 className="font-bold text-white text-lg">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Other Items (4 columns grid) */}
        {filteredItems.filter((item) => !item.featured).length > 0 && (
          <div className="space-y-8">
            <h3 className="text-xl font-bold text-white">More Creations</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredItems
                .filter((item) => !item.featured)
                .map((item) => (
                  <Card
                    key={item.id}
                    className="border-white/10 bg-card/90 overflow-hidden group cursor-pointer hover:border-primary/50 transition-all"
                  >
                    <div className="relative overflow-hidden aspect-square bg-black/40">
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center">
                        <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <CardContent className="pt-4 space-y-2">
                      <h3 className="font-bold text-white">{item.title}</h3>
                      <p className="text-gray-400 text-xs">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-white/10">
          {[
            { label: "Projects Completed", value: "1,200+" },
            { label: "Happy Clients", value: "5,000+" },
            { label: "Products Created", value: "50,000+" },
            { label: "Schools Served", value: "120+" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
