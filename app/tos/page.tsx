"use client"

import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const sections = [
  {
    num: 1,
    title: "No Refunds",
    content: "All sales are final. Once payment is completed, the digital product is delivered automatically to the email provided at checkout. Due to the nature of digital goods, you waive any right to cancel, dispute, or request a refund once delivery has occurred.",
  },
  {
    num: 2,
    title: "Access and Subscription Expiry",
    content: "If you choose to stop using the product, your access will remain active until the end of your subscription term. We do not offer partial refunds or credits for unused time.",
  },
  {
    num: 3,
    title: "Restricted Purchases",
    content: "Purchases made by or on behalf of anti-cheat organizations, game developers, their employees, contractors, or affiliates are strictly prohibited. By completing a purchase, you confirm that you are not associated with any such entity.",
  },
  {
    num: 4,
    title: "Violation of Terms",
    content: "Violating these terms \u2014 including unauthorized purchases by restricted parties \u2014 will result in immediate termination of access without notice or refund. We reserve the right to take legal action in cases of fraudulent or deceptive purchases.",
  },
  {
    num: 6,
    title: "Agreement",
    content: "By completing your purchase, you confirm that you meet all eligibility requirements, understand the risks involved, and agree to be bound by these terms in full.",
  },
]

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Ambient glow */}
      <div className="absolute top-0 left-0 right-0 h-[300px] pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[250px] rounded-full" style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(146,122,250,0.06) 0%, transparent 70%)" }} />
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
        }} />
      </div>

      <Navbar />

      <main className="relative z-10 max-w-3xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-10">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          <span className="text-foreground font-medium">Terms of Service</span>
        </nav>

        {/* Page Title */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
            <span className="text-xs font-medium text-primary">Legal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 text-balance">Terms of Service</h1>
          <p className="text-muted-foreground leading-relaxed">By purchasing any digital product from us, you agree to the following terms.</p>
        </div>

        {/* Sections */}
        <div className="space-y-5">
          {sections.map((s) => (
            <div key={s.num} className="p-6 rounded-2xl bg-card/60 border border-border/40 hover:border-primary/15 transition-all backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm font-bold">{s.num}</span>
                <h2 className="text-base font-semibold text-foreground">{s.title}</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
            </div>
          ))}

          {/* Ban Risk - special */}
          <div className="p-6 rounded-2xl bg-card/60 border border-amber-500/20 hover:border-amber-500/30 transition-all backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-bold">5</span>
              <h2 className="text-base font-semibold text-foreground">Ban Risk Disclaimer</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              <strong className="text-foreground">Yes, there is always a risk of losing your account even if the product is listed as undetected.</strong>{" "}
              Keeping your stats low, acting legit when being spectated, and using "legit" settings on your product are good guidelines to follow.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {'In short: '}
              <span className="text-primary font-medium">undetected does not mean unbannable</span>
              {' \u2014 the way you play matters as much as the quality of the product.'}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We are <strong className="text-foreground">not responsible</strong> for any bans, suspensions, or account restrictions that may occur as a result of using our products.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
