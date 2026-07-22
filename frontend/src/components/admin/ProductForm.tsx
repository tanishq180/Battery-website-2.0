"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Save, ArrowLeft, Loader2, Tag, Layers, Check } from "lucide-react";
import { Category, PriceTier, Product } from "@/types/product";
import { fetchCategories } from "@/services/api";
import { createAdminProduct, updateAdminProduct, deleteAdminProduct } from "@/services/adminApi";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";

interface ProductFormProps {
  mode: "create" | "edit";
  initialData?: Product | null;
}

interface PriceTierFormInput {
  id?: number;
  min_quantity: number;
  max_quantity?: number | null;
  unit_price: number;
}

export const ProductForm: React.FC<ProductFormProps> = ({ mode, initialData }) => {
  const router = useRouter();
  const { token } = useAuth();

  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState<string>(initialData?.title || "");
  const [description, setDescription] = useState<string>(initialData?.description || "");
  const [categoryId, setCategoryId] = useState<number | undefined>(initialData?.category_id || undefined);
  const [imageUrl, setImageUrl] = useState<string>(initialData?.image_url || "");

  // Use cases tag array state
  const [useCases, setUseCases] = useState<string[]>(initialData?.use_cases || []);
  const [newUseCaseInput, setNewUseCaseInput] = useState<string>("");

  // Price Tiers array state
  const [priceTiers, setPriceTiers] = useState<PriceTierFormInput[]>(
    initialData?.price_tiers && initialData.price_tiers.length > 0
      ? initialData.price_tiers.map((pt) => ({
          id: pt.id,
          min_quantity: pt.min_quantity,
          max_quantity: pt.max_quantity || null,
          unit_price: pt.unit_price,
        }))
      : [
          { min_quantity: 1, max_quantity: 50, unit_price: 10.0 },
          { min_quantity: 51, max_quantity: 200, unit_price: 8.0 },
        ]
  );

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  useEffect(() => {
    async function loadCats() {
      const data = await fetchCategories();
      setCategories(data);
      if (!categoryId && data.length > 0 && mode === "create") {
        setCategoryId(data[0].id);
      }
    }
    loadCats();
  }, []);

  // Tag Management
  const handleAddUseCase = () => {
    if (newUseCaseInput.trim()) {
      setUseCases([...useCases, newUseCaseInput.trim()]);
      setNewUseCaseInput("");
    }
  };

  const handleRemoveUseCase = (index: number) => {
    setUseCases(useCases.filter((_, i) => i !== index));
  };

  // Price Tier Builder Actions
  const handleAddTier = () => {
    const lastTier = priceTiers[priceTiers.length - 1];
    const newMin = lastTier ? (lastTier.max_quantity ? lastTier.max_quantity + 1 : lastTier.min_quantity + 50) : 1;
    setPriceTiers([
      ...priceTiers,
      { min_quantity: newMin, max_quantity: null, unit_price: lastTier ? lastTier.unit_price * 0.9 : 5.0 },
    ]);
  };

  const handleUpdateTier = (index: number, field: keyof PriceTierFormInput, value: any) => {
    const updated = [...priceTiers];
    updated[index] = { ...updated[index], [field]: value };
    setPriceTiers(updated);
  };

  const handleRemoveTier = (index: number) => {
    if (priceTiers.length <= 1) {
      setError("Product must have at least one volume price tier.");
      return;
    }
    setPriceTiers(priceTiers.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("Unauthorized session. Please login again.");
      return;
    }

    if (!title.trim() || !description.trim()) {
      setError("Title and Description are required.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        title: title.trim(),
        description: description.trim(),
        category_id: categoryId ? Number(categoryId) : null,
        image_url: imageUrl.trim() || null,
        use_cases: useCases.length > 0 ? useCases : null,
        price_tiers: priceTiers.map((pt) => ({
          min_quantity: Number(pt.min_quantity),
          max_quantity: pt.max_quantity ? Number(pt.max_quantity) : null,
          unit_price: Number(pt.unit_price),
        })),
      };

      if (mode === "create") {
        await createAdminProduct(token, payload);
        setSuccess("Product created successfully!");
        setTimeout(() => router.push("/admin/products"), 1000);
      } else if (mode === "edit" && initialData?.id) {
        await updateAdminProduct(token, initialData.id, payload);
        setSuccess("Product updated successfully!");
        setTimeout(() => router.push("/admin/products"), 1000);
      }
    } catch (err: any) {
      setError(err.message || "Failed to save product.");
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id || !token) return;

    if (!confirm(`Are you sure you want to delete "${initialData.title}"? This cannot be undone.`)) {
      return;
    }

    setDeleting(true);
    try {
      await deleteAdminProduct(token, initialData.id);
      router.push("/admin/products");
    } catch (err: any) {
      setError(err.message || "Failed to delete product.");
      setDeleting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-xl max-w-4xl">
      {error && <Toast type="error" message={error} onClose={() => setError("")} />}
      {success && <Toast type="success" message={success} onClose={() => setSuccess("")} />}

      {/* Top Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-extrabold text-white">
            {mode === "create" ? "Create New Wholesale Product" : `Edit Product: ${initialData?.title}`}
          </h2>
          <p className="text-xs text-slate-400">Configure catalog specs and volume discount tiers</p>
        </div>

        {mode === "edit" && (
          <Button
            type="button"
            variant="ghost"
            onClick={handleDelete}
            disabled={deleting}
            className="text-red-400 hover:text-red-300 hover:bg-red-950/40"
          >
            {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            <span className="ml-1.5 text-xs font-semibold">Delete Item</span>
          </Button>
        )}
      </div>

      {/* Basic Details */}
      <div className="space-y-6">
        <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Product Information</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Product Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Solar Inverter 10kW Commercial"
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Industry Category
            </label>
            <select
              value={categoryId || ""}
              onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : undefined)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Uncategorized</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Image URL (Optional)
          </label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://images.unsplash.com/photo-..."
            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Product Description *
          </label>
          <textarea
            rows={4}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detailed wholesale specifications, technical capabilities, and export packing specs..."
            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Dynamic Use Cases Tags */}
        <div className="space-y-3 pt-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Target Commercial Applications / Use Cases
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={newUseCaseInput}
              onChange={(e) => setNewUseCaseInput(e.target.value)}
              placeholder="e.g. Cold Storage Facilities"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddUseCase();
                }
              }}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Button type="button" variant="outline" size="md" onClick={handleAddUseCase} className="bg-slate-800 border-slate-700 text-slate-200">
              Add Tag
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {useCases.map((uc, i) => (
              <span
                key={i}
                className="inline-flex items-center text-xs font-semibold text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20"
              >
                <Tag className="h-3 w-3 mr-1.5" />
                {uc}
                <button
                  type="button"
                  onClick={() => handleRemoveUseCase(i)}
                  className="ml-2 text-slate-400 hover:text-red-400"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Price Tier Builder */}
      <div className="space-y-4 pt-6 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Layers className="h-5 w-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Dynamic Volume Price Breaks
            </h3>
          </div>
          <Button type="button" variant="secondary" size="sm" onClick={handleAddTier} className="bg-slate-800 hover:bg-slate-700 text-xs">
            <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Price Tier
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 px-3">Min Quantity</th>
                <th className="py-2.5 px-3">Max Quantity (Optional)</th>
                <th className="py-2.5 px-3">Unit Price ($ USD)</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850 text-sm">
              {priceTiers.map((tier, idx) => (
                <tr key={idx}>
                  <td className="py-2.5 px-3">
                    <input
                      type="number"
                      min="1"
                      required
                      value={tier.min_quantity}
                      onChange={(e) => handleUpdateTier(idx, "min_quantity", parseInt(e.target.value) || 1)}
                      className="w-28 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold"
                    />
                  </td>
                  <td className="py-2.5 px-3">
                    <input
                      type="number"
                      min={tier.min_quantity}
                      placeholder="Unlimited"
                      value={tier.max_quantity || ""}
                      onChange={(e) =>
                        handleUpdateTier(idx, "max_quantity", e.target.value ? parseInt(e.target.value) : null)
                      }
                      className="w-28 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </td>
                  <td className="py-2.5 px-3">
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      required
                      value={tier.unit_price}
                      onChange={(e) => handleUpdateTier(idx, "unit_price", parseFloat(e.target.value) || 0)}
                      className="w-32 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-emerald-400 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleRemoveTier(idx)}
                      className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition"
                      title="Remove Tier"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Action Controls */}
      <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/products")}
          className="bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800"
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" /> Cancel
        </Button>

        <Button type="submit" variant="primary" size="lg" disabled={submitting} className="shadow-lg shadow-emerald-950/40">
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving Product...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> {mode === "create" ? "Publish Product" : "Save Changes"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
