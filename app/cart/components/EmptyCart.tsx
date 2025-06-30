import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptyCart() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center mb-6">
          <Link
            href="/"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Continue Shopping
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add some products to get started!
          </p>
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
