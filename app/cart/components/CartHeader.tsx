import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartHeaderProps {
  totalItems: number;
  clearCart: () => void;
}

export default function CartHeader({ totalItems, clearCart }: CartHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <Link
          href="/"
          className="flex items-center text-blue-600 hover:text-blue-700 mr-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Continue Shopping
        </Link>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Shopping Cart ({totalItems} items)
        </h1>
      </div>
      <Button
        variant="outline"
        onClick={clearCart}
        className="text-red-600 border-red-600 hover:bg-red-50"
      >
        Clear Cart
      </Button>
    </div>
  );
}
