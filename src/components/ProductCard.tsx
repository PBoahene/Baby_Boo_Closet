import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { CartItem, parseCart, serializeCart } from "@/lib/cart";
import { formatCurrency } from "@/lib/currency";
import type { Product } from "@/lib/catalog";

type ProductCardProps = Product;

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  inStock = true,
}: ProductCardProps) => {
  const { toast } = useToast();
  const [imageFailed, setImageFailed] = useState(false);
  const discount = originalPrice && originalPrice > price
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  function addToCart() {
    try {
      const cart = parseCart(localStorage.getItem("cart"));
      const existing = cart.find((item) => item.id === id);
      if (existing) {
        existing.qty += 1;
      } else {
        const newItem: CartItem = { id, name, price, qty: 1, image };
        cart.push(newItem);
      }
      localStorage.setItem("cart", serializeCart(cart));
      window.dispatchEvent(new Event("storage"));
      toast({ title: "Added to cart", description: `${name} has been added to your cart.` });
    } catch {
      // ignore localStorage errors
    }
  }

  const showImage = image && !imageFailed;

  return (
    <article className="group flex flex-col">
      <Link
        to={`/product/${id}`}
        className="relative block aspect-square overflow-hidden bg-gray-50"
        aria-label={name}
      >
        {showImage ? (
          <img
            src={image}
            alt=""
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 via-white to-kids-pink/10">
            <span className="font-logo text-5xl font-bold text-primary/50">{name.charAt(0).toLowerCase()}</span>
          </div>
        )}
        {discount > 0 && (
          <span className="absolute left-0 top-3 bg-kids-pink px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
            -{discount}%
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col pt-4">
        <Link to={`/product/${id}`} className="text-sm leading-snug text-gray-900 hover:underline">
          {name}
        </Link>
        <span className="mt-2 block h-px w-5 bg-gray-900" aria-hidden="true" />
        <div className="mt-2 flex flex-wrap items-baseline gap-x-2">
          <span className="text-[17px] text-gray-500">{formatCurrency(price)}</span>
          {discount > 0 && (
            <span className="text-sm text-gray-400 line-through">{formatCurrency(originalPrice!)}</span>
          )}
        </div>
        {discount > 0 ? (
          <span className="text-sm font-medium text-kids-blue">On Sale</span>
        ) : category ? (
          <span className="text-sm text-kids-blue">{category}</span>
        ) : null}

        <div className="mt-auto flex justify-center pt-4">
          {inStock ? (
            <button
              onClick={addToCart}
              className="rounded-full border border-gray-900 px-6 py-2 text-sm text-gray-900 transition-colors hover:bg-gray-900 hover:text-white"
            >
              Add to Cart
            </button>
          ) : (
            <button disabled className="cursor-not-allowed rounded-full bg-gray-300 px-6 py-2 text-sm text-white">
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
