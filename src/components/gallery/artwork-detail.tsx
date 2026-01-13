'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Heart,
  Share2,
  ZoomIn,
  Calendar,
  Ruler,
  Palette,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { PageWrapper } from '@/components/layout/page-wrapper'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Lightbox } from './lightbox'
import type { ArtworkWithImages } from '@/types/database'

interface ArtworkDetailProps {
  artwork: ArtworkWithImages
  relatedArtworks: ArtworkWithImages[]
}

export function ArtworkDetail({ artwork, relatedArtworks }: ArtworkDetailProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const primaryImage = artwork.artwork_images?.[0]
  const imageUrl = primaryImage?.watermarked_path
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/${primaryImage.watermarked_path}`
    : '/images/placeholder.jpg'

  const createdDate = new Date(artwork.created_at).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <PageWrapper>
      {/* Back button */}
      <div className="container mx-auto px-4 py-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-gallery-600 hover:text-gallery-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Gallery</span>
          </Link>
        </motion.div>
      </div>

      {/* Main content */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <div
                className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gallery-100 shadow-2xl cursor-zoom-in group"
                onClick={() => setLightboxOpen(true)}
              >
                {/* Loading placeholder */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-accent-coral/10 via-accent-lavender/10 to-accent-mint/10 animate-pulse transition-opacity duration-500 ${
                    imageLoaded ? 'opacity-0' : 'opacity-100'
                  }`}
                />

                <Image
                  src={imageUrl}
                  alt={artwork.title}
                  fill
                  className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  onLoad={() => setImageLoaded(true)}
                />

                {/* Zoom indicator */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-full bg-white/90 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ZoomIn className="w-6 h-6 text-gallery-700" />
                  </motion.div>
                </div>

                {/* Featured badge */}
                {artwork.is_featured && (
                  <div className="absolute top-4 left-4">
                    <Badge variant="sunshine" className="shadow-lg">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-accent-coral/20 to-accent-lavender/20 rounded-full blur-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-accent-mint/20 to-accent-sunshine/20 rounded-full blur-2xl -z-10" />
            </motion.div>

            {/* Details section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-8"
            >
              {/* Category */}
              {artwork.category && (
                <Badge variant="lavender">
                  {artwork.category.name}
                </Badge>
              )}

              {/* Title */}
              <h1 className="font-display text-4xl md:text-5xl font-bold text-gallery-900">
                {artwork.title}
              </h1>

              {/* Description */}
              {artwork.description && (
                <p className="text-lg text-gallery-600 leading-relaxed">
                  {artwork.description}
                </p>
              )}

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-4">
                {artwork.medium && (
                  <div className="p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-gallery-100">
                    <div className="flex items-center gap-2 text-gallery-500 mb-1">
                      <Palette className="w-4 h-4" />
                      <span className="text-sm">Medium</span>
                    </div>
                    <p className="font-medium text-gallery-900">{artwork.medium}</p>
                  </div>
                )}

                {(artwork.width_inches || artwork.height_inches) && (
                  <div className="p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-gallery-100">
                    <div className="flex items-center gap-2 text-gallery-500 mb-1">
                      <Ruler className="w-4 h-4" />
                      <span className="text-sm">Dimensions</span>
                    </div>
                    <p className="font-medium text-gallery-900">
                      {artwork.width_inches && artwork.height_inches
                        ? `${artwork.width_inches}" × ${artwork.height_inches}"`
                        : artwork.width_inches
                        ? `${artwork.width_inches}" wide`
                        : `${artwork.height_inches}" tall`}
                    </p>
                  </div>
                )}

                <div className="p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-gallery-100">
                  <div className="flex items-center gap-2 text-gallery-500 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Created</span>
                  </div>
                  <p className="font-medium text-gallery-900">{createdDate}</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-4">
                <Button variant="secondary" size="lg">
                  <Heart className="w-5 h-5" />
                  Add to Favorites
                </Button>
                <Button variant="ghost" size="lg">
                  <Share2 className="w-5 h-5" />
                  Share
                </Button>
              </div>

              {/* Support CTA */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-accent-coral/10 via-accent-lavender/10 to-accent-mint/10 border border-gallery-100">
                <h3 className="font-display text-xl font-semibold text-gallery-900 mb-2">
                  Love this artwork?
                </h3>
                <p className="text-gallery-600 mb-4">
                  Your support helps Gayle continue creating beautiful art and pursuing her dreams.
                </p>
                <Button variant="accent" asChild>
                  <Link href="/support">
                    <Heart className="w-5 h-5" />
                    Support Gayle
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related artworks */}
      {relatedArtworks.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-transparent to-gallery-50/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl font-bold text-gallery-900 mb-4">
                More from the Gallery
              </h2>
              <p className="text-gallery-600">
                Discover other beautiful artworks by Gayle
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedArtworks.map((related, index) => {
                const relatedImage = related.artwork_images?.[0]
                const relatedUrl = relatedImage?.watermarked_path
                  ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/${relatedImage.watermarked_path}`
                  : '/images/placeholder.jpg'

                return (
                  <motion.div
                    key={related.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={`/gallery/${related.slug}`}>
                      <div className="group relative aspect-square rounded-xl overflow-hidden bg-gallery-100 shadow-lg hover:shadow-xl transition-shadow">
                        <Image
                          src={relatedUrl}
                          alt={related.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-3 left-3 right-3">
                            <h3 className="text-white font-medium truncate">
                              {related.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Button variant="secondary" size="lg" asChild>
                <Link href="/gallery">
                  View All Artworks
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      <Lightbox
        artwork={artwork}
        artworks={[artwork, ...relatedArtworks]}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={() => {}}
      />
    </PageWrapper>
  )
}
