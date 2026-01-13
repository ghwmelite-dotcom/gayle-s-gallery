import { Suspense } from 'react'
import { PageWrapper } from '@/components/layout/page-wrapper'
import { ArtworkGrid } from '@/components/gallery/artwork-grid'
import { Badge } from '@/components/ui/badge'
import { FadeInView } from '@/components/shared/animated-page'
import { Palette, Search } from 'lucide-react'
// import { createClient } from '@/lib/supabase/server'

// Mock data for now - will be replaced with Supabase data
const mockArtworks: never[] = []

async function getArtworks() {
  // TODO: Replace with actual Supabase query when database is set up
  // const supabase = createClient()
  // const { data, error } = await supabase
  //   .from('artworks')
  //   .select(`
  //     *,
  //     artwork_images (*),
  //     category:categories (*)
  //   `)
  //   .eq('status', 'published')
  //   .order('display_order', { ascending: true })
  //   .order('created_at', { ascending: false })

  return mockArtworks
}

export const metadata = {
  title: 'Gallery',
  description: "Browse Gayle's collection of original paintings and artwork.",
}

export default async function GalleryPage() {
  const artworks = await getArtworks()

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-lavender/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent-mint/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <FadeInView>
              <Badge variant="lavender" className="mb-4">
                <Palette className="w-3 h-3 mr-1" />
                The Collection
              </Badge>
            </FadeInView>

            <FadeInView delay={0.1}>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-gallery-900 mb-6">
                Gayle&apos;s Gallery
              </h1>
            </FadeInView>

            <FadeInView delay={0.2}>
              <p className="text-lg text-gallery-600 max-w-xl mx-auto">
                Each painting tells a story. Explore the collection and discover
                the magic in every brushstroke.
              </p>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          {/* Filter/Search bar - placeholder for future functionality */}
          <FadeInView>
            <div className="mb-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white shadow-soft">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gallery-400" />
                <input
                  type="text"
                  placeholder="Search artworks..."
                  className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-xl border border-gallery-200 focus:outline-none focus:ring-2 focus:ring-accent-coral focus:border-transparent"
                  disabled
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-gallery-500">
                <span>{artworks.length} artworks</span>
              </div>
            </div>
          </FadeInView>

          {/* Artwork Grid */}
          <Suspense fallback={<ArtworkGrid artworks={[]} isLoading={true} />}>
            <ArtworkGrid artworks={artworks} />
          </Suspense>

          {/* Empty state when no artworks */}
          {artworks.length === 0 && (
            <FadeInView>
              <div className="text-center py-16 px-4">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent-coral/20 to-accent-lavender/20 flex items-center justify-center">
                    <Palette className="w-12 h-12 text-accent-coral" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-gallery-900 mb-3">
                    Gallery coming soon!
                  </h3>
                  <p className="text-gallery-600 mb-6">
                    Gayle is working on some amazing new paintings. Check back soon to see
                    her latest creations!
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-sunshine/30 text-gallery-800 text-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-coral opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-coral"></span>
                    </span>
                    New artworks in progress
                  </div>
                </div>
              </div>
            </FadeInView>
          )}
        </div>
      </section>
    </PageWrapper>
  )
}
