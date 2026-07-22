import React from "react";
import Link from "next/link";
import { Globe, Mail, MapPin, Phone, MessageSquare, ShieldCheck, CheckCircle2 } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Company Profile */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <Globe className="h-6 w-6 text-emerald-400" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">GlobalTrade</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Premier international import & export enterprise specializing in wholesale bulk supply, global logistics, customs compliance, and verified B2B trade solutions.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-400 font-medium pt-2">
              <ShieldCheck className="h-4 w-4" />
              <span>ISO 9001:2026 Certified Export Quality</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition">Home</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-emerald-400 transition">Product Catalog</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition">About Company</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition">Request Quote</Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-emerald-400 transition text-xs text-slate-500">Staff Admin Login</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Trade & Export Credentials */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Export Credentials</h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Full Customs & Freight Clearance</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Cold-Chain & Bulk Packaging</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Pre-Shipment Quality Audits</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>30+ Active Global Sea Ports</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info & WhatsApp */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Global Headquarters</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>100 Global Commerce Way, International Trade Tower, Suite 1200</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                <a href="mailto:quotes@yourimportexport.com" className="hover:text-white transition">quotes@yourimportexport.com</a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                <a href="tel:+15550192834" className="hover:text-white transition">+1 (555) 019-2834</a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/15550192834?text=Hi%2C%20I%20would%20like%20to%20inquire%20about%20your%20import%2Fexport%20wholesale%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-sm transition"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 space-y-4 md:space-y-0">
          <p>&copy; 2026 GlobalTrade Enterprise Inc. All rights reserved.</p>
          <div className="flex space-x-6">
            <span className="hover:text-slate-400 transition cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 transition cursor-pointer">Terms of Export</span>
            <span className="hover:text-slate-400 transition cursor-pointer">Customs Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
