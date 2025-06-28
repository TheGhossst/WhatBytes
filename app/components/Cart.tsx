"use client";

import { ShoppingCart } from "lucide-react";

export default function Cart() {
  return (
    <div className="bg-blue-400 p-3 flex flex-row items-center rounded-xl">
      <ShoppingCart className="text-white" />
      <p className="hidden sm:block ml-2 text-white">Cart</p>
    </div>
  );
}
