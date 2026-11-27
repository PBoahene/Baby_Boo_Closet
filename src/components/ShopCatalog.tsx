import React, { useEffect, useMemo, useState } from "react";
import { Minus, Plus, SlidersHorizontal, X } from "lucide-react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { apiUrl } from "@/lib/config";
import { Product, sameCategory } from "@/lib/catalog";

interface ShopCatalogProps {
  title: string;
  subtitle?: string;
  /** Use h1 on the shop page, h2 when embedded in the home page. */
  headingLevel?: "h1" | "h2";
  pageSize?: number;
}

const sizeOptions = ["XS", "S", "M", "L", "XL"];

const FilterSection = ({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-5 text-left text-[17px] text-gray-900"
        aria-expanded={open}
      >
        {title}
        {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      </button>
      {open && <div className="pb-5">{children}</div>}
    </div>
  );
};

const ShopCatalog = ({ title, subtitle, headingLevel = "h1", pageSize = 15 }: ShopCatalogProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [visible, setVisible] = useState(pageSize);

  const activeCategory = searchParams.get("category") || "";
  const searchQuery = searchParams.get("q") || "";
  const Heading = headingLevel;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch(apiUrl("/api/products"));
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (!cancelled) setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
        if (!cancelled) setFailed(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const priceBounds = useMemo<[number, number]>(() => {
    if (products.length === 0) return [0, 500];
    const prices = products.map((p) => p.price);
    return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))];
  }, [products]);
  const range = priceRange ?? priceBounds;
  const [minPrice, maxPrice] = range;

  const categories = useMemo(() => {
    const seen = new Map<string, string>();
    products.forEach((p) => {
      if (p.category && !seen.has(p.category.toLowerCase())) seen.set(p.category.toLowerCase(), p.category);
    });
    return [...seen.values()].sort((a, b) => a.localeCompare(b));
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    if (activeCategory) filtered = filtered.filter((p) => sameCategory(p.category || "", activeCategory));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) => p.name.toLowerCase().includes(q) || (p.category || "").toLowerCase().includes(q),
      );
    }
    filtered = filtered.filter((p) => p.price >= minPrice && p.price <= maxPrice);
    if (selectedSizes.length > 0) {
      filtered = filtered.filter((p) => p.sizes?.some((s) => selectedSizes.includes(s)));
    }
    switch (sortBy) {
      case "price-low": filtered.sort((a, b) => a.price - b.price); break;
      case "price-high": filtered.sort((a, b) => b.price - a.price); break;
      case "name": filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return filtered;
  }, [products, activeCategory, searchQuery, sortBy, minPrice, maxPrice, selectedSizes]);

  useEffect(() => { setVisible(pageSize); }, [activeCategory, searchQuery, sortBy, minPrice, maxPrice, selectedSizes, pageSize]);

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value); else next.delete(key);
    setSearchParams(next, { replace: true });
  };

  const toggleSize = (size: string) =>
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));

  const clearFilters = () => {
    setSearchParams({}, { replace: true });
    setPriceRange(null);
    setSelectedSizes([]);
    setSortBy("relevance");
  };

  const hasActiveFilters = Boolean(activeCategory || searchQuery || selectedSizes.length || priceRange);

  const sidebar = (
    <div>
      <div className="flex items-center justify-between border-b border-gray-200 pb-5">
        <h2 className="text-2xl text-gray-900">Filter by</h2>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="text-sm text-gray-500 underline hover:text-gray-900">
            Clear all
          </button>
        )}
      </div>

      <FilterSection title="Category" defaultOpen>
        <ul className="space-y-2 text-[15px]">
          <li>
            <button
              onClick={() => setParam("category", "")}
              className={!activeCategory ? "font-semibold text-gray-900" : "text-gray-600 hover:text-gray-900"}
            >
              All
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => setParam("category", cat)}
                className={sameCategory(cat, activeCategory) ? "font-semibold text-gray-900" : "text-gray-600 hover:text-gray-900"}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </FilterSection>

      <FilterSection title="Price" defaultOpen>
        <SliderPrimitive.Root
          className="relative mt-1 flex h-5 w-full touch-none select-none items-center"
          min={priceBounds[0]}
          max={priceBounds[1]}
          step={1}
          value={range}
          minStepsBetweenThumbs={1}
          onValueChange={(v) => setPriceRange([v[0], v[1]] as [number, number])}
          aria-label="Price range"
        >
          <SliderPrimitive.Track className="relative h-0.5 w-full grow bg-gray-300">
            <SliderPrimitive.Range className="absolute h-full bg-gray-900" />
          </SliderPrimitive.Track>
          {[0, 1].map((i) => (
            <SliderPrimitive.Thumb
              key={i}
              aria-label={i === 0 ? "Minimum price" : "Maximum price"}
              className="block h-4 w-4 rounded-full bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          ))}
        </SliderPrimitive.Root>
        <div className="mt-3 flex justify-between text-[15px] text-gray-700">
          <span>GHS {range[0]}</span>
          <span>GHS {range[1]}</span>
        </div>
      </FilterSection>

      <FilterSection title="Size">
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              aria-pressed={selectedSizes.includes(size)}
              className={`min-w-12 border px-3 py-1.5 text-sm ${selectedSizes.includes(size) ? "border-gray-900 bg-gray-900 text-white" : "border-gray-400 text-gray-800 hover:border-gray-900"}`}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  const shown = filteredProducts.slice(0, visible);

  return (
    <section className="container mx-auto px-4 pb-16">
      <div className="mx-auto max-w-2xl py-10 text-center md:py-14">
        <Heading className="text-3xl font-bold text-gray-900 md:text-5xl">{title}</Heading>
        {subtitle && <p className="mx-auto mt-4 max-w-md text-[17px] leading-relaxed text-gray-700">{subtitle}</p>}
        {searchQuery && (
          <p className="mt-4 text-sm text-gray-500">
            Results for “{searchQuery}” ·{" "}
            <button className="underline" onClick={() => setParam("q", "")}>clear search</button>
          </p>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-[220px_1fr] xl:gap-10">
        <aside className="hidden lg:block">{sidebar}</aside>

        <div>
          <div className="mb-6 flex items-center justify-between gap-3">
            <button
              onClick={() => setShowFilters(true)}
              className="flex h-11 items-center gap-2 border border-gray-900 px-4 text-sm lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filter
            </button>
            <p className="hidden text-sm text-gray-500 lg:block">
              {loading ? "Loading…" : `${filteredProducts.length} products`}
            </p>
            <label className="relative">
              <span className="sr-only">Sort by</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-11 w-48 appearance-none border border-gray-900 bg-white px-3 pr-9 text-[15px] text-gray-900 outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="relevance">Sort by</option>
                <option value="price-low">Price (low to high)</option>
                <option value="price-high">Price (high to low)</option>
                <option value="name">Name A–Z</option>
              </select>
              <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 6l5 5 5-5" /></svg>
            </label>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 xl:grid-cols-5">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-gray-100" />
                  <div className="mt-4 h-3 w-3/4 bg-gray-100" />
                  <div className="mt-3 h-3 w-1/3 bg-gray-100" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="border border-gray-200 px-6 py-16 text-center">
              <p className="text-lg text-gray-900">
                {failed ? "We couldn't load products right now." : "No products match your filters."}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {failed ? "Please refresh the page, or order on WhatsApp." : "Try another category or clear the filters."}
              </p>
              {hasActiveFilters && !failed && (
                <button onClick={clearFilters} className="mt-5 rounded-full border border-gray-900 px-6 py-2 text-sm">
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-5 xl:grid-cols-5">
                {shown.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
              {visible < filteredProducts.length && (
                <div className="mt-12 flex justify-center">
                  <button
                    onClick={() => setVisible((v) => v + pageSize)}
                    className="border border-gray-900 px-10 py-3 text-sm text-gray-900 hover:bg-gray-900 hover:text-white"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilters(false)} />
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm overflow-y-auto bg-white p-6 shadow-xl">
            <button onClick={() => setShowFilters(false)} className="absolute right-4 top-5 p-1" aria-label="Close filters">
              <X className="h-5 w-5" />
            </button>
            {sidebar}
            <button
              onClick={() => setShowFilters(false)}
              className="mt-6 w-full rounded-full bg-gray-900 py-3 text-sm font-medium text-white"
            >
              Show {filteredProducts.length} products
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ShopCatalog;
