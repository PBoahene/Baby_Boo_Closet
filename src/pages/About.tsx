import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Award, Users, Shield, Truck, Palette, School, Quote } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const stats = [
    { value: "1,200+", label: "Projects Completed" },
    { value: "5,000+", label: "Happy Clients" },
    { value: "50,000+", label: "Products Created" },
    { value: "120+", label: "Schools Served" },
  ];

  const values = [
    {
      icon: Heart,
      color: "bg-pink-500/15 text-pink-400",
      title: "Quality First",
      description: "We use only the finest, child-safe materials that meet the highest quality standards.",
    },
    {
      icon: Sparkles,
      color: "bg-blue-500/15 text-blue-400",
      title: "Personalization",
      description: "Every piece is designed with care to reflect your child's unique personality and style.",
    },
    {
      icon: Award,
      color: "bg-amber-500/15 text-amber-400",
      title: "Excellence",
      description: "We're committed to excellence in every stitch, from design to delivery.",
    },
    {
      icon: Users,
      color: "bg-purple-500/15 text-purple-400",
      title: "Community",
      description: "Building lasting relationships with families and schools across the country.",
    },
  ];

  const reasons = [
    {
      icon: Shield,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      title: "Premium Quality Materials",
      description: "All our fabrics are carefully selected for comfort, durability, and safety. We never compromise on quality.",
    },
    {
      icon: Truck,
      color: "text-sky-400",
      bg: "bg-sky-500/10",
      title: "Fast & Reliable Delivery",
      description: "We understand you need your orders quickly. That's why we offer rapid delivery on most items.",
    },
    {
      icon: Palette,
      color: "text-rose-400",
      bg: "bg-rose-500/10",
      title: "Easy Customization",
      description: "Our design tool makes it simple to create the perfect personalized piece for your child.",
    },
    {
      icon: School,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      title: "School Partnerships",
      description: "We work with 120+ schools to provide hassle-free uniform solutions for parents and administrators.",
    },
  ];

  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden pb-20 pt-16 md:pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-kids-blue/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted-foreground mb-6">
            <span className="h-2 w-2 rounded-full bg-primary" />
            About Us
          </div>
          <h1 className="text-4xl font-bold leading-tight md:text-6xl max-w-4xl mx-auto">
            Creating beautiful, personalized clothing for{' '}
            <span className="bg-gradient-to-r from-primary to-kids-pink bg-clip-text text-transparent">every child</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            BABY-BOO CLOSET combines traditional craftsmanship with modern technology to create customizable clothing that brings joy to kids and parents alike.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted-foreground mb-4">
                <Quote className="h-3.5 w-3.5" />
                Our Story
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                From a simple idea to a{' '}
                <span className="bg-gradient-to-r from-primary to-kids-blue bg-clip-text text-transparent">trusted name</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  BABY-BOO CLOSET was born from a simple idea: every child deserves clothing that's as unique and special as they are.
                  We started our journey with a passion for creating personalized, high-quality children's wear.
                </p>
                <p>
                  What began as a small family business has grown into a trusted name in children's fashion. We combine traditional craftsmanship
                  with modern technology to create customizable clothing that stands the test of time.
                </p>
                <p>
                  Today, we're proud to serve thousands of families and partner with numerous schools to provide comfortable, stylish,
                  and personalized clothing solutions.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-primary/20 to-transparent p-6 md:p-8 aspect-square flex flex-col justify-center">
                <p className="text-4xl md:text-5xl font-bold text-primary">5K+</p>
                <p className="mt-2 text-sm text-muted-foreground">Happy Families</p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-kids-blue/20 to-transparent p-6 md:p-8 aspect-square flex flex-col justify-center mt-8">
                <p className="text-4xl md:text-5xl font-bold text-kids-blue">120+</p>
                <p className="mt-2 text-sm text-muted-foreground">Schools Partnered</p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-kids-pink/20 to-transparent p-6 md:p-8 aspect-square flex flex-col justify-center">
                <p className="text-4xl md:text-5xl font-bold text-kids-pink">50K+</p>
                <p className="mt-2 text-sm text-muted-foreground">Products Created</p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-kids-purple/20 to-transparent p-6 md:p-8 aspect-square flex flex-col justify-center mt-8">
                <p className="text-4xl md:text-5xl font-bold text-kids-purple">8+</p>
                <p className="mt-2 text-sm text-muted-foreground">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted-foreground mb-4">
              <Award className="h-3.5 w-3.5" />
              Our Values
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              What drives{' '}
              <span className="bg-gradient-to-r from-primary to-kids-pink bg-clip-text text-transparent">everything we do</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => (
              <Card
                key={val.title}
                className="border-white/10 bg-card/90 group hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="pt-8 text-center">
                  <div className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${val.color} transition-transform group-hover:scale-110`}>
                    <val.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{val.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{val.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted-foreground mb-4">
              <Shield className="h-3.5 w-3.5" />
              Why Choose Us
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Built for families,{' '}
              <span className="bg-gradient-to-r from-kids-blue to-kids-purple bg-clip-text text-transparent">trusted by schools</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {reasons.map((item) => (
              <Card
                key={item.title}
                className="border-white/10 bg-card/90 group hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="flex items-start gap-5 p-6">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.bg} ${item.color} transition-transform group-hover:scale-110`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1.5">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-kids-pink/10 to-kids-blue/10 border border-white/10 px-6 py-14 md:px-14 md:py-20 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-kids-blue/10 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join Our Growing Family
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Experience the BABY-BOO CLOSET difference today and see why thousands of families trust us with their children's clothing needs.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/shop">
                  <Button size="lg" className="rounded-full px-8">
                    Shop Now
                  </Button>
                </Link>
                <Link to="/custom-design">
                  <Button variant="outline" size="lg" className="rounded-full border-white/20 px-8">
                    Start a Design
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
