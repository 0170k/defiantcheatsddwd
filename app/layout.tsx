import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#927afa' },
    { media: '(prefers-color-scheme: dark)', color: '#927afa' },
  ],
}

export const metadata: Metadata = {
  title: {
    default: 'Defiant Cheats - Premium Undetected Game Cheats & HWID Spoofer',
    template: '%s | Defiant Cheats',
  },
  description: 'Buy premium undetected cheats for Rust, Rainbow Six Siege, CS2, Apex Legends & Arc Raiders. Features ESP, aimbot, wallhack & HWID spoofer. 24/7 support, instant delivery, affordable prices. Trusted by 500+ users.',
  keywords: [
    'game cheats', 'undetected cheats', 'buy cheats',
    'rust cheat', 'rust hack', 'rust esp', 'rust aimbot', 'rust external',
    'r6 cheat', 'rainbow six siege cheat', 'r6 hack', 'r6 esp', 'siege aimbot',
    'cs2 cheat', 'counter strike 2 cheat', 'cs2 hack', 'cs2 esp', 'cs2 aimbot',
    'apex legends cheat', 'apex hack', 'apex esp', 'apex aimbot',
    'arc raiders cheat', 'arc raiders hack', 'arc raiders esp',
    'hwid spoofer', 'hardware spoofer', 'ban bypass', 'spoofer',
    'ESP', 'aimbot', 'wallhack', 'chams', 'triggerbot',
    'undetected', 'external cheat', 'gaming enhancements'
  ],
  authors: [{ name: 'Defiant Cheats', url: 'https://defiantcheats.com' }],
  creator: 'Defiant Cheats',
  publisher: 'Defiant Cheats',
  metadataBase: new URL('https://defiantcheats.com'),
  alternates: {
    canonical: 'https://defiantcheats.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://defiantcheats.com',
    siteName: 'Defiant Cheats',
    title: 'Defiant Cheats - Premium Undetected Game Cheats & HWID Spoofer',
    description: 'Buy premium undetected cheats for Rust, Rainbow Six Siege, CS2, Apex Legends & Arc Raiders. ESP, aimbot, wallhack & HWID spoofer. 24/7 support.',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Defiant Cheats - Premium Gaming Enhancements',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Defiant Cheats - Premium Undetected Game Cheats',
    description: 'Buy premium undetected cheats for Rust, R6 Siege, CS2, Apex & Arc Raiders. ESP, aimbot, wallhack & HWID spoofer. 24/7 support, instant delivery.',
    images: ['/logo.png'],
    creator: '@defiantcheats',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'gaming',
  icons: {
    icon: [
      {
        url: '/logo.png',
        sizes: '32x32',
      },
      {
        url: '/logo.png',
        sizes: '16x16',
      },
    ],
    shortcut: '/logo.png',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
  generator: 'v0.app'
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Defiant Cheats',
  url: 'https://defiantcheats.com',
  logo: 'https://defiantcheats.com/logo.png',
  description: 'Premium undetected gaming cheats for Rust, Rainbow Six Siege, CS2, Apex Legends & Arc Raiders.',
  sameAs: [
    'https://discord.gg/defiantcheats',
  ],
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '1.50',
    highPrice: '99.99',
    offerCount: '8',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Script
          src="https://checkout.komerza.com/embed/embed.iife.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
