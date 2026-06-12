import { LogOut, Menu, ShoppingBag, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const Header = () => {
  const [count, setCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

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
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="bg-gray-900">
        <div className="container mx-auto px-4 py-2 text-center text-xs font-medium md:text-sm text-gray-300">
          Free delivery on orders above GHc 300 &mdash; easy returns within 7 days.
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <Link to="/" className="flex items-center" aria-label="Baby Boo Closet home">
            <img src="/brand/logo.svg" alt="Baby Boo" className="h-14 w-14 md:h-16 md:w-16 object-contain" />
          </Link>

          <div className="flex items-center gap-1">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Account" className="rounded-full">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                        {user.email?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel className="truncate text-xs font-normal text-muted-foreground">
                    {user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/account")}>
                    <User className="mr-2 h-4 w-4" /> My Account
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={async () => { await supabase.auth.signOut(); navigate("/"); }}>
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon" aria-label="Account">
                  <User className="h-5 w-5 text-gray-600" />
                </Button>
              </Link>
            )}

            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" aria-label="Cart">
                <ShoppingBag className="h-5 w-5 text-gray-600" />
              </Button>
              <Badge className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full px-1 text-[11px]">
                {count}
              </Badge>
            </Link>
          </div>
        </div>

        <nav className="flex items-center justify-center gap-4 md:gap-6 border-t border-gray-200 py-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`whitespace-nowrap text-xs md:text-sm font-medium transition-colors tracking-wide uppercase ${isActive(item.to) ? "text-primary" : "text-gray-600 hover:text-gray-900"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
