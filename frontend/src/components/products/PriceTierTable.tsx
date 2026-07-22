import React from "react";
import { PriceTier } from "@/types/product";
import { Layers, Tag } from "lucide-react";

interface PriceTierTableProps {
  priceTiers: PriceTier[];
  activeMinQuantity?: number;
}

export const PriceTierTable: React.FC<PriceTierTableProps> = ({
  priceTiers,
  activeMinQuantity,
}) => {
  if (!priceTiers || priceTiers.length === 0) {
    return (
      <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs">
        Custom pricing available upon request. Contact our sales team for direct quote negotiation.
      </div>
    );
  }

  // Sort tiers by min_quantity ascending
  const sortedTiers = [...priceTiers].sort((a, b) => a.min_quantity - b.min_quantity);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden space-y-3">
      <div className="bg-slate-900 text-white px-6 py-4 flex items-center space-x-2">
        <Layers className="h-5 w-5 text-emerald-400" />
        <h3 className="text-sm font-bold tracking-tight">Wholesale Volume Price Breaks</h3>
      </div>

      <div className="px-6 pb-6 pt-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-3">Order Quantity Range</th>
                <th className="py-3 px-3">Unit Price (USD)</th>
                <th className="py-3 px-3 text-right">Savings Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {sortedTiers.map((tier, index) => {
                const isSelected = activeMinQuantity === tier.min_quantity;
                const quantityLabel =
                  tier.max_quantity && tier.max_quantity > 0
                    ? `${tier.min_quantity} – ${tier.max_quantity} units`
                    : `${tier.min_quantity}+ units (Unlimited Bulk)`;

                return (
                  <tr
                    key={tier.id || index}
                    className={`transition-colors ${
                      isSelected
                        ? "bg-emerald-50/80 font-bold text-emerald-900"
                        : "hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <td className="py-3.5 px-3 flex items-center space-x-2">
                      <Tag className={`h-4 w-4 ${isSelected ? "text-emerald-600" : "text-slate-400"}`} />
                      <span>{quantityLabel}</span>
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-slate-900">
                      ${tier.unit_price.toFixed(2)} / unit
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      {index === 0 ? (
                        <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Standard</span>
                      ) : (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                          Tier {index + 1} Wholesale Discount
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
