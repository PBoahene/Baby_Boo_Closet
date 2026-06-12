import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Gift, Package, Sparkles, Smartphone } from "lucide-react";
import heroImage from "@/assets/hero-kids.jpg";

const HeroSection = () => {
  return (
    <section className="py-8 md:py-12 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <Badge className="w-fit rounded-full bg-primary/10 text-primary border-none px-4 py-1.5 text-xs font-medium">
              <Sparkles className="mr-1.5 h-3.5 w-3.5 inline" />
              Trusted by parents and schools in Ghana
            </Badge>

            <div className="space-y-3">
              <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
                Modern kidswear that looks smart and lasts the school year.
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed max-w-xl">
                Shop premium everyday clothing, uniforms, and accessories designed for comfort, durability, and confidence.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/shop">
                <Button size="lg" className="rounded-full px-8 shadow-sm">Shop Collection</Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="rounded-full px-8 border-gray-300 text-gray-700 hover:text-gray-900 hover:bg-gray-50">Learn Our Story</Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-4 py-2 text-sm text-gray-600">
                <Smartphone className="h-4 w-4 text-primary" /> Momo fast payment
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-4 py-2 text-sm text-gray-600">
                <Package className="h-4 w-4 text-primary" /> Bulk school orders
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-4 py-2 text-sm text-gray-600">
                <CheckCircle2 className="h-4 w-4 text-primary" /> Quality checked items
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src={heroImage}
              alt="Children wearing colorful school-ready outfits"
              className="h-[450px] w-full rounded-2xl object-cover shadow-sm"
            />
            <div className="absolute -right-2 top-4 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm">
              <Sparkles className="mr-1.5 inline h-3.5 w-3.5 -mt-0.5" />
              New Arrival
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="group rounded-xl bg-white border border-gray-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-primary">
              <Gift className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Promotional Banner</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Newborn Essentials</h3>
            <p className="mt-1 text-sm text-gray-500 leading-relaxed">Soft bodysuits, wraps, and comfort sets for infants aged 0-12 months.</p>
          </div>

          <div className="group rounded-xl bg-white border border-gray-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-kids-blue">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Promotional Banner</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Back to School Deals</h3>
            <p className="mt-1 text-sm text-gray-500 leading-relaxed">Up to 20% off school essentials &mdash; bundle uniforms, socks, and underwear at school-season prices.</p>
          </div>

          <div className="group rounded-xl bg-white border border-gray-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-kids-pink">
              <Package className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Featured Collection</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Everyday Underwear Packs</h3>
            <p className="mt-1 text-sm text-gray-500 leading-relaxed">Comfortable boys and girls essentials made for all-day wear.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
