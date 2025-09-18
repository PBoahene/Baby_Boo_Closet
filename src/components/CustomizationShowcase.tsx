import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palette, Type, Sparkles, ArrowRight } from "lucide-react";

const CustomizationShowcase = () => {
  const features = [
    {
      icon: Palette,
      title: "Choose Colors",
      description: "Pick from our rainbow of kid-friendly colors or match school requirements",
      color: "text-kids-pink"
    },
    {
      icon: Type,
      title: "Add Text & Names",
      description: "Personalize with names, numbers, or fun messages in beautiful fonts",
      color: "text-kids-blue"
    },
    {
      icon: Sparkles,
      title: "Apply Patches",
      description: "Add school logos, fun patches, or special emblems to make it unique",
      color: "text-kids-yellow"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-muted/30 to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How Our <span className="bg-gradient-hero bg-clip-text text-transparent">Customization</span> Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Creating personalized clothing for your child is easy, fun, and takes just a few clicks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="relative group hover:shadow-card transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 rounded-full bg-gradient-card w-fit">
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg" className="group">
            Try Our Designer Tool
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CustomizationShowcase;