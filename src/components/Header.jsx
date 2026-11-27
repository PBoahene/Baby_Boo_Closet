import { ChevronDown, LogOut, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { categoryMenu } from "@/lib/catalog";

const utilityLinks = [
  { to: "/shop", label: "Shop" },
  { to: "/custom-design", label: "Upload Design" },
  { to: "/school-kids", label: "School Orders" },
  { to: "/about", label: "Contact" },
];

export const Logo = ({ size = "md" }) => {
  const small = size === "sm";
  return (
    <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="Baby-Boo Closet home">
      <img
        src="/brand/logo-mark.svg"
        alt=""
        className={small ? "h-11 w-11" : "h-12 w-12 md:h-16 md:w-16"}
      />
      <span className="leading-none">
        <span
          className={`block bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] bg-clip-text font-bold tracking-wide text-transparent ${small ? "text-xl" : "text-[22px] md:text-[28px]"}`}
          style={{ fontFamily: "Georgia, serif" }}
        >
          Baby Boo
        </span>
        <span className={`mt-1 block font-semibold uppercase tracking-[0.4em] text-gray-400 ${small ? "text-[10px]" : "text-[10px] md:text-xs"}`}>
          Closet
        </span>
      </span>
    </Link>
  );
};

const Header = () => {
  const [count, setCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const [query, setQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

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

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenGroup(null);
  }, [location.pathname, location.search]);

  const submitSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
  };

  const isActive = (to) => `${location.pathname}${location.search}` === to;

  const searchBox = (
    <form onSubmit={submitSearch} className="relative w-full" role="search">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        aria-label="Search products"
        className="h-10 w-full rounded-full border-0 bg-gray-100 pl-11 pr-4 text-[15px] text-gray-800 outline-none ring-primary/40 placeholder:text-gray-600 focus:bg-white focus:ring-2"
      />
    </form>
  );

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 py-4 md:gap-6 md:py-5">
          <button
            className="-ml-2 rounded-full p-2 text-gray-700 lg:hidden"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Logo />

          <nav className="hidden flex-1 items-center justify-center gap-7 lg:flex" aria-label="Store">
            {utilityLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`text-sm text-gray-900 underline-offset-4 hover:underline ${location.pathname === item.to ? "underline" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden w-full max-w-xs md:block lg:ml-0 xl:max-w-md">{searchBox}</div>

          <div className="ml-auto flex items-center gap-1 md:ml-0">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Account" className="rounded-full">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
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
              <Link
                to="/login"
                className="flex items-center gap-2 rounded-full px-2 py-2 text-gray-900"
                aria-label="Log in"
              >
                <User className="h-5 w-5 md:hidden" />
                <span className="hidden text-lg md:inline">Log In</span>
              </Link>
            )}

            <Link to="/cart" className="relative rounded-full p-2 text-gray-800" aria-label={`Cart, ${count} items`}>
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-gray-900">
                {count}
              </span>
            </Link>
          </div>
        </div>

        <div className="pb-3 md:hidden">{searchBox}</div>
      </div>

      {/* Category menu (desktop) */}
      <div className="hidden lg:block">
        <nav className="container mx-auto flex items-center justify-center gap-x-10 px-4 xl:gap-x-14" aria-label="Categories">
          {categoryMenu.map((group) => (
            <div
              key={group.label}
              className="group relative"
              onMouseEnter={() => setOpenGroup(group.label)}
              onMouseLeave={() => setOpenGroup(null)}
            >
              <Link
                to={group.to}
                className={`flex items-center gap-1 py-3 text-[13px] transition-colors ${isActive(group.to) ? "text-primary" : "text-gray-900 hover:text-primary"}`}
                aria-haspopup={group.children ? "true" : undefined}
                aria-expanded={group.children ? openGroup === group.label : undefined}
                onFocus={() => setOpenGroup(group.label)}
              >
                {group.label}
              </Link>
              {group.children && openGroup === group.label && (
                <div className="absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 rounded-b-xl border border-t-2 border-gray-100 border-t-primary bg-white py-2 shadow-lg">
                  {group.children.map((child) => (
                    <Link
                      key={child.label}
                      to={child.to}
                      className="block px-5 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
      <div className="container mx-auto px-4 pb-1 lg:pt-3">
        <div className="h-0.5 bg-primary" />
      </div>

      {/* Mobile drawer */}
      {isMenuOpen && (
        <div className="max-h-[calc(100vh-120px)] overflow-y-auto border-t border-gray-100 bg-white shadow-lg lg:hidden">
          <nav className="container mx-auto px-4 py-2" aria-label="Mobile">
            {categoryMenu.map((group) => (
              <div key={group.label} className="border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <Link to={group.to} className="flex-1 py-3 text-[15px] font-medium text-gray-800">
                    {group.label}
                  </Link>
                  {group.children && (
                    <button
                      className="p-3 text-gray-500"
                      onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                      aria-label={`Show ${group.label} categories`}
                      aria-expanded={openGroup === group.label}
                    >
                      <ChevronDown className={`h-4 w-4 transition-transform ${openGroup === group.label ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>
                {group.children && openGroup === group.label && (
                  <div className="pb-2 pl-4">
                    {group.children.map((child) => (
                      <Link key={child.label} to={child.to} className="block py-2 text-sm text-gray-600">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex flex-wrap gap-x-5 gap-y-2 py-4">
              {utilityLinks.map((item) => (
                <Link key={item.label} to={item.to} className="text-sm text-gray-600">
                  {item.label}
                </Link>
              ))}
              <Link to="/terms" className="text-sm text-gray-600">Terms</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
