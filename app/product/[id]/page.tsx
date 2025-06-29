import { notFound } from "next/navigation";
import { Breadcrumb } from "./components/Breadcrumb";
import { ProductDescription } from "./components/ProductDescription";
import { ProductDetails } from "./components/ProductDetails";
import { ProductImage } from "./components/ProductImage";
//import { PurchaseOptions } from "./components/PurchaseOptions";

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

async function getProduct(id: string): Promise<Product> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/products/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Breadcrumb category={product.category} title={product.title} />

        <div className="grid grid-cols-1 lg:grid-cols-9 gap-6">
          <div className="lg:col-span-5">
            <ProductImage image={product.image} title={product.title} />
          </div>

          <div className="lg:col-span-4">
            <ProductDetails product={product} />
          </div>
        </div>

        <ProductDescription product={product} />
      </div>
    </div>
  );
}
