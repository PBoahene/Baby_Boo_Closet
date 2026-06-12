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
    <section className="py-16 md:py-24 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Portfolio
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Explore our diverse collection of custom clothing and personalized apparel creations
          </p>
        </div>

        <div className="flex justify-center mb-12 overflow-x-auto pb-2">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="inline-flex bg-gray-100 gap-1 p-1 rounded-lg">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm text-gray-500 hover:text-gray-900 transition-colors rounded-md"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {filteredItems
            .filter((item) => item.featured)
            .slice(0, 3)
            .map((item) => (
              <Card
                key={item.id}
                className="border-gray-200 bg-white shadow-sm overflow-hidden group cursor-pointer hover:shadow-md transition-all"
              >
                <div className="relative overflow-hidden aspect-video bg-gray-100">
                  <div className="w-full h-full flex items-center justify-center">
                    <Eye className="h-8 w-8 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <CardContent className="pt-6 space-y-3">
                  <Badge className="w-fit bg-gray-100 text-gray-700 hover:bg-gray-200 border-none">{item.category}</Badge>
                  <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
        </div>

        {filteredItems.filter((item) => !item.featured).length > 0 && (
          <div className="space-y-8">
            <h3 className="text-xl font-bold text-gray-900">More Creations</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredItems
                .filter((item) => !item.featured)
                .map((item) => (
                  <Card
                    key={item.id}
                    className="border-gray-200 bg-white shadow-sm overflow-hidden group cursor-pointer hover:shadow-md transition-all"
                  >
                    <div className="relative overflow-hidden aspect-square bg-gray-100">
                      <div className="w-full h-full flex items-center justify-center">
                        <Eye className="h-8 w-8 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <CardContent className="pt-4 space-y-2">
                      <h3 className="font-bold text-gray-900">{item.title}</h3>
                      <p className="text-gray-500 text-xs">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
