"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Inbox,
  Globe,
  LogOut,
  ShieldCheck,
  PlusCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  const navItems = [
    { label: "Dashboard Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Manage Products", href: "/admin/products", icon: Package },
    { label: "Enquiry Leads", href: "/admin/enquiries", icon: Inbox },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen border-r border-slate-800 flex flex-col justify-between p-6 shrink-0">
      <div className="space-y-8">
        {/* Admin Header */}
        <div className="flex items-center space-x-3 pb-6 border-b border-slate-800">
          <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">Admin Portal</h2>
            <p className="text-[11px] text-emerald-400 font-semibold truncate">
              {user?.email || "Admin Operator"}
            </p>
          </div>
        </div>

        {/* Quick Action Button */}
        <Link href="/admin/products/new">
          <button className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-sm transition">
            <PlusCircle className="h-4 w-4" />
            <span>Add New Product</span>
          </button>
        </Link>

        {/* Main Navigation Links */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-slate-800 text-emerald-400 border border-slate-700 shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-emerald-400" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Actions */}
      <div className="pt-6 border-t border-slate-800 space-y-3">
        <Link
          href="/"
          className="flex items-center space-x-3 px-4 py-2.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition"
        >
          <Globe className="h-4 w-4 text-slate-400" />
          <span>View Public Storefront</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-2.5 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-xl transition cursor-pointer"
        >
          <LogOut className="h-4 w-4 text-red-400" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
