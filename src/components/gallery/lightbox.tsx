'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Heart, Share2 } from 'lucide-react'
import type { ArtworkWithImages } from '@/types/database'

interface LightboxProps {
  artwork: ArtworkWithImages | null
  artworks: ArtworkWithImages[]
  isOpen: boolean
  onClose: () => void
  onNavigate: (artwork: ArtworkWithImages) => void
}

export function Lightbox({ artwork, artworks, isOpen, onClose, onNavigate }: LightboxProps) {
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)

  const currentIndex = artworks.findIndex(a => a.id === artwork?.id)
  const hasNext = currentIndex < artworks.length - 1
  const hasPrev = currentIndex > 0

  const handleNext = useCallback(() => {
    if (hasNext) {
      onNavigate(artworks[currentIndex + 1])
      setZoom(1)
      setPosition({ x: 0, y: 0 })
    }
  }, [hasNext, currentIndex, artworks, onNavigate])

  const handlePrev = useCallback(() => {
    if (hasPrev) {
      onNavigate(artworks[currentIndex - 1])
      setZoom(1)
      setPosition({ x: 0, y: 0 })
    }
  }, [hasPrev, currentIndex, artworks, onNavigate])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowRight') handleNext()
    if (e.key === 'ArrowLeft') handlePrev()
    if (e.key === '+' || e.key === '=') setZoom(z => Math.min(z + 0.5, 3))
    if (e.key === '-') setZoom(z => Math.max(z - 0.5, 1))
  }, [isOpen, onClose, handleNext, handlePrev])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleZoomIn = () => setZoom(z => Math.min(z + 0.5, 3))
  const handleZoomOut = () => {
    setZoom(z => Math.max(z - 0.5, 1))
    if (zoom <= 1.5) setPosition({ x: 0, y: 0 })
  }

  const imageUrl = artwork?.artwork_images?.[0]?.watermarked_path
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/${artwork.artwork_images[0].watermarked_path}`
    : '/images/placeholder.jpg'

  return (
    <AnimatePresence>
      {isOpen && artwork && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/95 backdrop-blur-sm"
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation arrows */}
          {hasPrev && (
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev() }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}
          {hasNext && (
            <button
              onClick={(e) => { e.stopPropagation(); handleNext() }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          {/* Zoom controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
            <button
              onClick={(e) => { e.stopPropagation(); handleZoomOut() }}
              className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
              disabled={zoom <= 1}
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="text-white text-sm min-w-[3rem] text-center">{Math.round(zoom * 100)}%</span>
            <button
              onClick={(e) => { e.stopPropagation(); handleZoomIn() }}
              className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
              disabled={zoom >= 3}
            >
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>

          {/* Action buttons */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <button
              onClick={(e) => e.stopPropagation()}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <Heart className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Image */}
          <motion.div
            className="relative max-w-[90vw] max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            drag={zoom > 1}
            dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
          >
            <motion.img
              key={artwork.id}
              src={imageUrl}
              alt={artwork.title}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{
                scale: zoom,
                opacity: 1,
                x: position.x,
                y: position.y,
              }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              draggable={false}
            />
          </motion.div>

          {/* Artwork info */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ delay: 0.1 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 text-center text-white"
          >
            <h2 className="font-display text-2xl font-semibold mb-1">{artwork.title}</h2>
            {artwork.description && (
              <p className="text-white/70 max-w-md">{artwork.description}</p>
            )}
            <p className="text-white/50 text-sm mt-2">
              {currentIndex + 1} / {artworks.length}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
