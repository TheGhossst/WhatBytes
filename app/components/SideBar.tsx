"use client";

import { useState } from "react";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";

export default function Sidebar() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState([3]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    brand: true,
    rating: true,
  });

  const Categories = ["All", "Electronics", "Clothing", "Home"];
  const Brands = ["Nike", "Apple", "Samsung", "Sony"];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setPriceRange([0, 1000]);
    setSelectedBrands([]);
    setMinRating([3]);
  };

  const activeFiltersCount =
    (selectedCategory !== "All" ? 1 : 0) +
    (priceRange[0] !== 0 || priceRange[1] !== 1000 ? 1 : 0) +
    selectedBrands.length +
    (minRating[0] !== 3 ? 1 : 0);

  return (
    <>
      <MobileSidebar
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        activeFiltersCount={activeFiltersCount}
        clearAllFilters={clearAllFilters}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        Categories={Categories}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        selectedBrands={selectedBrands}
        toggleBrand={toggleBrand}
        Brands={Brands}
      />
      <DesktopSidebar
        activeFiltersCount={activeFiltersCount}
        clearAllFilters={clearAllFilters}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        Categories={Categories}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        selectedBrands={selectedBrands}
        toggleBrand={toggleBrand}
        Brands={Brands}
        minRating={minRating}
        setMinRating={setMinRating}
      />
    </>
  );
}