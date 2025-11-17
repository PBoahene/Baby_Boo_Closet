import React from "react";
import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-black w-full">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Collections */}
          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm text-gray-500">Collections</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shop?category=boys" className="text-sm text-gray-400 hover:text-gray-300 transition-colors">
                  Boys
                </Link>
              </li>
              <li>
                <Link to="/shop?category=girls" className="text-sm text-gray-400 hover:text-gray-300 transition-colors">
                  Girls
                </Link>
              </li>
              <li>
                <Link to="/shop?category=school-gears" className="text-sm text-gray-400 hover:text-gray-300 transition-colors">
                  School Gears
                </Link>
              </li>
              <li>
                <Link to="/shop?category=underwear" className="text-sm text-gray-400 hover:text-gray-300 transition-colors">
                  Underwear
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm text-gray-500">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-gray-400 hover:text-gray-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-gray-400 hover:text-gray-300 transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-sm text-gray-400 hover:text-gray-300 transition-colors">
                  Return Policy (24hrs)
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-400 hover:text-gray-300 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-sm text-gray-400 hover:text-gray-300 transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Connect With Us */}
          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm text-gray-500">Stay Connected</h4>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get special offers, latest arrivals, and exclusive updates on school uniforms.
            </p>
            <form className="relative mb-6">
              <input
                type="email"
                placeholder="your-email@example.com"
                className="w-full bg-transparent border-b border-gray-600 focus:border-gray-500 py-2 pr-8 text-sm text-gray-500 placeholder-gray-500 outline-none transition-colors"
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:opacity-70 transition-opacity"
              >
                →
              </button>
            </form>
            
            <h4 className="font-semibold mb-4 uppercase text-sm text-gray-500">Connect With Us</h4>
            <div className="flex gap-3">
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 hover:border-white/40 flex items-center justify-center transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 hover:border-white/40 flex items-center justify-center transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-sm text-gray-400">
              © BABY-BOO CLOSET {new Date().getFullYear()} | Greater Accra, Ghana | Wholesale & Retail Clothing
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
