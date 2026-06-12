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
  ];

  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Trusted by Families & Schools
          </h2>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            See what our happy customers have to say about Baby-Boo Closet
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300"
            >
              <CardContent className="p-4 space-y-3">
                <Quote className="h-5 w-5 text-primary/20" />
                <p className="text-gray-600 italic text-xs">"{testimonial.content}"</p>
                <div className="flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-semibold text-white">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold text-xs">{testimonial.name}</p>
                    <p className="text-gray-500 text-[10px]">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
