import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-border/70 bg-foreground text-background">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/70">Collections</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shop?category=boys" className="text-sm text-white/85 hover:text-white">
                  Boys
                </Link>
              </li>
              <li>
                <Link to="/shop?category=girls" className="text-sm text-white/85 hover:text-white">
                  Girls
                </Link>
              </li>
              <li>
                <Link to="/shop?category=school-gears" className="text-sm text-white/85 hover:text-white">
                  School Gears
                </Link>
              </li>
              <li>
                <Link to="/school-kids" className="text-sm text-white/85 hover:text-white">
                  School Kids
                </Link>
              </li>
              <li>
                <Link to="/shop?category=underwear" className="text-sm text-white/85 hover:text-white">
                  Underwear
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/70">Customer Care</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-sm text-white/85 hover:text-white">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-white/85 hover:text-white">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-white/85 hover:text-white">
                  Return and Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-white/85 hover:text-white">
                  About Baby-Boo Closet
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/70">Get Support</h4>
            <div className="space-y-3 text-sm text-white/85">
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> support@babyboocloset.com
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> +233 20 000 0000
              </p>
              <p>Mon-Sat, 8:00 AM to 6:00 PM</p>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/70">Stay Connected</h4>
            <p className="mb-4 text-sm text-white/85">
              Get first access to new arrivals, school opening bundles, and seasonal discounts.
            </p>
            <form className="mb-6 flex gap-2">
              <input
                type="email"
                placeholder="your-email@example.com"
                className="h-10 w-full rounded-md border border-white/35 bg-white/10 px-3 text-sm text-white placeholder:text-white/60 focus:border-white/70 focus:outline-none"
              />
              <button type="submit" className="h-10 rounded-md bg-white px-4 text-sm font-semibold text-foreground hover:bg-white/90">
                Join
              </button>
            </form>

            <div className="flex gap-3">
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/35 hover:border-white"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/35 hover:border-white"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <p className="text-sm text-white/80">
              © BABY-BOO CLOSET {new Date().getFullYear()} | Greater Accra, Ghana | Wholesale & Retail Clothing
            </p>
            <p className="text-xs uppercase tracking-wide text-white/60">Secure Checkout powered by Stripe</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
