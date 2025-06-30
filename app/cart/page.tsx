"use client";

import { useCart } from "../contexts/CartContext";
import EmptyCart from "./components/EmptyCart";
import CartHeader from "./components/CartHeader";
import CartItemList from "./components/CartItemList";
import OrderSummary from "./components/OrderSummary";

export default function Cart() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
    clearCart,
  } = useCart();

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <CartHeader totalItems={totalItems} clearCart={clearCart} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <CartItemList
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
          <OrderSummary totalItems={totalItems} totalPrice={totalPrice} />
        </div>
      </div>
    </div>
  );
}

