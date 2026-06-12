import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileText, Cog, Truck } from "lucide-react";

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
    <section className="py-16 md:py-24 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            From design to delivery, our streamlined process makes custom clothing easy
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-px bg-gray-300" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative">
                  <Card className="border-gray-200 bg-white shadow-sm relative z-10 hover:shadow-md transition-all">
                    <CardContent className="pt-8 pb-6 space-y-4">
                      <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg shadow-sm">
                        {step.number}
                      </div>

                      <div className="flex justify-center pt-4">
                        <div className="p-4 rounded-full bg-primary/10 text-primary">
                          <Icon className="h-8 w-8" />
                        </div>
                      </div>

                      <h3 className="text-center font-bold text-gray-900 text-lg">
                        {step.title}
                      </h3>

                      <p className="text-center text-gray-500 text-sm">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-16 p-8 rounded-xl bg-primary/5 border border-primary/20">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Get Started?</h3>
          <p className="text-gray-500 mb-6">
            Upload your designs now and let us create something amazing for you!
          </p>
          <a
            href="/custom-design"
            className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors shadow-sm"
          >
            Upload Your Design
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
