"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import HeroBackground from "@/components/HeroBackground"

// Slug to DB product name mapping
const slugToStatusName: Record<string, string> = {
  "rust-external": "Rust External",
  "r6-crusader": "R6 Crusader",
  "r6-diamond": "R6 Diamond",
  "r6-astral": "R6 Astral",
  "arc-external": "Arc Raiders",
  "cs2-predator": "CS2 Predator",
  "spoofer-temp": "Temp Spoofer",
  "apex-external": "Apex External",
}

const statusConfig: Record<string, { label: string; color: string; dot: string; bg: string }> = {
  undetected: { label: "Undetected", color: "text-emerald-400", dot: "bg-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  "use-at-own-risk": { label: "Use At Own Risk", color: "text-amber-400", dot: "bg-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  detected: { label: "Detected", color: "text-red-400", dot: "bg-red-400", bg: "bg-red-500/10 border-red-500/20" },
  down: { label: "Down", color: "text-muted-foreground", dot: "bg-muted-foreground", bg: "bg-muted border-border" },
  updating: { label: "Updating", color: "text-blue-400", dot: "bg-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
}

type MediaItem = { type: "image"; src: string } | { type: "video"; src: string }

function ImageGallery({ media, name }: { media: MediaItem[]; name: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, pixelX: 0, pixelY: 0, width: 1, height: 1 })
  const imageContainerRef = useRef<HTMLDivElement>(null)

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % media.length)
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + media.length) % media.length)

  const currentMedia = media[currentIndex]
  const zoomLevel = 2.5
  const zoomBoxSize = 120 // Fixed square size in pixels

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return
    const rect = imageContainerRef.current.getBoundingClientRect()
    // Get pixel positions
    const pixelX = e.clientX - rect.left
    const pixelY = e.clientY - rect.top
    // Clamp the box position so it stays within bounds
    const halfBox = zoomBoxSize / 2
    const clampedX = Math.max(halfBox, Math.min(rect.width - halfBox, pixelX))
    const clampedY = Math.max(halfBox, Math.min(rect.height - halfBox, pixelY))
    // Convert to percentage for background positioning
    const percentX = (clampedX / rect.width) * 100
    const percentY = (clampedY / rect.height) * 100
    setMousePos({ x: percentX, y: percentY, pixelX: clampedX, pixelY: clampedY, width: rect.width, height: rect.height })
  }

  return (
    <div className="space-y-3">
      {/* Wrapper for relative positioning of zoom box */}
      <div className="relative">
        {/* Main image container */}
        <div 
          ref={imageContainerRef}
          className="relative rounded-2xl overflow-hidden border border-primary/30 bg-card group cursor-crosshair"
          onMouseEnter={() => currentMedia.type === "image" && setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onMouseMove={handleMouseMove}
        >
          {currentMedia.type === "video" ? (
            <div className="w-full aspect-video">
              <iframe
                src={currentMedia.src}
                className="w-full h-full"
                allowFullScreen
                allow="autoplay"
              />
            </div>
          ) : (
            <div className="relative">
              <img
                src={currentMedia.src || "/placeholder.svg"}
                alt={`${name} screenshot ${currentIndex + 1}`}
                className="w-full aspect-video object-cover"
              />
              {/* Hover indicator box - perfect square */}
              {isHovering && (
                <div 
                  className="absolute border-2 border-primary bg-primary/20 pointer-events-none rounded-sm"
                  style={{
                    width: `${zoomBoxSize}px`,
                    height: `${zoomBoxSize}px`,
                    left: `${mousePos.pixelX - zoomBoxSize / 2}px`,
                    top: `${mousePos.pixelY - zoomBoxSize / 2}px`,
                  }}
                />
              )}
            </div>
          )}
          {media.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/70 backdrop-blur-sm border border-border/50 flex items-center justify-center text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:text-foreground" aria-label="Previous image">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              </button>
              <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/70 backdrop-blur-sm border border-border/50 flex items-center justify-center text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:text-foreground" aria-label="Next image">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
              </button>
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-background/70 backdrop-blur-sm text-[11px] text-muted-foreground font-medium border border-border/50">
                {currentIndex + 1}/{media.length}
              </div>
            </>
          )}
        </div>

        {/* Zoom preview box - perfect square, shows exactly what the indicator covers */}
        {isHovering && currentMedia.type === "image" && (
          <div 
            className="hidden lg:block absolute top-0 left-[calc(100%+16px)] w-[350px] h-[350px] rounded-xl overflow-hidden border-2 border-primary/50 bg-card z-50 shadow-2xl pointer-events-none"
          >
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `url(${currentMedia.src})`,
                backgroundSize: `${(mousePos.width / zoomBoxSize) * 350}px ${(mousePos.height / zoomBoxSize) * 350}px`,
                backgroundPosition: `${-((mousePos.pixelX - zoomBoxSize / 2) / zoomBoxSize) * 350}px ${-((mousePos.pixelY - zoomBoxSize / 2) / zoomBoxSize) * 350}px`,
                backgroundRepeat: "no-repeat",
              }}
            />
          </div>
        )}
      </div>
      {media.length > 1 && (
        <div className="flex gap-2">
          {media.map((item, i) => (
            <button key={i} onClick={() => setCurrentIndex(i)} className={`w-16 h-10 rounded-lg overflow-hidden border-2 transition-all ${i === currentIndex ? "border-primary opacity-100" : "border-transparent opacity-50 hover:opacity-80"}`}>
              {item.type === "video" ? (
                <div className="w-full h-full bg-card flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-primary"><path d="M8 5v14l11-7z" /></svg>
                </div>
              ) : (
                <img src={item.src || "/placeholder.svg"} alt={`${name} ${i + 1}`} className="w-full h-full object-cover" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function MenuShowcase({ menuImage, menuAlt, menuWidth = 500, menuHeight = 370 }: { menuImage: string; menuAlt: string; menuWidth?: number; menuHeight?: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const dragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0 })
  const animFrame = useRef<number>(0)

  useEffect(() => {
    const el = imgRef.current
    const container = containerRef.current
    if (!el || !container) return

    const IMG_W = menuWidth
    const IMG_H = menuHeight

    const rubberDamping = 0.35

    const getBounds = () => {
      const cw = container.clientWidth
      const ch = container.clientHeight
      const freeZone = 0.6
      const maxX = (cw - IMG_W) / 2 + IMG_W * freeZone
      const maxY = (ch - IMG_H) / 2 + IMG_H * freeZone
      return { minX: -maxX, maxX, minY: -maxY, maxY }
    }

    const applyRubberBand = (value: number, min: number, max: number) => {
      if (value < min) return min + (value - min) * rubberDamping
      if (value > max) return max + (value - max) * rubberDamping
      return value
    }

    const onPointerDown = (e: PointerEvent) => {
      dragging.current = true
      cancelAnimationFrame(animFrame.current)
      el.style.transition = "none"
      offset.current = { x: e.clientX - pos.current.x, y: e.clientY - pos.current.y }
      el.setPointerCapture(e.pointerId)
      el.style.cursor = "grabbing"
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging.current) return
      const rawX = e.clientX - offset.current.x
      const rawY = e.clientY - offset.current.y
      const bounds = getBounds()
      const visualX = applyRubberBand(rawX, bounds.minX, bounds.maxX)
      const visualY = applyRubberBand(rawY, bounds.minY, bounds.maxY)
      pos.current = { x: rawX, y: rawY }
      el.style.transform = `translate(${visualX}px, ${visualY}px)`
    }

    const onPointerUp = () => {
      dragging.current = false
      if (!el) return
      el.style.cursor = "grab"
      const cw = container.clientWidth
      const ch = container.clientHeight
      const snapMaxX = (cw - IMG_W) / 2 + IMG_W * 0.6
      const snapMaxY = (ch - IMG_H) / 2 + IMG_H * 0.6
      const clampedX = Math.max(-snapMaxX, Math.min(snapMaxX, pos.current.x))
      const clampedY = Math.max(-snapMaxY, Math.min(snapMaxY, pos.current.y))
      pos.current = { x: clampedX, y: clampedY }
      el.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)"
      el.style.transform = `translate(${clampedX}px, ${clampedY}px)`
    }

    el.addEventListener("pointerdown", onPointerDown)
    el.addEventListener("pointermove", onPointerMove)
    el.addEventListener("pointerup", onPointerUp)
    return () => {
      el.removeEventListener("pointerdown", onPointerDown)
      el.removeEventListener("pointermove", onPointerMove)
      el.removeEventListener("pointerup", onPointerUp)
      cancelAnimationFrame(animFrame.current)
    }
  }, [menuWidth, menuHeight])

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2.5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><path d="M8 21h8M12 17v4" /></svg>
          Interactive Preview
        </h2>
        <span className="text-xs text-muted-foreground bg-secondary px-3 py-1.5 rounded-lg border border-border/50">Drag to move</span>
      </div>
      <div ref={containerRef} className="relative rounded-2xl overflow-hidden border border-border/50 aspect-video" style={{ touchAction: "none" }}>
        <img src="/products/menu-background.png" alt="" className="absolute inset-0 w-full h-full object-fill pointer-events-none" draggable={false} />
        <img ref={imgRef} src={menuImage} alt={menuAlt} className="absolute z-10" style={{ cursor: "grab", width: menuWidth, left: "50%", top: "50%", marginLeft: -menuWidth / 2, marginTop: -menuHeight / 2, touchAction: "none" }} draggable={false} />
      </div>
    </div>
  )
}

// Menu config per product slug
const menuConfig: Record<string, { menuImage: string; menuAlt: string; menuWidth: number; menuHeight: number }> = {
  "r6-diamond": { menuImage: "/products/diamond-menu-aimbot.png", menuAlt: "Diamond in-game menu", menuWidth: 500, menuHeight: 370 },
  "arc-external": { menuImage: "/products/arc-menu.png", menuAlt: "Arc Raiders in-game menu", menuWidth: 580, menuHeight: 400 },
  "cs2-predator": { menuImage: "/products/cs2-menu.png", menuAlt: "CS2 Predator in-game menu", menuWidth: 550, menuHeight: 380 },
}

// Komerza checkout data – keyed by slug → variant id → Komerza IDs
const komerzaData: Record<string, { productId: string; variants: Record<string, string> }> = {
  "arc-external": {
    productId: "fc22df9e-b046-42b3-8394-cd586a6d95b7",
    variants: {
      "1d": "6e30d3cd-7ebd-40b5-aa4a-9ba1fb87ff05",
      "3d": "6c256ca1-e18f-4bfa-aaa9-96e88daadb6e",
      "7d": "17387167-f895-4423-9960-9532db32b6ac",
      "30d": "eeff0c25-2725-45c5-bf4f-9a745bdcc05c",
      "lifetime": "f4a52c08-3cf4-4f5f-b97a-3eaa4138303c",
    },
  },
  "r6-crusader": {
    productId: "6ecc8594-40cf-4c05-8031-793bb7268004",
    variants: {
      "1d": "92e073a4-14ff-4f29-82df-ef3e4db23496",
      "7d": "5c29aee2-5113-4c6d-a304-c80aabef7bd6",
      "30d": "13ead7d8-75a9-4aaa-96a4-1ac1512934c1",
    },
  },
  "r6-diamond": {
    productId: "209b6357-2f23-45ba-98de-4dcdb1aa19d2",
    variants: {
      "1d": "41d28e13-9bea-4134-9b5c-068a6be43cab",
      "3d": "67952fd8-16f2-4f94-9bed-d0f20993fbc3",
      "7d": "cbfef42b-9208-4aff-be1e-b8244e6f98d1",
      "30d": "44419038-5b47-4e50-b1e7-c9841aedd2c5",
    },
  },
  "cs2-predator": {
    productId: "463e7116-8837-4b0c-90ab-0a22f9a6b3c4",
    variants: {
      "1d": "751a1aa1-882e-4323-955a-c91fde899500",
      "7d": "3d246d42-a745-4a0e-a292-a4705258bdcc",
      "30d": "627d2999-6492-430b-8aaa-5404416f0ad2",
      "1y": "e9ba1361-26c2-4d3e-abf1-43c2c0646fad",
    },
  },
  "spoofer-temp": {
    productId: "c98ca7a7-a25a-4c59-8f5b-50b7a81020b7",
    variants: {
      "1d": "b58c68d9-c171-40ce-8d75-28442723b35f",
      "3d": "6d6d5979-c534-4df6-b80c-0ae978767c53",
      "7d": "624c9c8d-ddf9-4d17-8bda-b0df8a6719a1",
      "30d": "925411e8-289e-46a9-8c4f-4e4b35d9b29a",
    },
  },
  "apex-external": {
    productId: "2332e08d-748c-4f8f-bcf1-fc81846898c8",
    variants: {
      "1d": "7c5c0be5-dc07-4956-8b18-de3a2caabcc0",
      "3d": "922d37c0-3b8b-4e81-beae-4b8d84ddd4bf",
      "7d": "7c9f702a-671c-4e78-b0d0-35578296d3e2",
      "30d": "d2c9296c-8723-48c4-9d1d-ac012ddd37d9",
      "lifetime": "031ab9b4-5a17-4d0a-8bb3-48a34045b545",
    },
  },
  "r6-astral": {
    productId: "00736544-b181-4b37-a7a6-b7daa895cfc7",
    variants: {
      "1d": "0afdfe67-908f-435b-8458-ad806f365a67",
      "7d": "ba68faf6-535e-4a01-86e9-46c0665b278b",
      "30d": "90cfd620-66b6-4c10-a3f6-a87ccf36c604",
    },
  },
}

// Product data
const products: Record<string, {
  name: string; game: string; shortDescription: string; features: string[]; requirements: string[]; media: MediaItem[]; warning?: string
  variants: { id: string; name: string; price: string; stock: number | "unlimited"; sellhubProductId: string }[]
}> = {
  "rust-external": {
    name: "Defiant - Rust External", game: "Rust",
    shortDescription: "Fully external and undetected Rust cheat with comprehensive aimbot, visuals, and utility features.",
    features: ["Silent Aim with adjustable hit chance", "Memory Aim with smoothing controls", "Player ESP - Box, Name, Distance, Skeleton", "Chams (Visible/Invisible colors)", "World ESP - Resource Locations, Crate Highlights", "Spider-Man (No Clip), Infinite Jump, No Fall Damage", "Fast Loot, Zoom, Interactive Camera", "Recoil Control (X/Y Sliders), No Spread, Thick Bullet", "Discord-style UI with customizable themes", "Config Management - Save/Load/Delete Profiles"],
    requirements: ["Windows 10/11", "Intel or AMD CPU", "Fully External & Undetected"],
    media: [{ type: "image", src: "/products/rust-external.png" }, { type: "image", src: "/products/rustexternal1.png" }, { type: "image", src: "/products/rustexternal2.png" }, { type: "video", src: "https://streamable.com/e/jicug5" }],
    variants: [
      { id: "1d", name: "1 Day", price: "$7.99", stock: "unlimited", sellhubProductId: "" },
      { id: "3d", name: "3 Days", price: "$15.99", stock: "unlimited", sellhubProductId: "" },
      { id: "7d", name: "7 Days", price: "$29.99", stock: "unlimited", sellhubProductId: "" },
      { id: "30d", name: "30 Days", price: "$59.99", stock: "unlimited", sellhubProductId: "" },
    ],
  },
  "r6-crusader": {
    name: "R6 - Crusader", game: "Rainbow Six Siege",
    shortDescription: "Undetected 6+ months with full aimbot and wallhack features for Rainbow Six Siege.",
    features: ["Player ESP - Box, Line, Distance, Skeleton, Head", "Health Display (Bar & Text)", "Team Check & Max Distance settings", "Active Aimbot with customizable keys", "FOV Size control with Draw FOV option", "Hitbox selection & Mark Target", "Adjustable Sensitivity", "Crosshair overlay", "Streamproof mode"],
    requirements: ["Windows 10/11", "Intel or AMD CPU", "Undetected 6+ Months"],
    media: [{ type: "image", src: "/products/r6-crusader.png" }, { type: "image", src: "/products/crusader1.png" }, { type: "image", src: "/products/crusader2.png" }, { type: "video", src: "https://streamable.com/e/82a8aa" }],
    variants: [
      { id: "1d", name: "1 Day", price: "$5.99", stock: "unlimited", sellhubProductId: "b465c28c-3376-453b-b063-effab0b7b6b5" },
      { id: "7d", name: "7 Days", price: "$29.99", stock: "unlimited", sellhubProductId: "b465c28c-3376-453b-b063-effab0b7b6b5" },
      { id: "30d", name: "30 Days", price: "$59.99", stock: "unlimited", sellhubProductId: "b465c28c-3376-453b-b063-effab0b7b6b5" },
    ],
  },
  "r6-diamond": {
    name: "Defiant - R6 Diamond", game: "Rainbow Six Siege",
    shortDescription: "Fully external R6 cheat with comprehensive ESP, gadget detection, and built-in HWID spoofer.",
    features: ["Player ESP - Box, Skeleton, Health, Distance, Head Dot, Snaplines", "Corner Box & Limit Distance options", "Gadget ESP - Drone, Claymore, Hard Breach, Camera, Proximity Alarm", "Ability ESP - Shock Drone, Thermite Breach, Frost Trap, Kapkan & more", "Built-in HWID Spoofer / Virtualizer", "Cloud Config System - Save And Load Profiles"],
    requirements: ["Windows 10/11 (1909 - 25H2)", "Intel or AMD CPU", "16GB RAM or more", "SVM [AMD] / VT-X [Intel] enabled in BIOS", "TPM OFF, RAID/Rapid Storage OFF", "UEFI required for Intel (if using spoofer)"],
    media: [{ type: "image", src: "/products/r6-diamond.png" }, { type: "image", src: "/products/diamond1.png" }, { type: "image", src: "/products/diamond2.png" }, { type: "video", src: "https://streamable.com/e/n8mcok" }],
    variants: [
      { id: "1d", name: "1 Day", price: "$4.99", stock: "unlimited", sellhubProductId: "b432acd2-6a3c-4bd7-a21b-f12948ea3fc9" },
      { id: "3d", name: "3 Days", price: "$8.99", stock: "unlimited", sellhubProductId: "b432acd2-6a3c-4bd7-a21b-f12948ea3fc9" },
      { id: "7d", name: "7 Days", price: "$17.99", stock: "unlimited", sellhubProductId: "b432acd2-6a3c-4bd7-a21b-f12948ea3fc9" },
      { id: "30d", name: "30 Days", price: "$34.99", stock: "unlimited", sellhubProductId: "b432acd2-6a3c-4bd7-a21b-f12948ea3fc9" },
    ],
  },
  "r6-astral": {
    name: "R6 Astral", game: "Rainbow Six Siege",
    shortDescription: "Premium R6 Siege enhancement with aimbot, visuals, and operator abilities support.",
    features: ["Aimbot - Enable, Aim Key, FOV slider, Smooth slider, Sensitivity slider, Target bone, Nearest Bone, Target Lock", "Visuals - Box, Skeleton with thickness slider, Lines with thickness slider, Health", "Abilities - Support for all characters with icon size adjustment", "Config system - Save, Load, Delete, Share configs"],
    requirements: ["Intel or AMD CPU", "Windows 10/11 (1909 - 25H2)", "SVM [AMD] / VT-X [Intel] enabled in BIOS", "16GB RAM or more", "Hyper-V disabled for AMD, enabled for Intel", "UEFI mode & GPT disk for Intel only", "Secure Boot disabled"],
    media: [{ type: "image", src: "/products/r6-astral-box.png" }, { type: "image", src: "/products/r6-astral-esp.png" }, { type: "image", src: "/products/r6-astral-abilities1.png" }, { type: "image", src: "/products/r6-astral-abilities2.png" }],
    variants: [
      { id: "1d", name: "1 Day", price: "$5.99", stock: "unlimited", sellhubProductId: "" },
      { id: "7d", name: "7 Days", price: "$19.99", stock: "unlimited", sellhubProductId: "" },
      { id: "30d", name: "30 Days", price: "$44.99", stock: "unlimited", sellhubProductId: "" },
    ],
  },
  "arc-external": {
    name: "Arc Raiders - External", game: "Arc Raiders",
    shortDescription: "Full-featured external for Arc Raiders with advanced ESP, aimbot, and world features.",
    features: ["Aimbot - Mouse/Memory aim, Smooth slider, FOV control, Prediction, Target Lock, Vischeck", "Player ESP - Name, Box, Skeleton, Squad, Distance, Health, Armor (visible/invisible colors)", "Radar with scale and distance sliders", "World ESP - Crates, Drones, Dropped Items, Corpse, Salvage, Supply Stations", "Battle Mode toggle key for combat", "Off-screen enemy arrows with range control", "Config system - Save, Load, Delete, Share"],
    requirements: ["Minimum RAM: 16 GB", "CPU Support: AMD & Intel", "All Windows versions supported", "TPM OFF"],
    warning: "Windows 10 May Have Some Issues",
    media: [{ type: "image", src: "/products/arc-external.png" }, { type: "image", src: "/products/arcraiders-esp1.png" }, { type: "image", src: "/products/arcraiders-esp2.png" }, { type: "video", src: "https://streamable.com/e/ntxrx0" }],
    variants: [
      { id: "1d", name: "1 Day", price: "$7.99", stock: "unlimited", sellhubProductId: "ac83466c-6d15-4493-8b8a-ae7bb415166a" },
      { id: "3d", name: "3 Days", price: "$15.99", stock: "unlimited", sellhubProductId: "ac83466c-6d15-4493-8b8a-ae7bb415166a" },
      { id: "7d", name: "7 Days", price: "$26.99", stock: "unlimited", sellhubProductId: "ac83466c-6d15-4493-8b8a-ae7bb415166a" },
      { id: "30d", name: "30 Days", price: "$49.99", stock: "unlimited", sellhubProductId: "ac83466c-6d15-4493-8b8a-ae7bb415166a" },
      { id: "lifetime", name: "Lifetime", price: "$99.99", stock: "unlimited", sellhubProductId: "ac83466c-6d15-4493-8b8a-ae7bb415166a" },
    ],
  },
  "cs2-predator": {
    name: "CS2 - Predator", game: "Counter-Strike 2",
    shortDescription: "Best legit cheat for CS2 with amazing visuals, performance, and menu. Full aimbot, triggerbot, ESP, chams, glow, radar, and misc features.",
    features: [
      "Aimbot - Enable, Hit Groups, FOV Type & Size, Smooth, Auto Wall, Filters (Friendly Fire, Ignore Smoke/Flash), RCS (Pitch/Yaw/Start Bullet), Delays, Target Selection",
      "Triggerbot - Enable, Hit Groups, Friendly Fire, Only Scoped, Ignore Smoke/Flash, Hitchance",
      "Visuals - Box, Health Bar, Armor Bar, Nickname, Weapon Text, Bomb, Defuse Kit, Distance, Skeleton, Chams (Material selection), Glow, Out of FOV Arrows, Items on Ground",
      "Status Tags - Flashed, Scoped, Planting, Defusing, Grabbing Hostage",
      "World - Effects (hit/kill visuals), Night Mode, Smoke Color, Grenade Trajectory, Grenade Warning",
      "Other - C4 Timer, Removals (smoke, sky, etc.), Hitmarker, Damage Indicator, Viewmodel customization",
      "Misc - SkinChanger, Trusted Mode, Auto Accept, Spectator List, Keybind List, HitSound, Preserve Killfeed, Chatspam",
      "Radar - External radar with Scale and Alpha controls",
      "Drag & Drop ESP element customization",
      "Esp Preview with enemy model display",
    ],
    requirements: ["Windows 10/11", "Intel or AMD CPU", "Fully External"],
    media: [{ type: "image", src: "/products/cs2-predator.png" }, { type: "image", src: "/products/cs2-predator-preview.png" }],
    variants: [
      { id: "1d", name: "1 Day", price: "$1.50", stock: "unlimited", sellhubProductId: "" },
      { id: "7d", name: "7 Days", price: "$3.50", stock: "unlimited", sellhubProductId: "" },
      { id: "30d", name: "30 Days", price: "$6.00", stock: "unlimited", sellhubProductId: "" },
      { id: "1y", name: "1 Year", price: "$54.00", stock: "unlimited", sellhubProductId: "" },
    ],
  },
  "apex-external": {
    name: "Ultimate - Apex Legends", game: "Apex Legends",
    shortDescription: "Full-featured external for Apex Legends with advanced ESP, aimbot, radar, and world features.",
    features: ["Aimbot - Mouse/Memory aim, Smooth slider, FOV control, Prediction, Target Lock, Vischeck", "Player ESP - Name, Box, Skeleton, Squad, Distance, Health, Shield (visible/invisible colors)", "Radar with scale and distance sliders", "World ESP - Loot, Death Boxes, Supply Drops, Zip Lines, Respawn Beacons", "Battle Mode toggle key for combat", "Off-screen enemy arrows with range control", "Config system - Save, Load, Delete, Share"],
    requirements: ["Minimum RAM: 16 GB", "CPU Support: AMD & Intel", "All Windows versions supported", "TPM OFF"],
    media: [{ type: "image", src: "/products/apex-ultimate.png" }, { type: "image", src: "/products/apex-menu.png" }, { type: "image", src: "/products/apex-esp.png" }],
    variants: [
      { id: "1d", name: "1 Day", price: "$5.99", stock: "unlimited", sellhubProductId: "" },
      { id: "3d", name: "3 Days", price: "$13.99", stock: "unlimited", sellhubProductId: "" },
      { id: "7d", name: "7 Days", price: "$24.99", stock: "unlimited", sellhubProductId: "" },
      { id: "30d", name: "30 Days", price: "$47.99", stock: "unlimited", sellhubProductId: "" },
      { id: "lifetime", name: "Lifetime", price: "$99.99", stock: "unlimited", sellhubProductId: "" },
    ],
  },
  "spoofer-temp": {
    name: "Temporary Spoofer", game: "Multi-Game",
    shortDescription: "One-click HWID spoofer with support for all major games. Fortnite tournament ready with built-in HWID checker.",
    features: ["One-click spoofer - Simple instant activation", "Spoof & Clean - Complete trace removal", "Fortnite Tournament ready", "Built-in HWID checker", "Custom seeding system (personal serials)", "Loyalty rewards program", "Built-in support system", "Supported: Fortnite, R6 Siege, Rust, Apex, Tarkov, Call of Duty, FiveM, Delta Force & more"],
    requirements: ["Intel or AMD CPU", "Windows 10/11", "All Motherboards supported", "UEFI & Legacy compatible"],
    media: [{ type: "image", src: "/products/spoofer-temp.png" }, { type: "image", src: "/products/tempspoofer.png" }],
    variants: [
      { id: "1d", name: "1 Day", price: "$5.99", stock: "unlimited", sellhubProductId: "547da4c6-8308-4597-b436-88b5d8999b5c" },
      { id: "3d", name: "3 Days", price: "$11.99", stock: "unlimited", sellhubProductId: "547da4c6-8308-4597-b436-88b5d8999b5c" },
      { id: "7d", name: "7 Days", price: "$19.99", stock: "unlimited", sellhubProductId: "547da4c6-8308-4597-b436-88b5d8999b5c" },
      { id: "30d", name: "30 Days", price: "$34.99", stock: "unlimited", sellhubProductId: "547da4c6-8308-4597-b436-88b5d8999b5c" },
    ],
  },
}

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string
  const product = products[slug]
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [agreedToTos, setAgreedToTos] = useState(false)
  const [productStatus, setProductStatus] = useState<string | null>(null)


  // Scroll to top immediately on mount/slug change - fixes "loads at bottom" bug
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [slug])

  // Also ensure body overflow is clean when arriving from modal
  useEffect(() => {
    document.body.style.overflow = ""
  }, [])

  useEffect(() => {
    const statusName = slugToStatusName[slug]
    if (!statusName) return
    fetch("/api/status").then((r) => r.json()).then((data) => {
      const match = (data.statuses || []).find((s: { product_name: string }) => s.product_name === statusName)
      if (match) setProductStatus(match.status)
    }).catch(() => {})
  }, [slug])

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/8 border border-primary/15 flex items-center justify-center mx-auto mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Product Not Found</h1>
          <p className="text-muted-foreground text-sm mb-6">The product you are looking for does not exist.</p>
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            Return Home
          </Link>
        </div>
      </div>
    )
  }

  const variant = product.variants[selectedVariant]

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Star background + grid — matches homepage */}
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

      <main className="max-w-6xl mx-auto px-6 pt-8 pb-24 relative">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40"><path d="m9 18 6-6-6-6" /></svg>
          <Link href="/#products-list" className="hover:text-foreground transition-colors">Products</Link>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40"><path d="m9 18 6-6-6-6" /></svg>
          <span className="text-foreground font-medium truncate">{product.name}</span>
        </nav>

        {/* Product Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-semibold text-primary bg-primary/8 px-3 py-1 rounded-full border border-primary/15">{product.game}</span>
            {productStatus && statusConfig[productStatus] && (
              <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border ${statusConfig[productStatus].bg}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[productStatus].dot}`} />
                <span className={statusConfig[productStatus].color}>{statusConfig[productStatus].label}</span>
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 text-balance">{product.name}</h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">{product.shortDescription}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-3 space-y-6">
            <ImageGallery media={product.media} name={product.name} />

            {/* Features */}
            <div className="p-6 rounded-2xl bg-card/40 border border-border/30 backdrop-blur-sm">
              <h3 className="text-sm font-semibold text-foreground mb-5 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                </div>
                Features
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[13px] text-muted-foreground leading-relaxed">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary mt-0.5 shrink-0"><path d="M20 6 9 17l-5-5" /></svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="p-6 rounded-2xl bg-card/40 border border-border/30 backdrop-blur-sm">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><path d="M8 21h8M12 17v4" /></svg>
                </div>
                System Requirements
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.requirements.map((req, i) => (
                  <span key={i} className="text-xs text-muted-foreground bg-secondary/80 px-3 py-1.5 rounded-lg border border-border/40">{req}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Purchase */}
          <div className="lg:col-span-2">
            <div className="sticky top-20 rounded-2xl bg-card/40 border border-border/30 backdrop-blur-sm overflow-hidden">
              {/* Price header */}
              <div className="p-6 border-b border-border/30 text-center bg-gradient-to-b from-primary/[0.04] to-transparent">
                <span className="text-4xl font-bold text-foreground tracking-tight">{variant.price}</span>
                <span className="text-sm text-muted-foreground ml-2">/ {variant.name}</span>
              </div>

              <div className="p-6 space-y-5">
                {/* Duration */}
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-3">Select Duration</label>
                  <div className="grid grid-cols-2 gap-2">
                    {product.variants.map((v, i) => {
                      const isLifetime = v.id === "lifetime"
                      return (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariant(i)}
                          className={`p-3 rounded-xl border text-center transition-all duration-200 relative ${
                            isLifetime ? "col-span-2" : ""
                          } ${
                            selectedVariant === i
                              ? "border-primary/50 bg-primary/8 shadow-sm shadow-primary/10"
                              : "border-border/40 hover:border-primary/25 hover:bg-primary/[0.03] bg-background/50"
                          }`}
                        >
                          {isLifetime && (
                            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground rounded-full">
                              Best Value
                            </span>
                          )}
                          <span className="text-sm font-medium text-foreground block">{v.name}</span>
                          <span className={`text-xs ${selectedVariant === i ? "text-primary" : "text-muted-foreground"}`}>{v.price}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* TOS */}
                <label className="flex items-start gap-2.5 cursor-pointer group">
                  <div className="relative shrink-0 mt-0.5">
                    <input type="checkbox" checked={agreedToTos} onChange={(e) => setAgreedToTos(e.target.checked)} className="sr-only" />
                    <div className={`w-[18px] h-[18px] rounded border-2 transition-all flex items-center justify-center ${
                      agreedToTos ? "bg-primary border-primary" : "border-muted-foreground/30 group-hover:border-muted-foreground/50"
                    }`}>
                      {agreedToTos && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground"><path d="M20 6L9 17l-5-5" /></svg>}
                    </div>
                  </div>
                  <span className="text-[13px] text-muted-foreground leading-relaxed">
                    {'I agree to the '}
                    <Link href="/tos" target="_blank" className="text-primary hover:underline">Terms of Service</Link>
                  </span>
                </label>

                {/* Checkout — Komerza embed for supported products, SellHub redirect for others */}
                <button
                  onClick={() => {
                    const komerza = komerzaData[slug]
                    const hasKomerza = komerza && komerza.variants[variant.id]
                    const canPurchase = agreedToTos && (variant.sellhubProductId || hasKomerza)
                    if (!canPurchase) return

                    // Check if this product has Komerza data
                    if (hasKomerza) {
                      // Use Komerza embed checkout
                      const w = window as typeof window & { Komerza?: { open: (opts: { items: { productId: string; variantId: string; quantity: number }[]; theme?: string }) => void } }
                      if (w.Komerza) {
                        w.Komerza.open({
                          items: [{
                            productId: komerza.productId,
                            variantId: komerza.variants[variant.id],
                            quantity: 1,
                          }],
                          theme: "dark",
                        })
                      }
                    } else {
                      // Fallback: redirect to SellHub store
                      window.open("https://defiant.sellhub.cx/", "_blank")
                    }
                  }}
                  className={`w-full py-4 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    (() => { const k = komerzaData[slug]; return agreedToTos && (variant.sellhubProductId || (k && k.variants[variant.id])); })()
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-primary/20 cursor-pointer"
                      : "bg-secondary text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                  {(() => { const k = komerzaData[slug]; const purchasable = variant.sellhubProductId || (k && k.variants[variant.id]); return !purchasable ? "Coming Soon" : agreedToTos ? "Purchase Now" : "Agree to Terms"; })()}
                </button>

                {/* Warning */}
                {product.warning && (
                  <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/10">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400 shrink-0 mt-0.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
                    <span className="text-xs text-amber-400/90 leading-relaxed">{product.warning}</span>
                  </div>
                )}
              </div>

              {/* Trust bar */}
              <div className="grid grid-cols-3 border-t border-border/30 bg-secondary/20">
                {[
                  { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>, label: "Secure" },
                  { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>, label: "Instant" },
                  { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>, label: "24/7" },
                ].map((item, i) => (
                  <div key={i} className={`flex flex-col items-center py-3.5 ${i === 1 ? "border-x border-border/30" : ""}`}>
                    <span className="text-muted-foreground mb-1">{item.icon}</span>
                    <span className="text-[10px] text-muted-foreground font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {menuConfig[slug] && (
          <MenuShowcase
            menuImage={menuConfig[slug].menuImage}
            menuAlt={menuConfig[slug].menuAlt}
            menuWidth={menuConfig[slug].menuWidth}
            menuHeight={menuConfig[slug].menuHeight}
          />
        )}
      </main>

      <Footer />


      </div>
    </div>
  )
}
