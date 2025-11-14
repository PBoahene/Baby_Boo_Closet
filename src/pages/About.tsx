import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Award, Users, Sparkles } from "lucide-react";

const About = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About BBY-BOO CLOSET</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Creating beautiful, personalized clothing for children with love and care since day one.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Our <span className="bg-gradient-hero bg-clip-text text-transparent">Story</span>
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                BBY-BOO CLOSET was born from a simple idea: every child deserves clothing that's as unique and special as they are. 
                We started our journey with a passion for creating personalized, high-quality children's wear that brings joy to both kids and parents.
              </p>
              <p>
                What began as a small family business has grown into a trusted name in children's fashion. We combine traditional craftsmanship 
                with modern technology to create customizable clothing that stands the test of time—both in quality and style.
              </p>
              <p>
                Today, we're proud to serve thousands of families and partner with numerous schools to provide comfortable, stylish, 
                and personalized clothing solutions that make every child feel confident and special.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Our <span className="bg-gradient-hero bg-clip-text text-transparent">Values</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-kids-pink/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Quality First</h3>
                <p className="text-sm text-muted-foreground">
                  We use only the finest, child-safe materials that meet the highest quality standards.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-kids-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Personalization</h3>
                <p className="text-sm text-muted-foreground">
                  Every piece can be customized to reflect your child's unique personality and style.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-kids-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Excellence</h3>
                <p className="text-sm text-muted-foreground">
                  We're committed to excellence in every stitch, from design to delivery.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-kids-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Community</h3>
                <p className="text-sm text-muted-foreground">
                  Building lasting relationships with families and schools across the country.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Why Choose <span className="bg-gradient-hero bg-clip-text text-transparent">Us?</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-2">Premium Quality Materials</h3>
                  <p className="text-muted-foreground">
                    All our fabrics are carefully selected for comfort, durability, and safety. We never compromise on quality.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-2">Fast & Reliable Delivery</h3>
                  <p className="text-muted-foreground">
                    We understand you need your orders quickly. That's why we offer 24-hour delivery on most items.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-2">Easy Customization</h3>
                  <p className="text-muted-foreground">
                    Our user-friendly design tool makes it simple to create the perfect personalized piece for your child.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-2">School Partnerships</h3>
                  <p className="text-muted-foreground">
                    We work with 50+ schools to provide hassle-free uniform solutions for parents and administrators.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Growing Family
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Experience the BBY-BOO CLOSET difference today and see why thousands of families trust us with their children's clothing needs.
          </p>
        </div>
      </section>
    </main>
  );
};

export default About;
