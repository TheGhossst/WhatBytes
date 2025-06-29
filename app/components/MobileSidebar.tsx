"use client";

import { Slider } from "@/components/ui/slider";
import { ChevronDown, Filter, Check } from "lucide-react";

interface MobileSidebarProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
  activeFiltersCount: number;
  clearAllFilters: () => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  Categories: string[];
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  selectedBrands: string[];
  toggleBrand: (brand: string) => void;
  Brands: string[];
}

export default function MobileSidebar({
  isFilterOpen,
  setIsFilterOpen,
  activeFiltersCount,
  clearAllFilters,
  selectedCategory,
  setSelectedCategory,
  Categories,
  priceRange,
  setPriceRange,
  selectedBrands,
  toggleBrand,
  Brands,
}: MobileSidebarProps) {
  return (
    <>
      <div className="lg:hidden sticky top-0 z-10 bg-white border-b border-gray-200 p-4">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center justify-between w-full bg-gray-50 hover:bg-gray-100 transition-colors duration-200 rounded-xl px-4 py-3"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">Filters</span>
            {activeFiltersCount > 0 && (
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <ChevronDown
            className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
              isFilterOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isFilterOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Filter Products
            </h3>
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Category</h4>
              <div className="grid grid-cols-2 gap-2">
                {Categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Price Range</h4>
              <div className="px-2">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={1000}
                  min={0}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Brands</h4>
              <div className="grid grid-cols-2 gap-2">
                {Brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => toggleBrand(brand)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                      selectedBrands.includes(brand)
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {selectedBrands.includes(brand) && (
                      <Check className="w-4 h-4" />
                    )}
                    {brand}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
