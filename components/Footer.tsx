import Link from "next/link"

export default function Footer() {
  return (
    <footer className="relative border-t border-border/30 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <img src="/logo.png" alt="Defiant" className="h-7 w-7" />
              <span className="text-sm font-semibold text-foreground">Defiant</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Premium gaming enhancements built with quality and security in mind.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Products</h3>
            <nav className="flex flex-col gap-2.5">
              <Link href="/product/rust-external" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Rust External</Link>
              <Link href="/product/r6-crusader" className="text-sm text-muted-foreground hover:text-foreground transition-colors">R6 Crusader</Link>
              <Link href="/product/r6-diamond" className="text-sm text-muted-foreground hover:text-foreground transition-colors">R6 Diamond</Link>
              <Link href="/product/r6-astral" className="text-sm text-muted-foreground hover:text-foreground transition-colors">R6 Astral</Link>
              <Link href="/product/arc-external" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Arc Raiders</Link>
              <Link href="/product/cs2-predator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">CS2 Predator</Link>
              <Link href="/product/apex-external" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Apex Ultimate</Link>
              <Link href="/product/spoofer-temp" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Temp Spoofer</Link>
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Resources</h3>
            <nav className="flex flex-col gap-2.5">
              <a href="https://defiantprojects.gitbook.io/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Setup Guides</a>
              <Link href="/status" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Status Page</Link>
              <a href="https://discord.gg/defiantcheats" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Discord Support</a>
              <a href="https://myvouch.es/defiantcheats" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Reviews</a>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Legal</h3>
            <nav className="flex flex-col gap-2.5">
              <Link href="/tos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
            </nav>
            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Blog</h3>
              <nav className="flex flex-col gap-2.5">
                <Link href="/defiant-cheats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Defiant</Link>
                <Link href="/defiant-rust-cheat" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Rust Guide</Link>
                <Link href="/defiant-r6-cheat" className="text-sm text-muted-foreground hover:text-foreground transition-colors">R6 Guide</Link>
                <Link href="/defiant-cs2-cheat" className="text-sm text-muted-foreground hover:text-foreground transition-colors">CS2 Guide</Link>
                <Link href="/defiant-apex-cheat" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Apex Guide</Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">2025 Defiantcheats.com. All rights reserved.</p>
          <a
            href="https://discord.gg/defiantcheats"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 127.14 96.36" fill="currentColor">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.85.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
