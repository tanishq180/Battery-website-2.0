"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Product } from "@/types/product";
import { fetchProductById } from "@/services/api";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ProductForm } from "@/components/admin/ProductForm";

export default function EditProductPage() {
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;
      setLoading(true);
      const data = await fetchProductById(id);
      setProduct(data);
      setLoading(false);
    }
    loadProduct();
  }, [id]);

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <AdminSidebar />
      <main className="flex-grow p-8 sm:p-12">
        {loading ? (
          <div className="flex items-center space-x-3 text-slate-400 py-12">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-400" />
            <span className="text-sm">Loading product details...</span>
          </div>
        ) : product ? (
          <ProductForm mode="edit" initialData={product} />
        ) : (
          <div className="p-6 bg-red-950/40 border border-red-800 text-red-300 rounded-2xl">
            Product with ID {id} not found.
          </div>
        )}
      </main>
    </div>
  );
}
