import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Plus, RefreshCw, Edit, Trash2, Upload, ShoppingBag, TrendingUp, DollarSign, Users, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiUrl } from "@/lib/config";
import { formatCurrency } from "@/lib/currency";

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
  const [stats, setStats] = useState({ totalProducts: 0, totalOrders: 0, revenue: 0, customers: 0 });
  const { toast } = useToast();

  const [featuredIds, setFeaturedIds] = useState<string[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

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
    fetchStats();
    fetchFeatured();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl("/api/products"));
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(apiUrl("/api/admin/stats"));
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchFeatured = async () => {
    try {
      const res = await fetch(apiUrl("/api/featured"));
      const data = await res.json();
      setFeaturedIds(data.map((p: Product) => p.id));
    } catch {} // silent
  };

  const toggleFeatured = async (id: string) => {
    const next = featuredIds.includes(id)
      ? featuredIds.filter((fid) => fid !== id)
      : [...featuredIds, id];
    setFeaturedIds(next);
    try {
      await fetch(apiUrl("/api/admin/featured"), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: next }),
      });
    } catch {} // silent
  };

  const deleteProduct = async (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    try {
      const res = await fetch(apiUrl(`/api/admin/products/${id}`), { method: "DELETE" });
      if (res.ok) {
        await fetchProducts();
        await fetchStats();
        toast({ title: "Deleted", description: `${name} has been removed` });
      }
    } catch {
      toast({ title: "Error", description: "Could not delete product", variant: "destructive" });
    }
  };

  const startEdit = (product: Product) => {
    setNewProduct({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || 0,
      image: product.image,
      category: product.category,
      isCustomizable: product.isCustomizable,
      colors: product.colors || [],
      sizes: product.sizes || []
    });
    setEditingProduct(product);
    document.querySelector('[data-value="add"]')?.click();
  };

  const handleImageUpload = async (file: File) => {
    try {
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
      const isEditing = !!editingProduct;
      const url = isEditing
        ? apiUrl(`/api/admin/products/${editingProduct!.id}`)
        : apiUrl("/api/admin/products");
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct)
      });

      if (response.ok) {
        await fetchProducts();
        await fetchStats();
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
        setEditingProduct(null);
        toast({
          title: isEditing ? "Product Updated" : "Product Added",
          description: isEditing ? "Product has been updated successfully" : "Product has been added successfully"
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

  const statCards = [
    { label: "Total Products", value: stats.totalProducts.toString(), icon: Package, color: "text-primary" },
    { label: "Active Orders", value: stats.totalOrders.toString(), icon: ShoppingBag, color: "text-kids-blue" },
    { label: "Revenue (MTD)", value: `GH₵ ${stats.revenue.toLocaleString()}`, icon: DollarSign, color: "text-emerald-400" },
    { label: "Customers", value: stats.customers.toString(), icon: Users, color: "text-kids-pink" },
  ];

  return (
    <main className="min-h-screen pb-16">
      <section className="relative overflow-hidden pb-8 pt-10 md:pt-14">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted-foreground mb-3">
                <Package className="h-3.5 w-3.5" />
                Admin Dashboard
              </div>
              <h1 className="text-3xl font-bold md:text-4xl">Manage Your Store</h1>
              <p className="mt-1 text-muted-foreground">BABY-BOO CLOSET product management</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={fetchStats} variant="ghost" size="sm" className="rounded-full text-muted-foreground">
                <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                Stats
              </Button>
              <Button onClick={fetchProducts} variant="outline" className="rounded-full border-white/10">
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Products
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat) => (
            <Card key={stat.label} className="border-white/10 bg-card/90">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl">
            <TabsTrigger value="products" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Products</TabsTrigger>
            <TabsTrigger value="add" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Add Product</TabsTrigger>
            <TabsTrigger value="orders" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Orders</TabsTrigger>
            <TabsTrigger value="featured" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Featured</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {products.map((product) => (
                  <Card key={product.id} className="border-white/10 bg-card/90 group hover:border-primary/30 transition-all duration-300 overflow-hidden">
                    <div className="aspect-[4/3] bg-black/40 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 via-kids-blue/10 to-background flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary/40">{product.name.charAt(0)}</span>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{product.category}</p>
                          <h3 className="font-semibold mt-0.5">{product.name}</h3>
                        </div>
                        {product.isCustomizable && (
                          <Badge variant="outline" className="border-primary/30 text-primary text-xs shrink-0">Custom</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg font-bold text-primary">{formatCurrency(product.price)}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">{formatCurrency(product.originalPrice)}</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="rounded-full border-white/10 flex-1" onClick={() => startEdit(product)}>
                          <Edit className="h-3.5 w-3.5 mr-1.5" /> Edit
                        </Button>
                        <Button size="sm" variant="outline" className="rounded-full border-red-500/30 text-red-400 hover:text-red-300 hover:bg-red-500/10" onClick={() => deleteProduct(product.id, product.name)}>
                          <Trash2 className="h-3.5 w-3.5" />
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
                    <Package className="h-7 w-7 text-muted-foreground" />
                  </div>
                  <p className="text-lg font-semibold">No products yet</p>
                  <p className="mt-1 text-sm text-muted-foreground">Add your first product to get started.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="add">
            <Card className="border-white/10 bg-card/90 max-w-3xl mx-auto">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${editingProduct ? "bg-amber-500/10 text-amber-400" : "bg-primary/10 text-primary"}`}>
                    {editingProduct ? <Edit className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{editingProduct ? "Edit Product" : "Add New Product"}</h2>
                    <p className="text-sm text-muted-foreground">{editingProduct ? `Editing "${editingProduct.name}"` : "Fill in the details below to add a product to your store"}</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-sm">Product Name</Label>
                      <Input
                        id="name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter product name"
                        className="border-white/10 bg-background"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="category" className="text-sm">Category</Label>
                      <select
                        id="category"
                        className="flex h-10 w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
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

                    <div className="space-y-1.5">
                      <Label htmlFor="price" className="text-sm">Price (GH₵)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                        placeholder="0.00"
                        className="border-white/10 bg-background"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="originalPrice" className="text-sm">Original Price (GH₵)</Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        step="0.01"
                        value={newProduct.originalPrice || ""}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, originalPrice: parseFloat(e.target.value) || 0 }))}
                        placeholder="0.00"
                        className="border-white/10 bg-background"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-sm">Product Image</Label>
                    <div className="mt-1">
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
                        className="w-full rounded-lg border-white/10 border-dashed py-8"
                      >
                        <div className="flex flex-col items-center gap-1">
                          <Upload className="h-5 w-5 text-muted-foreground" />
                          <span className="text-sm font-normal text-muted-foreground">Click to upload image</span>
                          <span className="text-xs text-muted-foreground">Uploads to Google Drive</span>
                        </div>
                      </Button>
                    </div>
                    {newProduct.image && (
                      <div className="mt-2 flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-400">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Image uploaded successfully
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="sizes" className="text-sm">Available Sizes</Label>
                    <Input
                      id="sizes"
                      placeholder="XS, S, M, L, XL"
                      onChange={(e) => setNewProduct(prev => ({
                        ...prev,
                        sizes: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                      }))}
                      className="border-white/10 bg-background"
                    />
                    <p className="text-xs text-muted-foreground">Comma-separated list of sizes</p>
                  </div>

                  <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-background px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors">
                    <input
                      type="checkbox"
                      id="customizable"
                      checked={newProduct.isCustomizable}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, isCustomizable: e.target.checked }))}
                      className="h-4 w-4 rounded border-white/20"
                    />
                    <div>
                      <span className="text-sm font-medium">Customizable Product</span>
                      <p className="text-xs text-muted-foreground">Allow customers to customize this product</p>
                    </div>
                  </label>

                  <div className="flex gap-3">
                    {editingProduct && (
                      <Button type="button" variant="outline" className="rounded-full h-11 border-white/10 flex-1" onClick={() => {
                        setEditingProduct(null);
                        setNewProduct({ name: "", price: 0, originalPrice: 0, image: "", category: "", isCustomizable: false, colors: [], sizes: [] });
                      }}>
                        Cancel
                      </Button>
                    )}
                    <Button onClick={addProduct} className="rounded-full h-11 flex-1">
                      {editingProduct ? <Edit className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                      {editingProduct ? "Update Product" : "Add Product"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="border-white/10 bg-card/90">
              <CardContent className="flex flex-col items-center justify-center p-14 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 mb-4">
                  <ShoppingBag className="h-7 w-7 text-muted-foreground" />
                </div>
                <p className="text-lg font-semibold">Orders Management</p>
                <p className="mt-1 text-sm text-muted-foreground max-w-xs">
                  Orders will appear here once customers start placing orders.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="featured">
            <Card className="border-white/10 bg-card/90">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                    <Star className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Featured Products</h2>
                    <p className="text-sm text-muted-foreground">Toggle products to show in the "Customer favorites this month" section</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {products.map((product) => {
                    const isFeatured = featuredIds.includes(product.id);
                    return (
                      <div
                        key={product.id}
                        className={`flex items-center justify-between rounded-xl border px-4 py-3 transition-colors cursor-pointer ${
                          isFeatured
                            ? "border-amber-500/30 bg-amber-500/5"
                            : "border-white/10 bg-white/5"
                        }`}
                        onClick={() => toggleFeatured(product.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-background">
                            <span className="text-sm font-bold text-primary/60">{product.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{product.name}</p>
                            <p className="text-xs text-muted-foreground">{product.category}</p>
                          </div>
                        </div>
                        <div className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
                          isFeatured ? "bg-amber-500/20 text-amber-400" : "bg-white/5 text-muted-foreground"
                        }`}>
                          <Star className={`h-3 w-3 ${isFeatured ? "fill-amber-400" : ""}`} />
                          {isFeatured ? "Featured" : "Set as featured"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
};

export default Admin;
