import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Palette, Type, Shirt, Plus, Undo, Save } from "lucide-react";

const ProductCustomizer = () => {
  const [selectedColor, setSelectedColor] = useState("#FF6B6B");
  const [customText, setCustomText] = useState("");
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [selectedSize, setSelectedSize] = useState("M");

  const colors = [
    { name: "Coral", value: "#FF6B6B" },
    { name: "Sky Blue", value: "#4ECDC4" },
    { name: "Sunshine", value: "#FFE66D" },
    { name: "Lavender", value: "#A8E6CF" },
    { name: "Rose", value: "#FF8B94" },
    { name: "Ocean", value: "#70D0E4" },
  ];

  const fonts = ["Arial", "Comic Sans MS", "Helvetica", "Georgia", "Verdana"];
  const sizes = ["XS", "S", "M", "L", "XL"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Product Preview */}
      <div className="space-y-4">
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shirt className="h-5 w-5 text-primary" />
              Live Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-square bg-muted rounded-lg flex items-center justify-center">
              {/* T-shirt mockup */}
              <div 
                className="w-48 h-48 rounded-lg flex items-center justify-center shadow-lg transition-all duration-300"
                style={{ backgroundColor: selectedColor }}
              >
                {customText && (
                  <div 
                    className="text-white font-bold text-lg text-center px-4"
                    style={{ fontFamily: selectedFont }}
                  >
                    {customText}
                  </div>
                )}
                {!customText && (
                  <span className="text-white/50 text-sm">Add custom text</span>
                )}
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <Badge variant="secondary">Size: {selectedSize}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            <Undo className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button variant="outline" className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            Save Design
          </Button>
        </div>
      </div>

      {/* Customization Options */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Customize Your Design</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="colors" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="colors" className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Colors
                </TabsTrigger>
                <TabsTrigger value="text" className="flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Text
                </TabsTrigger>
                <TabsTrigger value="size" className="flex items-center gap-2">
                  <Shirt className="h-4 w-4" />
                  Size
                </TabsTrigger>
              </TabsList>

              <TabsContent value="colors" className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Choose Base Color</Label>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    {colors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setSelectedColor(color.value)}
                        className={`aspect-square rounded-lg border-2 transition-all ${
                          selectedColor === color.value 
                            ? "border-primary scale-105 shadow-glow" 
                            : "border-border hover:border-primary/50"
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      >
                        {selectedColor === color.value && (
                          <div className="w-full h-full rounded-md bg-black/20 flex items-center justify-center">
                            <div className="w-4 h-4 bg-white rounded-full" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="text" className="space-y-4">
                <div>
                  <Label htmlFor="custom-text">Add Custom Text</Label>
                  <Input
                    id="custom-text"
                    placeholder="Enter your text here..."
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label>Font Style</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {fonts.map((font) => (
                      <Button
                        key={font}
                        variant={selectedFont === font ? "default" : "outline"}
                        onClick={() => setSelectedFont(font)}
                        className="justify-start"
                        style={{ fontFamily: font }}
                      >
                        {font}
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="size" className="space-y-4">
                <div>
                  <Label>Select Size</Label>
                  <div className="grid grid-cols-5 gap-2 mt-2">
                    {sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Size Guide</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>XS: Ages 3-4 (Chest: 22")</div>
                    <div>S: Ages 5-6 (Chest: 24")</div>
                    <div>M: Ages 7-8 (Chest: 26")</div>
                    <div>L: Ages 9-10 (Chest: 28")</div>
                    <div>XL: Ages 11-12 (Chest: 30")</div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total Price:</span>
                <span className="text-primary">$24.99</span>
              </div>
              <Button className="w-full bg-gradient-hero hover:opacity-90">
                <Plus className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductCustomizer;