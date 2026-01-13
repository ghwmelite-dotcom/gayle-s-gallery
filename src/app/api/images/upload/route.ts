import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { processUploadedImage, validateImageFile } from '@/lib/images/watermark'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Verify authentication
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify admin role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Parse form data
    const formData = await request.formData()
    const file = formData.get('file') as File
    const artworkId = formData.get('artworkId') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!artworkId) {
      return NextResponse.json({ error: 'No artwork ID provided' }, { status: 400 })
    }

    // Validate file
    const validation = validateImageFile({ type: file.type, size: file.size })
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    // Process image
    const buffer = Buffer.from(await file.arrayBuffer())
    const processed = await processUploadedImage(buffer, artworkId)

    // Generate unique filename
    const timestamp = Date.now()
    const baseName = `${artworkId}/${timestamp}`

    // Upload to Supabase Storage (all three versions)
    const [originalUpload, watermarkedUpload, thumbnailUpload] = await Promise.all([
      supabase.storage
        .from('originals')
        .upload(`${baseName}.jpg`, processed.original, {
          contentType: 'image/jpeg',
          cacheControl: '31536000', // 1 year
        }),
      supabase.storage
        .from('watermarked')
        .upload(`${baseName}.jpg`, processed.watermarked, {
          contentType: 'image/jpeg',
          cacheControl: '31536000',
        }),
      supabase.storage
        .from('thumbnails')
        .upload(`${baseName}.webp`, processed.thumbnail, {
          contentType: 'image/webp',
          cacheControl: '31536000',
        }),
    ])

    // Check for upload errors
    if (originalUpload.error) {
      console.error('Original upload error:', originalUpload.error)
      return NextResponse.json({ error: 'Failed to upload original image' }, { status: 500 })
    }
    if (watermarkedUpload.error) {
      console.error('Watermarked upload error:', watermarkedUpload.error)
      return NextResponse.json({ error: 'Failed to upload watermarked image' }, { status: 500 })
    }
    if (thumbnailUpload.error) {
      console.error('Thumbnail upload error:', thumbnailUpload.error)
      return NextResponse.json({ error: 'Failed to upload thumbnail' }, { status: 500 })
    }

    // Create database record
    const { data: imageRecord, error: dbError } = await supabase
      .from('artwork_images')
      .insert({
        artwork_id: artworkId,
        original_path: originalUpload.data.path,
        watermarked_path: watermarkedUpload.data.path,
        thumbnail_path: thumbnailUpload.data.path,
        width: processed.width,
        height: processed.height,
        file_size: processed.fileSize,
        mime_type: processed.mimeType,
        original_hash: processed.hash,
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json({ error: 'Failed to save image record' }, { status: 500 })
    }

    return NextResponse.json({
      image: imageRecord,
      message: 'Image uploaded and watermarked successfully',
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
