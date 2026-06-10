import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">Collections</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shop?category=boys" className="text-sm text-gray-600 hover:text-gray-900">
                  Boys
                </Link>
              </li>
              <li>
                <Link to="/shop?category=girls" className="text-sm text-gray-600 hover:text-gray-900">
                  Girls
                </Link>
              </li>
              <li>
                <Link to="/shop?category=school-gears" className="text-sm text-gray-600 hover:text-gray-900">
                  School Gears
                </Link>
              </li>
              <li>
                <Link to="/school-kids" className="text-sm text-gray-600 hover:text-gray-900">
                  School Kids
                </Link>
              </li>
              <li>
                <Link to="/shop?category=underwear" className="text-sm text-gray-600 hover:text-gray-900">
                  Underwear
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">Customer Care</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-gray-900">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-gray-900">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-gray-900">
                  Return and Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-gray-900">
                  About Baby-Boo Closet
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">Get Support</h4>
            <div className="space-y-3 text-sm text-gray-600">
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
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">Stay Connected</h4>
            <p className="mb-4 text-sm text-gray-600">
              Get first access to new arrivals, school opening bundles, and seasonal discounts.
            </p>
            <form className="mb-6 flex gap-2">
              <input
                type="email"
                placeholder="your-email@example.com"
                className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none"
              />
              <button type="submit" className="h-10 rounded-md bg-gray-900 px-4 text-sm font-semibold text-white hover:bg-gray-800">
                Join
              </button>
            </form>

            <div className="flex gap-3">
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-gray-500 hover:text-gray-900"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-gray-500 hover:text-gray-900"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <p className="text-sm text-gray-500">
              © BABY-BOO CLOSET {new Date().getFullYear()} | Greater Accra, Ghana | Wholesale & Retail Clothing
            </p>
            <p className="text-xs uppercase tracking-wide text-gray-400">Secure Checkout powered by Stripe</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
