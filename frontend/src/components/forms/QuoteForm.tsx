"use client";

import React, { useState, useEffect } from "react";
import { Send, Check, MessageSquare, Loader2 } from "lucide-react";
import { batteryRanges } from "@/data/batteryCatalog";
import { Product, EnquiryFormData, EnquiryResponse } from "@/types/product";
import { fetchProducts, submitEnquiry } from "@/services/api";
import { FormInput } from "@/components/forms/FormInput";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";

interface QuoteFormProps {
  initialProductId?: number | null;
  initialQuantity?: number;
  onSuccess?: (res: EnquiryResponse) => void;
  className?: string;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({
  initialProductId = null,
  initialQuantity = 10,
  onSuccess,
  className,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(true);

  // Form Fields
  const [customerName, setCustomerName] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [productId, setProductId] = useState<number | null>(initialProductId);
  const [targetQuantity, setTargetQuantity] = useState<number>(initialQuantity);
  const [message, setMessage] = useState<string>("");

  // Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Submission States
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitResult, setSubmitResult] = useState<EnquiryResponse | null>(null);
  const [submitError, setSubmitError] = useState<string>("");

  // Update initial parameters if props change
  useEffect(() => {
    if (initialProductId) setProductId(initialProductId);
    if (initialQuantity) setTargetQuantity(initialQuantity);
  }, [initialProductId, initialQuantity]);

  // Load product list for selection dropdown
  useEffect(() => {
    async function loadCatalog() {
      setLoadingProducts(true);
      const data = await fetchProducts("", "", 1, 100);
      setProducts(initialProductId && initialProductId < 0 && !data.items.some(p => p.id === initialProductId)
        ? [...data.items, ...batteryRanges.filter(p => p.id === initialProductId)] : data.items);
      setLoadingProducts(false);
    }
    loadCatalog();
  }, [initialProductId]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!customerName.trim()) {
      newErrors.customerName = "Full name is required";
    }

    if (!customerEmail.trim()) {
      newErrors.customerEmail = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail.trim())) {
      newErrors.customerEmail = "Please enter a valid business email address";
    }

    if (!customerPhone.trim()) {
      newErrors.customerPhone = "Phone or WhatsApp number is required";
    }

    if (!targetQuantity || targetQuantity <= 0) {
      newErrors.targetQuantity = "Target quantity must be at least 1 unit";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) return;

    setSubmitting(true);

    try {
      const payload: EnquiryFormData = {
        customer_name: customerName.trim(),
        customer_email: customerEmail.trim(),
        customer_phone: customerPhone.trim(),
        product_id: productId && productId > 0 ? Number(productId) : null,
        target_quantity: Number(targetQuantity),
        message: [productId && productId < 0 ? `Battery range: ${products.find(p => p.id === productId)?.title || "Battery enquiry"}` : "", message.trim()].filter(Boolean).join("\n") || undefined,
      };

      const res = await submitEnquiry(payload);
      setSubmitResult(res);
      setSubmitting(false);
      if (onSuccess) onSuccess(res);
    } catch (err: any) {
      setSubmitError(err.message || "Failed to submit quote request. Please try again.");
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitResult(null);
    setSubmitError("");
    setCustomerName("");
    setCustomerEmail("");
    setCustomerPhone("");
    setMessage("");
    setErrors({});
  };

  if (submitResult) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-3xl text-center space-y-6 shadow-sm">
        <div className="p-3.5 bg-emerald-600 text-white rounded-full w-fit mx-auto shadow-md">
          <Check className="h-8 w-8" />
        </div>

        <div className="space-y-2 max-w-md mx-auto">
          <h3 className="text-2xl font-extrabold text-emerald-950">Quote Request Submitted!</h3>
          <p className="text-sm text-emerald-800 leading-relaxed">
            Thank you, <strong>{submitResult.customer_name}</strong>. Your request has been saved with the email <strong>{submitResult.customer_email}</strong>. Our battery sales team will review your requirements.
          </p>
        </div>

        {submitResult.whatsapp_url && (
          <div className="pt-2 max-w-sm mx-auto">
            <a
              href={submitResult.whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-xl shadow-lg transition"
            >
              <MessageSquare className="h-5 w-5" />
              <span>Prefer Instant Reply? Chat on WhatsApp</span>
            </a>
          </div>
        )}

        <div className="pt-4 border-t border-emerald-200">
          <button
            onClick={handleReset}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 underline cursor-pointer"
          >
            Submit Another Quote Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className || ""}`}>
      {submitError && (
        <Toast type="error" message={submitError} onClose={() => setSubmitError("")} />
      )}

      {/* Name and Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormInput
          label="Full Name / Company Representative"
          required
          placeholder="Jane Doe"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          error={errors.customerName}
        />

        <FormInput
          label="Business Email Address"
          type="email"
          required
          placeholder="you@company.com"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          error={errors.customerEmail}
        />
      </div>

      {/* Phone and Product Select */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormInput
          label="Phone / WhatsApp Number"
          type="tel"
          required
          placeholder="+91 98765 43210"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
          error={errors.customerPhone}
        />

        <div className="space-y-1.5">
          <label htmlFor="battery-selection" className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
            Select Battery (Optional)
          </label>
          <select
            id="battery-selection"
            disabled={loadingProducts}
            value={productId || ""}
            onChange={(e) => setProductId(e.target.value ? Number(e.target.value) : null)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
          >
            <option value="">Help me choose a battery</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Target Quantity */}
      <div>
        <FormInput
          label="Target Order Quantity (Units)"
          type="number"
          min="1"
          required
          value={targetQuantity}
          onChange={(e) => setTargetQuantity(parseInt(e.target.value) || 1)}
          error={errors.targetQuantity}
          className="font-bold text-slate-900"
        />
      </div>

      {/* Message Textarea */}
      <div className="space-y-1.5">
        <label htmlFor="battery-message" className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
          Application & Battery Requirements (Optional)
        </label>
        <textarea
          id="battery-message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us your vehicle or equipment model, voltage, capacity (Ah), load, backup duration, delivery location, and preferred date..."
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={submitting}
        className="w-full justify-center shadow-lg shadow-emerald-950/20"
      >
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting Request...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" /> Send battery enquiry
          </>
        )}
      </Button>
    </form>
  );
};
