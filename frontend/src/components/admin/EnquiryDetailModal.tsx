"use client";

import React, { useState } from "react";
import { X, Mail, Phone, Calendar, Package, MessageSquare, Save, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Enquiry } from "@/types/product";
import { updateAdminEnquiryStatus } from "@/services/adminApi";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";

interface EnquiryDetailModalProps {
  enquiry: Enquiry | null;
  onClose: () => void;
  onUpdated: () => void;
}

export const EnquiryDetailModal: React.FC<EnquiryDetailModalProps> = ({
  enquiry,
  onClose,
  onUpdated,
}) => {
  const { token } = useAuth();
  if (!enquiry) return null;

  const [status, setStatus] = useState<"Received" | "Attended">(
    (enquiry.status as "Received" | "Attended") || "Received"
  );
  const [internalNotes, setInternalNotes] = useState<string>(enquiry.internal_notes || "");
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSave = async () => {
    if (!token) return;
    setSaving(true);
    setError("");

    try {
      await updateAdminEnquiryStatus(token, enquiry.id, status, internalNotes.trim());
      onUpdated();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to update lead status");
      setSaving(false);
    }
  };

  const formattedDate = new Date(enquiry.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl z-10 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white">Lead RFQ Details #{enquiry.id}</h2>
            <p className="text-xs text-slate-400">Received on {formattedDate}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-950/50 border border-red-800 text-red-300 rounded-xl text-xs flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Customer Information Grid */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 text-xs">
          <h3 className="font-bold text-emerald-400 uppercase tracking-wider">Customer Contact Info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
            <div>
              <span className="text-slate-500 block">Customer Name:</span>
              <strong className="text-white text-sm">{enquiry.customer_name}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Email Address:</span>
              <a href={`mailto:${enquiry.customer_email}`} className="text-emerald-400 hover:underline">
                {enquiry.customer_email}
              </a>
            </div>
            <div>
              <span className="text-slate-500 block">Phone / WhatsApp:</span>
              <a href={`tel:${enquiry.customer_phone}`} className="text-white hover:underline">
                {enquiry.customer_phone}
              </a>
            </div>
            <div>
              <span className="text-slate-500 block">Target Order Quantity:</span>
              <strong className="text-emerald-400 text-sm font-bold">{enquiry.target_quantity} Units</strong>
            </div>
          </div>
        </div>

        {/* Customer Message / Requirements */}
        {enquiry.message && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Freight Specifications & Port Requests
            </span>
            <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">
              {enquiry.message}
            </p>
          </div>
        )}

        {/* Status Toggle & Internal Notes */}
        <div className="space-y-4 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Lead Workflow Status
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setStatus("Received")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  status === "Received"
                    ? "bg-amber-500 text-slate-950 shadow-sm"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                Received (Pending)
              </button>
              <button
                type="button"
                onClick={() => setStatus("Attended")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  status === "Attended"
                    ? "bg-emerald-500 text-slate-950 shadow-sm"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                Attended (Quoted)
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Internal Staff Communication Log / Follow-up Notes
            </label>
            <textarea
              rows={4}
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              placeholder="e.g. Spoke with buyer on WhatsApp. Issued FOB quotation for 500 units on July 22..."
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed font-mono"
            />
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <Button variant="ghost" onClick={onClose} className="text-slate-400 hover:text-white">
            Close
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={handleSave}
            disabled={saving}
            className="shadow-lg shadow-emerald-950/40"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving Changes...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Save Status & Notes
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
