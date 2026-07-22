"use client";

import React, { useState } from "react";
import { Plus, Minus, Calculator, MessageSquare, Sparkles, Send } from "lucide-react";
import { PriceTier, Product } from "@/types/product";
import { Button } from "@/components/ui/Button";

interface PriceCalculatorProps {
  product: Product;
  onQuantityChange?: (qty: number) => void;
  onOpenFormQuote?: (qty: number) => void;
}

export const PriceCalculator: React.FC<PriceCalculatorProps> = ({
  product,
  onQuantityChange,
  onOpenFormQuote,
}) => {
  const [quantity, setQuantity] = useState<number>(10);

  const priceTiers = product.price_tiers || [];
  const sortedTiers = [...priceTiers].sort((a, b) => a.min_quantity - b.min_quantity);

  // Find effective price tier based on quantity
  let currentTier: PriceTier | null = null;
  let effectiveUnitPrice = 0;

  if (sortedTiers.length > 0) {
    // Default to first tier
    effectiveUnitPrice = sortedTiers[0].unit_price;
    currentTier = sortedTiers[0];

    for (const tier of sortedTiers) {
      if (quantity >= tier.min_quantity) {
        if (!tier.max_quantity || quantity <= tier.max_quantity) {
          effectiveUnitPrice = tier.unit_price;
          currentTier = tier;
          break;
        } else if (quantity > tier.max_quantity) {
          // If above max_quantity of this tier, check next or default to last
          effectiveUnitPrice = tier.unit_price;
          currentTier = tier;
        }
      }
    }
  }

  const totalPrice = effectiveUnitPrice * (quantity || 0);

  const handleUpdateQuantity = (newQty: number) => {
    const validQty = Math.max(1, newQty);
    setQuantity(validQty);
    if (onQuantityChange) onQuantityChange(validQty);
  };

  // Generate WhatsApp pre-filled chat link
  const waBusinessNumber = "15550192834";
  const waMessage = `Hi, I would like to inquire about ${product.title}. My target order volume is ${quantity} units.`;
  const whatsappUrl = `https://wa.me/${waBusinessNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
      <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
          <Calculator className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">Interactive Volume Calculator</h3>
          <p className="text-xs text-slate-400">Calculate volume pricing breaks in real-time</p>
        </div>
      </div>

      {/* Quantity Input Selector */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Enter Order Quantity (Units)
        </label>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleUpdateQuantity(quantity - 5)}
            className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition"
            aria-label="Decrease quantity by 5"
          >
            <Minus className="h-4 w-4" />
          </button>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => handleUpdateQuantity(parseInt(e.target.value) || 1)}
            className="w-full py-3 px-4 bg-slate-950 border border-slate-700 rounded-xl text-center text-xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <button
            onClick={() => handleUpdateQuantity(quantity + 5)}
            className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition"
            aria-label="Increase quantity by 5"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Dynamic Price Calculation Summary */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between text-sm text-slate-400">
          <span>Effective Unit Price:</span>
          <span className="text-base font-bold text-emerald-400">
            ${effectiveUnitPrice.toFixed(2)} / unit
          </span>
        </div>

        {currentTier && sortedTiers.indexOf(currentTier) > 0 && (
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs font-semibold">
            <Sparkles className="h-4 w-4" />
            <span>Unlocked Volume Tier Discount (${effectiveUnitPrice.toFixed(2)}/unit)!</span>
          </div>
        )}

        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-300">Estimated Total:</span>
          <span className="text-2xl font-extrabold text-white">
            ${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold shadow-lg shadow-emerald-950/40 transition duration-200"
        >
          <MessageSquare className="h-5 w-5" />
          <span>Direct Chat & Quote on WhatsApp</span>
        </a>

        {onOpenFormQuote && (
          <Button
            variant="outline"
            size="lg"
            className="w-full bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white"
            onClick={() => onOpenFormQuote(quantity)}
          >
            <Send className="mr-2 h-4 w-4" /> Submit Official RFQ Form
          </Button>
        )}
      </div>
    </div>
  );
};
