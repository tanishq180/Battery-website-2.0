"use client";

import React, { useState } from "react";
import { Inbox, CheckCircle2, Clock, Eye, MessageSquare, ArrowRight, Loader2 } from "lucide-react";
import { Enquiry } from "@/types/product";
import { updateAdminEnquiryStatus } from "@/services/adminApi";
import { useAuth } from "@/context/AuthContext";
import { EnquiryDetailModal } from "@/components/admin/EnquiryDetailModal";

interface EnquiryTableProps {
  enquiries: Enquiry[];
  onRefresh: () => void;
}

export const EnquiryTable: React.FC<EnquiryTableProps> = ({ enquiries, onRefresh }) => {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState<"Received" | "Attended">("Received");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [togglingId, setTogglingId] = useState<number | null>(null);

  const filteredEnquiries = enquiries.filter((e) => e.status === activeTab);

  const handleQuickToggle = async (e: React.MouseEvent, enquiry: Enquiry) => {
    e.stopPropagation();
    if (!token) return;

    const newStatus = enquiry.status === "Received" ? "Attended" : "Received";
    setTogglingId(enquiry.id);

    try {
      await updateAdminEnquiryStatus(token, enquiry.id, newStatus, enquiry.internal_notes || undefined);
      onRefresh();
    } catch (err) {
      alert("Failed to update status");
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab("Received")}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === "Received"
              ? "bg-amber-500 text-slate-950 shadow-sm"
              : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          <Clock className="h-4 w-4" />
          <span>Received Leads ({enquiries.filter((e) => e.status === "Received").length})</span>
        </button>

        <button
          onClick={() => setActiveTab("Attended")}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === "Attended"
              ? "bg-emerald-500 text-slate-950 shadow-sm"
              : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>Attended Leads ({enquiries.filter((e) => e.status === "Attended").length})</span>
        </button>
      </div>

      {/* Table */}
      {filteredEnquiries.length > 0 ? (
        <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-950/60">
                  <th className="py-4 px-6">Customer / Contact</th>
                  <th className="py-4 px-6">Product / Target Volume</th>
                  <th className="py-4 px-6">Submission Date</th>
                  <th className="py-4 px-6 text-right">Quick Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 text-sm">
                {filteredEnquiries.map((item) => {
                  const dateStr = new Date(item.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });

                  return (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedEnquiry(item)}
                      className="hover:bg-slate-850/50 transition cursor-pointer group"
                    >
                      <td className="py-4 px-6">
                        <div>
                          <strong className="block text-white group-hover:text-emerald-400 transition">
                            {item.customer_name}
                          </strong>
                          <span className="text-xs text-slate-400 block">{item.customer_email}</span>
                          <span className="text-xs text-slate-500">{item.customer_phone}</span>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <div>
                          <span className="text-xs font-semibold text-slate-200 block">
                            {item.product?.title || "General Inquiry"}
                          </span>
                          <span className="inline-block text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 mt-1">
                            {item.target_quantity} Units
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-6 text-xs text-slate-400">
                        {dateStr}
                      </td>

                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={(e) => handleQuickToggle(e, item)}
                          disabled={togglingId === item.id}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                            item.status === "Received"
                              ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                              : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                          }`}
                        >
                          {togglingId === item.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : item.status === "Received" ? (
                            "Mark Attended"
                          ) : (
                            "Reopen Lead"
                          )}
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEnquiry(item);
                          }}
                          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                          title="View Details & Log Notes"
                        >
                          <Eye className="h-4 w-4" />
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
        <div className="bg-slate-900 rounded-3xl p-12 text-center border border-slate-800 space-y-3 max-w-md mx-auto">
          <Inbox className="h-10 w-10 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No {activeTab} Enquiries</h3>
          <p className="text-xs text-slate-400">There are currently no enquiries under this tab.</p>
        </div>
      )}

      {/* Modal Integration */}
      <EnquiryDetailModal
        enquiry={selectedEnquiry}
        onClose={() => setSelectedEnquiry(null)}
        onUpdated={onRefresh}
      />
    </div>
  );
};
