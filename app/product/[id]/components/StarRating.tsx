import { Star } from "lucide-react";

export function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : star <= rating
                ? "fill-yellow-200 text-yellow-400"
                : "fill-gray-200 text-gray-300"
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
        {rating} ({count.toLocaleString()} reviews)
      </span>
    </div>
  );
}
