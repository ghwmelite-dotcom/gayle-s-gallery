import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FadeInView } from '@/components/shared/animated-page'
import {
  Image,
  Heart,
  Eye,
  TrendingUp,
  Plus,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
// import { createClient } from '@/lib/supabase/server'

// Mock stats - will be replaced with real data
const stats = {
  totalArtworks: 0,
  publishedArtworks: 0,
  totalDonations: 0,
  totalRevenue: 0,
  recentViews: 0,
}

export const metadata = {
  title: 'Dashboard',
}

export default async function AdminDashboardPage() {
  // TODO: Fetch real stats from Supabase
  // const supabase = createClient()

  return (
    <div className="space-y-8">
      {/* Header */}
      <FadeInView>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-gallery-900">Dashboard</h1>
            <p className="text-gallery-600">Welcome back! Here&apos;s what&apos;s happening.</p>
          </div>
          <Button variant="accent" asChild>
            <Link href="/admin/artworks/new">
              <Plus className="w-4 h-4" />
              Add artwork
            </Link>
          </Button>
        </div>
      </FadeInView>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: 'Total Artworks',
            value: stats.totalArtworks,
            icon: Image,
            color: 'coral',
            change: '+2 this month',
          },
          {
            title: 'Published',
            value: stats.publishedArtworks,
            icon: Eye,
            color: 'mint',
            change: 'Live on gallery',
          },
          {
            title: 'Donations',
            value: stats.totalDonations,
            icon: Heart,
            color: 'lavender',
            change: 'Supporters',
          },
          {
            title: 'Total Tips',
            value: `$${stats.totalRevenue}`,
            icon: TrendingUp,
            color: 'sunshine',
            change: 'All time',
          },
        ].map((stat, index) => (
          <FadeInView key={stat.title} delay={index * 0.1}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gallery-500">{stat.title}</p>
                    <p className="text-3xl font-display font-bold text-gallery-900 mt-1">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gallery-500 mt-1">{stat.change}</p>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      stat.color === 'coral' ? 'bg-accent-coral/10 text-accent-coral' :
                      stat.color === 'mint' ? 'bg-accent-mint/10 text-accent-mint' :
                      stat.color === 'lavender' ? 'bg-accent-lavender/10 text-accent-lavender' :
                      'bg-accent-sunshine/30 text-gallery-800'
                    }`}
                  >
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeInView>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Artworks */}
        <FadeInView delay={0.2}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Artworks</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/artworks">
                  View all
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {stats.totalArtworks === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gallery-100 flex items-center justify-center">
                    <Image className="w-8 h-8 text-gallery-400" />
                  </div>
                  <p className="text-gallery-600 mb-4">No artworks yet</p>
                  <Button variant="accent" size="sm" asChild>
                    <Link href="/admin/artworks/new">
                      <Plus className="w-4 h-4" />
                      Add first artwork
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Artwork list will go here */}
                </div>
              )}
            </CardContent>
          </Card>
        </FadeInView>

        {/* Recent Donations */}
        <FadeInView delay={0.3}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Donations</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/donations">
                  View all
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {stats.totalDonations === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-coral/10 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-accent-coral" />
                  </div>
                  <p className="text-gallery-600 mb-2">No donations yet</p>
                  <p className="text-sm text-gallery-500">
                    Share your support page to receive tips!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Donation list will go here */}
                </div>
              )}
            </CardContent>
          </Card>
        </FadeInView>
      </div>

      {/* Getting Started */}
      {stats.totalArtworks === 0 && (
        <FadeInView delay={0.4}>
          <Card className="bg-gradient-to-br from-accent-coral/5 via-accent-lavender/5 to-accent-mint/5 border-none">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-sunshine/50 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-gallery-800" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-gallery-900 mb-2">
                    Getting Started
                  </h3>
                  <p className="text-gallery-600 mb-4">
                    Welcome to your admin dashboard! Here&apos;s how to get started:
                  </p>
                  <ol className="space-y-2 text-gallery-600">
                    <li className="flex items-start gap-2">
                      <Badge variant="coral" className="mt-0.5">1</Badge>
                      <span>Upload your first artwork with a beautiful image</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="lavender" className="mt-0.5">2</Badge>
                      <span>Add a title, description, and story behind the art</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge variant="mint" className="mt-0.5">3</Badge>
                      <span>Publish it to share with the world!</span>
                    </li>
                  </ol>
                  <Button variant="accent" className="mt-6" asChild>
                    <Link href="/admin/artworks/new">
                      <Plus className="w-4 h-4" />
                      Upload your first artwork
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeInView>
      )}
    </div>
  )
}
