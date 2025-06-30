import CartItem from "./CartItem";

interface CartItemType {
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

interface CartItemListProps {
  cartItems: CartItemType[];
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
}

export default function CartItemList({ cartItems, updateQuantity, removeFromCart }: CartItemListProps) {
  return (
    <div className="lg:col-span-2 space-y-4">
      {cartItems.map((item) => (
        <CartItem 
          key={item.id} 
          item={item} 
          updateQuantity={updateQuantity} 
          removeFromCart={removeFromCart} 
        />
      ))}
    </div>
  );
}
