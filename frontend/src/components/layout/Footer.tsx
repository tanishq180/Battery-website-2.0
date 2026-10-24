import { Brand } from "./Brand";
import Link from "next/link";
import { ArrowUpRight, Zap } from "lucide-react";
export const Footer = () => <footer className="energy-footer"><div className="site-wrap">
  <div className="footer-grid"><div><Link href="/" className="inline-flex"><Brand footer /></Link><p className="mt-6 max-w-xs text-sm leading-6 text-slate-400">Energy for the journeys, businesses, and everyday moments that matter.</p></div>
  <div><h3>Explore batteries</h3>{[["lead-acid", "Sealed lead-acid"], ["lithium", "Lithium cells"], ["energy-storage", "Energy storage & telecom"]].map(([slug, name]) => <Link key={slug} href={`/products?category=${slug}`}>{name}</Link>)}</div>
  <div><h3>Sunka</h3><Link href="/about">About us</Link><Link href="/contact">Contact & enquiries</Link><Link href="/admin/login">Staff portal</Link><a href="/docs/SUNKA_Battery_Catalogue.pdf" target="_blank" rel="noopener noreferrer">Sunka catalogue PDF</a></div>
  <div><h3>MERI Industries</h3><a href="tel:+917538844410">+91 7538844410</a><a href="mailto:merihindustries@gmail.com">merihindustries@gmail.com</a><p className="text-sm text-slate-400 leading-6">Share your application, capacity, and quantity requirements with our team.</p><Link className="footer-contact" href="/contact">Start a conversation <ArrowUpRight size={17} /></Link></div></div>
  <div className="footer-bottom"><span>© {new Date().getFullYear()} MERI Industries. Sunka Batteries.</span><span>Sunka Batteries · MERI Industries</span></div>
</div></footer>;
