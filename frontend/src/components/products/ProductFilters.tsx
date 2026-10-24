"use client";

import React from "react";
import { Search, X, Filter } from "lucide-react";
import { Category } from "@/types/product";

interface ProductFiltersProps {
  categories: Category[];
  selectedCategory: string;
  searchQuery: string;
  onCategoryChange: (slug: string) => void;
  onSearchChange: (query: string) => void;
  onClear: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  selectedCategory,
  searchQuery,
  onCategoryChange,
  onSearchChange,
  onClear,
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
      {/* Top Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search batteries"
          placeholder="Search batteries, applications, or technologies..."
          className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          <Filter className="h-3.5 w-3.5 text-emerald-600" />
          <span>Filter by Category</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            aria-pressed={selectedCategory === ""}
            onClick={() => onCategoryChange("")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
              selectedCategory === ""
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
            }`}
          >
            All Categories
          </button>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                aria-pressed={isSelected}
                onClick={() => onCategoryChange(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filter Clear Helper */}
      {(searchQuery || selectedCategory) && (
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
          <span>Active filters applied</span>
          <button
            onClick={onClear}
            className="text-emerald-600 hover:text-emerald-700 font-semibold underline cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
