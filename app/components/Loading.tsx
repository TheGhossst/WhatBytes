export default function Loading() {
  return (
    <div className="flex-1 p-3 lg:p-4">
      <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">
        Product Listing
      </h1>
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading products...</div>
      </div>
    </div>
  );
}
