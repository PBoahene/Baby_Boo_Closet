import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { School, Users, ShoppingCart, Award } from "lucide-react";

const SchoolPortalSection = () => {
  const benefits = [
    {
      icon: School,
      title: "Dedicated School Pages",
      description: "Custom branded portal for your school with approved uniform designs"
    },
    {
      icon: Users,
      title: "Bulk Order Management",
      description: "Easy ordering system for large quantities with special school pricing"
    },
    {
      icon: ShoppingCart,
      title: "Parent Direct Ordering",
      description: "Share unique links so parents can order directly from your approved catalog"
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "Premium materials and printing that withstand active school days"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div>
              <Badge className="bg-secondary text-secondary-foreground mb-4">
                For Schools & Educators
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Streamline Your School's <span className="bg-gradient-hero bg-clip-text text-transparent">Uniform Program</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Partner with us to create a seamless uniform ordering experience for your school community. 
                From house colors to sports teams, we've got you covered.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <benefit.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{benefit.title}</h4>
                    <p className="text-xs text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg">
                Set Up School Portal
              </Button>
              <Button variant="outline" size="lg">
                Download Info Pack
              </Button>
            </div>
          </div>

          {/* Right Content - School Portal Preview */}
          <div className="relative">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <School className="h-5 w-5 text-primary" />
                    Oakwood Elementary
                  </CardTitle>
                  <Badge variant="secondary">Live Portal</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-background p-3 rounded-lg">
                    <div className="h-20 bg-muted rounded mb-2"></div>
                    <p className="text-sm font-medium">House T-Shirts</p>
                    <p className="text-xs text-muted-foreground">4 House Colors</p>
                  </div>
                  <div className="bg-background p-3 rounded-lg">
                    <div className="h-20 bg-muted rounded mb-2"></div>
                    <p className="text-sm font-medium">PE Uniforms</p>
                    <p className="text-xs text-muted-foreground">Sports Kit</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Total Orders This Month:</span>
                  <span className="font-bold text-primary">247</span>
                </div>
                
                <Button className="w-full" variant="outline">
                  View School Catalog
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolPortalSection;