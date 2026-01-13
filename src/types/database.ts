export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'admin' | 'customer'
export type ArtworkStatus = 'draft' | 'published' | 'archived' | 'sold'
export type ProductType = 'original' | 'print' | 'digital'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: UserRole
          is_guardian: boolean
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: UserRole
          is_guardian?: boolean
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: UserRole
          is_guardian?: boolean
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          display_order?: number
          created_at?: string
        }
      }
      artworks: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          story: string | null
          category_id: string | null
          tags: string[]
          width_inches: number | null
          height_inches: number | null
          medium: string | null
          year_created: number | null
          status: ArtworkStatus
          is_featured: boolean
          display_order: number
          primary_image_id: string | null
          original_available: boolean
          original_price: number | null
          prints_available: boolean
          digital_available: boolean
          creation_timestamp: string
          blockchain_hash: string | null
          view_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          story?: string | null
          category_id?: string | null
          tags?: string[]
          width_inches?: number | null
          height_inches?: number | null
          medium?: string | null
          year_created?: number | null
          status?: ArtworkStatus
          is_featured?: boolean
          display_order?: number
          primary_image_id?: string | null
          original_available?: boolean
          original_price?: number | null
          prints_available?: boolean
          digital_available?: boolean
          creation_timestamp?: string
          blockchain_hash?: string | null
          view_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          story?: string | null
          category_id?: string | null
          tags?: string[]
          width_inches?: number | null
          height_inches?: number | null
          medium?: string | null
          year_created?: number | null
          status?: ArtworkStatus
          is_featured?: boolean
          display_order?: number
          primary_image_id?: string | null
          original_available?: boolean
          original_price?: number | null
          prints_available?: boolean
          digital_available?: boolean
          creation_timestamp?: string
          blockchain_hash?: string | null
          view_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      artwork_images: {
        Row: {
          id: string
          artwork_id: string
          original_path: string
          watermarked_path: string | null
          thumbnail_path: string | null
          width: number
          height: number
          file_size: number
          mime_type: string
          display_order: number
          alt_text: string | null
          original_hash: string
          upload_timestamp: string
          created_at: string
        }
        Insert: {
          id?: string
          artwork_id: string
          original_path: string
          watermarked_path?: string | null
          thumbnail_path?: string | null
          width: number
          height: number
          file_size: number
          mime_type: string
          display_order?: number
          alt_text?: string | null
          original_hash: string
          upload_timestamp?: string
          created_at?: string
        }
        Update: {
          id?: string
          artwork_id?: string
          original_path?: string
          watermarked_path?: string | null
          thumbnail_path?: string | null
          width?: number
          height?: number
          file_size?: number
          mime_type?: string
          display_order?: number
          alt_text?: string | null
          original_hash?: string
          upload_timestamp?: string
          created_at?: string
        }
      }
      donations: {
        Row: {
          id: string
          email: string | null
          name: string | null
          message: string | null
          is_anonymous: boolean
          amount: number
          currency: string
          stripe_payment_intent_id: string | null
          status: PaymentStatus
          created_at: string
        }
        Insert: {
          id?: string
          email?: string | null
          name?: string | null
          message?: string | null
          is_anonymous?: boolean
          amount: number
          currency?: string
          stripe_payment_intent_id?: string | null
          status?: PaymentStatus
          created_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          name?: string | null
          message?: string | null
          is_anonymous?: boolean
          amount?: number
          currency?: string
          stripe_payment_intent_id?: string | null
          status?: PaymentStatus
          created_at?: string
        }
      }
      site_settings: {
        Row: {
          id: string
          key: string
          value: Json
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          id?: string
          key: string
          value: Json
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          updated_at?: string
          updated_by?: string | null
        }
      }
    }
    Functions: {
      is_admin: {
        Args: Record<string, never>
        Returns: boolean
      }
    }
  }
}

// Convenience types
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Category = Database['public']['Tables']['categories']['Row']
export type Artwork = Database['public']['Tables']['artworks']['Row']
export type ArtworkImage = Database['public']['Tables']['artwork_images']['Row']
export type Donation = Database['public']['Tables']['donations']['Row']
export type SiteSetting = Database['public']['Tables']['site_settings']['Row']

// Extended types with relations
export type ArtworkWithImages = Artwork & {
  artwork_images: ArtworkImage[]
  category: Category | null
}
