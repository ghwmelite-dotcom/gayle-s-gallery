'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Sparkles, Heart, Expand } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Lightbox } from './lightbox'
import type { ArtworkWithImages } from '@/types/database'

interface MasonryGalleryProps {
  artworks: ArtworkWithImages[]
  isLoading?: boolean
}

// Predefined aspect ratios for visual variety
const aspectRatios = [
  'aspect-[3/4]',   // Portrait
  'aspect-[4/5]',   // Tall portrait
  'aspect-square',  // Square
  'aspect-[5/4]',   // Landscape-ish
  'aspect-[3/4]',   // Portrait
  'aspect-[2/3]',   // Tall
]

function MasonryCard({
  artwork,
  index,
  onClick,
  priority = false
}: {
  artwork: ArtworkWithImages
  index: number
  onClick: () => void
  priority?: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const primaryImage = artwork.artwork_images?.[0]
  const imageUrl = primaryImage?.watermarked_path
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/${primaryImage.watermarked_path}`
    : '/images/placeholder.jpg'

  // Cycle through aspect ratios for variety
  const aspectRatio = aspectRatios[index % aspectRatios.length]

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group break-inside-avoid mb-6"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl bg-gallery-100 cursor-pointer",
          "shadow-lg hover:shadow-2xl transition-all duration-500",
          "transform hover:-translate-y-1"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        data-hoverable
      >
        {/* Image Container */}
        <div className={cn("relative overflow-hidden", aspectRatio)}>
          {/* Blur placeholder / skeleton */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br from-accent-coral/10 via-accent-lavender/10 to-accent-mint/10",
              "animate-pulse transition-opacity duration-500",
              imageLoaded ? "opacity-0" : "opacity-100"
            )}
          />

          {!imageError ? (
            <Image
              src={imageUrl}
              alt={artwork.title}
              fill
              className={cn(
                'object-cover transition-all duration-700',
                isHovered && 'scale-110',
                imageLoaded ? 'opacity-100' : 'opacity-0'
              )}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent-coral/20 to-accent-lavender/20">
              <span className="text-4xl">🎨</span>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Hover content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white text-sm font-medium">
                <Expand className="w-4 h-4" />
                <span>View Full Size</span>
              </div>
              <button
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  // TODO: Add to favorites
                }}
              >
                <Heart className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.div>

          {/* Featured badge */}
          {artwork.is_featured && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-3 left-3"
            >
              <Badge variant="sunshine" className="flex items-center gap-1 shadow-lg">
                <Sparkles className="w-3 h-3" />
                Featured
              </Badge>
            </motion.div>
          )}

          {/* Corner shine effect */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/20 rotate-45 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
        </div>

        {/* Card content */}
        <div className="p-4 bg-white/80 backdrop-blur-sm">
          <h3 className="font-display text-lg font-semibold text-gallery-900 truncate group-hover:text-accent-coral transition-colors duration-300">
            {artwork.title}
          </h3>
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            {artwork.category && (
              <Badge variant="outline" className="text-xs">
                {artwork.category.name}
              </Badge>
            )}
            {artwork.medium && (
              <span className="text-xs text-gallery-500 italic">{artwork.medium}</span>
            )}
          </div>
          {artwork.description && (
            <p className="mt-2 text-sm text-gallery-600 line-clamp-2">
              {artwork.description}
            </p>
          )}
        </div>
      </div>
    </motion.article>
  )
}

function MasonrySkeleton() {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "break-inside-avoid mb-6 rounded-2xl overflow-hidden",
            aspectRatios[i % aspectRatios.length]
          )}
        >
          <div className="h-full bg-gradient-to-br from-gallery-100 to-gallery-200 animate-pulse" />
        </div>
      ))}
    </div>
  )
}

export function MasonryGallery({ artworks, isLoading = false }: MasonryGalleryProps) {
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkWithImages | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const handleArtworkClick = useCallback((artwork: ArtworkWithImages) => {
    setSelectedArtwork(artwork)
    setLightboxOpen(true)
  }, [])

  const handleNavigate = useCallback((artwork: ArtworkWithImages) => {
    setSelectedArtwork(artwork)
  }, [])

  if (isLoading) {
    return <MasonrySkeleton />
  }

  if (artworks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent-coral/30 to-accent-lavender/30 flex items-center justify-center">
          <span className="text-5xl">🎨</span>
        </div>
        <h3 className="font-display text-2xl font-semibold text-gallery-900 mb-3">
          No artworks yet
        </h3>
        <p className="text-gallery-600 max-w-md mx-auto">
          Gayle is busy creating beautiful new paintings. Check back soon to see her latest masterpieces!
        </p>
      </motion.div>
    )
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6"
      >
        {artworks.map((artwork, index) => (
          <MasonryCard
            key={artwork.id}
            artwork={artwork}
            index={index}
            onClick={() => handleArtworkClick(artwork)}
            priority={index < 4}
          />
        ))}
      </motion.div>

      <Lightbox
        artwork={selectedArtwork}
        artworks={artworks}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={handleNavigate}
      />
    </>
  )
}
