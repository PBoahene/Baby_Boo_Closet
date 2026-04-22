import React, { useEffect, useMemo, useState } from "react";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import ProductCard from "@/components/ProductCard";
import { apiUrl } from "@/lib/config";

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

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  sizes: string[];
}

const categories = [
  "School Uniforms",
  "Casual Wear",
  "Dresses",
  "Jackets & Coats",
  "Sweaters",
  "Underwear",
];

const sizes = ["XS", "S", "M", "L", "XL"];

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 500],
    sizes: [],
  });

  useEffect(() => {
    const fetchProducts = async () => {
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

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q),
      );
    }

    if (filters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        filters.categories.includes(product.category),
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1],
    );

    if (filters.sizes.length > 0) {
      filtered = filtered.filter((product) =>
        product.sizes?.some((size) => filters.sizes.includes(size)),
      );
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [filters, products, searchQuery, sortBy]);

  const toggleCategoryFilter = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((item) => item !== category)
        : [...prev.categories, category],
    }));
  };

  const toggleSizeFilter = (size: string) => {
    setFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((item) => item !== size)
        : [...prev.sizes, size],
    }));
  };

  const clearFilters = () => {
    setSearchQuery("");
    setFilters({ categories: [], priceRange: [0, 500], sizes: [] });
    setSortBy("relevance");
  };

  return (
    <main className="min-h-screen">
      <section className="pb-8 pt-10 md:pt-14">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl border border-white/60 bg-white/85 p-6 shadow-soft md:p-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Shop Collection</p>
            <h1 className="mt-2 text-3xl font-bold md:text-5xl">Find everyday essentials and signature school styles</h1>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              Browse high-quality pieces built for comfort, movement, and long-lasting wear. Use filters to quickly narrow by category, size, and budget.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-white/60 bg-white/85 p-4 shadow-soft md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-xl">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 rounded-full border-border/80 bg-white pl-10"
                placeholder="Search by product name or category"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                className="rounded-full lg:hidden"
                onClick={() => setShowFilters((prev) => !prev)}
              >
                <Filter className="h-4 w-4" /> Filters
              </Button>

              <div className="inline-flex h-11 items-center rounded-full border border-border/80 bg-white px-4 text-sm">
                <SlidersHorizontal className="mr-2 h-4 w-4 text-muted-foreground" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent outline-none"
                >
                  <option value="relevance">Sort: Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <aside
              className={`${showFilters ? "block" : "hidden"} rounded-2xl border border-white/60 bg-white/90 p-5 shadow-soft lg:block`}
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Refine Results</h2>
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-xs">
                  Reset
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 text-sm font-semibold">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex cursor-pointer items-center gap-2 text-sm">
                        <Checkbox
                          checked={filters.categories.includes(category)}
                          onCheckedChange={() => toggleCategoryFilter(category)}
                        />
                        {category}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold">Available sizes</h3>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <Badge
                        key={size}
                        onClick={() => toggleSizeFilter(size)}
                        variant={filters.sizes.includes(size) ? "default" : "outline"}
                        className="cursor-pointer"
                      >
                        {size}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold">Price range (GHc)</h3>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      className="h-9"
                      value={filters.priceRange[0]}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          priceRange: [Number(e.target.value), prev.priceRange[1]],
                        }))
                      }
                    />
                    <span className="text-sm text-muted-foreground">to</span>
                    <Input
                      type="number"
                      className="h-9"
                      value={filters.priceRange[1]}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          priceRange: [prev.priceRange[0], Number(e.target.value)],
                        }))
                      }
                    />
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full rounded-full lg:hidden"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="h-4 w-4" /> Close filters
                </Button>
              </div>
            </aside>

            <div>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
              </div>

              {loading ? (
                <div className="rounded-2xl border border-white/70 bg-white/85 p-14 text-center">
                  <p className="text-lg font-medium">Loading products...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="rounded-2xl border border-white/70 bg-white/85 p-14 text-center">
                  <p className="text-lg font-medium">No products match your filters.</p>
                  <p className="mt-2 text-muted-foreground">Try broadening your search or reset filters.</p>
                  <Button onClick={clearFilters} className="mt-5 rounded-full">
                    Clear filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Shop;
