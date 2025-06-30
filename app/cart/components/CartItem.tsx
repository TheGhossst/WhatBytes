import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity: number;
}

interface CartItemProps {
  item: CartItem;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
}

export default function CartItem({ item, updateQuantity, removeFromCart }: CartItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={item.image}
            alt={item.title}
            width={128}
            height={128}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2 capitalize">
                {item.category}
              </p>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < item.rating.rate
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm text-gray-600 ml-2">
                  ({item.rating.count} reviews)
                </span>
              </div>
              <p className="text-xl font-bold text-gray-900">
                ${item.price.toFixed(2)}
              </p>
            </div>

            <div className="flex flex-col items-end gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 border-red-600 hover:bg-red-50 p-2"
              >
                <Trash2 className="w-4 h-4" />
              </Button>

              <div className="flex items-center border border-gray-300 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    updateQuantity(item.id, item.quantity - 1)
                  }
                  className="p-2 hover:bg-gray-100"
                  disabled={item.quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 text-center min-w-[3rem] font-medium">
                  {item.quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    updateQuantity(item.id, item.quantity + 1)
                  }
                  className="p-2 hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <p className="text-lg font-bold text-blue-600">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
