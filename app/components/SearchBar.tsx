"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { useFilter } from "../contexts/FilterContext";

// Extend Window interface for search timeout
declare global {
  interface Window {
    searchTimeout: NodeJS.Timeout;
  }
}

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  placeholder = "Search products...",
  className = "",
}: SearchBarProps) {
  const { filters, updateSearch } = useFilter();
  const [searchValue, setSearchValue] = useState(filters.searchQuery);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchValue(filters.searchQuery);
  }, [filters.searchQuery]);

  const handleClear = () => {
    setSearchValue("");
    updateSearch("");
    inputRef.current?.focus();
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      updateSearch(searchValue.trim());
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      updateSearch(value.trim());
    }, 300);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={`relative w-full ${className}`}>
      <div
        className={`
          relative flex items-center rounded-md border-2 transition-all duration-200 shadow-sm
          ${
            isFocused
              ? "border-blue-500 shadow-lg ring-4 ring-blue-500/10"
              : "border-gray-400 hover:border-gray-300"
          }
        `}
      >
        <div className="pl-2 sm:pl-4 pr-1 sm:pr-3">
          {isLoading ? (
            <Loader2 size={18} className="animate-spin text-blue-500" />
          ) : (
            <Search
              size={16}
              className={`transition-colors duration-200 ${
                isFocused ? "text-blue-500" : "text-gray-400"
              }`}
            />
          )}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
          disabled={isLoading}
          className="
            flex-1 py-2 sm:py-3 px-1 sm:px-2 bg-transparent outline-none
            text-white placeholder-gray-400 text-sm sm:text-base
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          aria-label="Search"
        />
        {searchValue && (
          <button
            type="button"
            onClick={handleClear}
            disabled={isLoading}
            className="
              p-1.5 sm:p-2 mr-2 rounded-full hover:bg-gray-100
              transition-colors duration-150 group disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            <X
              size={14}
              className="text-gray-400 group-hover:text-gray-600 transition-colors duration-150"
            />
          </button>
        )}
      </div>
    </div>
  );
}
