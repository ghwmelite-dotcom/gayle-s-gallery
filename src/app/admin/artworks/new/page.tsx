'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { FadeInView } from '@/components/shared/animated-page'
import { slugify } from '@/lib/utils'
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Save,
  Eye,
  X,
  Sparkles,
} from 'lucide-react'

export default function NewArtworkPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Form state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [story, setStory] = useState('')
  const [medium, setMedium] = useState('')
  const [yearCreated, setYearCreated] = useState('')
  const [widthInches, setWidthInches] = useState('')
  const [heightInches, setHeightInches] = useState('')
  const [status, setStatus] = useState<'draft' | 'published'>('draft')

  // Image state
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      setError('Image must be less than 50MB')
      return
    }

    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    setError('')
  }

  const removeImage = () => {
    setImageFile(null)
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
      setImagePreview(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      setError('Please enter a title')
      return
    }

    if (!imageFile) {
      setError('Please upload an image')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const supabase = createClient()

      // Generate slug
      const slug = slugify(title)

      // Create artwork record first
      const artworkData = {
        title,
        slug,
        description: description || null,
        story: story || null,
        medium: medium || null,
        year_created: yearCreated ? parseInt(yearCreated) : null,
        width_inches: widthInches ? parseFloat(widthInches) : null,
        height_inches: heightInches ? parseFloat(heightInches) : null,
        status,
      }

      const { data: artwork, error: artworkError } = await supabase
        .from('artworks')
        .insert(artworkData)
        .select()
        .single()

      if (artworkError || !artwork) {
        throw new Error(artworkError?.message || 'Failed to create artwork')
      }

      // Upload image via API (which handles watermarking)
      const formData = new FormData()
      formData.append('file', imageFile)
      formData.append('artworkId', artwork.id)

      const uploadResponse = await fetch('/api/images/upload', {
        method: 'POST',
        body: formData,
      })

      if (!uploadResponse.ok) {
        const uploadError = await uploadResponse.json()
        throw new Error(uploadError.error || 'Failed to upload image')
      }

      const { image } = await uploadResponse.json()

      // Update artwork with primary image
      await supabase
        .from('artworks')
        .update({ primary_image_id: image.id })
        .eq('id', artwork.id)

      router.push('/admin/artworks')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <FadeInView>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/artworks">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </Button>
          <div>
            <h1 className="font-display text-2xl font-bold text-gallery-900">Add Artwork</h1>
            <p className="text-gallery-600">Upload a new painting to your gallery</p>
          </div>
        </div>
      </FadeInView>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <FadeInView>
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">
              {error}
            </div>
          </FadeInView>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Image Upload */}
          <FadeInView delay={0.1}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Artwork Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full rounded-xl object-cover aspect-[4/5]"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-white rounded-lg shadow-soft transition-colors"
                    >
                      <X className="w-4 h-4 text-gallery-600" />
                    </button>
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="mint">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Watermark will be added
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <label className="block cursor-pointer">
                    <div className="border-2 border-dashed border-gallery-200 rounded-xl p-8 text-center hover:border-accent-coral transition-colors">
                      <Upload className="w-10 h-10 mx-auto mb-4 text-gallery-400" />
                      <p className="text-gallery-700 font-medium mb-1">
                        Click to upload image
                      </p>
                      <p className="text-sm text-gallery-500">
                        JPG, PNG, or WebP up to 50MB
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </label>
                )}
              </CardContent>
            </Card>
          </FadeInView>

          {/* Artwork Details */}
          <FadeInView delay={0.2}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Title"
                  placeholder="Enter artwork title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />

                <Textarea
                  label="Description"
                  placeholder="Brief description of the artwork..."
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <Textarea
                  label="The Story Behind It"
                  placeholder="Share the inspiration and story behind this piece..."
                  rows={4}
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  hint="This will appear on the artwork detail page"
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Medium"
                    placeholder="e.g., Acrylic on canvas"
                    value={medium}
                    onChange={(e) => setMedium(e.target.value)}
                  />
                  <Input
                    label="Year Created"
                    type="number"
                    placeholder="e.g., 2024"
                    value={yearCreated}
                    onChange={(e) => setYearCreated(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Width (inches)"
                    type="number"
                    step="0.5"
                    placeholder="e.g., 16"
                    value={widthInches}
                    onChange={(e) => setWidthInches(e.target.value)}
                  />
                  <Input
                    label="Height (inches)"
                    type="number"
                    step="0.5"
                    placeholder="e.g., 20"
                    value={heightInches}
                    onChange={(e) => setHeightInches(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </FadeInView>
        </div>

        {/* Status & Actions */}
        <FadeInView delay={0.3}>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-gallery-900 mb-2">Visibility</p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setStatus('draft')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        status === 'draft'
                          ? 'bg-gallery-900 text-white'
                          : 'bg-gallery-100 text-gallery-600 hover:bg-gallery-200'
                      }`}
                    >
                      Save as Draft
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatus('published')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                        status === 'published'
                          ? 'bg-accent-mint text-white'
                          : 'bg-gallery-100 text-gallery-600 hover:bg-gallery-200'
                      }`}
                    >
                      <Eye className="w-4 h-4" />
                      Publish
                    </button>
                  </div>
                </div>
                <Button type="submit" variant="accent" isLoading={isLoading}>
                  <Save className="w-4 h-4" />
                  {status === 'published' ? 'Publish Artwork' : 'Save Draft'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </FadeInView>
      </form>
    </div>
  )
}
