import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Gift, Package, ShieldCheck, Sparkles, Truck } from "lucide-react";
import heroImage from "@/assets/hero-kids.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-10 rounded-3xl border border-white/10 bg-gradient-card p-6 shadow-card backdrop-blur md:p-10 lg:grid-cols-2">
          <div className="space-y-7">
            <Badge className="w-fit bg-accent text-accent-foreground">Trusted by parents and schools in Ghana</Badge>

            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-bold leading-tight text-foreground md:text-6xl">
                Modern kidswear that looks smart and lasts the school year.
              </h1>
              <p className="max-w-xl text-lg text-muted-foreground">
                Shop premium everyday clothing, uniforms, and accessories designed for comfort, durability, and confidence.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/shop">
                <Button size="lg" className="rounded-full px-7">Shop Collection</Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="rounded-full px-7">Learn Our Story</Button>
              </Link>
            </div>

            <div className="grid gap-3 text-sm text-foreground/90 sm:grid-cols-2">
              <p className="flex items-center gap-2 rounded-lg bg-black/35 px-3 py-2">
                <Truck className="h-4 w-4 text-primary" /> Nationwide delivery
              </p>
              <p className="flex items-center gap-2 rounded-lg bg-black/35 px-3 py-2">
                <ShieldCheck className="h-4 w-4 text-primary" /> Safe card checkout
              </p>
              <p className="flex items-center gap-2 rounded-lg bg-black/35 px-3 py-2">
                <Package className="h-4 w-4 text-primary" /> Bulk school orders
              </p>
              <p className="flex items-center gap-2 rounded-lg bg-black/35 px-3 py-2">
                <CheckCircle2 className="h-4 w-4 text-primary" /> Quality checked items
              </p>
            </div>
          </div>

          <div className="relative">
            <img
              src={heroImage}
              alt="Children wearing colorful school-ready outfits"
              className="h-[520px] w-full rounded-2xl object-cover shadow-soft"
            />
            <div className="absolute -bottom-5 left-5 rounded-xl bg-black/75 p-4 shadow-card">
              <p className="text-xs uppercase tracking-wide text-white/80">Back to School Deals</p>
              <p className="text-xl font-bold text-white">Up to 20% off school essentials</p>
            </div>
            <div className="absolute -right-4 top-5 rounded-full bg-gradient-accent px-4 py-2 text-sm font-semibold text-white shadow-glow">
              New Arrival
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-primary/35 bg-black/55 p-4 transition-transform duration-300 hover:-translate-y-1">
            <div className="mb-2 flex items-center gap-2 text-primary">
              <Gift className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">Promotional Banner</span>
            </div>
            <h3 className="text-lg font-semibold">Newborn Essentials</h3>
            <p className="mt-1 text-sm text-muted-foreground">Soft bodysuits, wraps, and comfort sets for infants aged 0-12 months.</p>
          </article>

          <article className="rounded-2xl border border-kids-blue/40 bg-black/55 p-4 transition-transform duration-300 hover:-translate-y-1">
            <div className="mb-2 flex items-center gap-2 text-kids-blue">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">Promotional Banner</span>
            </div>
            <h3 className="text-lg font-semibold">Back to School Deals</h3>
            <p className="mt-1 text-sm text-muted-foreground">Bundle uniforms, socks, and underwear at school-season prices.</p>
          </article>

          <article className="rounded-2xl border border-kids-pink/40 bg-black/55 p-4 transition-transform duration-300 hover:-translate-y-1">
            <div className="mb-2 flex items-center gap-2 text-kids-pink">
              <Package className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">Featured Collection</span>
            </div>
            <h3 className="text-lg font-semibold">Everyday Underwear Packs</h3>
            <p className="mt-1 text-sm text-muted-foreground">Comfortable boys and girls essentials made for all-day wear.</p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;