import React, { useMemo, useState } from "react";
import { Search, School, Upload, Send, ShoppingBag, Eye, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    <main className="min-h-screen pb-16">
      <section className="relative overflow-hidden pb-10 pt-10 md:pt-14">
        <div className="absolute inset-0 bg-gradient-to-b from-kids-blue/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <Badge className="mb-4 rounded-full bg-accent/15 text-accent border-none px-4 py-1.5">
            <Building2 className="mr-1.5 h-3.5 w-3.5" />
            Unique School Feature
          </Badge>
          <h1 className="text-3xl font-bold md:text-5xl max-w-3xl">
            School Kids Uniform Hub
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground text-lg">
            A dedicated space for schools to upload uniform samples and for parents to browse, request, or order similar styles.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <div>
            <Card className="border-white/10 bg-card/90 sticky top-28">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Upload className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-semibold">Upload Uniform Sample</h2>
                    <p className="text-xs text-muted-foreground">Schools can submit a sample for parents to browse</p>
                  </div>
                </div>

                <form onSubmit={submitSchoolSample} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="school-name" className="text-sm">School Name</Label>
                    <Input
                      id="school-name"
                      placeholder="e.g., East Legon Academy"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      className="border-white/10 bg-background"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="school-description" className="text-sm">Description</Label>
                    <Textarea
                      id="school-description"
                      placeholder="Describe colors, style, fabric, or badge details"
                      value={schoolDescription}
                      onChange={(e) => setSchoolDescription(e.target.value)}
                      className="border-white/10 bg-background min-h-24"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="uniform-image" className="text-sm">Uniform Sample Image</Label>
                    <Input
                      id="uniform-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="border-white/10 bg-background file:text-sm file:border-none file:bg-transparent file:font-medium"
                    />
                    {imageFile && (
                      <p className="text-xs text-muted-foreground">Selected: {imageFile.name}</p>
                    )}
                  </div>

                  {imagePreview && (
                    <div className="overflow-hidden rounded-lg border border-white/10">
                      <img src={imagePreview} alt="Uploaded school uniform sample" className="h-40 w-full object-cover" />
                    </div>
                  )}

                  <Button type="submit" className="w-full rounded-full">
                    <Send className="mr-2 h-4 w-4" /> Submit School Sample
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-white/10 bg-card/90 p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="h-11 rounded-full border-white/10 bg-background pl-10"
                  placeholder="Search by school name..."
                  value={schoolSearch}
                  onChange={(e) => setSchoolSearch(e.target.value)}
                />
              </div>
            </div>

            {filteredUniforms.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2">
                {filteredUniforms.map((uniform) => (
                  <Card key={uniform.id} className="overflow-hidden border-white/10 bg-card/90 group hover:border-primary/30 transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <div className="h-full w-full bg-gradient-to-br from-accent/20 via-kids-blue/10 to-background flex items-center justify-center">
                        <span className="text-3xl font-bold text-accent/40">{uniform.schoolName.charAt(0)}</span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <Badge variant="secondary" className="absolute top-3 left-3 rounded-full bg-background/70 text-foreground border-none backdrop-blur">
                        <School className="mr-1 h-3 w-3" />
                        School Uniform
                      </Badge>
                    </div>
                    <CardContent className="space-y-3 p-5">
                      <div>
                        <h3 className="text-lg font-semibold">{uniform.schoolName}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{uniform.description}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-sm">
                          <span className="text-muted-foreground">Starting from </span>
                          <span className="font-semibold text-primary">{formatCurrency(uniform.startingPrice)}</span>
                        </p>
                      </div>

                      <div className="flex gap-2 pt-1">
                        <Button
                          variant="outline"
                          className="flex-1 rounded-full border-white/10"
                          onClick={() => requestSimilarStyle(uniform)}
                        >
                          <Eye className="mr-1.5 h-4 w-4" /> Request Similar
                        </Button>
                        <Button className="flex-1 rounded-full" onClick={() => orderSimilarStyle(uniform)}>
                          <ShoppingBag className="mr-1.5 h-4 w-4" /> Order Similar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-white/10 bg-card/90">
                <CardContent className="flex flex-col items-center justify-center p-14 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 mb-4">
                    <School className="h-7 w-7 text-muted-foreground" />
                  </div>
                  <p className="text-lg font-semibold">No schools found</p>
                  <p className="mt-1 text-sm text-muted-foreground max-w-xs">
                    Try another school name or upload a new school sample using the form.
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
