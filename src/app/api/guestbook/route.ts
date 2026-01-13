import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'edge'

// Get guestbook entries
export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) {
      console.error('Error fetching guestbook:', error)
      return NextResponse.json({ error: 'Failed to fetch entries' }, { status: 500 })
    }

    return NextResponse.json({ entries: data || [] })
  } catch (error) {
    console.error('Guestbook GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Create new guestbook entry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, message, emoji } = body

    // Validation
    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message are required' }, { status: 400 })
    }

    if (name.length > 50) {
      return NextResponse.json({ error: 'Name must be 50 characters or less' }, { status: 400 })
    }

    if (message.length > 500) {
      return NextResponse.json({ error: 'Message must be 500 characters or less' }, { status: 400 })
    }

    const supabase = await createClient()

    // Create the entry (auto-approved for now, can change to false for moderation)
    const { data, error } = await supabase
      .from('guestbook')
      .insert({
        name: name.trim(),
        message: message.trim(),
        emoji: emoji || '🎨',
        is_approved: true, // Set to false to require admin approval
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating guestbook entry:', error)
      return NextResponse.json({ error: 'Failed to create entry' }, { status: 500 })
    }

    return NextResponse.json({ entry: data, message: 'Thank you for signing the guestbook!' })
  } catch (error) {
    console.error('Guestbook POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
