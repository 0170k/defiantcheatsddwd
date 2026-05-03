"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import HeroBackground from "@/components/HeroBackground"

const categoryData: Record<string, {
  title: string
  game: string
  description: string
  heroImage: string
  products: {
    name: string
    slug: string
    badge: string | null
    price: string
    description: string
    image: string
    features: string[]
  }[]
}> = {
  rust: {
    title: "Rust",
    game: "Rust",
    description: "Premium external tools for Rust with advanced ESP, aimbot, and utility features. Fully undetected and regularly updated.",
    heroImage: "/rust-card.png",
    products: [
      {
        name: "Defiant - Rust External",
        slug: "rust-external",
        badge: "UNDETECTED",
        price: "$7.99",
        description: "Fully external and undetected with comprehensive aimbot, visuals, and utility features.",
        image: "/products/rust-external.png",
        features: ["Silent Aim & Memory Aim", "Player & World ESP", "Recoil Control", "Config System"],
      },
    ],
  },
  r6: {
    title: "Rainbow Six Siege",
    game: "Rainbow Six Siege",
    description: "Top-tier R6 Siege enhancement tools with multiple product options. ESP, aimbot, and gadget detection.",
    heroImage: "/r6-card.png",
    products: [
      {
        name: "R6 Astral",
        slug: "r6-astral",
        badge: "JUST ADDED",
        price: "$5.99",
        description: "Premium R6 enhancement with aimbot, visuals, and operator abilities support.",
        image: "/products/r6-astral-box.png",
        features: ["Aimbot with FOV & Smooth", "Box & Skeleton ESP", "All Operator Abilities", "Config System"],
      },
      {
        name: "R6 - Diamond",
        slug: "r6-diamond",
        badge: "USER FAVOURITE",
        price: "$4.99",
        description: "Fully external with comprehensive ESP, gadget detection, and built-in HWID spoofer.",
        image: "/products/r6-diamond.png",
        features: ["Full ESP Suite", "Gadget & Ability ESP", "Built-in HWID Spoofer", "Cloud Config System"],
      },
      {
        name: "R6 - Crusader",
        slug: "r6-crusader",
        badge: null,
        price: "$5.99",
        description: "Undetected 6+ months with full aimbot and wallhack features for Rainbow Six Siege.",
        image: "/products/r6-crusader.png",
        features: ["Player ESP & Skeleton", "Active Aimbot with FOV", "Streamproof Mode", "Crosshair Overlay"],
      },
    ],
  },
  arcraiders: {
    title: "Arc Raiders",
    game: "Arc Raiders",
    description: "Full-featured external tools for Arc Raiders with advanced ESP, aimbot, radar, and world features.",
    heroImage: "/arc-raiders-card.png",
    products: [
      {
        name: "Ultimate - Arc Raiders",
        slug: "arc-external",
        badge: "NEW",
        price: "$7.99",
        description: "Full-featured external with advanced ESP, aimbot, radar, and world features.",
        image: "/products/arc-external.png",
        features: ["Aimbot with Prediction", "Player & World ESP", "Radar System", "Config Sharing"],
      },
    ],
  },
  cs2: {
    title: "Counter-Strike 2",
    game: "Counter-Strike 2",
    description: "Premium CS2 external cheat with ESP, chams, skeleton, and glow features. Fully undetected.",
    heroImage: "/cs2-card.png",
    products: [
      {
        name: "CS2 - Predator",
        slug: "cs2-predator",
        badge: null,
        price: "$1.50",
        description: "External cheat with full ESP, chams, glow, and skeleton features for Counter-Strike 2.",
        image: "/products/cs2-predator.png",
        features: ["Player ESP & Skeleton", "Chams & Glow", "Drag & Drop Elements", "Material Customization"],
      },
    ],
  },
  apex: {
    title: "Apex Legends",
    game: "Apex Legends",
    description: "Premium Apex Legends enhancement tools with advanced ESP, aimbot, and radar features.",
    heroImage: "/apex-card.png",
    products: [
      {
        name: "Ultimate - Apex Legends",
        slug: "apex-external",
        badge: null,
        price: "$5.99",
        description: "Full-featured Apex Legends external with complete ESP, aimbot, and advanced utilities.",
        image: "/products/apex-ultimate.png",
        features: ["Aimbot with Prediction", "Player & World ESP", "Radar System", "Config Sharing"],
      },
    ],
  },
}

const slugToStatusNames: Record<string, Record<string, string>> = {
  rust: { "rust-external": "Rust External" },
  r6: { "r6-crusader": "R6 Crusader", "r6-diamond": "R6 Diamond", "r6-astral": "R6 Astral" },
  arcraiders: { "arc-external": "Arc Raiders" },
  cs2: { "cs2-predator": "CS2 Predator" },
  apex: { "apex-external": "Apex External" },
}

const statusConfig: Record<string, { label: string; color: string; dot: string; bg: string }> = {
  undetected: { label: "Undetected", color: "text-emerald-400", dot: "bg-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  "use-at-own-risk": { label: "Use At Own Risk", color: "text-amber-400", dot: "bg-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  detected: { label: "Detected", color: "text-red-400", dot: "bg-red-400", bg: "bg-red-500/10 border-red-500/20" },
  down: { label: "Down", color: "text-muted-foreground", dot: "bg-muted-foreground", bg: "bg-muted border-border" },
  updating: { label: "Updating", color: "text-blue-400", dot: "bg-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
}

export default function GameCategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const category = categoryData[slug]
  const [statuses, setStatuses] = useState<Record<string, string>>({})

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [slug])

  useEffect(() => {
    const names = slugToStatusNames[slug]
    if (!names) return
    fetch("/api/status")
      .then((r) => r.json())
      .then((data) => {
        const map: Record<string, string> = {}
        for (const [prodSlug, statusName] of Object.entries(names)) {
          const match = (data.statuses || []).find((s: { product_name: string }) => s.product_name === statusName)
          if (match) map[prodSlug] = match.status
        }
        setStatuses(map)
      })
      .catch(() => {})
  }, [slug])

  if (!category) {
    return (
      <div className="min-h-screen bg-background text-foreground relative">
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}><HeroBackground /></div>
        <div className="relative z-10">
          <Navbar />
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/8 border border-primary/15 flex items-center justify-center mx-auto mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Game Not Found</h1>
              <p className="text-muted-foreground text-sm mb-6">This game category does not exist.</p>
              <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                Return Home
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <HeroBackground />
      </div>
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

      <div className="relative z-10">
        <Navbar />

        <main className="max-w-6xl mx-auto px-6 pt-8 pb-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-10" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40"><path d="m9 18 6-6-6-6" /></svg>
            <Link href="/#products-list" className="hover:text-foreground transition-colors">Products</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40"><path d="m9 18 6-6-6-6" /></svg>
            <span className="text-foreground font-medium">{category.title}</span>
          </nav>

          {/* Hero Banner */}
          <div className="relative rounded-2xl overflow-hidden border border-border/50 mb-12">
            <img
              src={category.heroImage}
              alt={category.title}
              className="w-full h-56 sm:h-72 object-cover object-[center_20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-card/20" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="text-xs font-semibold text-primary bg-primary/8 px-3 py-1 rounded-full border border-primary/15 mb-3 inline-block">{category.game}</span>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 text-balance">{category.title} Products</h1>
              <p className="text-muted-foreground max-w-xl leading-relaxed">{category.description}</p>
            </div>
          </div>

          {/* Products Grid */}
          <div className="space-y-6">
            {category.products.map((product) => {
              const status = statuses[product.slug]
              const sc = status ? statusConfig[status] : null

              return (
                <Link
                  key={product.slug}
                  href={`/product/${product.slug}`}
                  className="group grid grid-cols-1 md:grid-cols-[420px_1fr] rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm hover:border-primary/25 transition-all duration-300 overflow-hidden"
                >
                  {/* Product Image — fixed width left column, 16:9 aspect ratio, fully visible */}
                  <div className="relative overflow-hidden flex items-center bg-black/40">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-video object-cover block transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.badge && (
                      <span className="absolute top-4 left-4 text-[10px] px-3 py-1 rounded-lg font-semibold uppercase tracking-wide bg-primary/90 text-primary-foreground">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-5 sm:p-6 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">{product.name}</h2>
                      {sc && (
                        <span className={`inline-flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-0.5 rounded-full border ${sc.bg}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                          <span className={sc.color}>{sc.label}</span>
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{product.description}</p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {product.features.map((feat) => (
                        <span key={feat} className="text-xs px-3 py-1.5 rounded-lg bg-secondary/80 border border-border/30 text-muted-foreground">
                          {feat}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border/30">
                      <div>
                        <span className="text-[10px] text-muted-foreground/70 block uppercase tracking-wider mb-0.5">Starting at</span>
                        <span className="text-2xl font-bold text-foreground">{product.price}</span>
                      </div>
                      <span className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-xl bg-primary text-primary-foreground group-hover:bg-primary/90 transition-colors">
                        View Product
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Featured Video Section */}
          {(slug === "r6" || slug === "rust" || slug === "arcraiders") && (
            <div className="mt-20 pt-12 border-t border-border/30">
              <div className="flex flex-col items-center text-center mb-10">
                <span className="text-[10px] font-semibold text-primary uppercase tracking-widest mb-6">Featured Showcase</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
                  {slug === "r6" ? "R6 Diamond in Action" : slug === "rust" ? "Rust External in Action" : slug === "arcraiders" ? "Arc Raiders External in Action" : ""}
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl text-pretty">
                  {slug === "r6" ? "Experience the full power of our premium R6 solution" : slug === "rust" ? "See our fully external Rust cheat dominate the battlefield" : slug === "arcraiders" ? "Watch our Arc Raiders external showcase its power" : ""}
                </p>
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-border/50 bg-card/40 backdrop-blur-sm shadow-2xl shadow-primary/5">
                <div className="aspect-video w-full">
                  <iframe
                    src={slug === "r6" ? "https://streamable.com/e/n8mcok" : slug === "rust" ? "https://streamable.com/e/jicug5" : slug === "arcraiders" ? "https://streamable.com/e/ntxrx0" : ""}
                    className="w-full h-full"
                    allowFullScreen
                    allow="autoplay"
                  />
                </div>
              </div>
              <div className="mt-8 flex justify-center">
                <Link 
                  href={slug === "r6" ? "/product/r6-diamond" : slug === "rust" ? "/product/rust-external" : slug === "arcraiders" ? "/product/arc-external" : ""} 
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                  {slug === "r6" ? "Get R6 Diamond" : slug === "rust" ? "Get Rust External" : slug === "arcraiders" ? "Get Arc Raiders External" : ""}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          )}

          {/* Back to all products */}
          <div className="mt-12 text-center">
            <Link href="/#products-list" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              Back to all products
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
