import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FadeInView } from '@/components/shared/animated-page'
import { Plus, Image, Search, Filter } from 'lucide-react'
// import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Artworks',
}

export default async function ArtworksPage() {
  // TODO: Fetch artworks from Supabase
  // const supabase = createClient()
  // const { data: artworks } = await supabase
  //   .from('artworks')
  //   .select('*, artwork_images(*), category:categories(*)')
  //   .order('created_at', { ascending: false })

  const artworks: never[] = []

  return (
    <div className="space-y-8">
      {/* Header */}
      <FadeInView>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-gallery-900">Artworks</h1>
            <p className="text-gallery-600">Manage your artwork collection</p>
          </div>
          <Button variant="accent" asChild>
            <Link href="/admin/artworks/new">
              <Plus className="w-4 h-4" />
              Add artwork
            </Link>
          </Button>
        </div>
      </FadeInView>

      {/* Filters */}
      <FadeInView delay={0.1}>
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gallery-400" />
                <input
                  type="text"
                  placeholder="Search artworks..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gallery-200 focus:outline-none focus:ring-2 focus:ring-accent-coral focus:border-transparent"
                />
              </div>
              <Button variant="secondary">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      </FadeInView>

      {/* Artworks Grid */}
      {artworks.length === 0 ? (
        <FadeInView delay={0.2}>
          <Card>
            <CardContent className="py-16">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent-coral/10 to-accent-lavender/10 flex items-center justify-center">
                  <Image className="w-10 h-10 text-accent-coral" />
                </div>
                <h3 className="font-display text-xl font-semibold text-gallery-900 mb-2">
                  No artworks yet
                </h3>
                <p className="text-gallery-600 mb-6 max-w-sm mx-auto">
                  Start building your gallery by uploading your first artwork.
                </p>
                <Button variant="accent" asChild>
                  <Link href="/admin/artworks/new">
                    <Plus className="w-4 h-4" />
                    Add your first artwork
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </FadeInView>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Artwork cards will render here */}
        </div>
      )}
    </div>
  )
}
