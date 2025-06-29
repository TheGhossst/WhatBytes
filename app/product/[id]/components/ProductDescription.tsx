import { Card, CardContent } from "@/components/ui/card";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductDescriptionProps {
  product: Product;
}

export function ProductDescription({ product }: ProductDescriptionProps) {
  return (
    <div className="mt-8">
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Product Description</h2>
          <p className="text-gray-700 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Product Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="font-medium">Category:</span>
                <span className="ml-2 capitalize">{product.category}</span>
              </div>
              <div>
                <span className="font-medium">Rating:</span>
                <span className="ml-2">{product.rating.rate}/5</span>
              </div>
              <div>
                <span className="font-medium">Reviews:</span>
                <span className="ml-2">
                  {product.rating.count.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="font-medium">Product ID:</span>
                <span className="ml-2">#{product.id}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
