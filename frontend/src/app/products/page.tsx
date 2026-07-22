"use client";

import React, { useState, useEffect } from "react";
import { Globe, Package, SearchX } from "lucide-react";
import { Category, Product } from "@/types/product";
import { fetchCategories, fetchProducts } from "@/services/api";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductCard } from "@/components/products/ProductCard";

export default function ProductCatalogPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);

  // Initial categories fetch
  useEffect(() => {
    async function loadCategories() {
      const data = await fetchCategories();
      setCategories(data);
    }
    loadCategories();
  }, []);

  // Fetch products whenever filters change
  useEffect(() => {
    let isMounted = true;
    async function loadProducts() {
      setLoading(true);
      const res = await fetchProducts(searchQuery, selectedCategory, 1, 24);
      if (isMounted) {
        setProducts(res.items);
        setTotal(res.total);
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      loadProducts();
    }, 300); // 300ms debounce

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [searchQuery, selectedCategory]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
  };

  return (
    <div className="space-y-12 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-200">
          <Globe className="h-3.5 w-3.5" />
          <span>Verified Wholesale Product Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Global Wholesale Product Catalog
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
          Browse our export-certified inventory. Filter items by industry category or search for specific commercial products to inspect tier-based bulk pricing breaks and custom shipping quotes.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <ProductFilters
        categories={categories}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        onCategoryChange={(slug) => setSelectedCategory(slug)}
        onSearchChange={(query) => setSearchQuery(query)}
        onClear={handleResetFilters}
      />

      {/* Results Header */}
      <div className="flex items-center justify-between text-sm text-slate-500 pb-2 border-b border-slate-200">
        <span>
          Showing <strong className="text-slate-900">{products.length}</strong> of{" "}
          <strong className="text-slate-900">{total}</strong> products
        </span>
        {selectedCategory && (
          <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Filtered by: {selectedCategory}
          </span>
        )}
      </div>

      {/* Loading Skeletons */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 animate-pulse space-y-4">
              <div className="h-44 bg-slate-200 rounded-xl" />
              <div className="h-5 bg-slate-200 rounded w-3/4" />
              <div className="h-4 bg-slate-200 rounded w-1/2" />
              <div className="h-10 bg-slate-200 rounded-xl pt-4" />
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        /* Product Cards Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 space-y-4 max-w-lg mx-auto shadow-sm">
          <div className="p-4 bg-slate-100 rounded-full w-fit mx-auto text-slate-400">
            <SearchX className="h-10 w-10" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No Products Found</h3>
          <p className="text-sm text-slate-600">
            We couldn't find any products matching your search criteria. Try resetting your search filters or browse all categories.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-sm transition"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
