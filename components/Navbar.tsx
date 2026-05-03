"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#products-list", label: "Products" },
  { href: "/status", label: "Status" },
  { href: "/tos", label: "Terms" },
  { href: "https://discord.gg/defiantcheats", label: "Support", external: true },
  { href: "https://myvouch.es/defiantcheats", label: "Reviews", external: true },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    if (href.startsWith("/#")) return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-border/40 backdrop-blur-2xl bg-background/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <img src="/logo.png" alt="Defiant" className="h-7 w-7 transition-transform duration-300 group-hover:scale-105" />
            <span className="text-sm font-bold text-foreground tracking-tight hidden sm:block">Defiant</span>
          </Link>

          {/* Center: Nav links */}
          <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              const classes = `text-xs font-medium rounded-lg px-3.5 py-2 transition-all ${
                active
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              }`
              if (link.external) {
                return (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={classes}>
                    {link.label}
                  </a>
                )
              }
              return (
                <Link key={link.href} href={link.href} className={classes}>
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Right: Discord + CTA + mobile toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://discord.gg/defiantcheats"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-secondary/60 transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Discord"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 127.14 96.36" fill="currentColor">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.85.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
              </svg>
            </a>
            <a
              href="https://defiantprojects.gitbook.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-all shadow-sm shadow-primary/25"
            >
              Guides
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 7h10v10" /><path d="M7 17 17 7" />
              </svg>
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg hover:bg-secondary/60 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl animate-slide-down">
            <div className="px-5 py-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href)
                const classes = `text-sm font-medium rounded-lg px-3 py-2.5 transition-colors ${
                  active
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`
                if (link.external) {
                  return (
                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={classes} onClick={() => setMobileOpen(false)}>
                      {link.label}
                    </a>
                  )
                }
                return (
                  <Link key={link.href} href={link.href} className={classes} onClick={() => setMobileOpen(false)}>
                    {link.label}
                  </Link>
                )
              })}
              <a
                href="https://defiantprojects.gitbook.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2.5 rounded-lg transition-all mt-2"
                onClick={() => setMobileOpen(false)}
              >
                Guides
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 7h10v10" /><path d="M7 17 17 7" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
