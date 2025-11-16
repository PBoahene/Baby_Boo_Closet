import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Palette, Shirt, Upload } from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/hero-kids.jpg";

const HeroSection = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-background via-muted/20 to-secondary/30">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <Badge className="bg-kids-yellow text-black flex items-center gap-2 w-fit">
              <Sparkles className="h-4 w-4" />
              New: Custom School Uniforms Available!
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Custom Kids Wear
              </span>
              <br />
              <span className="text-foreground">
                Made With Love
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg">
              Design personalized clothing for your little ones. Add names, choose colors, 
              and create unique pieces they'll love to wear. Perfect for schools and special occasions.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="hero" size="lg" className="group">
                  <Palette className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Start Customizing
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Upload Your Reference Design</DialogTitle>
                  <DialogDescription>
                    Upload a sample image of the item you'd like us to create. We'll use it as a reference for your custom order.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="reference-image">Reference Image</Label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="reference-image"
                        className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-contain rounded-lg"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">PNG, JPG or JPEG (MAX. 5MB)</p>
                          </div>
                        )}
                        <Input
                          id="reference-image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="item-name">Item Name</Label>
                    <Input id="item-name" placeholder="e.g., School Uniform, T-Shirt" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Additional Details</Label>
                    <Textarea
                      id="description"
                      placeholder="Tell us about colors, sizes, quantities, or any special requirements..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact (Phone/Email)</Label>
                    <Input id="contact" placeholder="Your phone number or email" />
                  </div>

                  <Button className="w-full" size="lg">
                    Submit Request
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="lg">
              <Shirt className="h-5 w-5 mr-2" />
              View School Uniforms
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center gap-8 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Happy Families</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Partner Schools</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">24hr</div>
              <div className="text-sm text-muted-foreground">Fast Delivery</div>
            </div>
          </div>
        </div>

        {/* Right Content - Hero Image */}
        <div className="relative">
          <div className="relative z-10">
            <img 
              src={heroImage} 
              alt="Happy children wearing colorful custom clothing"
              className="w-full h-[500px] object-cover rounded-2xl shadow-card"
            />
          </div>
          
          {/* Floating elements */}
          <div className="absolute -top-4 -right-4 bg-kids-pink text-white p-4 rounded-xl shadow-glow animate-bounce">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-kids-blue text-white p-4 rounded-xl shadow-glow animate-pulse">
            <Palette className="h-6 w-6" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;