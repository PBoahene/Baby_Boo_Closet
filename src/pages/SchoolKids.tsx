import React, { useMemo, useState } from "react";
import { Search, School, Upload, Send, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CartItem, parseCart, serializeCart } from "@/lib/cart";
import { formatCurrency } from "@/lib/currency";

interface SchoolUniform {
  id: string;
  schoolName: string;
  description: string;
  image: string;
  startingPrice: number;
}

const initialUniforms: SchoolUniform[] = [
  {
    id: "achimota-primary",
    schoolName: "Achimota Primary",
    description: "Classic blue-and-white set with breathable cotton blend and reinforced seams.",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=900&h=700&fit=crop",
    startingPrice: 145,
  },
  {
    id: "east-legon-academy",
    schoolName: "East Legon Academy",
    description: "Formal striped shirts and pleated skirts designed for daily classroom comfort.",
    image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=900&h=700&fit=crop",
    startingPrice: 165,
  },
  {
    id: "sunrise-jhs",
    schoolName: "Sunrise JHS",
    description: "Modern house-wear polos and matching shorts suitable for sports and assemblies.",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900&h=700&fit=crop",
    startingPrice: 120,
  },
];

const SchoolKids = () => {
  const { toast } = useToast();

  const [schoolSearch, setSchoolSearch] = useState("");
  const [uniforms, setUniforms] = useState<SchoolUniform[]>(initialUniforms);

  const [schoolName, setSchoolName] = useState("");
  const [schoolDescription, setSchoolDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const filteredUniforms = useMemo(() => {
    if (!schoolSearch.trim()) return uniforms;
    const query = schoolSearch.toLowerCase();
    return uniforms.filter((item) => item.schoolName.toLowerCase().includes(query));
  }, [schoolSearch, uniforms]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const submitSchoolSample = (event: React.FormEvent) => {
    event.preventDefault();

    if (!schoolName.trim() || !schoolDescription.trim() || !imagePreview) {
      toast({
        title: "Missing fields",
        description: "Please provide school name, description, and a uniform sample image.",
        variant: "destructive",
      });
      return;
    }

    const newEntry: SchoolUniform = {
      id: `${schoolName.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
      schoolName: schoolName.trim(),
      description: schoolDescription.trim(),
      image: imagePreview,
      startingPrice: 150,
    };

    setUniforms((prev) => [newEntry, ...prev]);
    setSchoolName("");
    setSchoolDescription("");
    setImageFile(null);
    setImagePreview("");

    toast({
      title: "Sample submitted",
      description: "Your school sample was added successfully. Parents can now browse it.",
    });
  };

  const requestSimilarStyle = (uniform: SchoolUniform) => {
    toast({
      title: "Request recorded",
      description: `We recorded your request for a ${uniform.schoolName} inspired style.`,
    });
  };

  const orderSimilarStyle = (uniform: SchoolUniform) => {
    try {
      const raw = localStorage.getItem("cart");
      const cart = parseCart(raw);

      const itemId = `school-uniform-${uniform.id}`;
      const existing = cart.find((item) => item.id === itemId);

      if (existing) {
        existing.qty += 1;
      } else {
        const newItem: CartItem = {
          id: itemId,
          name: `${uniform.schoolName} Inspired Uniform`,
          price: uniform.startingPrice,
          qty: 1,
          image: uniform.image,
        };
        cart.push(newItem);
      }

      localStorage.setItem("cart", serializeCart(cart));
      window.dispatchEvent(new Event("storage"));

      toast({
        title: "Added to cart",
        description: `${uniform.schoolName} uniform style added to your cart.`,
      });
    } catch {
      toast({
        title: "Action failed",
        description: "Could not add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="min-h-screen">
      <section className="pb-8 pt-10 md:pt-14">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl border border-white/60 bg-white/85 p-6 shadow-soft md:p-10">
            <Badge className="mb-3 bg-accent text-accent-foreground">Unique School Feature</Badge>
            <h1 className="text-3xl font-bold md:text-5xl">School Kids Uniform Hub</h1>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              A dedicated space for schools to upload uniform samples and for parents to browse, request, or order similar styles.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto grid gap-6 px-4 lg:grid-cols-[360px_1fr]">
          <Card className="h-fit border-white/60 bg-white/90 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" /> Upload Uniform Sample
              </CardTitle>
              <CardDescription>
                Schools can upload a sample image, school name, and short description.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={submitSchoolSample} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="school-name">School Name</Label>
                  <Input
                    id="school-name"
                    placeholder="e.g., East Legon Academy"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="school-description">Description</Label>
                  <Textarea
                    id="school-description"
                    placeholder="Describe colors, style, fabric, or badge details"
                    value={schoolDescription}
                    onChange={(e) => setSchoolDescription(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="uniform-image">Uniform Sample Image</Label>
                  <Input
                    id="uniform-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  {imageFile && <p className="text-xs text-muted-foreground">Selected: {imageFile.name}</p>}
                </div>

                {imagePreview && (
                  <div className="overflow-hidden rounded-lg border border-border">
                    <img src={imagePreview} alt="Uploaded school uniform sample" className="h-40 w-full object-cover" />
                  </div>
                )}

                <Button type="submit" className="w-full">
                  <Send className="mr-2 h-4 w-4" /> Submit School Sample
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-5">
            <div className="rounded-2xl border border-white/60 bg-white/90 p-4 shadow-soft">
              <Label htmlFor="school-search" className="mb-2 block text-sm font-semibold">
                Browse uniforms by school name
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="school-search"
                  className="pl-10"
                  placeholder="Search school name..."
                  value={schoolSearch}
                  onChange={(e) => setSchoolSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {filteredUniforms.map((uniform) => (
                <Card key={uniform.id} className="overflow-hidden border-white/60 bg-white/95 shadow-soft">
                  <div className="h-48 overflow-hidden">
                    <img src={uniform.image} alt={`${uniform.schoolName} uniform sample`} className="h-full w-full object-cover" />
                  </div>
                  <CardContent className="space-y-3 p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{uniform.schoolName}</h3>
                      <Badge variant="outline" className="border-primary/35 text-primary">
                        School Uniform
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{uniform.description}</p>
                    <p className="text-sm font-semibold text-primary">
                      Starting from {formatCurrency(uniform.startingPrice)}
                    </p>

                    <div className="flex gap-2 pt-1">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => requestSimilarStyle(uniform)}
                      >
                        Request Similar Style
                      </Button>
                      <Button className="flex-1" onClick={() => orderSimilarStyle(uniform)}>
                        <ShoppingBag className="mr-2 h-4 w-4" /> Order Similar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredUniforms.length === 0 && (
              <Card className="border-white/60 bg-white/90">
                <CardContent className="p-10 text-center">
                  <School className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
                  <p className="text-lg font-semibold">No schools found</p>
                  <p className="text-sm text-muted-foreground">
                    Try another school name or upload a new school sample.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default SchoolKids;
