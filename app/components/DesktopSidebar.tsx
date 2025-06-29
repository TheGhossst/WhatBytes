"use client";

import { Slider } from "@/components/ui/slider";
import { ChevronDown, X, Check } from "lucide-react";

interface DesktopSidebarProps {
  activeFiltersCount: number;
  clearAllFilters: () => void;
  expandedSections: {
    category: boolean;
    price: boolean;

    rating: boolean;
  };
  toggleSection: (
    section: keyof DesktopSidebarProps["expandedSections"]
  ) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  Categories: string[];
  priceRange: number[];
  setPriceRange: (value: [number, number]) => void;

  minRating: number[];
  setMinRating: (value: number[]) => void;
}

export default function DesktopSidebar({
  activeFiltersCount,
  clearAllFilters,
  expandedSections,
  toggleSection,
  selectedCategory,
  setSelectedCategory,
  Categories,
  priceRange,
  setPriceRange,

  minRating,
  setMinRating,
}: DesktopSidebarProps) {
  return (
    <div className="hidden lg:block w-72 h-fit">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mt-5 mx-5">
        <div className="bg-blue-700 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Filter</h2>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-blue-100 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <div className="mt-2 text-blue-100 text-sm">
              {activeFiltersCount} filter{activeFiltersCount !== 1 ? "s" : ""}{" "}
              applied
            </div>
          )}
        </div>

        <div className="p-6 space-y-8">
          <div className="space-y-4">
            <button
              onClick={() => toggleSection("category")}
              className="flex items-center justify-between w-full group"
            >
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                Category
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  expandedSections.category ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                expandedSections.category
                  ? "max-h-64 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="space-y-3">
                {Categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                      selectedCategory === category
                        ? "bg-blue-50 text-blue-700 border-2 border-blue-200 shadow-sm"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{category}</span>
                      {selectedCategory === category && (
                        <Check className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => toggleSection("price")}
              className="flex items-center justify-between w-full group"
            >
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                Price Range
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  expandedSections.price ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                expandedSections.price
                  ? "max-h-32 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={1000}
                  min={0}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between items-center">
                  <div className="bg-white px-3 py-2 rounded-lg border border-gray-200">
                    <span className="text-sm font-medium text-gray-900">
                      ${priceRange[0]}
                    </span>
                  </div>
                  <div className="text-gray-400">to</div>
                  <div className="bg-white px-3 py-2 rounded-lg border border-gray-200">
                    <span className="text-sm font-medium text-gray-900">
                      ${priceRange[1]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => toggleSection("rating")}
              className="flex items-center justify-between w-full group"
            >
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                Minimum Rating
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  expandedSections.rating ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                expandedSections.rating
                  ? "max-h-32 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                <Slider
                  value={minRating}
                  onValueChange={setMinRating}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < minRating[0] ? "text-yellow-400" : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {minRating[0]} star{minRating[0] !== 1 ? "s" : ""} & up
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
