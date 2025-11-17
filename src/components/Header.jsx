import { User, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const [count, setCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link to="/" className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              BABY-BOO CLOSET
            </Link>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Custom Kids Wear
            </Badge>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                type="text" 
                placeholder="Search products..." 
                className="pl-10 w-full"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link to="/login">
              <Button variant="ghost" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden md:inline text-sm">Account</span>
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" className="flex items-center gap-2 relative">
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor">
                  <path d="m480-560-56-56 63-64H320v-80h167l-64-64 57-56 160 160-160 160ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z"/>
                </svg>
                <span className="hidden md:inline text-sm">Cart</span>
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {count}
                </Badge>
              </Button>
            </Link>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="border-t border-border">
          <nav className="flex items-center justify-center gap-8 py-3">
            <Link to="/" className={`relative text-sm font-medium hover:text-primary transition-colors ${isActive("/") ? "text-primary" : ""}`}>
              HOME
              {isActive("/") && (
                <span className="absolute bottom-[-12px] left-0 right-0 h-0.5 bg-primary"></span>
              )}
            </Link>
            <Link to="/shop" className={`relative text-sm font-medium hover:text-primary transition-colors ${isActive("/shop") ? "text-primary" : ""}`}>
              SHOP ALL
              {isActive("/shop") && (
                <span className="absolute bottom-[-12px] left-0 right-0 h-0.5 bg-primary"></span>
              )}
            </Link>
            <a href="#boys" className="relative text-sm font-medium hover:text-primary transition-colors">
              BOYS
            </a>
            <a href="#girls" className="relative text-sm font-medium hover:text-primary transition-colors">
              GIRLS
            </a>
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
              <DropdownMenuTrigger 
                className="relative text-sm font-medium hover:text-primary transition-colors flex items-center gap-1" 
                onMouseEnter={() => setIsDropdownOpen(true)}
              >
                SCHOOL GEARS
                <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <DropdownMenuItem>
                  <a href="#school-uniforms" className="w-full">School Uniforms</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#customized-socks" className="w-full">Customized Socks</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#friday-wears" className="w-full">Friday Wears</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#lacoste" className="w-full">Lacoste</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#jerseys-customized" className="w-full">Jerseys Customized</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <a href="#underwears" className="relative text-sm font-medium hover:text-primary transition-colors">
              UNDERWEARS
            </a>
            <a href="#bulk-purchase" className="relative text-sm font-medium hover:text-primary transition-colors">
              BULK PURCHASE
            </a>
            <Link to="/about" className={`relative text-sm font-medium hover:text-primary transition-colors ${isActive("/about") ? "text-primary" : ""}`}>
              ABOUT US
              {isActive("/about") && (
                <span className="absolute bottom-[-12px] left-0 right-0 h-0.5 bg-primary"></span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;