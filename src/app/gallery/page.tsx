import { Suspense } from 'react'
import { PageWrapper } from '@/components/layout/page-wrapper'
import { MasonryGallery } from '@/components/gallery/masonry-gallery'
import { ParallaxHero } from '@/components/gallery/parallax-hero'
import { Search, SlidersHorizontal } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { ArtworkWithImages } from '@/types/database'

async function getArtworks(): Promise<ArtworkWithImages[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('artworks')
      .select(`
        *,
        artwork_images (*),
        category:categories (*)
      `)
      .eq('status', 'published')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching artworks:', error)
      return []
    }

    return (data as ArtworkWithImages[]) || []
  } catch (error) {
    console.error('Error fetching artworks:', error)
    return []
  }
}

export const metadata = {
  title: 'Gallery',
  description: "Browse Gayle's collection of original paintings and artwork.",
}

function GallerySkeleton() {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="break-inside-avoid mb-6 rounded-2xl overflow-hidden aspect-[3/4] bg-gradient-to-br from-gallery-100 to-gallery-200 animate-pulse"
        />
      ))}
    </div>
  )
}

export default async function GalleryPage() {
  const artworks = await getArtworks()

  return (
    <PageWrapper>
      {/* Parallax Hero */}
      <ParallaxHero />

      {/* Gallery Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Filter/Search bar */}
          <div className="mb-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/70 backdrop-blur-md shadow-lg border border-white/20">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gallery-400" />
              <input
                type="text"
                placeholder="Search artworks..."
                className="w-full sm:w-72 pl-12 pr-4 py-3 rounded-xl border border-gallery-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-accent-coral focus:border-transparent transition-all placeholder:text-gallery-400"
                disabled
              />
            </div>
            <div className="flex items-center gap-4">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/50 border border-gallery-200 text-gallery-600 hover:bg-white transition-colors"
                disabled
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="text-sm">Filters</span>
              </button>
              <span className="text-sm text-gallery-500">
                {artworks.length} {artworks.length === 1 ? 'artwork' : 'artworks'}
              </span>
            </div>
          </div>

          {/* Masonry Gallery */}
          <Suspense fallback={<GallerySkeleton />}>
            <MasonryGallery artworks={artworks} />
          </Suspense>
        </div>
      </section>
    </PageWrapper>
  )
}
