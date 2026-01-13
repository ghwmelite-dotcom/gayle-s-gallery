import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { AnimatedBackground } from '@/components/ui/animated-background'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: {
    default: "Gayle's Gallery | Original Artwork",
    template: "%s | Gayle's Gallery",
  },
  description: 'Discover the magical world of Gayle\'s original paintings. A young artist creating beautiful, imaginative artwork that tells stories.',
  keywords: ['art', 'paintings', 'original artwork', 'young artist', 'gallery', 'Gayle'],
  authors: [{ name: 'Gayle' }],
  creator: 'Gayle',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: "Gayle's Gallery",
    title: "Gayle's Gallery | Original Artwork",
    description: 'Discover the magical world of Gayle\'s original paintings.',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Gayle's Gallery",
    description: 'Discover the magical world of Gayle\'s original paintings.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-body min-h-screen flex flex-col">
        <AnimatedBackground />
        {children}
      </body>
    </html>
  )
}
