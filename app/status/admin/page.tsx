"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

type ProductStatus = { id: number; product_name: string; status: string; updated_at: string }
type StatusUpdate = { id: number; title: string; message: string; severity: string; created_at: string }

const ADMIN_CODE = "27d7sd-27sfdshd-283dsydy"

const STATUS_OPTIONS = [
  { value: "undetected", label: "Undetected" },
  { value: "use-at-own-risk", label: "Use At Own Risk" },
  { value: "detected", label: "Detected" },
  { value: "down", label: "Down" },
  { value: "updating", label: "Updating" },
]

const SEVERITY_OPTIONS = [
  { value: "info", label: "Info" },
  { value: "warning", label: "Warning" },
  { value: "critical", label: "Critical" },
  { value: "resolved", label: "Resolved" },
]

export default function StatusAdmin() {
  const [adminCode, setAdminCode] = useState("")
  const [authenticated, setAuthenticated] = useState(false)
  const [codeInput, setCodeInput] = useState("")
  const [statuses, setStatuses] = useState<ProductStatus[]>([])
  const [updates, setUpdates] = useState<StatusUpdate[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState<number | null>(null)
  const [posting, setPosting] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [newTitle, setNewTitle] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [newSeverity, setNewSeverity] = useState("info")
  const [loginError, setLoginError] = useState("")
  const [loggingIn, setLoggingIn] = useState(false)

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  async function fetchData() {
    setLoading(true)
    const supabase = createClient()
    const [statusRes, updatesRes] = await Promise.all([
      supabase.from("product_statuses").select("*").order("product_name"),
      supabase.from("status_updates").select("*").order("created_at", { ascending: false }).limit(10)
    ])
    setStatuses(statusRes.data || [])
    setUpdates(updatesRes.data || [])
    setLoading(false)
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginError("")
    setLoggingIn(true)
    // Validate the code locally
    if (codeInput !== ADMIN_CODE) {
      setLoggingIn(false)
      setLoginError("Invalid admin code")
      return
    }
    setAdminCode(codeInput)
    setAuthenticated(true)
    setLoggingIn(false)
    fetchData()
  }

  async function updateStatus(productId: number, status: string) {
    if (adminCode !== ADMIN_CODE) { setAuthenticated(false); showToast("Invalid admin code."); return }
    setSaving(productId)
    const supabase = createClient()
    const { error } = await supabase.from("product_statuses").update({ status, updated_at: new Date().toISOString() }).eq("id", productId)
    if (error) { showToast("Error: " + error.message) } else { showToast("Status updated."); fetchData() }
    setSaving(null)
  }

  async function postUpdate(e: React.FormEvent) {
    e.preventDefault()
    if (!newTitle.trim() || !newMessage.trim()) return
    if (adminCode !== ADMIN_CODE) { setAuthenticated(false); showToast("Invalid admin code."); return }
    setPosting(true)
    const supabase = createClient()
    const { error } = await supabase.from("status_updates").insert({ title: newTitle, message: newMessage, severity: newSeverity })
    if (error) { showToast("Error: " + error.message) } else { showToast("Update posted."); setNewTitle(""); setNewMessage(""); setNewSeverity("info"); fetchData() }
    setPosting(false)
  }

  async function deleteUpdate(updateId: number) {
    if (adminCode !== ADMIN_CODE) { setAuthenticated(false); showToast("Invalid admin code."); return }
    const supabase = createClient()
    const { error } = await supabase.from("status_updates").delete().eq("id", updateId)
    if (error) { showToast("Error: " + error.message) } else { showToast("Update deleted."); fetchData() }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <Link href="/status" className="inline-block mb-5"><img src="/logo.png" alt="Defiant" className="h-10 w-10 mx-auto" /></Link>
            <h1 className="text-xl font-bold tracking-tight text-foreground mb-1">Status Admin</h1>
            <p className="text-sm text-muted-foreground">Enter your admin code to continue</p>
          </div>
          <form onSubmit={handleLogin}>
            <input type="password" value={codeInput} onChange={(e) => { setCodeInput(e.target.value); setLoginError("") }} placeholder="Admin code" className={`w-full bg-card border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 mb-2 ${loginError ? "border-red-500" : "border-border"}`} autoFocus />
            {loginError && <p className="text-xs text-red-500 mb-3">{loginError}</p>}
            <button type="submit" disabled={loggingIn} className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground text-sm font-semibold rounded-xl px-4 py-3 transition-colors">{loggingIn ? "Verifying..." : "Login"}</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {toast && (
        <div className="fixed top-4 right-4 z-[100] bg-card border border-border text-sm text-foreground px-4 py-2.5 rounded-xl shadow-lg">{toast}</div>
      )}

      <div className="border-b border-border bg-background">
        <div className="max-w-[800px] mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/status"><img src="/logo.png" alt="Defiant" className="h-7 w-7" /></Link>
            <span className="text-sm font-medium text-muted-foreground">Status Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/status" className="text-xs text-muted-foreground hover:text-foreground transition-colors">View public page</Link>
            <button onClick={() => { setAuthenticated(false); setAdminCode("") }} className="text-xs text-muted-foreground hover:text-red-400 transition-colors">Logout</button>
          </div>
        </div>
      </div>

      <main className="max-w-[800px] mx-auto px-4 py-10">
        <section className="mb-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Product Statuses</h2>
          <div className="rounded-xl border border-border bg-card overflow-hidden divide-y divide-border">
            {loading ? (
              <div className="px-5 py-8 text-center text-sm text-muted-foreground">Loading...</div>
            ) : (
              statuses.map((product) => (
                <div key={product.id} className="flex items-center justify-between px-5 py-4 gap-4">
                  <span className="text-sm font-medium text-foreground">{product.product_name}</span>
                  <div className="flex items-center gap-3">
                    <select value={product.status} onChange={(e) => updateStatus(product.id, e.target.value)} disabled={saving === product.id} className="bg-card border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary/50 disabled:opacity-50 cursor-pointer">
                      {STATUS_OPTIONS.map((opt) => (<option key={opt.value} value={opt.value} className="bg-card text-foreground">{opt.label}</option>))}
                    </select>
                    {saving === product.id && <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Post Update</h2>
          <form onSubmit={postUpdate} className="rounded-xl border border-border bg-card p-5">
            <div className="flex flex-col gap-3 mb-4">
              <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Update title" className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50" required />
              <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Describe the update..." rows={3} className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 resize-none" required />
              <div className="flex items-center gap-3">
                <select value={newSeverity} onChange={(e) => setNewSeverity(e.target.value)} className="bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary/50 cursor-pointer">
                  {SEVERITY_OPTIONS.map((opt) => (<option key={opt.value} value={opt.value} className="bg-card text-foreground">{opt.label}</option>))}
                </select>
                <button type="submit" disabled={posting} className="ml-auto bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground text-sm font-semibold rounded-lg px-5 py-2 transition-colors">{posting ? "Posting..." : "Post Update"}</button>
              </div>
            </div>
          </form>
        </section>

        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Existing Updates</h2>
          {updates.length === 0 ? (
            <div className="rounded-xl border border-border bg-card px-5 py-10 text-center"><p className="text-sm text-muted-foreground">No updates yet.</p></div>
          ) : (
            <div className="flex flex-col gap-2">
              {updates.map((update) => (
                <div key={update.id} className="rounded-xl border border-border bg-card px-5 py-4 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-foreground truncate">{update.title}</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">{update.severity}</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">{update.message}</p>
                  </div>
                  <button onClick={() => deleteUpdate(update.id)} className="shrink-0 text-xs text-muted-foreground hover:text-red-400 transition-colors px-2 py-1">Delete</button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
