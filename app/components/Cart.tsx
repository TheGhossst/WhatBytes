"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "../contexts/CartContext";

export default function Cart() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <Link href="/cart">
      <div className="bg-blue-900 p-3 px-5 flex flex-row items-center rounded-xl hover:bg-blue-800 transition-colors cursor-pointer relative">
        <ShoppingCart className="text-white" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
        <p className="hidden sm:block ml-2 text-white">
          Cart {totalItems > 0 && `(${totalItems})`}
        </p>
      </div>
    </Link>
  );
}
