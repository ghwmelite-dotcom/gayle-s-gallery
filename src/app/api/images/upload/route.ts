import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'edge'

// Simple file validation (without Sharp)
function validateImageFile(file: { type: string; size: number }) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  const maxSize = 10 * 1024 * 1024 // 10MB

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Please upload JPEG, PNG, or WebP.' }
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File too large. Maximum size is 10MB.' }
  }

  return { valid: true }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Verify authentication
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify admin role
    const { data: isAdmin } = await supabase.rpc('is_admin')
    if (!isAdmin) {
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

    // Get file buffer
    const buffer = await file.arrayBuffer()
    const uint8Array = new Uint8Array(buffer)

    // Generate unique filename
    const timestamp = Date.now()
    const extension = file.type.split('/')[1]
    const baseName = `${artworkId}/${timestamp}`

    // Upload to Supabase Storage (single version for now - watermarking disabled on Edge)
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('gallery')
      .upload(`${baseName}.${extension}`, uint8Array, {
        contentType: file.type,
        cacheControl: '31536000',
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
    }

    // Create database record
    const { data: imageRecord, error: dbError } = await supabase
      .from('artwork_images')
      .insert({
        artwork_id: artworkId,
        original_path: uploadData.path,
        watermarked_path: uploadData.path, // Same as original for now
        thumbnail_path: uploadData.path,
        file_size: file.size,
        is_primary: true,
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json({ error: 'Failed to save image record' }, { status: 500 })
    }

    return NextResponse.json({
      image: imageRecord,
      message: 'Image uploaded successfully',
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
