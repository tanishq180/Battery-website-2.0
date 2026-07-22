"use client";

import React, { useState, useEffect } from "react";
import { Inbox, Loader2 } from "lucide-react";
import { Enquiry } from "@/types/product";
import { fetchAdminEnquiries } from "@/services/adminApi";
import { useAuth } from "@/context/AuthContext";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { EnquiryTable } from "@/components/admin/EnquiryTable";

export default function AdminEnquiriesPage() {
  const { token } = useAuth();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadEnquiries = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await fetchAdminEnquiries(token);
      setEnquiries(Array.isArray(data) ? data : data.items || []);
    } catch (err) {
      console.error("Failed to load admin enquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, [token]);

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <AdminSidebar />

      <main className="flex-grow p-8 sm:p-12 space-y-8 max-w-7xl">
        {/* Header */}
        <div className="pb-6 border-b border-slate-800">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Lead & Enquiry Management Hub
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review incoming RFQ quote submissions, update progress status, and record internal communication logs.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center space-x-3 text-slate-400 py-12">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-400" />
            <span className="text-sm">Loading lead inquiries...</span>
          </div>
        ) : (
          <EnquiryTable enquiries={enquiries} onRefresh={loadEnquiries} />
        )}
      </main>
    </div>
  );
}
