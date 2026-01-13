'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Eye, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import type { ArtworkWithImages } from '@/types/database'

interface ArtworkCardProps {
  artwork: ArtworkWithImages
  priority?: boolean
}

export function ArtworkCard({ artwork, priority = false }: ArtworkCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const primaryImage = artwork.artwork_images?.[0]
  const imageUrl = primaryImage?.watermarked_path
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/watermarked/${primaryImage.watermarked_path}`
    : '/images/placeholder.jpg'

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group"
    >
      <Link href={`/gallery/${artwork.slug}`}>
        <div
          className="relative overflow-hidden rounded-2xl bg-gallery-100 card-hover"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Container */}
          <div className="aspect-[4/5] relative">
            {/* Skeleton loader */}
            {!imageLoaded && (
              <div className="absolute inset-0 skeleton" />
            )}

            <Image
              src={imageUrl}
              alt={artwork.title}
              fill
              className={cn(
                'object-cover transition-all duration-500',
                isHovered && 'scale-105',
                imageLoaded ? 'opacity-100' : 'opacity-0'
              )}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
              onLoad={() => setImageLoaded(true)}
            />

            {/* Watermark overlay (additional protection) */}
            <div className="watermark-overlay" />

            {/* Hover overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-gradient-to-t from-gallery-950/80 via-transparent to-transparent"
            >
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <Eye className="w-4 h-4" />
                  <span>View artwork</span>
                </div>
              </div>
            </motion.div>

            {/* Featured badge */}
            {artwork.is_featured && (
              <div className="absolute top-3 left-3">
                <Badge variant="sunshine" className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Featured
                </Badge>
              </div>
            )}
          </div>

          {/* Card content */}
          <div className="p-4 bg-white">
            <h3 className="font-display text-lg font-semibold text-gallery-900 truncate group-hover:text-accent-coral transition-colors">
              {artwork.title}
            </h3>
            <div className="mt-1 flex items-center gap-2">
              {artwork.category && (
                <Badge variant="outline" className="text-xs">
                  {artwork.category.name}
                </Badge>
              )}
              {artwork.medium && (
                <span className="text-sm text-gallery-500">{artwork.medium}</span>
              )}
            </div>
            {artwork.description && (
              <p className="mt-2 text-sm text-gallery-600 line-clamp-2">
                {artwork.description}
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
