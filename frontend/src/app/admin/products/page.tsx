"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Package,
  Plus,
  Edit3,
  Trash2,
  Search,
  ExternalLink,
  Loader2,
  Tag,
} from "lucide-react";
import { Product } from "@/types/product";
import { fetchProducts } from "@/services/api";
import { deleteAdminProduct } from "@/services/adminApi";
import { useAuth } from "@/context/AuthContext";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/Button";

export default function AdminProductsPage() {
  const { token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    const data = await fetchProducts(searchQuery, "", 1, 100);
    setProducts(data.items);
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProducts();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleDelete = async (id: number, title: string) => {
    if (!token) return;
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    setDeletingId(id);
    try {
      await deleteAdminProduct(token, id);
      await loadProducts();
    } catch (err) {
      alert("Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <AdminSidebar />

      <main className="flex-grow p-8 sm:p-12 space-y-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Export Product Catalog Management
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Add, update, or adjust volume price breaks for wholesale inventory items.
            </p>
          </div>

          <Link href="/admin/products/new">
            <Button variant="primary" size="md">
              <Plus className="mr-1.5 h-4 w-4" /> Add Product
            </Button>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by title..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Product Table */}
        {loading ? (
          <div className="flex items-center space-x-3 text-slate-400 py-12">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-400" />
            <span className="text-sm">Loading product catalog...</span>
          </div>
        ) : products.length > 0 ? (
          <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-950/60">
                    <th className="py-4 px-6">Product Title</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Price Breaks</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850 text-sm">
                  {products.map((p) => {
                    const minPrice = p.price_tiers && p.price_tiers.length > 0
                      ? Math.min(...p.price_tiers.map((t) => t.unit_price))
                      : 0;

                    return (
                      <tr key={p.id} className="hover:bg-slate-850/50 transition">
                        <td className="py-4 px-6 font-bold text-white flex items-center space-x-3">
                          <Package className="h-5 w-5 text-emerald-400 shrink-0" />
                          <div>
                            <span className="block">{p.title}</span>
                            <span className="text-xs font-normal text-slate-400 line-clamp-1">{p.description}</span>
                          </div>
                        </td>

                        <td className="py-4 px-6">
                          {p.category ? (
                            <span className="text-xs font-semibold text-slate-300 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
                              {p.category.name}
                            </span>
                          ) : (
                            <span className="text-xs text-slate-500">Uncategorized</span>
                          )}
                        </td>

                        <td className="py-4 px-6">
                          <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                            {p.price_tiers.length} Tiers (from ${minPrice.toFixed(2)})
                          </span>
                        </td>

                        <td className="py-4 px-6 text-right space-x-2">
                          <Link href={`/products/${p.id}`} target="_blank">
                            <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition" title="Preview Public Page">
                              <ExternalLink className="h-4 w-4" />
                            </button>
                          </Link>

                          <Link href={`/admin/products/${p.id}`}>
                            <button className="p-2 text-slate-400 hover:text-emerald-400 rounded-lg hover:bg-slate-800 transition" title="Edit Product">
                              <Edit3 className="h-4 w-4" />
                            </button>
                          </Link>

                          <button
                            onClick={() => handleDelete(p.id, p.title)}
                            disabled={deletingId === p.id}
                            className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition cursor-pointer"
                            title="Delete Product"
                          >
                            {deletingId === p.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900 rounded-3xl p-12 text-center border border-slate-800 space-y-4 max-w-md mx-auto">
            <Package className="h-10 w-10 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Products Found</h3>
            <p className="text-xs text-slate-400">Start by creating your first wholesale export product.</p>
            <Link href="/admin/products/new">
              <Button variant="primary" size="sm">
                <Plus className="mr-1.5 h-4 w-4" /> Add Product
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
