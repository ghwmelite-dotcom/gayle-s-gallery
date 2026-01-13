'use client'

import { motion } from 'framer-motion'

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gallery-50 via-white to-accent-blush/10" />

      {/* Animated blob 1 */}
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-accent-coral/20 to-accent-blush/20 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Animated blob 2 */}
      <motion.div
        className="absolute top-1/2 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-accent-lavender/20 to-accent-mint/20 blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5,
        }}
      />

      {/* Animated blob 3 */}
      <motion.div
        className="absolute -bottom-20 right-1/4 w-72 h-72 rounded-full bg-gradient-to-br from-accent-sunshine/15 to-accent-coral/15 blur-3xl"
        animate={{
          x: [0, 40, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 10,
        }}
      />

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

export function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`backdrop-blur-md bg-white/70 border border-white/20 shadow-xl rounded-2xl ${className}`}
    >
      {children}
    </div>
  )
}
