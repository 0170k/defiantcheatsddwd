"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { createClient } from "@/lib/supabase/client"

type ProductStatus = { id: number; product_name: string; status: string; updated_at: string }
type StatusUpdate = { id: number; title: string; message: string; severity: string; created_at: string }

const statusConfig: Record<string, { label: string; color: string; dot: string; bg: string }> = {
  undetected: { label: "Undetected", color: "text-emerald-400", dot: "bg-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  "use-at-own-risk": { label: "Use At Own Risk", color: "text-amber-400", dot: "bg-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  detected: { label: "Detected", color: "text-red-400", dot: "bg-red-400", bg: "bg-red-500/10 border-red-500/20" },
  down: { label: "Down", color: "text-muted-foreground", dot: "bg-muted-foreground", bg: "bg-muted border-border" },
  updating: { label: "Updating", color: "text-blue-400", dot: "bg-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
}

const severityConfig: Record<string, { label: string; color: string; border: string; iconColor: string }> = {
  info: { label: "Info", color: "text-primary", border: "border-primary/20", iconColor: "text-primary" },
  warning: { label: "Warning", color: "text-amber-400", border: "border-amber-500/20", iconColor: "text-amber-400" },
  critical: { label: "Critical", color: "text-red-400", border: "border-red-500/20", iconColor: "text-red-400" },
  resolved: { label: "Resolved", color: "text-emerald-400", border: "border-emerald-500/20", iconColor: "text-emerald-400" },
}

function timeAgo(dateStr: string) {
  const now = new Date()
  const d = new Date(dateStr)
  const diffMs = now.getTime() - d.getTime()
  const minutes = Math.floor(diffMs / 60000)
  if (minutes < 1) return "Just now"
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export default function StatusPage() {
  const [statuses, setStatuses] = useState<ProductStatus[]>([])
  const [updates, setUpdates] = useState<StatusUpdate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    async function fetchData() {
      const [statusRes, updatesRes] = await Promise.all([
        supabase.from("product_statuses").select("*").order("product_name"),
        supabase.from("status_updates").select("*").order("created_at", { ascending: false }).limit(10)
      ])
      setStatuses(statusRes.data || [])
      setUpdates(updatesRes.data || [])
      setLoading(false)
    }
    fetchData()
  }, [])

  const allUndetected = statuses.every((s) => s.status === "undetected")
  const hasDetected = statuses.some((s) => s.status === "detected" || s.status === "down")

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(146,122,250,0.04) 0%, transparent 70%)" }} />

      <Navbar />

      <main className="flex-1 max-w-[720px] w-full mx-auto px-5 pt-12 pb-24 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <img src="/logo.png" alt="Defiant" className="h-8 w-8" />
            <span className="text-lg font-bold tracking-tight text-foreground">Defiant Status</span>
          </div>
          <p className="text-sm text-muted-foreground">Real-time detection status of all products.</p>
        </div>

        {/* Overall status banner */}
        {!loading && (
          <div className={`rounded-2xl border px-5 py-4 mb-10 ${
            allUndetected
              ? "border-emerald-500/20 bg-emerald-500/5"
              : hasDetected
                ? "border-red-500/20 bg-red-500/5"
                : "border-emerald-500/20 bg-emerald-500/5"
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full ${
                allUndetected ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" : hasDetected ? "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]" : "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"
              }`} />
              <span className={`text-sm font-medium ${allUndetected ? "text-emerald-400" : hasDetected ? "text-red-400" : "text-emerald-400"}`}>
                {allUndetected ? "All Products Undetected" : hasDetected ? "Some Products Affected" : "All Products Undetected"}
              </span>
            </div>
          </div>
        )}

        {/* Product Statuses */}
        <section className="mb-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Products</h2>
          <div className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm overflow-hidden divide-y divide-border/40">
            {loading ? (
              <div className="px-5 py-12 text-center">
                <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Loading statuses...</p>
              </div>
            ) : statuses.length === 0 ? (
              <div className="px-5 py-12 text-center text-sm text-muted-foreground">No products found.</div>
            ) : (
              statuses.map((product) => {
                const cfg = statusConfig[product.status] || statusConfig.undetected
                return (
                  <div key={product.id} className="flex items-center justify-between px-5 py-4 hover:bg-secondary/30 transition-colors">
                    <span className="text-sm font-medium text-foreground">{product.product_name}</span>
                    <div className={`inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border ${cfg.bg}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      <span className={cfg.color}>{cfg.label}</span>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </section>

        {/* Recent Updates */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Recent Updates</h2>
          {loading ? (
            <div className="text-center text-sm text-muted-foreground py-12">Loading...</div>
          ) : updates.length === 0 ? (
            <div className="rounded-xl border border-border bg-card px-5 py-12 text-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground mx-auto mb-3"><circle cx="12" cy="12" r="10" /><path d="M12 16v.01" /><path d="M12 8v4" /></svg>
              <p className="text-sm text-muted-foreground">No recent updates</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {updates.map((update) => {
                const sev = severityConfig[update.severity] || severityConfig.info
                return (
                  <div key={update.id} className={`rounded-xl border bg-card px-5 py-4 ${sev.border}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${sev.color}`}>{sev.label}</span>
                      <span className="text-[10px] text-muted-foreground">{timeAgo(update.created_at)}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">{update.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{update.message}</p>
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
