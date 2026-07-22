import React from "react";
import {
  Globe,
  Mail,
  MapPin,
  Phone,
  Clock,
  MessageSquare,
  ShieldCheck,
  Building2,
  Anchor,
} from "lucide-react";
import { QuoteForm } from "@/components/forms/QuoteForm";

export const metadata = {
  title: "Contact Us & Request a Quote | GlobalTrade Enterprise",
  description:
    "Get in touch with GlobalTrade Enterprise. Submit a Request for Quotation (RFQ), consult with our trade logistics team, or chat on WhatsApp.",
};

export default function ContactPage() {
  return (
    <div className="space-y-16 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-200">
          <Globe className="h-4 w-4" />
          <span>Global Trade & Logistics Consultation</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Request a Wholesale Trade Quote
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Connect directly with our international export specialists. Fill out the quote inquiry form or reach us via phone, email, or instant WhatsApp messaging for immediate pricing breaks and customs clearance terms.
        </p>
      </div>

      {/* Two-Column Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xl space-y-6">
          <div className="space-y-2 border-b border-slate-100 pb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Submit Official Request for Quotation (RFQ)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Enter your product preferences and volume requirements. A sales representative will respond within 24 hours.
            </p>
          </div>

          <QuoteForm />
        </div>

        {/* Right Column: Direct Contact & Office Details (5 cols) */}
        <div className="lg:col-span-5 space-y-8 sticky top-24">
          {/* Contact Details Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl border border-slate-800 space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Global Trade Headquarters</h3>
                <p className="text-xs text-slate-400">Direct Enterprise Contact Operations</p>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3.5">
                <MapPin className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Corporate & Logistics Facility</span>
                  <span className="text-slate-300 text-xs">
                    100 Global Commerce Way, International Trade Tower, Suite 1200
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Mail className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Sales & Quotes Email</span>
                  <a
                    href="mailto:quotes@yourimportexport.com"
                    className="text-emerald-400 hover:underline text-xs"
                  >
                    quotes@yourimportexport.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Phone className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Telephone Hotline</span>
                  <a href="tel:+15550192834" className="text-slate-300 hover:text-white text-xs">
                    +1 (555) 019-2834
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Clock className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Operating Business Hours</span>
                  <span className="text-slate-300 text-xs block">Mon – Fri: 8:00 AM – 6:00 PM EST</span>
                  <span className="text-slate-300 text-xs block">Sat: 9:00 AM – 1:00 PM EST</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA Button */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <a
                href="https://wa.me/15550192834?text=Hi%2C%20I%20would%20like%20to%20inquire%20about%20your%20import%2Fexport%20wholesale%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-xl shadow-lg transition"
              >
                <MessageSquare className="h-5 w-5" />
                <span>Chat Instantly on WhatsApp</span>
              </a>
              <p className="text-[11px] text-slate-400 text-center">
                Available 24/7 for urgent freight and port consignment queries.
              </p>
            </div>
          </div>

          {/* Trade Guarantee Badge Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center space-x-3 text-emerald-700">
              <ShieldCheck className="h-6 w-6 shrink-0" />
              <h4 className="text-sm font-bold">100% Certified Export Compliance</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every shipment is backed by verified Certificates of Origin (COO), Commercial Invoices, custom packaging, and ISO-certified pre-shipment inspections.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
