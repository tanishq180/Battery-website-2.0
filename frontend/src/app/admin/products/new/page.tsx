"use client";

import React from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ProductForm } from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <AdminSidebar />
      <main className="flex-grow p-8 sm:p-12">
        <ProductForm mode="create" />
      </main>
    </div>
  );
}
