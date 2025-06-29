"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  description: string;
}

interface FilterState {
  searchQuery: string;
  selectedCategory: string;
  priceRange: [number, number];
  minRating: number;
}

interface FilterContextType {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  error: string | null;
  filters: FilterState;
  updateSearch: (query: string) => void;
  updateCategory: (category: string) => void;
  updatePriceRange: (range: [number, number]) => void;
  updateMinRating: (rating: number) => void;
  clearAllFilters: () => void;
  activeFiltersCount: number;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: searchParams.get("search") || "",
    selectedCategory: searchParams.get("category") || "All",
    priceRange: [
      parseInt(searchParams.get("minPrice") || "0"),
      parseInt(searchParams.get("maxPrice") || "1000"),
    ],

    minRating: parseFloat(searchParams.get("minRating") || "0"),
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.searchQuery) params.set("search", filters.searchQuery);
    if (filters.selectedCategory !== "All")
      params.set("category", filters.selectedCategory);
    if (filters.priceRange[0] !== 0)
      params.set("minPrice", filters.priceRange[0].toString());
    if (filters.priceRange[1] !== 1000)
      params.set("maxPrice", filters.priceRange[1].toString());

    if (filters.minRating > 0)
      params.set("minRating", filters.minRating.toString());

    const newUrl = params.toString() ? `?${params.toString()}` : "/";
    router.replace(newUrl, { scroll: false });
  }, [filters, router]);

  const filteredProducts = products.filter((product) => {
    if (filters.searchQuery) {
      const searchLower = filters.searchQuery.toLowerCase();
      const matchesSearch =
        product.title.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    if (filters.selectedCategory !== "All") {
      const categoryMap: { [key: string]: string } = {
        Electronics: "electronics",
        Clothing: "men's clothing",
        "Women's Clothing": "women's clothing",
        Jewelry: "jewelery",
      };
      const apiCategory =
        categoryMap[filters.selectedCategory] ||
        filters.selectedCategory.toLowerCase();
      if (product.category !== apiCategory) return false;
    }

    if (
      product.price < filters.priceRange[0] ||
      product.price > filters.priceRange[1]
    ) {
      return false;
    }
    if (product.rating.rate < filters.minRating) {
      return false;
    }

    return true;
  });

  const updateSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  const updateCategory = (category: string) => {
    setFilters((prev) => ({ ...prev, selectedCategory: category }));
  };

  const updatePriceRange = (range: [number, number]) => {
    setFilters((prev) => ({ ...prev, priceRange: range }));
  };

  const updateMinRating = (rating: number) => {
    setFilters((prev) => ({ ...prev, minRating: rating }));
  };

  const clearAllFilters = () => {
    setFilters({
      searchQuery: "",
      selectedCategory: "All",
      priceRange: [0, 1000],

      minRating: 0,
    });
  };

  const activeFiltersCount =
    (filters.searchQuery ? 1 : 0) +
    (filters.selectedCategory !== "All" ? 1 : 0) +
    (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 1000 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0);

  return (
    <FilterContext.Provider
      value={{
        products,
        filteredProducts,
        loading,
        error,
        filters,
        updateSearch,
        updateCategory,
        updatePriceRange,

        updateMinRating,
        clearAllFilters,
        activeFiltersCount,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
}
