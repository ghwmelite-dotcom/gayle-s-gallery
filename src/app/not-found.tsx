'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, Palette, Search, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Paint drip animation component
function PaintDrip({ color, delay, left }: { color: string; delay: number; left: string }) {
  return (
    <motion.div
      className="absolute top-0"
      style={{ left }}
      initial={{ height: 0 }}
      animate={{ height: '100%' }}
      transition={{
        duration: 2,
        delay,
        ease: 'easeOut',
      }}
    >
      <div
        className="w-8 md:w-12 h-full rounded-b-full opacity-80"
        style={{ backgroundColor: color }}
      />
    </motion.div>
  )
}

// Floating paint splash
function PaintSplash({ delay }: { delay: number }) {
  const colors = ['#FF6B6B', '#C9B1FF', '#98D8AA', '#FFE66D', '#FFB5BA']
  const color = colors[Math.floor(Math.random() * colors.length)]
  const left = Math.random() * 100
  const size = 20 + Math.random() * 40

  return (
    <motion.div
      className="absolute rounded-full blur-sm"
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        left: `${left}%`,
      }}
      initial={{ top: '-10%', opacity: 0, scale: 0 }}
      animate={{
        top: `${50 + Math.random() * 40}%`,
        opacity: [0, 0.6, 0],
        scale: [0, 1, 0.5],
        rotate: Math.random() * 360,
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 3,
      }}
    />
  )
}

export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-gallery-50 to-white">
      {/* Paint drips from top */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none">
        <PaintDrip color="#FF6B6B" delay={0} left="5%" />
        <PaintDrip color="#C9B1FF" delay={0.2} left="15%" />
        <PaintDrip color="#98D8AA" delay={0.4} left="25%" />
        <PaintDrip color="#FFE66D" delay={0.1} left="40%" />
        <PaintDrip color="#FFB5BA" delay={0.3} left="55%" />
        <PaintDrip color="#FF6B6B" delay={0.5} left="70%" />
        <PaintDrip color="#C9B1FF" delay={0.15} left="85%" />
        <PaintDrip color="#98D8AA" delay={0.35} left="95%" />
      </div>

      {/* Floating paint splashes */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <PaintSplash key={i} delay={i * 0.5} />
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* 404 with paint effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 20,
            }}
            className="relative mb-8"
          >
            <h1 className="font-display text-[120px] md:text-[180px] font-bold leading-none">
              <span className="bg-gradient-to-br from-accent-coral via-accent-lavender to-accent-mint bg-clip-text text-transparent">
                4
              </span>
              <motion.span
                className="relative inline-block"
                animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <span className="bg-gradient-to-br from-accent-sunshine via-accent-coral to-accent-blush bg-clip-text text-transparent">
                  0
                </span>
                {/* Paint brush in the 0 */}
                <motion.svg
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-24 md:h-24"
                  viewBox="0 0 64 64"
                  initial={{ rotate: -45, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                >
                  <path
                    d="M52 4L60 12L24 48L16 40L52 4Z"
                    fill="#8B4513"
                  />
                  <path
                    d="M24 48L16 40L12 44L20 52L24 48Z"
                    fill="#C0C0C0"
                  />
                  <path
                    d="M12 44L4 60L20 52L12 44Z"
                    fill="#FF6B6B"
                  />
                </motion.svg>
              </motion.span>
              <span className="bg-gradient-to-br from-accent-mint via-accent-lavender to-accent-coral bg-clip-text text-transparent">
                4
              </span>
            </h1>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-gallery-900 mb-4">
              Oops! This page got painted over!
            </h2>
            <p className="text-gallery-600 mb-8 max-w-md mx-auto">
              Looks like Gayle was practicing her art here and accidentally covered
              up this page. Let&apos;s get you back to the gallery!
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Button variant="accent" size="lg" asChild>
              <Link href="/gallery">
                <Palette className="w-5 h-5" />
                Visit Gallery
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/">
                <Home className="w-5 h-5" />
                Go Home
              </Link>
            </Button>
          </motion.div>

          {/* Back button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8"
          >
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 text-gallery-500 hover:text-gallery-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go back</span>
            </button>
          </motion.div>

          {/* Fun fact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-gallery-100 inline-block"
          >
            <p className="text-sm text-gallery-500">
              <span className="font-medium text-gallery-700">Fun fact:</span> Even great
              artists like Picasso had pages that didn&apos;t exist. You&apos;re in good company!
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
