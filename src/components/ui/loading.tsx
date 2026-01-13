'use client'

import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  }

  return (
    <div className={`${sizes[size]} ${className}`}>
      <motion.svg
        viewBox="0 0 50 50"
        className="w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className="text-gallery-200"
        />
        <motion.circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="80 200"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="50%" stopColor="#C9B1FF" />
            <stop offset="100%" stopColor="#98D8AA" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  )
}

// Paintbrush loading animation
export function PaintbrushLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-32 h-32 ${className}`}>
      {/* Canvas/easel */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-24 bg-white rounded-lg shadow-lg border-2 border-gallery-200" />

      {/* Animated paintbrush */}
      <motion.svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        className="absolute top-2 left-1/2"
        animate={{
          x: [-20, 20, -20],
          y: [0, 10, 0],
          rotate: [-15, 15, -15],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ originX: 0.5, originY: 1 }}
      >
        {/* Brush handle */}
        <path d="M39 3L45 9L18 36L12 30L39 3Z" fill="#8B4513" />
        {/* Metal ferrule */}
        <path d="M18 36L12 30L9 33L15 39L18 36Z" fill="#C0C0C0" />
        {/* Brush bristles */}
        <motion.path
          d="M9 33L3 45L15 39L9 33Z"
          animate={{
            fill: ['#FF6B6B', '#C9B1FF', '#98D8AA', '#FFE66D', '#FF6B6B'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </motion.svg>

      {/* Paint strokes appearing */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 overflow-hidden">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-full h-2 rounded-full"
            style={{
              top: `${i * 8 + 4}px`,
              background: ['#FF6B6B', '#C9B1FF', '#98D8AA'][i],
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  )
}

// Paint dots loading animation
export function PaintDotsLoader({ className = '' }: { className?: string }) {
  const colors = ['#FF6B6B', '#C9B1FF', '#98D8AA', '#FFE66D']

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {colors.map((color, i) => (
        <motion.div
          key={i}
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: color }}
          animate={{
            y: [-8, 0, -8],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// Full page loading screen
export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-gallery-50 to-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <PaintbrushLoader className="mx-auto mb-8" />

        <motion.p
          className="text-gallery-600 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading masterpiece...
        </motion.p>
      </motion.div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-accent-coral/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-accent-lavender/10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
      </div>
    </div>
  )
}

// Skeleton components for content loading
export function SkeletonText({ className = '', lines = 1 }: { className?: string; lines?: number }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gradient-to-r from-gallery-100 via-gallery-200 to-gallery-100 rounded animate-pulse"
          style={{ width: i === lines - 1 && lines > 1 ? '75%' : '100%' }}
        />
      ))}
    </div>
  )
}

export function SkeletonImage({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-gradient-to-br from-gallery-100 to-gallery-200 rounded-lg animate-pulse ${className}`} />
  )
}
