import React from "react";
import Link from "next/link";
import {
  Globe,
  ShieldCheck,
  Award,
  Truck,
  CheckCircle2,
  Anchor,
  FileCheck,
  PackageCheck,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export const metadata = {
  title: "About Us | GlobalTrade Enterprise Import & Export",
  description:
    "Learn about GlobalTrade Enterprise: international trade compliance, containerized logistics capabilities, quality assurance, and wholesale import/export network.",
};

export default function AboutPage() {
  return (
    <div className="space-y-20 py-8 sm:py-12">
      {/* Hero Banner Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-slate-900 text-white rounded-3xl p-8 sm:p-16 overflow-hidden shadow-2xl border border-slate-800">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Globe className="h-4 w-4" />
              <span>International Trade & Supply Chain Leadership</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Bridging Global Markets with Trusted Import & Export Logistics
            </h1>
            
            <p className="text-lg text-slate-300 leading-relaxed">
              GlobalTrade Enterprise is a premier international commerce corporation dedicated to facilitating seamless B2B wholesale trade, port customs clearance, and verified supply chain logistics between manufacturers and international buyers.
            </p>
          </div>
        </div>
      </section>

      {/* Global Network Metric Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center space-y-2">
            <p className="text-4xl font-extrabold text-emerald-600">30+</p>
            <p className="text-sm font-semibold text-slate-700">Export Destinations</p>
            <p className="text-xs text-slate-500">Across Asia, Europe & Americas</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center space-y-2">
            <p className="text-4xl font-extrabold text-slate-900">100%</p>
            <p className="text-sm font-semibold text-slate-700">Customs Clearance</p>
            <p className="text-xs text-slate-500">Zero port detention record</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center space-y-2">
            <p className="text-4xl font-extrabold text-emerald-600">50+</p>
            <p className="text-sm font-semibold text-slate-700">Wholesale Products</p>
            <p className="text-xs text-slate-500">Verified tier-priced catalog</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center space-y-2">
            <p className="text-4xl font-extrabold text-amber-600">15+</p>
            <p className="text-sm font-semibold text-slate-700">Years Industry Standing</p>
            <p className="text-xs text-slate-500">Certified trade integrity</p>
          </div>
        </div>
      </section>

      {/* Company Profile & Vision Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <span>Corporate Background</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Delivering Uncompromised Excellence in International Bulk Commerce
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Founded with the objective of eliminating friction in international B2B transactions, GlobalTrade Enterprise manages end-to-end commercial trade operations. From factory-direct manufacturing audits to multi-modal ocean and air freight routing, we ensure every shipment meets strict quality and legal standards.
            </p>
            
            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700 font-medium">Direct factory sourcing with audited ISO production facilities.</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700 font-medium">Quantity-break pricing structures optimized for bulk commercial buyers.</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700 font-medium">End-to-end tracking, certificate of origin (COO), and bill of lading (BOL) handling.</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <Award className="h-8 w-8 text-emerald-400" />
              <div>
                <h3 className="text-xl font-bold text-white">Our Core Mission</h3>
                <p className="text-xs text-slate-400">Security, Transparency & Reliability</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              "To empower commercial enterprises worldwide with reliable access to high-grade products, transparent quantity pricing, and flawless customs and logistics execution."
            </p>
            <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-4 text-xs text-slate-400">
              <div>
                <span className="block text-white font-semibold text-sm">Strict Quality</span>
                100% pre-shipment inspections
              </div>
              <div>
                <span className="block text-white font-semibold text-sm">Port Network</span>
                30+ international sea ports
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Export Capabilities & Compliance Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Enterprise Export Capabilities</h2>
          <p className="text-sm text-slate-600">
            Our comprehensive infrastructure guarantees compliance, cargo integrity, and timely port delivery for every order.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <Card className="hover:border-emerald-500/50 transition">
            <CardHeader>
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit mb-3">
                <FileCheck className="h-6 w-6" />
              </div>
              <CardTitle>Regulatory & Licensing Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              Full customs documentation, including Certificate of Origin (COO), Commercial Invoices, Packing Lists, and phytosanitary / CE / ISO trade certifications tailored to destination port import laws.
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="hover:border-blue-500/50 transition">
            <CardHeader>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit mb-3">
                <Truck className="h-6 w-6" />
              </div>
              <CardTitle>Custom Packaging & Freight Handling</CardTitle>
            </CardHeader>
            <CardContent>
              Specialized palletization, heavy-duty export crating, containerized FCL/LCL cargo consolidation, and cold-chain temperature-controlled transport for sensitive bulk commodities.
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="hover:border-amber-500/50 transition">
            <CardHeader>
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl w-fit mb-3">
                <PackageCheck className="h-6 w-6" />
              </div>
              <CardTitle>Quality Control & Inspection</CardTitle>
            </CardHeader>
            <CardContent>
              Multi-stage quality assurance protocol including raw material testing, in-line assembly audits, and mandatory pre-shipment container inspection reports issued prior to port departure.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Bottom Call-to-Action Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-10 sm:p-14 text-center space-y-6 shadow-2xl border border-slate-800 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Source Verified Products with Bulk Tier Pricing?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Browse our catalog of export-ready wholesale items or connect directly with our trade specialists to request a custom volume quotation.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link href="/products">
              <Button variant="primary" size="lg" className="shadow-lg shadow-emerald-900/40">
                Explore Catalog <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white">
                Request Custom Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
