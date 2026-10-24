"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ArrowUpRight, Zap } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return <>
    <div className="topline"><div className="site-wrap"><span>POWER FOR EVERY POSSIBILITY.</span><Link href="/contact">For business & bulk enquiries <ArrowUpRight size={12} /></Link></div></div>
    <header className="site-header"><div className="site-wrap nav-inner"><Link href="/" className="brand" aria-label="VoltEdge Batteries home"><span className="brand-symbol"><Zap fill="currentColor" size={25} /></span><span>volt<span className="font-normal">edge</span><small>BATTERIES & ENERGY SOLUTIONS</small></span></Link>
    <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-8">{[["/", "Home"], ["/products", "Batteries"], ["/about", "About us"], ["/contact", "Contact"]].map(([href, label]) => <Link key={href} href={href} aria-current={path === href ? "page" : undefined} className={`nav-link ${path === href ? "active" : ""}`}>{label}</Link>)}</nav>
    <Link href="/contact" className="nav-quote hidden lg:inline-flex">Get a quote <ArrowUpRight size={17} /></Link><button className="lg:hidden p-2" aria-label="Open navigation menu" aria-expanded={open} onClick={() => setOpen(true)}><Menu /></button></div></header>
    <MobileMenu isOpen={open} onClose={() => setOpen(false)} />
  </>;
};
