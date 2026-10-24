"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { X, Lock, PhoneCall, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      const elements = drawerRef.current?.querySelectorAll<HTMLElement>("a, button");
      if (!elements?.length) return;
      const first = elements[0], last = elements[elements.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", handleKey);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", handleKey); previous?.focus(); };
  }, [isOpen, onClose]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div ref={drawerRef} role="dialog" aria-modal="true" aria-label="Navigation menu" className="fixed inset-y-0 right-0 w-full max-w-xs bg-slate-900 text-white p-6 shadow-2xl flex flex-col justify-between z-10 border-l border-slate-800">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-7 w-7 text-emerald-400" />
              <span className="font-bold text-lg text-white">VoltEdge</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="mt-8 flex flex-col space-y-4">
            <Link
              href="/"
              onClick={onClose}
              className="text-base font-medium text-slate-200 hover:text-emerald-400 px-3 py-2 rounded-md hover:bg-slate-800 transition"
            >
              Home
            </Link>
            <Link
              href="/products"
              onClick={onClose}
              className="text-base font-medium text-slate-200 hover:text-emerald-400 px-3 py-2 rounded-md hover:bg-slate-800 transition"
            >
              Batteries
            </Link>
            <Link
              href="/about"
              onClick={onClose}
              className="text-base font-medium text-slate-200 hover:text-emerald-400 px-3 py-2 rounded-md hover:bg-slate-800 transition"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              onClick={onClose}
              className="text-base font-medium text-slate-200 hover:text-emerald-400 px-3 py-2 rounded-md hover:bg-slate-800 transition"
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col space-y-4">
          <Link href="/contact" onClick={onClose}>
            <Button variant="primary" className="w-full justify-center">
              <PhoneCall className="mr-2 h-4 w-4" /> Get a Quote
            </Button>
          </Link>
          <Link
            href="/admin/login"
            onClick={onClose}
            className="inline-flex items-center justify-center text-xs text-slate-400 hover:text-slate-200 py-2 transition"
          >
            <Lock className="mr-1.5 h-3.5 w-3.5" /> Staff Admin Portal
          </Link>
        </div>
      </div>
    </div>
  );
};
