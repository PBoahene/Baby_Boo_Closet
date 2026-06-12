import React from "react";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import HowItWorks from "@/components/HowItWorks";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock3, ShieldCheck, Users } from "lucide-react";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />

      <Portfolio />

      <section className="py-8 md:py-10">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-gray-200 bg-white shadow-sm">
              <CardContent className="flex items-center gap-3 p-5">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-gray-900">Quality Guarantee</p>
                  <p className="text-sm text-gray-500">Durable fabrics tested for active kids</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-gray-200 bg-white shadow-sm">
              <CardContent className="flex items-center gap-3 p-5">
                <Clock3 className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-gray-900">Fast Processing</p>
                  <p className="text-sm text-gray-500">Orders prepared within 24-48 hours</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-gray-200 bg-white shadow-sm">
              <CardContent className="flex items-center gap-3 p-5">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-gray-900">School Bulk Support</p>
                  <p className="text-sm text-gray-500">Dedicated support for uniforms and events</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <FeaturedProducts />

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl rounded-2xl bg-primary px-6 py-14 shadow-sm md:px-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Build your child wardrobe with confidence</h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">Discover versatile styles for school days, weekends, and special events all in one place.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/shop">
                <Button variant="secondary" size="lg" className="rounded-full px-8 bg-white text-primary hover:bg-gray-100 border-none">Shop Now</Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="rounded-full border-white/70 bg-transparent text-white hover:bg-white/10">Contact Our Team</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />
      <Testimonials />
    </main>
  );
};

export default Index;
