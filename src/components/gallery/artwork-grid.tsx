'use client'

import { motion, type Variants } from 'framer-motion'
import { ArtworkCard } from './artwork-card'
import { SkeletonCard } from '@/components/ui/skeleton'
import type { ArtworkWithImages } from '@/types/database'

interface ArtworkGridProps {
  artworks: ArtworkWithImages[]
  isLoading?: boolean
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
}

export function ArtworkGrid({ artworks, isLoading = false }: ArtworkGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (artworks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gallery-100 flex items-center justify-center">
          <span className="text-3xl">🎨</span>
        </div>
        <h3 className="font-display text-xl font-semibold text-gallery-900 mb-2">
          No artworks yet
        </h3>
        <p className="text-gallery-600">
          New paintings are being created. Check back soon!
        </p>
      </div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {artworks.map((artwork, index) => (
        <motion.div key={artwork.id} variants={itemVariants}>
          <ArtworkCard artwork={artwork} priority={index < 3} />
        </motion.div>
      ))}
    </motion.div>
  )
}
