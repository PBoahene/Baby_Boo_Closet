import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Gift, Package, Sparkles, Smartphone } from "lucide-react";
import heroImage from "@/assets/hero-kids.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-10 rounded-3xl border border-white/10 bg-gradient-card p-6 shadow-card backdrop-blur md:p-10 lg:grid-cols-2">
          <div className="space-y-7">
            <Badge className="w-fit rounded-full bg-white/10 text-white border-none px-4 py-1.5">
              <Sparkles className="mr-1.5 h-3.5 w-3.5 inline" />
              Trusted by parents and schools in Ghana
            </Badge>

            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-bold leading-tight text-white md:text-6xl">
                Modern kidswear that looks smart and lasts the school year.
              </h1>
              <p className="max-w-xl text-lg text-gray-400 leading-relaxed">
                Shop premium everyday clothing, uniforms, and accessories designed for comfort, durability, and confidence.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/shop">
                <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/25">Shop Collection</Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="rounded-full px-8 border-white/20 text-white hover:text-white hover:bg-white/10">Learn Our Story</Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-sm text-gray-300">
                <Smartphone className="h-4 w-4 text-primary" /> Momo fast payment
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-sm text-gray-300">
                <Package className="h-4 w-4 text-primary" /> Bulk school orders
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-sm text-gray-300">
                <CheckCircle2 className="h-4 w-4 text-primary" /> Quality checked items
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src={heroImage}
              alt="Children wearing colorful school-ready outfits"
              className="h-[520px] w-full rounded-2xl object-cover shadow-soft"
            />
            <div className="absolute -right-4 top-5 rounded-full bg-gradient-to-r from-primary to-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
              <Sparkles className="mr-1.5 inline h-3.5 w-3.5 -mt-0.5" />
              New Arrival
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <article className="group rounded-2xl border border-white/10 bg-black/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
            <div className="mb-3 flex items-center gap-2 text-primary">
              <Gift className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Promotional Banner</span>
            </div>
            <h3 className="text-lg font-semibold text-white">Newborn Essentials</h3>
            <p className="mt-1.5 text-sm text-gray-400 leading-relaxed">Soft bodysuits, wraps, and comfort sets for infants aged 0-12 months.</p>
          </article>

          <article className="group rounded-2xl border border-white/10 bg-black/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-kids-blue/50 hover:shadow-lg hover:shadow-kids-blue/5">
            <div className="mb-3 flex items-center gap-2 text-kids-blue">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Promotional Banner</span>
            </div>
            <h3 className="text-lg font-semibold text-white">Back to School Deals</h3>
            <p className="mt-1.5 text-sm text-gray-400 leading-relaxed">Up to 20% off school essentials &mdash; bundle uniforms, socks, and underwear at school-season prices.</p>
          </article>

          <article className="group rounded-2xl border border-white/10 bg-black/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-kids-pink/50 hover:shadow-lg hover:shadow-kids-pink/5">
            <div className="mb-3 flex items-center gap-2 text-kids-pink">
              <Package className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Featured Collection</span>
            </div>
            <h3 className="text-lg font-semibold text-white">Everyday Underwear Packs</h3>
            <p className="mt-1.5 text-sm text-gray-400 leading-relaxed">Comfortable boys and girls essentials made for all-day wear.</p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
