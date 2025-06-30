import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface OrderSummaryProps {
  totalItems: number;
  totalPrice: number;
}

export default function OrderSummary({ totalItems, totalPrice }: OrderSummaryProps) {
  const discountAmount = totalPrice * 0.10; // 10% discount
  console.log(discountAmount)
  const finalPrice = totalPrice - discountAmount;

  return (
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
      </div>
    </div>
  );
}
