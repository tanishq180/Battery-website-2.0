import Link from "next/link";
import { ArrowUpRight, Zap } from "lucide-react";
export const Footer = () => <footer className="energy-footer"><div className="site-wrap">
  <div className="footer-grid"><div><Link href="/" className="brand text-white"><span className="brand-symbol"><Zap fill="currentColor" size={25} /></span><span>volt<span className="font-normal">edge</span><small>BATTERIES & ENERGY SOLUTIONS</small></span></Link><p className="mt-6 max-w-xs text-sm leading-6 text-slate-400">Energy for the journeys, businesses, and everyday moments that matter.</p></div>
  <div><h3>Explore batteries</h3>{[["automotive", "Automotive"], ["inverter-ups", "Inverter & UPS"], ["solar-storage", "Solar & storage"], ["industrial", "Industrial"]].map(([slug, name]) => <Link key={slug} href={`/products?category=${slug}`}>{name}</Link>)}</div>
  <div><h3>VoltEdge</h3><Link href="/about">About us</Link><Link href="/contact">Contact & enquiries</Link><Link href="/admin/login">Staff portal</Link></div>
  <div><h3>Let’s find your fit</h3><p className="text-sm text-slate-400 leading-6">Share your application, capacity, and quantity requirements with our team.</p><Link className="footer-contact" href="/contact">Start a conversation <ArrowUpRight size={17} /></Link></div></div>
  <div className="footer-bottom"><span>© {new Date().getFullYear()} VoltEdge Batteries.</span><span>Automotive. Backup. Solar. Industrial.</span></div>
</div></footer>;
