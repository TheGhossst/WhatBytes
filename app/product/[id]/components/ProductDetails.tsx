import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RotateCcw, Shield, ShoppingCart, Truck } from "lucide-react";
import { StarRating } from "./StarRating";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const discountPrice = product.price * 0.85; //15 discount
  const savings = product.price - discountPrice;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <Badge
        variant="secondary"
        className="mb-2 bg-blue-100 text-blue-800"
      >
        {product.category}
      </Badge>

      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
        {product.title}
      </h1>

      <StarRating
        rating={product.rating.rate}
        count={product.rating.count}
      />

      <Separator className="my-4" />

      <div className="space-y-2 mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-red-600">
            ${discountPrice.toFixed(2)}
          </span>
          <span className="text-lg text-gray-500 line-through">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <p className="text-sm text-green-600">
          You save ${savings.toFixed(2)} (15%)
        </p>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 text-sm">
          <Truck className="w-4 h-4 text-blue-600" />
          <span>FREE delivery by tomorrow</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Shield className="w-4 h-4 text-blue-600" />
          <span>2-year warranty included</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <RotateCcw className="w-4 h-4 text-blue-600" />
          <span>30-day return policy</span>
        </div>
      </div>

      <div className="space-y-3">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </Button>

        <Button
          variant="outline"
          className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 py-3 bg-transparent"
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
}
