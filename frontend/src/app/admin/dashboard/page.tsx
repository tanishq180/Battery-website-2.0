"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Package,
  Inbox,
  CheckCircle2,
  Plus,
  ArrowRight,
  TrendingUp,
  Globe,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { fetchProducts } from "@/services/api";
import { fetchAdminEnquiries } from "@/services/adminApi";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/Button";

export default function AdminDashboardPage() {
  const { token } = useAuth();
  const [productCount, setProductCount] = useState<number>(0);
  const [receivedEnquiries, setReceivedEnquiries] = useState<number>(0);
  const [attendedEnquiries, setAttendedEnquiries] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadStats() {
      if (!token) return;
      setLoading(true);
      try {
        const prodData = await fetchProducts("", "", 1, 1);
        setProductCount(prodData.total);

        const receivedData = await fetchAdminEnquiries(token, "Received");
        setReceivedEnquiries(receivedData.total ?? (Array.isArray(receivedData) ? receivedData.length : receivedData.items?.length || 0));

        const attendedData = await fetchAdminEnquiries(token, "Attended");
        setAttendedEnquiries(attendedData.total ?? (Array.isArray(attendedData) ? attendedData.length : attendedData.items?.length || 0));
      } catch (err) {
        console.error("Dashboard stats load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, [token]);

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <AdminSidebar />

      <main className="flex-grow p-8 sm:p-12 space-y-10 max-w-7xl">
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Executive Dashboard Overview
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Real-time product inventory metrics and B2B customer lead status.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link href="/admin/products/new">
              <Button variant="primary" size="sm">
                <Plus className="mr-1.5 h-4 w-4" /> Add Product
              </Button>
            </Link>
            <Link href="/admin/enquiries">
              <Button variant="outline" size="sm" className="bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800">
                View All Leads
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <div className="flex items-center space-x-3 text-slate-400 py-12">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-400" />
            <span className="text-sm">Loading executive metrics...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Active Products */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Active Products
                </span>
                <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
                  <Package className="h-5 w-5" />
                </div>
              </div>
              <div>
                <p className="text-4xl font-extrabold text-white">{productCount}</p>
                <p className="text-xs text-slate-400 mt-1">Export items with tier pricing</p>
              </div>
              <Link href="/admin/products" className="inline-flex items-center text-xs font-semibold text-emerald-400 hover:underline pt-2">
                Manage Catalog <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Card 2: New Received Leads */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Pending Lead RFQs
                </span>
                <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400">
                  <Inbox className="h-5 w-5" />
                </div>
              </div>
              <div>
                <p className="text-4xl font-extrabold text-amber-400">{receivedEnquiries}</p>
                <p className="text-xs text-slate-400 mt-1">Requires follow-up response</p>
              </div>
              <Link href="/admin/enquiries" className="inline-flex items-center text-xs font-semibold text-amber-400 hover:underline pt-2">
                Review Pending Leads <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Card 3: Attended Leads */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  Attended & Quoted
                </span>
                <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              </div>
              <div>
                <p className="text-4xl font-extrabold text-white">{attendedEnquiries}</p>
                <p className="text-xs text-slate-400 mt-1">Logged internal notes & quote sent</p>
              </div>
              <Link href="/admin/enquiries" className="inline-flex items-center text-xs font-semibold text-blue-400 hover:underline pt-2">
                View Closed Leads <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Quick Links Section */}
        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white tracking-tight">Administrative Workflows</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/admin/products/new"
              className="p-6 bg-slate-950 hover:bg-slate-800/80 rounded-2xl border border-slate-800 transition flex items-center justify-between group"
            >
              <div className="space-y-1">
                <h3 className="font-bold text-white group-hover:text-emerald-400 transition">Create Export Product</h3>
                <p className="text-xs text-slate-400">Add new product title, category, description, and custom price breaks.</p>
              </div>
              <Plus className="h-6 w-6 text-slate-400 group-hover:text-emerald-400 transition shrink-0 ml-4" />
            </Link>

            <Link
              href="/admin/enquiries"
              className="p-6 bg-slate-950 hover:bg-slate-800/80 rounded-2xl border border-slate-800 transition flex items-center justify-between group"
            >
              <div className="space-y-1">
                <h3 className="font-bold text-white group-hover:text-amber-400 transition">Lead Enquiry Dashboard</h3>
                <p className="text-xs text-slate-400">View incoming quote inquiries, toggle status, and append internal log notes.</p>
              </div>
              <Inbox className="h-6 w-6 text-slate-400 group-hover:text-amber-400 transition shrink-0 ml-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
