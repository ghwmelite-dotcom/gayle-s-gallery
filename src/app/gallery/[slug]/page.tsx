import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { ArtworkDetail } from '@/components/gallery/artwork-detail'
import { PageWrapper } from '@/components/layout/page-wrapper'
import type { ArtworkWithImages } from '@/types/database'

interface Props {
  params: Promise<{ slug: string }>
}

async function getArtwork(slug: string): Promise<ArtworkWithImages | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('artworks')
      .select(`
        *,
        artwork_images (*),
        category:categories (*)
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error || !data) {
      return null
    }

    return data as ArtworkWithImages
  } catch (error) {
    console.error('Error fetching artwork:', error)
    return null
  }
}

async function getRelatedArtworks(categoryId: string | null, currentId: string): Promise<ArtworkWithImages[]> {
  try {
    const supabase = await createClient()
    let query = supabase
      .from('artworks')
      .select(`
        *,
        artwork_images (*),
        category:categories (*)
      `)
      .eq('status', 'published')
      .neq('id', currentId)
      .limit(4)

    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error || !data) {
      return []
    }

    return data as ArtworkWithImages[]
  } catch (error) {
    console.error('Error fetching related artworks:', error)
    return []
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const artwork = await getArtwork(slug)

  if (!artwork) {
    return {
      title: 'Artwork Not Found',
    }
  }

  return {
    title: artwork.title,
    description: artwork.description || `View "${artwork.title}" by Gayle`,
    openGraph: {
      title: artwork.title,
      description: artwork.description || `View "${artwork.title}" by Gayle`,
      type: 'article',
    },
  }
}

function ArtworkSkeleton() {
  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="aspect-[4/5] bg-gallery-100 rounded-2xl animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 w-32 bg-gallery-100 rounded animate-pulse" />
            <div className="h-12 w-3/4 bg-gallery-100 rounded animate-pulse" />
            <div className="h-24 w-full bg-gallery-100 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default async function ArtworkPage({ params }: Props) {
  const { slug } = await params
  const artwork = await getArtwork(slug)

  if (!artwork) {
    notFound()
  }

  const relatedArtworks = await getRelatedArtworks(artwork.category_id, artwork.id)

  return (
    <Suspense fallback={<ArtworkSkeleton />}>
      <ArtworkDetail artwork={artwork} relatedArtworks={relatedArtworks} />
    </Suspense>
  )
}
