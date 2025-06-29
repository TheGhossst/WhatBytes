"use client";

import Image from "next/image";
import { useFilter } from "../contexts/FilterContext";
import Loading from "./Loading";
import Error from "./Error";
import Link from "next/link";

export default function ProductGrid() {
  const { filteredProducts, loading, error, filters } = useFilter();

  if (loading) {
    <Loading />;
  }

  if (error) {
    <Error error={error} />;
  }

  const getResultsText = () => {
    const count = filteredProducts.length;
    if (filters.searchQuery) {
      return `${count} result${count !== 1 ? "s" : ""} for "${
        filters.searchQuery
      }"`;
    }
    return `${count} product${count !== 1 ? "s" : ""} found`;
  };

  return (
    <div className="flex-1 p-3 lg:p-4">
      <div className="mb-4 lg:mb-6">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
          Product Listing
        </h1>
        <p className="text-sm text-gray-600">{getResultsText()}</p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="text-gray-500 mb-2">
            {filters.searchQuery
              ? "No products found matching your search."
              : "No products found."}
          </div>
          {filters.searchQuery && (
            <div className="text-sm text-gray-400">
              Try adjusting your search terms or filters.
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
            >
              <Link href={`product/${product.id}`}>
                <div className="aspect-square mb-2 rounded-md overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={150}
                    height={150}
                    className="w-full h-full object-contain"
                    unoptimized
                  />
                </div>

                <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 leading-tight">
                  {product.title}
                </h3>

                {product.rating && (
                  <div className="flex items-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3 h-3 ${
                          i < product.rating.rate
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                )}

                {product.description && (
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {product.description}
                  </p>
                )}
              </Link>
              <div className="flex flex-col gap-2">
                <span className="text-base font-bold text-gray-900">
                  ${product.price}
                </span>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors w-full">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
