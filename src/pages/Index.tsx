import React from "react";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import CustomizationShowcase from "@/components/CustomizationShowcase";
import SchoolPortalSection from "@/components/SchoolPortalSection";
import ProductCustomizer from "@/components/ProductCustomizer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Star, Users } from "lucide-react";

const Index = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Products */}
      <FeaturedProducts />
      
      {/* How Customization Works */}
      <CustomizationShowcase />
      
      {/* Interactive Customizer Demo */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Try Our <span className="bg-gradient-hero bg-clip-text text-transparent">Live Designer</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how easy it is to create personalized clothing with our interactive design tool
            </p>
          </div>
          
          <ProductCustomizer />
        </div>
      </section>
      
      {/* School Portal Section */}
      <SchoolPortalSection />
      
      {/* Social Proof & Testimonials */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by <span className="bg-gradient-hero bg-clip-text text-transparent">Families Everywhere</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-gradient-card">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex text-kids-yellow">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <CardTitle className="text-lg">"Perfect for school uniforms!"</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  "The customization tool is so easy to use. My daughter loves her personalized school shirts with her name in her favorite color."
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-kids-pink rounded-full flex items-center justify-center">
                    <Heart className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Sarah M., Parent</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex text-kids-yellow">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <CardTitle className="text-lg">"Great quality and fast delivery"</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  "Ordered matching house t-shirts for our entire class. The quality is excellent and the kids love wearing them!"
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-kids-blue rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Mrs. Johnson, Teacher</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex text-kids-yellow">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <CardTitle className="text-lg">"Excellent school portal system"</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  "The school portal makes uniform ordering so much easier for parents. Great customer service and competitive pricing."
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-kids-purple rounded-full flex items-center justify-center">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">David Chen, Principal</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Create Something Special?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of happy families who trust us with their children's clothing needs
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Start Designing Now
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
