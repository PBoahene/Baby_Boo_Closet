// src/components/StarRating.jsx
import { Star } from "lucide-react";

export default function StarRating({ count = 5 }) {
  return (
    <div className="flex text-kids-yellow" aria-label={`${count} star rating`}>
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" />
      ))}
      <span className="sr-only">{count} out of 5 stars</span>
    </div>
  );
}
