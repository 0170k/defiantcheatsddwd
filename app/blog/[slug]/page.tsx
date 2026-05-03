"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const blogData: Record<string, {
  title: string; subtitle: string; game: string; image: string; isLogo?: boolean
  sections: { title: string; content: string }[]
}> = {
  "defiant-cheats": {
    title: "Defiant Cheats", subtitle: "Premium Gaming Enhancements Built with Quality", game: "All Games", image: "/rust-card.png", isLogo: true,
    sections: [
      { title: "Our Mission", content: "At Defiant Cheats, we are committed to providing the highest quality gaming enhancements at affordable prices. Every product we create goes through rigorous testing and development to ensure reliability, safety, and performance. Our team of experienced developers works tirelessly to stay ahead of anti-cheat systems while maintaining the stability you expect." },
      { title: "Quality First Approach", content: "We believe that quality should never be compromised. Each feature in our products is carefully crafted and optimized for the best possible gaming experience. From smooth aimbot algorithms to accurate ESP rendering, we put tremendous effort into every detail. Our cheats are designed to give you a competitive edge without sacrificing the integrity of your gaming experience." },
      { title: "Dedicated Development Team", content: "Our development team consists of passionate gamers and skilled programmers who understand what you need. We actively listen to customer feedback and continuously improve our products based on your suggestions. Regular updates ensure that our tools remain undetected and functional with the latest game patches." },
      { title: "Customer Support", content: "We pride ourselves on providing exceptional customer support. Our Discord community is available 24/7 to help you with any questions or issues you may encounter. Whether you need help with installation, configuration, or troubleshooting, our support team is ready to assist you every step of the way." },
      { title: "Security & Privacy", content: "Your security is our top priority. We use advanced encryption and security measures to protect both our software and your account. Our cheats are designed with stealth in mind, featuring built-in security mechanisms that minimize detection risks and keep your gaming accounts safe." },
    ],
  },
  "defiant-rust-cheat": {
    title: "Defiant Rust Cheat", subtitle: "Dominate the Island with Premium External Tools", game: "Rust", image: "/rust-card.png",
    sections: [
      { title: "About Our Rust Cheat", content: "Our Rust External cheat has been meticulously developed to provide you with the ultimate advantage in one of the most competitive survival games. Built from the ground up with quality and stability in mind, this tool offers a comprehensive suite of features designed to help you dominate every server you join." },
      { title: "Premium ESP Features", content: "Our ESP system provides crystal-clear visibility of players, loot, and resources across the map. We've optimized our rendering to be smooth and non-intrusive, giving you the information you need without cluttering your screen. See enemy positions, identify valuable loot, and never be caught off guard again." },
      { title: "Advanced Aimbot Technology", content: "The aimbot in our Rust cheat features smooth, customizable aiming that looks natural and feels responsive. With adjustable FOV, smoothness settings, and bone targeting options, you can configure it exactly to your playstyle. Whether you prefer headshots or body shots, our aimbot delivers consistent performance." },
      { title: "Undetected & Safe", content: "We've invested countless hours into making our Rust cheat as secure as possible. Using external methods and advanced protection techniques, our tool maintains an excellent track record of remaining undetected. We continuously monitor anti-cheat updates and push security patches to keep you safe." },
      { title: "Regular Updates", content: "Rust receives frequent updates, and so does our cheat. Our development team works around the clock to ensure compatibility with every game update. You can count on us to have your cheat working smoothly within hours of any major Rust patch." },
    ],
  },
  "defiant-r6-cheat": {
    title: "Defiant R6 Siege Cheat", subtitle: "Tactical Advantage for Rainbow Six Siege", game: "Rainbow Six Siege", image: "/r6-card.png",
    sections: [
      { title: "About Our R6 Products", content: "Rainbow Six Siege demands precision, strategy, and quick reflexes. Our R6 cheats are designed to enhance your tactical gameplay without making it obvious. With multiple product options including Crusader, Diamond, and Vega, we offer solutions for every type of player and budget." },
      { title: "Operator & Player ESP", content: "Know exactly where every enemy operator is positioned at all times. Our ESP displays player locations, health status, and even which operator they're playing. This tactical information allows you to make informed decisions and coordinate with your team effectively." },
      { title: "Precision Aimbot", content: "Our aimbot is fine-tuned for the tactical nature of R6 Siege. With options for smooth aiming, recoil control, and customizable targeting, you can maintain your natural playstyle while gaining that competitive edge. Perfect for clutch moments and competitive matches." },
      { title: "Multiple Product Options", content: "We offer several R6 products to fit your needs. Crusader provides a full-featured experience, Diamond offers essential features at a great price, and Vega delivers premium performance for serious players. Each product is crafted with the same attention to quality and security." },
      { title: "Ranked Ready", content: "Our R6 cheats are designed with ranked play in mind. We understand the importance of staying undetected in competitive environments, which is why we've implemented multiple layers of protection. Play confidently knowing your account is in safe hands." },
    ],
  },
  "defiant-arc-raiders-cheat": {
    title: "Defiant Arc Raiders Cheat", subtitle: "Survive the Alien Threat with Superior Tools", game: "Arc Raiders", image: "/arc-raiders-card.png",
    sections: [
      { title: "About Our Arc Raiders Cheat", content: "Arc Raiders is an exciting new extraction shooter, and we're proud to be among the first to offer quality enhancements for it. Our Arc Raiders External cheat has been developed from day one with the game, ensuring optimal performance and compatibility right from launch." },
      { title: "Comprehensive ESP System", content: "Navigate the dangerous world of Arc Raiders with complete awareness. Our ESP reveals player positions, AI enemies, loot locations, and extraction points. In a game where knowledge is power, our ESP gives you the information advantage you need to survive and extract successfully." },
      { title: "Smooth Aimbot", content: "Whether you're fighting other players or the alien threat, our aimbot helps you land every shot. Fully customizable with smooth aiming, adjustable FOV, and multiple targeting options, it integrates seamlessly with your gameplay while providing consistent accuracy." },
      { title: "Early Adopter Advantage", content: "Being early to a new game means less developed anti-cheat systems and more opportunities to dominate. Our Arc Raiders cheat takes advantage of this window while still maintaining security best practices. Get ahead of the competition while the game is still fresh." },
      { title: "Continuous Development", content: "As Arc Raiders evolves, so will our cheat. We're committed to adding new features, improving existing ones, and keeping up with every game update. Your purchase includes all future updates at no additional cost during your subscription period." },
    ],
  },
  "defiant-spoofer": {
    title: "Defiant Temp Spoofer", subtitle: "Clean Your Hardware Bans and Start Fresh", game: "All Games", image: "/products/tempspoofer.png",
    sections: [
      { title: "About Our Spoofer", content: "Our Temp Spoofer is designed to help you bypass hardware bans and get back into your favorite games. Using advanced spoofing techniques, we modify your hardware identifiers temporarily, allowing you to create new accounts and play without restrictions. Whether you've been banned from Rust, R6 Siege, or any other game, our spoofer provides a reliable solution." },
      { title: "How It Works", content: "The spoofer works by temporarily modifying various hardware identifiers that games and anti-cheat systems use to track your computer. This includes serial numbers, MAC addresses, and other unique identifiers. When you run our spoofer, it creates a clean slate that appears as a completely different machine to game servers." },
      { title: "Easy to Use", content: "Our spoofer is designed with simplicity in mind. With just a few clicks, you can spoof your hardware and be ready to play. The intuitive interface guides you through each step, and our detailed documentation ensures you understand exactly what's happening. No technical expertise required." },
      { title: "Compatibility", content: "Our Temp Spoofer is compatible with a wide range of games and anti-cheat systems. It works effectively with EasyAntiCheat, BattlEye, and other popular anti-cheat solutions. Regular updates ensure continued compatibility as anti-cheat systems evolve." },
      { title: "Safety First", content: "We prioritize your system's safety. Our spoofer makes only temporary changes that can be easily reversed. It doesn't permanently modify any system files or settings, ensuring your computer remains in its original state after use. Full support is available if you encounter any issues." },
    ],
  },
}

export default function BlogPage() {
  const params = useParams()
  const slug = params.slug as string
  const blog = blogData[slug]

  if (!blog) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-3">Blog Post Not Found</h1>
          <Link href="/" className="text-primary hover:underline text-sm">Return to Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Ambient */}
      <div className="absolute top-0 left-0 right-0 h-[300px] pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[250px] rounded-full" style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(146,122,250,0.06) 0%, transparent 70%)" }} />
        <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`, backgroundSize: "80px 80px", maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)" }} />
      </div>

      <Navbar />

      <main className="relative z-10 max-w-3xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-10">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          <span className="text-foreground font-medium truncate">{blog.title}</span>
        </nav>

        {/* Hero Image */}
        <div className="mb-8 rounded-xl overflow-hidden border border-border bg-card">
          {blog.isLogo ? (
            <div className="w-full aspect-video flex items-center justify-center p-12">
              <img src="/logo.png" alt={blog.title} className="max-w-[200px] max-h-[200px] object-contain" />
            </div>
          ) : (
            <img src={blog.image || "/placeholder.svg"} alt={blog.title} className="w-full aspect-video object-cover" />
          )}
        </div>

        {/* Title */}
        <div className="mb-12">
          <span className="inline-flex text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 mb-4">{blog.game}</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 text-balance">{blog.title}</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">{blog.subtitle}</p>
        </div>

        {/* Content */}
        <div className="space-y-5">
          {blog.sections.map((section, index) => (
            <div key={index} className="p-6 rounded-xl bg-card border border-border hover:border-primary/15 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm font-bold">{index + 1}</span>
                <h2 className="text-base font-semibold text-foreground">{section.title}</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 rounded-xl bg-primary/5 border border-primary/20 text-center">
          <h3 className="text-xl font-bold text-foreground mb-3">Ready to Get Started?</h3>
          <p className="text-muted-foreground mb-6 text-sm">Browse our products and elevate your gaming experience today.</p>
          <Link
            href="/#products-list"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
              <path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" />
            </svg>
            Browse Products
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
