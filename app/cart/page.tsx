"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../contexts/CartContext";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Cart() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
    clearCart,
  } = useCart();

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const discountAmount = totalPrice * 0.85; //15
  const finalPrice = totalPrice - discountAmount;

  if (cartItems.length === 0) {
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm p-6">
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
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount (10%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
                <span>Total</span>
                <span>${finalPrice.toFixed(2)}</span>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Save for Later
                </Button>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center text-sm text-blue-800">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  <span>Free shipping on orders over $50</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
