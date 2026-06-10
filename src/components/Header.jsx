import { Menu, ShoppingBag, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const [count, setCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  useEffect(() => {
    function updateCount() {
      try {
        const raw = localStorage.getItem("cart");
        const cart = raw ? JSON.parse(raw) : [];
        setCount(cart.reduce((s, i) => s + (i.qty || 1), 0));
      } catch (err) {
        setCount(0);
      }
    }

    updateCount();
    window.addEventListener("storage", updateCount);
    return () => window.removeEventListener("storage", updateCount);
  }, []);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/custom-design", label: "Upload Design" },
    { to: "/school-kids", label: "School Kids" },
    { to: "/about", label: "About" },
    { to: "/terms", label: "Terms" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-white/92 backdrop-blur">
      <div className="bg-gray-900/90">
        <div className="container mx-auto px-4 py-2 text-center text-xs font-medium md:text-sm text-gray-200">
          Free delivery on orders above GHc 300 and easy returns within 7 days.
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex h-18 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 group" aria-label="Baby Boo Closet home">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-kids-pink to-kids-blue text-base font-extrabold tracking-wide text-white shadow-soft shadow-primary/25 transition-transform duration-300 group-hover:scale-105" style={{ fontFamily: '"Outfit", sans-serif' }}>
              BB
            </div>
            <div>
              <p className="text-base font-bold leading-none md:text-lg tracking-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>BABY-BOO CLOSET</p>
              <p className="text-xs text-muted-foreground tracking-wide">Modern Kidswear and School Essentials</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${isActive(item.to) ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-white/10"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            <Link to="/cart" className="relative md:mr-4">
              <Button variant="outline" className="rounded-full px-4">
                <ShoppingBag className="mr-2 h-4 w-4" /> Cart
              </Button>
              <Badge className="absolute -right-2 -top-2 h-5 min-w-5 rounded-full px-1 text-[11px]">
                {count}
              </Badge>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="space-y-1 border-t border-border/80 py-4 lg:hidden">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className={`block rounded-full px-4 py-2 text-sm font-medium transition-colors ${isActive(item.to) ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="block px-4 pt-2">
              <Button className="w-full rounded-full">Explore Collection</Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;