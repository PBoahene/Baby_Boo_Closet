import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-600 w-full">
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
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 hover:border-white/40 flex items-center justify-center transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
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
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 hover:border-white/40 flex items-center justify-center transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0a12 12 0 0 0-4.37 23.17c-.06-.56-.12-1.43 0-2 .12-.56.72-3.07.72-3.07a4 4 0 0 1-.32-1.61c0-1.5.87-2.62 2-2.62a1.36 1.36 0 0 1 1.37 1.53c0 .93-.6 2.33-.91 3.62a1.58 1.58 0 0 0 1.61 1.95c1.93 0 3.42-2 3.42-5 0-2.6-1.87-4.42-4.54-4.42a4.75 4.75 0 0 0-4.95 4.76 3 3 0 0 0 .68 2 .28.28 0 0 1 .06.28c-.08.32-.25 1-.28 1.13a.2.2 0 0 1-.29.15c-1.61-.75-2.62-3.1-2.62-5 0-4.05 2.94-7.77 8.49-7.77 4.46 0 7.93 3.17 7.93 7.42 0 4.42-2.79 8-6.67 8a3.44 3.44 0 0 1-3-1.45s-.65 2.48-.81 3.09a10.89 10.89 0 0 1-1.26 2.68A12 12 0 1 0 12 0z"/>
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
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 hover:border-white/40 flex items-center justify-center transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 hover:border-white/40 flex items-center justify-center transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-sm text-gray-400">
              © BBY-BOO CLOSET {new Date().getFullYear()} | Greater Accra, Ghana | Wholesale & Retail Clothing
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
