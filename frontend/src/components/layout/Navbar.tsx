"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Globe, Lock, Menu } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20 group-hover:border-emerald-500/40 transition">
              <Globe className="h-7 w-7 text-emerald-400" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition">
                GlobalTrade
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
                Enterprise
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-slate-300 hover:text-white transition"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium text-slate-300 hover:text-white transition"
            >
              Catalog
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-slate-300 hover:text-white transition"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-slate-300 hover:text-white transition"
            >
              Contact
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/admin/login" className="text-slate-400 hover:text-white p-2 transition" title="Admin Portal">
              <Lock className="h-4 w-4" />
            </Link>
            <Link href="/contact">
              <Button variant="primary" size="md">
                Get a Quote
              </Button>
            </Link>
          </div>

          {/* Mobile menu hamburger toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2.5 text-slate-300 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition"
              aria-label="Open navigation menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
};
