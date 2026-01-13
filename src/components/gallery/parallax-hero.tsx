'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Palette, Sparkles, Heart, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface FloatingElementProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

function FloatingElement({ children, delay = 0, duration = 6, className = '' }: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-10, 10, -10],
        rotate: [-5, 5, -5],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

export function ParallaxHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
    >
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Paint splashes */}
        <FloatingElement
          delay={0}
          duration={8}
          className="absolute top-20 left-[10%]"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-coral to-accent-coral/50 blur-sm opacity-60" />
        </FloatingElement>

        <FloatingElement
          delay={1}
          duration={7}
          className="absolute top-32 right-[15%]"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-lavender to-accent-lavender/50 blur-sm opacity-60" />
        </FloatingElement>

        <FloatingElement
          delay={2}
          duration={9}
          className="absolute bottom-32 left-[20%]"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-mint to-accent-mint/50 blur-sm opacity-50" />
        </FloatingElement>

        <FloatingElement
          delay={0.5}
          duration={6}
          className="absolute bottom-40 right-[25%]"
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent-sunshine to-accent-sunshine/50 blur-sm opacity-50" />
        </FloatingElement>

        {/* Floating icons */}
        <FloatingElement
          delay={0.3}
          duration={5}
          className="absolute top-[30%] left-[5%]"
        >
          <div className="p-3 rounded-xl bg-white/80 shadow-lg backdrop-blur-sm">
            <Palette className="w-6 h-6 text-accent-coral" />
          </div>
        </FloatingElement>

        <FloatingElement
          delay={1.5}
          duration={6}
          className="absolute top-[25%] right-[8%]"
        >
          <div className="p-3 rounded-xl bg-white/80 shadow-lg backdrop-blur-sm">
            <Sparkles className="w-6 h-6 text-accent-sunshine" />
          </div>
        </FloatingElement>

        <FloatingElement
          delay={2.5}
          duration={7}
          className="absolute bottom-[30%] left-[8%]"
        >
          <div className="p-3 rounded-xl bg-white/80 shadow-lg backdrop-blur-sm">
            <Heart className="w-6 h-6 text-accent-blush" />
          </div>
        </FloatingElement>

        <FloatingElement
          delay={1}
          duration={5.5}
          className="absolute bottom-[35%] right-[5%]"
        >
          <div className="p-3 rounded-xl bg-white/80 shadow-lg backdrop-blur-sm">
            <Star className="w-6 h-6 text-accent-lavender" />
          </div>
        </FloatingElement>

        {/* Paintbrush strokes */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-0 right-0 w-64 h-64 opacity-20"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path
              d="M20,100 Q60,20 100,100 T180,100"
              fill="none"
              stroke="url(#gradient1)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF6B6B" />
                <stop offset="100%" stopColor="#C9B1FF" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-0 left-0 w-48 h-48 opacity-20"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full rotate-180">
            <path
              d="M20,100 Q60,180 100,100 T180,100"
              fill="none"
              stroke="url(#gradient2)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#98D8AA" />
                <stop offset="100%" stopColor="#FFE66D" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>

      {/* Main content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 container mx-auto px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="lavender" className="mb-6 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Welcome to the Gallery
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            <span className="text-gallery-900">Gayle&apos;s</span>
            <br />
            <span className="bg-gradient-to-r from-accent-coral via-accent-lavender to-accent-mint bg-clip-text text-transparent">
              Gallery
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gallery-600 max-w-2xl mx-auto mb-8"
          >
            Step into a world of imagination and color. Each painting tells a unique story,
            crafted with passion and creativity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-accent-coral to-accent-blush text-white font-semibold shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            >
              Explore Collection
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-white/80 backdrop-blur-sm text-gallery-900 font-semibold shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gallery-200"
            >
              Meet the Artist
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-16"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex flex-col items-center text-gallery-400"
            >
              <span className="text-sm mb-2">Scroll to explore</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
