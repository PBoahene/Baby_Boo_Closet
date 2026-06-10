import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Upload, FileText, Cog, Truck } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: Upload,
      title: "Upload Your Design",
      description: "Share your custom designs, logos, sketches, or style inspirations. Supports JPG, PNG, PDF, SVG, and AI files.",
    },
    {
      number: 2,
      icon: FileText,
      title: "Receive a Quote",
      description: "Our team reviews your request and provides a competitive quote based on garment type, quantity, and services.",
    },
    {
      number: 3,
      icon: Cog,
      title: "Production Begins",
      description: "Once approved, we start production with your custom embroidery, printing, and personalization services.",
    },
    {
      number: 4,
      icon: Truck,
      title: "Delivery to Your Door",
      description: "Fast and reliable delivery. Most orders shipped within 24-48 hours. Track your order in real-time.",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            From design to delivery, our streamlined process makes custom clothing easy
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line (hidden on mobile) */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20" />

          {/* Steps Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative">
                  {/* Arrow (desktop only) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-8 top-20 text-primary">
                      <ArrowRight className="h-6 w-6" />
                    </div>
                  )}

                  {/* Step Card */}
                  <Card className="border-white/10 bg-card/90 relative z-10 hover:border-primary/50 transition-all">
                    <CardContent className="pt-8 pb-6 space-y-4">
                      {/* Step Number Badge */}
                      <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {step.number}
                      </div>

                      {/* Icon */}
                      <div className="flex justify-center pt-4">
                        <div className="p-4 rounded-full bg-primary/10 text-primary">
                          <Icon className="h-8 w-8" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-center font-bold text-white text-lg">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-center text-gray-400 text-sm">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Mobile Arrow */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center py-3 md:hidden">
                      <ArrowRight className="h-5 w-5 text-primary/50 rotate-90" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16 p-8 rounded-lg bg-primary/10 border border-primary/20">
          <h3 className="text-2xl font-bold text-white mb-2">Ready to Get Started?</h3>
          <p className="text-gray-400 mb-6">
            Upload your designs now and let us create something amazing for you!
          </p>
          <a
            href="/custom-design"
            className="inline-block px-8 py-3 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Upload Your Design
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
