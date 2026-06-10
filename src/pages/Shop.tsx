import React, { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductCard from "@/components/ProductCard";
import { apiUrl } from "@/lib/config";
import { useSearchParams } from "react-router-dom";

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

const sizeOptions = ["XS", "S", "M", "L", "XL"];

const categoryPills = [
  { value: "", label: "All Products" },
  { value: "School Uniforms", label: "School Uniforms" },
  { value: "Underwear", label: "Kids Underwear" },
  { value: "Dresses", label: "Dresses" },
  { value: "Embroidery", label: "Embroidery" },
  { value: "Corporate", label: "Corporate" },
  { value: "Infant Wear", label: "Infant Wear" },
  { value: "Cardigans", label: "Cardigans" },
  { value: "", label: "More Creations" },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const activeCategory = searchParams.get("category") || "";

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

    if (activeCategory) {
      filtered = filtered.filter(
        (product) => product.category === activeCategory,
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q),
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1],
    );

    if (selectedSizes.length > 0) {
      filtered = filtered.filter((product) =>
        product.sizes?.some((size) => selectedSizes.includes(size)),
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
  }, [products, activeCategory, searchQuery, sortBy, priceRange, selectedSizes]);

  const setCategory = (category: string) => {
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const clearFilters = () => {
    setSearchParams({});
    setSearchQuery("");
    setPriceRange([0, 500]);
    setSelectedSizes([]);
    setSortBy("relevance");
  };

  const hasActiveFilters = activeCategory || searchQuery || selectedSizes.length > 0 || priceRange[0] > 0 || priceRange[1] < 500;

  return (
    <main className="min-h-screen pb-16">
      <section className="relative overflow-hidden pb-10 pt-10 md:pt-14">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center justify-between gap-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Shop Collection
              </p>
              <h1 className="mt-2 text-3xl font-bold leading-tight md:text-5xl">
                Find everyday essentials and signature school styles
              </h1>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Browse high-quality pieces built for comfort, movement, and long-lasting wear.
              </p>
            </div>
            <div className="hidden md:flex shrink-0 mr-8">
              <img src="/brand/logo.svg" alt="Baby Boo" className="h-52 w-52 object-contain opacity-15" />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="flex flex-wrap items-center gap-2 pb-6">
          {categoryPills.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setCategory(cat.value)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                activeCategory === cat.value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-white/10 text-muted-foreground hover:bg-white/20 hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-card/90 p-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 rounded-full border-white/10 bg-background pl-10"
              placeholder="Search products..."
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              className="rounded-full border-white/10 lg:hidden"
              onClick={() => setShowFilters((prev) => !prev)}
            >
              <SlidersHorizontal className="mr-1.5 h-4 w-4" /> Filters
            </Button>

            <div className="inline-flex h-11 items-center rounded-full border border-white/10 bg-background px-4 text-sm">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent outline-none text-muted-foreground"
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
            className={`${showFilters ? "block" : "hidden"} h-fit rounded-2xl border border-white/10 bg-card/90 p-5 lg:block`}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Filters
              </h2>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 px-2 text-xs text-primary">
                  Reset
                </Button>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Price Range (GHc)
                </h3>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    className="h-9 border-white/10 bg-background"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([Number(e.target.value), priceRange[1]])
                    }
                  />
                  <span className="text-xs text-muted-foreground">to</span>
                  <Input
                    type="number"
                    className="h-9 border-white/10 bg-background"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                  />
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Sizes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map((size) => (
                    <Badge
                      key={size}
                      onClick={() => toggleSize(size)}
                      variant={selectedSizes.includes(size) ? "default" : "outline"}
                      className="cursor-pointer rounded-full px-3 py-1.5"
                    >
                      {size}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full rounded-full border-white/10 lg:hidden"
                onClick={() => setShowFilters(false)}
              >
                <X className="mr-1.5 h-4 w-4" /> Close filters
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
              <div className="rounded-2xl border border-white/10 bg-card/90 p-14 text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <p className="mt-4 text-sm text-muted-foreground">Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-card/90 p-14 text-center">
                <p className="text-lg font-medium">No products found</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try adjusting your filters or search.
                </p>
                {hasActiveFilters && (
                  <Button onClick={clearFilters} className="mt-5 rounded-full">
                    Clear all filters
                  </Button>
                )}
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
      </section>
    </main>
  );
};

export default Shop;
