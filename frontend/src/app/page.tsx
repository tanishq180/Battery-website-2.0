import Link from "next/link";
import { ArrowUpRight, ArrowRight, BatteryCharging, CarFront, Sun, Factory, Zap, Check, Recycle } from "lucide-react";

const ranges = [
  { number: "01", name: "Lead-acid batteries", text: "Sunka sealed rechargeable battery models.", icon: BatteryCharging, slug: "lead-acid", image: "/images/products/sunka_rb1245e.jpg", spec: "Emergency lighting · Security · Backup" },
  { number: "02", name: "Lithium cells", text: "Explore the Sunka 18650 cell range.", icon: Zap, slug: "lithium", image: "/images/products/sunka_18650_2200.jpg", spec: "Portable devices · Lighting · Battery packs" },
  { number: "03", name: "UPS & backup", text: "Find the right fit for standby power.", icon: Sun, slug: "lead-acid", image: "/images/products/sunka_mr1232bs.jpg", spec: "UPS systems · Offices · Critical backup" },
  { number: "04", name: "Energy storage", text: "Battery options for larger power systems.", icon: Factory, slug: "energy-storage", image: "/images/telecom_rack_battery.jpg", spec: "Telecom · Solar · Infrastructure" },
];
export default function Home() {
  return <>
    <section className="energy-hero"><div className="site-wrap hero-grid">
      <div className="hero-copy"><p className="eyebrow"><span className="status-dot" /> ENERGY FOR WHAT’S NEXT</p>
        <h1>Big ambitions.<br />Uninterrupted<br /><span>power.</span></h1>
        <p className="hero-description">Sunka batteries by MERI Industries. Explore sealed lead-acid batteries, lithium cells, and energy storage solutions for the systems you depend on.</p>
        <div className="flex flex-wrap items-center gap-5 mt-9"><Link className="lime-button" href="/products">Explore batteries <ArrowUpRight size={19} /></Link><Link className="hero-text-link" href="/contact">Find your power solution <ArrowRight size={17} /></Link></div>
        <div className="hero-footnote"><span>01 / 04</span><div /><span>SUNKA / MERI INDUSTRIES</span></div>
      </div>
      <div className="hero-art"><span className="art-top-label">PURPOSE-BUILT ENERGY</span><div className="energy-orbit orbit-one" /><div className="energy-orbit orbit-two" /><img src="/images/products/sunka_mr1232bs.jpg" alt="Original SUNKA MR1232BS 12V 3.2Ah sealed lead-acid battery product sheet" width="680" height="620" className="hero-battery" /><div className="art-callout"><span className="status-dot" /><div><strong>Ready for your next move.</strong><span>Explore the right battery for your application.</span></div><Zap size={25} /></div><span className="art-bottom-label">SUNKA / ENERGY IN MOTION</span></div>
    </div></section>
    <div className="application-strip"><div className="site-wrap"><span>POWERING YOUR WORLD</span>{ranges.map(({ name, icon: Icon }) => <span key={name}><Icon size={19} />{name}</span>)}</div></div>
    <section className="site-wrap section-space" id="solutions"><div className="section-heading"><div><p className="eyebrow text-emerald-700">THE RIGHT ENERGY. EVERY APPLICATION.</p><h2>Different needs.<br />One powerful range.</h2></div><div><p>Find your fit across our battery solutions.<br className="hidden sm:block" /> Built around the way you live and work.</p><Link href="/products" className="inline-link">View the full range <ArrowUpRight size={18} /></Link></div></div>
      <div className="range-grid">{ranges.map(({ number, name, text, slug, image, spec }) => <Link href={`/products?category=${slug}`} className="range-card" key={name}><div className="range-card-top"><span>{number}</span><ArrowUpRight size={21} /></div><div className="range-art"><img src={image} alt={`Sunka ${name}`} width="320" height="240" /></div><h3>{name}</h3><p>{text}</p><span className="range-spec">{spec}</span></Link>)}</div>
    </section>
    <section className="approach-section"><div className="site-wrap approach-grid"><div><p className="eyebrow text-emerald-700">MORE THAN A BATTERY</p><h2>The right power starts<br />with the right partner.</h2><p className="text-slate-600 leading-7 mt-6 max-w-md">A battery should fit your application. We help you think through capacity, compatibility, operating conditions, and supply requirements before you choose.</p><Link href="/about" className="inline-link mt-7">Get to know Sunka <ArrowUpRight size={18} /></Link></div><div className="approach-list">{[{ icon: Zap, title: "Application-first selection", text: "Start with your load, runtime, and charging system to narrow down the right battery." }, { icon: Check, title: "Clear specifications", text: "Discuss voltage, capacity, chemistry, and warranty terms before placing your order." }, { icon: Recycle, title: "A longer-term perspective", text: "Ask about care, maintenance, and appropriate end-of-life collection options." }].map(({ icon: Icon, title, text }, i) => <div key={title}><span className="approach-icon"><Icon size={23} /></span><div><span className="text-xs text-slate-400">0{i + 1}</span><h3>{title}</h3><p>{text}</p></div></div>)}</div></div></section>
    <section className="site-wrap section-space"><div className="project-cta"><div><p className="eyebrow">LET’S TALK POWER</p><h2>Your next project.<br />Our next conversation.</h2><p>One replacement battery or a business supply requirement.<br />Tell us what you need to keep moving.</p></div><Link href="/contact" className="lime-button">Request a battery quote <ArrowUpRight size={20} /></Link></div></section>
  </>;
}
