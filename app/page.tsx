"use client"

import Link from "next/link"
import HeroBackground from "@/components/HeroBackground"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const gameCards = [
  { key: "rust", title: "Rust", desc: "External tools with ESP, aimbot and more", image: "/rust-card.png", price: "$7.99", badge: "Popular" },
  { key: "r6", title: "Rainbow Six Siege", desc: "Premium R6 enhancement suite", image: "/r6-card.png", price: "$4.99", badge: null },
  { key: "arcraiders", title: "Arc Raiders", desc: "Full feature external package", image: "/arc-raiders-card.png", price: "$7.99", badge: "New" },
  { key: "cs2", title: "Counter-Strike 2", desc: "Predator external with ESP and chams", image: "/cs2-card.png", price: "$1.50", badge: null },
  { key: "apex", title: "Apex Legends", desc: "Premium apex enhancement tools", image: "/apex-card.png", price: "$5.99", badge: null },
]

const features = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>,
    title: "Undetected",
    desc: "Advanced bypass technology updated frequently to stay ahead of anti-cheat.",
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
    title: "Instant Delivery",
    desc: "Automated key delivery within seconds of purchase, 24/7.",
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
    title: "Affordable",
    desc: "Competitive pricing with flexible day-based plans for every budget.",
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    title: "24/7 Support",
    desc: "Dedicated support team on Discord for setup help and troubleshooting.",
  },
]

export default function HomePage() {
  const scrollToProducts = (e: React.MouseEvent) => {
    e.preventDefault()
    const target = document.getElementById("products-list")
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <HeroBackground />
      </div>
      {/* Grid — offset -24px so first horizontal line lands at 80-24=56px (navbar bottom) */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          backgroundPosition: "0 -24px",
          maskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 60%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 60%)",
        }}
      />

      {/* Discord FAB */}
      <a
        href="https://discord.gg/defiantcheats"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Join our Discord"
        className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-xl bg-[#5865F2] flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#5865F2]/20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 127.14 96.36" fill="white">
          <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.85.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
        </svg>
      </a>

      {/* Navbar */}
      <div className="relative z-40">
        <Navbar />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* ===== HERO ===== */}
        <section className="relative min-h-[92vh] flex items-center overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
              {/* Left — Text content */}
              <div className="flex-1 max-w-xl lg:pr-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/8 border border-primary/15 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-medium text-primary/90">All Products Undetected</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 leading-[1.1] tracking-tight">
                  <span className="text-foreground">Premium Game Cheats.</span>
                  <br />
                  <span className="text-primary">Unleash Your Potential.</span>
                </h1>

                <p className="text-muted-foreground text-base max-w-md mb-8 leading-relaxed mx-auto lg:mx-0">
                  {'Trusted by 500+ users. 24/7 support, undetected products, and affordable pricing.'}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <button
                    onClick={scrollToProducts}
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                      <path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" />
                    </svg>
                    Browse Products
                  </button>
                  <a
                    href="https://discord.gg/defiantcheats"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3 text-sm font-medium rounded-xl border border-border/50 bg-card/40 text-foreground hover:bg-card/70 hover:border-border/70 transition-all backdrop-blur-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 127.14 96.36" fill="currentColor">
                      <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.85.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                    </svg>
                    Join Discord
                  </a>
                </div>
              </div>

              {/* Right — Character image */}
              <div className="flex-1 relative flex justify-center lg:justify-end">
                {/* Subtle glow behind player */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" aria-hidden="true" style={{ background: "radial-gradient(circle, rgba(146,122,250,0.06) 0%, transparent 60%)" }} />
                {/* Player with bottom fade */}
                <div
                  className="relative w-full max-w-[650px] lg:max-w-[750px]"
                  style={{
                    maskImage: "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/hero-player.png"
                    alt="Defiant Arc Raiders cheat menu showcase"
                    className="w-full h-auto object-contain drop-shadow-2xl select-none"
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                    style={{ WebkitUserDrag: "none" } as React.CSSProperties}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="m6 9 6 6 6-6" /></svg>
          </div>
        </section>

        {/* ===== PRODUCTS ===== */}
        <section id="products-list" className="w-full relative py-24">
          {/* Smooth gradient blend into section */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "linear-gradient(to bottom, transparent 0%, rgba(17,17,19,0.3) 8%, rgba(17,17,19,0.5) 20%, rgba(17,17,19,0.5) 80%, rgba(17,17,19,0.3) 92%, transparent 100%)"
          }} />

          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="flex flex-col items-center mb-14">
              <span className="text-primary text-xs font-semibold uppercase tracking-widest mb-4">Products</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-3 text-balance">Choose Your Advantage</h2>
              <p className="text-muted-foreground text-center max-w-md">Select a game to explore our premium enhancement packages.</p>
            </div>

            {/* Top row - 3 cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-7">
              {gameCards.slice(0, 3).map((card) => (
                <Link
                  key={card.key}
                  href={`/games/${card.key}`}
                  className="group flex flex-col rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm hover:border-primary/25 transition-all duration-300 overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={card.image}
                      alt={`Defiant - ${card.title} Products`}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    {card.badge && (
                      <span className="absolute top-4 right-4 text-[10px] px-3 py-1 rounded-lg font-semibold uppercase tracking-wide bg-primary/90 text-primary-foreground">
                        {card.badge}
                      </span>
                    )}
                  </div>
                  {/* Info */}
                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="font-semibold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">{card.title}</h3>
                    <p className="text-sm text-muted-foreground mb-7 leading-relaxed">{card.desc}</p>
                    <div className="flex items-center justify-between mt-auto pt-5 border-t border-border/30">
                      <div>
                        <span className="text-[10px] text-muted-foreground/70 block uppercase tracking-wider mb-0.5">Starting at</span>
                        <span className="text-2xl font-bold text-foreground">{card.price}</span>
                      </div>
                      <span className="px-6 py-2.5 text-sm font-medium rounded-xl bg-primary text-primary-foreground group-hover:bg-primary/90 transition-colors">
                        View
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Bottom row - centered 2 cards */}
            <div className="flex flex-wrap justify-center gap-7">
              {gameCards.slice(3).map((card) => (
                <Link
                  key={card.key}
                  href={`/games/${card.key}`}
                  className="group flex flex-col rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm hover:border-primary/25 transition-all duration-300 overflow-hidden w-full sm:w-[calc(50%-14px)] lg:w-[calc(33.333%-19px)]"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={card.image}
                      alt={`Defiant - ${card.title} Products`}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    {card.badge && (
                      <span className="absolute top-4 right-4 text-[10px] px-3 py-1 rounded-lg font-semibold uppercase tracking-wide bg-primary/90 text-primary-foreground">
                        {card.badge}
                      </span>
                    )}
                  </div>
                  {/* Info */}
                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="font-semibold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">{card.title}</h3>
                    <p className="text-sm text-muted-foreground mb-7 leading-relaxed">{card.desc}</p>
                    <div className="flex items-center justify-between mt-auto pt-5 border-t border-border/30">
                      <div>
                        <span className="text-[10px] text-muted-foreground/70 block uppercase tracking-wider mb-0.5">Starting at</span>
                        <span className="text-2xl font-bold text-foreground">{card.price}</span>
                      </div>
                      <span className="px-6 py-2.5 text-sm font-medium rounded-xl bg-primary text-primary-foreground group-hover:bg-primary/90 transition-colors">
                        View
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SPOOFER ===== */}
        <section className="w-full py-24 relative">
          <div className="max-w-6xl mx-auto px-6 relative">
            <div className="flex flex-col items-center mb-14">
              <span className="text-primary text-xs font-semibold uppercase tracking-widest mb-4">HWID Protection</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-3 text-balance">Hardware Spoofer</h2>
              <p className="text-muted-foreground text-center max-w-md">One-click hardware ID protection for all major games.</p>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
              {/* Left features */}
              <div className="hidden lg:flex flex-col gap-5 text-right">
                {[
                  { icon: <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>, label: "One-Click Activation" },
                  { icon: <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 9h.01M15 9h.01M9 15h6" /></svg>, label: "All Games Supported" },
                  { icon: <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>, label: "Tournament Ready" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 justify-end">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <div className="w-10 h-10 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center">{item.icon}</div>
                  </div>
                ))}
              </div>

              {/* Spoofer card */}
              <Link
                href="/product/spoofer-temp"
                className="group flex flex-col rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm hover:border-primary/25 transition-all duration-300 overflow-hidden w-full max-w-lg"
              >
                <div className="relative overflow-hidden">
                  <img src="/products/spoofer-temp.png" alt="Defiant Temporary Spoofer" className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                  <span className="absolute top-4 right-4 text-[10px] bg-primary/90 px-3 py-1 rounded-lg text-primary-foreground font-semibold uppercase tracking-wide">Popular</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-semibold text-lg text-foreground mb-1.5 group-hover:text-primary transition-colors">Temporary Spoofer</h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">Supports Fortnite, R6, Rust, Apex, Tarkov, CoD & more</p>
                  <div className="flex items-center justify-between mt-auto pt-5 border-t border-border/30">
                    <div>
                      <span className="text-[10px] text-muted-foreground/70 block uppercase tracking-wider mb-0.5">Starting at</span>
                      <span className="text-2xl font-bold text-foreground">$5.99</span>
                    </div>
                    <span className="px-6 py-3 text-sm font-medium rounded-xl bg-primary text-primary-foreground group-hover:bg-primary/90 transition-colors">View Product</span>
                  </div>
                </div>
              </Link>

              {/* Right features */}
              <div className="hidden lg:flex flex-col gap-5">
                {[
                  { icon: <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>, label: "Fully Undetected" },
                  { icon: <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>, label: "Loyalty Rewards" },
                  { icon: <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>, label: "24/7 Support" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center">{item.icon}</div>
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== FEATURES ===== */}
        <section className="w-full py-24 relative">
          {/* Smooth gradient blend */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "linear-gradient(to bottom, transparent 0%, rgba(17,17,19,0.3) 10%, rgba(17,17,19,0.4) 50%, rgba(17,17,19,0.3) 90%, transparent 100%)"
          }} />

          <div className="max-w-5xl mx-auto px-6 relative">
            <div className="text-center mb-14">
              <span className="text-primary text-xs font-semibold uppercase tracking-widest mb-4 block">Why Us</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 text-balance">Built Different</h2>
              <p className="text-muted-foreground max-w-md mx-auto">Industry-leading features that set us apart from the rest.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {features.map((f) => (
                <div key={f.title} className="group text-center p-7 rounded-2xl bg-card/30 border border-border/30 hover:border-primary/15 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center mx-auto mb-5 text-primary group-hover:bg-primary/12 transition-colors">
                    {f.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}
