"use client";

import { useState } from "react";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";
import { useFilter } from "../contexts/FilterContext";

export default function Sidebar() {
  const {
    filters,
    updateCategory,
    updatePriceRange,
    updateBrands,
    updateMinRating,
    clearAllFilters,
    activeFiltersCount,
  } = useFilter();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    brand: true,
    rating: true,
  });

  const Categories = [
    "All",
    "Electronics",
    "Clothing",
    "Women's Clothing",
    "Jewelry",
  ];
  const Brands = ["Nike", "Apple", "Samsung", "Sony"];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleBrand = (brand: string) => {
    const newBrands = filters.selectedBrands.includes(brand)
      ? filters.selectedBrands.filter((b) => b !== brand)
      : [...filters.selectedBrands, brand];
    updateBrands(newBrands);
  };

  const handleCategoryChange = (category: string) => {
    updateCategory(category);
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    updatePriceRange(range);
  };

  const handleMinRatingChange = (rating: number[]) => {
    updateMinRating(rating[0]);
  };

  return (
    <>
      <MobileSidebar
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        activeFiltersCount={activeFiltersCount}
        clearAllFilters={clearAllFilters}
        selectedCategory={filters.selectedCategory}
        setSelectedCategory={handleCategoryChange}
        Categories={Categories}
        priceRange={filters.priceRange}
        setPriceRange={handlePriceRangeChange}
        selectedBrands={filters.selectedBrands}
        toggleBrand={toggleBrand}
        Brands={Brands}
      />
      <DesktopSidebar
        activeFiltersCount={activeFiltersCount}
        clearAllFilters={clearAllFilters}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        selectedCategory={filters.selectedCategory}
        setSelectedCategory={handleCategoryChange}
        Categories={Categories}
        priceRange={filters.priceRange}
        setPriceRange={handlePriceRangeChange}
        selectedBrands={filters.selectedBrands}
        toggleBrand={toggleBrand}
        Brands={Brands}
        minRating={[filters.minRating]}
        setMinRating={handleMinRatingChange}
      />
    </>
  );
}
