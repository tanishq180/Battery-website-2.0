import React from "react";
import Link from "next/link";
import { ArrowRight, Package, Tag, CheckCircle2 } from "lucide-react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/Button";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Find starting price from lowest unit_price in price_tiers
  let minPrice = 0;
  if (product.price_tiers && product.price_tiers.length > 0) {
    const prices = product.price_tiers.map((pt) => pt.unit_price);
    minPrice = Math.min(...prices);
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Image Container */}
      <div className="relative h-48 bg-slate-100 overflow-hidden flex items-center justify-center border-b border-slate-100">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full h-full object-contain p-5 group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              // Use the bundled battery illustration if an image cannot be loaded
              (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).src =
                "/images/products/sunka_mr1232bs.jpg";
            }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400 space-y-2">
            <Package className="h-12 w-12 text-slate-300" />
            <span className="text-xs font-medium">Battery solution</span>
          </div>
        )}

        {/* Category Badge */}
        {product.category && (
          <span className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-sm">
            {product.category.name}
          </span>
        )}
      </div>

      {/* Body Content */}
      <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition line-clamp-1">
            {product.title}
          </h3>
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Use Cases Badges */}
          {product.use_cases && product.use_cases.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {product.use_cases.slice(0, 2).map((uc, i) => (
                <span
                  key={i}
                  className="inline-flex items-center text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded"
                >
                  <CheckCircle2 className="h-3 w-3 text-emerald-500 mr-1" />
                  {uc}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Price & Action Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            {minPrice > 0 ? (
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Starting From</span>
                <span className="text-base font-extrabold text-slate-900">${minPrice.toFixed(2)}</span>
                <span className="text-xs text-slate-500"> / unit</span>
              </div>
            ) : (
              <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-200">Custom Quote</span>
            )}
          </div>

          <Link href={`/products/${product.id}`}>
            <Button variant="primary" size="sm" className="group-hover:bg-emerald-700">
              View battery <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
