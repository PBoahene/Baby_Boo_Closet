import { ShoppingCart, Search, User, Menu } from "lucide-react";
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
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const linkClass = (path) => 
    `text-foreground hover:text-primary transition-colors ${
      isActive(path) ? "text-primary font-semibold border-b-2 border-primary" : ""
    }`;

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
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/" className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              BBY-BOO CLOSET
            </Link>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Custom Kids Wear
            </Badge>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-4 w-4" />
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

        {/* Navigation - Desktop */}
        <div className="hidden md:flex items-center gap-4 pb-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem asChild>
                <Link to="/" className="w-full cursor-pointer">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/shop" className="w-full cursor-pointer">Shop All</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="#casual" className="w-full cursor-pointer">Casual Wear</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="#designer" className="w-full cursor-pointer">Custom Designer</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="#school" className="w-full cursor-pointer">Schools Portal</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <nav className="flex items-center justify-center gap-6 flex-1">
            <Link to="/" className={linkClass("/")}>
              Home
            </Link>
            <Link to="/shop" className={linkClass("/shop")}>
              Shop All
            </Link>
            <a href="#casual" className="text-foreground hover:text-primary transition-colors">
              Casual Wear
            </a>
            <a href="#designer" className="text-foreground hover:text-primary transition-colors">
              Custom Designer
            </a>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-foreground hover:text-primary transition-colors cursor-pointer">
                Schools Portal
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <a href="#uniforms" className="w-full">School Uniforms</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#friday-wear" className="w-full">Friday Wear</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="#school-gears" className="w-full">School Gears</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Type your preference here" 
              className="pl-10"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden pb-3">
          <div className="flex items-center gap-2 mb-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex-1">
                  <Menu className="h-4 w-4 mr-2" />
                  Menu
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/" className={`w-full cursor-pointer ${isActive("/") ? "bg-primary/10 font-semibold" : ""}`}>Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/shop" className={`w-full cursor-pointer ${isActive("/shop") ? "bg-primary/10 font-semibold" : ""}`}>Shop All</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="#casual" className="w-full cursor-pointer">Casual Wear</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="#designer" className="w-full cursor-pointer">Custom Designer</a>
                </DropdownMenuItem>
                <DropdownMenuItem disabled className="font-semibold">
                  Schools Portal
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="#uniforms" className="w-full cursor-pointer pl-6">School Uniforms</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="#friday-wear" className="w-full cursor-pointer pl-6">Friday Wear</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="#school-gears" className="w-full cursor-pointer pl-6">School Gears</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Type your preference here" 
              className="pl-10 w-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;