"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Package,
  Send,
  ShieldCheck,
} from "lucide-react";
import { Product } from "@/types/product";
import { fetchProductById } from "@/services/api";
import { PriceTierTable } from "@/components/products/PriceTierTable";
import { PriceCalculator } from "@/components/products/PriceCalculator";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Button } from "@/components/ui/Button";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [targetQuantity, setTargetQuantity] = useState<number>(10);

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadProduct() {
      if (!productId) return;
      setLoading(true);
      const data = await fetchProductById(productId);
      setProduct(data);
      setLoading(false);
    }
    loadProduct();
  }, [productId]);

  const handleOpenFormQuote = (qty: number) => {
    setTargetQuantity(qty);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-32" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="h-96 bg-slate-200 rounded-3xl" />
          <div className="space-y-6">
            <div className="h-8 bg-slate-200 rounded w-3/4" />
            <div className="h-4 bg-slate-200 rounded w-1/2" />
            <div className="h-32 bg-slate-200 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
        <div className="p-4 bg-red-50 text-red-600 rounded-full w-fit mx-auto">
          <Package className="h-10 w-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Product Not Found</h2>
        <p className="text-slate-600 text-sm">
          The requested battery product could not be located or may have been updated.
        </p>
        <Link href="/products">
          <Button variant="primary">
            <ArrowLeft className="mr-2 h-4 w-4" /> Return to Catalog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Link */}
      <div>
        <Link
          href="/products"
          className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-900 transition"
        >
          <ArrowLeft className="mr-1.5 h-4 w-4 text-emerald-600" /> Back to Product Catalog
        </Link>
      </div>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Product Info & Media (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Image Container */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm relative overflow-hidden">
            <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="w-full h-full object-contain p-5"
                  onError={(e) => {
                    (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).src =
                      "/images/battery-auto.svg";
                  }}
                />
              ) : (
                <div className="flex flex-col items-center space-y-2 text-slate-400">
                  <Package className="h-16 w-16 text-slate-300" />
                  <span className="text-xs font-medium">Battery solution</span>
                </div>
              )}

              {product.category && (
                <span className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur text-white text-xs font-semibold px-3 py-1 rounded-lg shadow-sm">
                  {product.category.name}
                </span>
              )}
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {product.title}
            </h1>
            <p className="text-slate-600 text-base leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>

          {/* Use Cases */}
          {product.use_cases && product.use_cases.length > 0 && (
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Target Commercial Applications & Use Cases
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.use_cases.map((uc, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center text-xs font-semibold text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-1.5" />
                    {uc}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Price Break Volume Table */}
          <PriceTierTable priceTiers={product.price_tiers} />

          {/* Export Quality Assurance Banner */}
          <div className="bg-emerald-900 text-white p-6 rounded-2xl shadow-lg border border-emerald-800 flex items-center space-x-4">
            <ShieldCheck className="h-10 w-10 text-emerald-400 shrink-0" />
            <div className="text-xs leading-relaxed space-y-1">
              <p className="font-bold text-sm text-white">Confirm your battery configuration</p>
              <p className="text-emerald-200">
                Confirm model specifications, charging compatibility, installation requirements, warranty, and delivery terms with the team before ordering.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Calculator Widget & Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-8 sticky top-24">
          <PriceCalculator
            product={product}
            onQuantityChange={(qty) => setTargetQuantity(qty)}
            onOpenFormQuote={handleOpenFormQuote}
          />
        </div>
      </div>

      {/* Embedded Quote Inquiry Request Form */}
      <div ref={formRef} className="pt-10 border-t border-slate-200">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xl space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold">
              <Send className="h-3.5 w-3.5" />
              <span>Official Request for Quotation (RFQ)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Submit Custom Quote Request
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Fill out your volume requirements below. Our battery team will review your application, capacity, and supply requirements before preparing a quotation.
            </p>
          </div>

          <QuoteForm
            initialProductId={product.id}
            initialQuantity={targetQuantity}
          />
        </div>
      </div>
    </div>
  );
}
