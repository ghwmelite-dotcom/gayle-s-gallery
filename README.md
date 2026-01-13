# Gayle's Gallery

A beautiful, secure art portfolio platform showcasing the magical paintings of a young artist.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat-square&logo=supabase)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=flat-square&logo=stripe)

## Features

### Public Gallery
- Elegant masonry grid layout with smooth animations
- Artwork detail pages with full-screen viewing
- Category filtering and search
- Watermarked images for protection

### Supporter Donations
- Tip jar with suggested amounts ($5, $10, $25, $50)
- Secure Stripe Checkout integration
- Anonymous donation option
- Thank you page with social sharing

### Admin Dashboard
- Secure authentication with role-based access
- Upload artwork with automatic watermarking
- Manage gallery content and settings
- View donations and analytics

### Security
- Server-side image watermarking with Sharp
- Original files stored in private buckets
- Row-Level Security (RLS) on all database tables
- Protected admin routes with middleware

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Smooth animations |
| **Supabase** | Database, Auth & Storage |
| **Stripe** | Payment processing |
| **Sharp** | Image processing & watermarking |

## Getting Started

### Prerequisites
- Node.js 18+
- Supabase account
- Stripe account (for donations)

### Installation

```bash
# Clone the repository
git clone https://github.com/ghwmelite-dotcom/gayle-s-gallery.git
cd gayle-s-gallery

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase and Stripe keys

# Run database migrations
# (Run the SQL files in supabase/migrations/ in your Supabase SQL Editor)

# Start development server
npm run dev
```

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_URL=http://localhost:3000

# Optional - for donations
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## Project Structure

```
gayles-gallery/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── admin/           # Admin dashboard
│   │   ├── api/             # API routes
│   │   ├── gallery/         # Public gallery
│   │   └── support/         # Donation pages
│   ├── components/          # React components
│   │   ├── gallery/         # Gallery-specific components
│   │   ├── layout/          # Header, Footer, etc.
│   │   ├── shared/          # Animated components
│   │   └── ui/              # Base UI components
│   ├── lib/                 # Utilities
│   │   ├── images/          # Watermarking logic
│   │   └── supabase/        # Database clients
│   └── types/               # TypeScript definitions
├── supabase/
│   └── migrations/          # Database schema
└── public/                  # Static assets
```

## Design Philosophy

**"Elegant museum meets playful creativity"**

- Clean, minimal layouts that let the art shine
- Soft neutral palette with playful accent colors
- Smooth page transitions and hover animations
- Mobile-first responsive design

## License

This project is private and proprietary. All artwork displayed belongs to Gayle and is protected by copyright.

---

Made with love for a young artist's creative journey.
