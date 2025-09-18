import { ShoppingCart, Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Tiny Threads
          </div>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            Custom Kids Wear
          </Badge>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            Shop All
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            School Uniforms
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            Casual Wear
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            Custom Designer
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            Schools Portal
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-4 w-4" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              3
            </Badge>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;