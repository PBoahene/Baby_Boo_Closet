import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah M.",
      role: "Parent",
      content: "My daughter loves her uniform! The quality is exceptional and the customization options made her feel special.",
      rating: 5,
      avatar: "SM",
    },
    {
      id: 2,
      name: "Mrs. Johnson",
      role: "Teacher",
      content: "Ordering uniforms for the school has never been easier. Quick turnaround and perfect fit for all students.",
      rating: 5,
      avatar: "MJ",
    },
    {
      id: 3,
      name: "David Chen",
      role: "Principal",
      content: "Baby-Boo Closet has been a game-changer for our school. Professional service, quality products, and great support.",
      rating: 5,
      avatar: "DC",
    },
    {
      id: 4,
      name: "Emma W.",
      role: "Customer",
      content: "The embroidery work is absolutely beautiful. Worth every penny! Highly recommended.",
      rating: 5,
      avatar: "EW",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Families & Schools
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            See what our happy customers have to say about Baby-Boo Closet
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="border-white/10 bg-card/90 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <CardContent className="pt-6 space-y-4">
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-primary opacity-20" />

                {/* Content */}
                <p className="text-gray-300 italic text-sm">"{testimonial.content}"</p>

                {/* Rating */}
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-sm font-semibold text-white">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-gray-400 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">
            Join thousands of satisfied customers. Share your experience with us!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
