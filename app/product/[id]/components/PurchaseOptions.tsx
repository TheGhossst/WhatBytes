import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PurchaseOptionsProps {
  price: number;
}

export function PurchaseOptions({ price }: PurchaseOptionsProps) {
  const discountPrice = price * 0.85; // Simulate 15% discount

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <div className="text-lg font-semibold mb-4">
          ${discountPrice.toFixed(2)}
        </div>

        <div className="space-y-3 text-sm mb-4">
          <div className="flex justify-between">
            <span>FREE Returns</span>
            <span className="text-blue-600">Details</span>
          </div>
          <div className="flex justify-between">
            <span>FREE delivery</span>
            <span className="text-blue-600">Details</span>
          </div>
          <div>
            <span className="text-green-600">In Stock</span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <label className="block text-sm font-medium">Quantity:</label>
          <select className="w-full p-2 border border-gray-300 rounded-md">
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium mb-2">
          Add to Cart
        </Button>

        <Button className="w-full bg-orange-400 hover:bg-orange-500 text-black font-medium">
          Buy Now
        </Button>

        <div className="mt-4 p-3 bg-blue-50 rounded-md">
          <p className="text-xs text-blue-800">
            <strong>Secure transaction</strong>
            <br />
            Your payment information is processed securely.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
