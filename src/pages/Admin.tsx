import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Upload, Download, RefreshCw, ExternalLink, Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isCustomizable?: boolean;
  colors?: string[];
  sizes?: string[];
}

const Admin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    price: 0,
    originalPrice: 0,
    image: "",
    category: "",
    isCustomizable: false,
    colors: [],
    sizes: []
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleImageUpload = async (file: File) => {
    // Mock Google Drive upload
    // In real implementation, you'd upload to Google Drive API
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      // Simulate Google Drive upload
      const driveUrl = `https://drive.google.com/uc?id=MOCK_FILE_ID_${Date.now()}`;
      setNewProduct(prev => ({ ...prev, image: driveUrl }));
      
      toast({
        title: "Image Uploaded",
        description: "Image uploaded to Google Drive successfully"
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Could not upload image to Google Drive",
        variant: "destructive"
      });
    }
  };

  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      toast({
        title: "Missing Information",
        description: "Please fill in product name and price",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct)
      });

      if (response.ok) {
        await fetchProducts();
        setNewProduct({
          name: "",
          price: 0,
          originalPrice: 0,
          image: "",
          category: "",
          isCustomizable: false,
          colors: [],
          sizes: []
        });
        
        toast({
          title: "Product Added",
          description: "Product has been added successfully"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not add product",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your BABY-BOO CLOSET store products</p>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="add">Add Product</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Product Inventory</h2>
              <Button onClick={fetchProducts} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardHeader>
                    <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-3">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription>{product.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <span className="text-lg font-bold">${product.price}</span>
                        {product.originalPrice && (
                          <span className="ml-2 text-sm text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      {product.isCustomizable && (
                        <Badge variant="secondary">Customizable</Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Add Product Tab */}
          <TabsContent value="add" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Product</CardTitle>
                <CardDescription>Add a new product to your store</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter product name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      className="w-full px-3 py-2 border rounded-md"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                    >
                      <option value="">Select category</option>
                      <option value="School Uniforms">School Uniforms</option>
                      <option value="Casual Wear">Casual Wear</option>
                      <option value="Dresses">Dresses</option>
                      <option value="Jackets & Coats">Jackets & Coats</option>
                      <option value="Sweaters">Sweaters</option>
                      <option value="Underwear">Underwear</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <Label htmlFor="originalPrice">Original Price ($)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      step="0.01"
                      value={newProduct.originalPrice || ""}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, originalPrice: parseFloat(e.target.value) }))}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="image-upload">Product Image</Label>
                  <div className="mt-2">
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file);
                      }}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('image-upload')?.click()}
                      className="w-full"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload to Google Drive
                    </Button>
                  </div>
                  {newProduct.image && (
                    <div className="mt-2 text-sm text-green-600">
                      Image uploaded successfully
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="sizes">Available Sizes (comma-separated)</Label>
                  <Input
                    id="sizes"
                    placeholder="XS, S, M, L, XL"
                    onChange={(e) => setNewProduct(prev => ({ 
                      ...prev, 
                      sizes: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                    }))}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="customizable"
                    checked={newProduct.isCustomizable}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, isCustomizable: e.target.checked }))}
                  />
                  <Label htmlFor="customizable">This product is customizable</Label>
                </div>

                <Button onClick={addProduct} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Manage customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Orders management coming soon...
                  <br />
                  <small>This will show orders from your customers</small>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;