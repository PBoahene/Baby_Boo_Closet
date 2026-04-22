import React from "react";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock3, Heart, ShieldCheck, Star, Users } from "lucide-react";

const Index = () => {
  const categoryLinks = [
    { label: "Boys", href: "/shop?category=Casual%20Wear", accent: "text-kids-blue" },
    { label: "Girls", href: "/shop?category=Dresses", accent: "text-kids-pink" },
    { label: "Infants", href: "/shop?category=Casual%20Wear", accent: "text-kids-yellow" },
    { label: "Underwear", href: "/shop?category=Underwear", accent: "text-primary" },
    { label: "Dresses", href: "/shop?category=Dresses", accent: "text-kids-purple" },
  ];

  return (
    <main className="min-h-screen">
      <HeroSection />

      <section className="py-8 md:py-10">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
            <h2 className="text-2xl font-bold md:text-3xl">Shop By Category</h2>
            <p className="mt-2 text-muted-foreground">Quick links to the most requested sections for parents and guardians.</p>

            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
              {categoryLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="group rounded-2xl border border-white/15 bg-card/70 px-4 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/60"
                >
                  <p className={`text-base font-semibold ${item.accent}`}>{item.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Explore styles</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-white/10 bg-card/90">
              <CardContent className="flex items-center gap-3 p-5">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">Quality Guarantee</p>
                  <p className="text-sm text-muted-foreground">Durable fabrics tested for active kids</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-card/90">
              <CardContent className="flex items-center gap-3 p-5">
                <Clock3 className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">Fast Processing</p>
                  <p className="text-sm text-muted-foreground">Orders prepared within 24-48 hours</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-card/90">
              <CardContent className="flex items-center gap-3 p-5">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">School Bulk Support</p>
                  <p className="text-sm text-muted-foreground">Dedicated support for uniforms and events</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <FeaturedProducts />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Designed around what parents care about most
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Clear sizing, easy ordering, secure payments, and dependable delivery.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-gradient-card border-white/10">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <CardTitle className="text-lg">Perfect fit for school routines</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  My daughter now has uniforms that stay neat even after many washes. Delivery was smooth and sizing was accurate.
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-kids-pink rounded-full flex items-center justify-center">
                    <Heart className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Sarah M., Parent</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-white/10">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <CardTitle className="text-lg">Reliable for class and events</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  We ordered matching shirts for the school house team and got exactly what we requested with excellent quality.
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-kids-blue rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Mrs. Johnson, Teacher</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-white/10">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <CardTitle className="text-lg">Professional service for schools</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Their team helped us standardize uniforms and parent ordering became much easier this term.
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
      

      <section className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-hero px-6 py-14 shadow-glow md:px-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Build your child wardrobe with confidence
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Discover versatile styles for school days, weekends, and special events all in one place.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/shop">
                <Button variant="secondary" size="lg" className="rounded-full px-8">
                  Shop Now
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="rounded-full border-white/70 bg-transparent text-white hover:bg-white/10">
                  Contact Our Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
