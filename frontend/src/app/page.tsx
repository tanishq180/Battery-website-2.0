import Link from "next/link";
import { ArrowRight, Globe, ShieldCheck, Truck, Package, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="space-y-16 py-12">
      {/* Hero Section Placeholder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-semibold">
              <Globe className="h-4 w-4" />
              <span>International Wholesale Import & Export Partner</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Empowering Global Supply Chains with Trusted Freight & Wholesale Sourcing
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              We specialize in bulk trade distribution, certified port customs clearance, and tier-priced product sourcing for international B2B buyers and commercial enterprises.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/products">
                <Button variant="primary" size="lg" className="shadow-lg shadow-emerald-900/30">
                  Browse Product Catalog <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white">
                  Company Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit mb-5">
              <Truck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Global Sea & Air Freight</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Seamless containerized logistics, freight forwarding, and port clearance across 30+ major trade destinations worldwide.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl w-fit mb-5">
              <Package className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Volume Price Tiers</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Transparent, quantity-based bulk pricing breaks designed for wholesale importers, distributors, and enterprise procurement.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit mb-5">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Regulatory Compliance</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Strict pre-shipment quality control, ISO trade certifications, and full documentation compliance for every export consignment.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
