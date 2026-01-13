import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FadeInView } from '@/components/shared/animated-page'
import { Heart, DollarSign, User, MessageSquare, Calendar } from 'lucide-react'
import { formatPrice, formatDate } from '@/lib/utils'
// import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Donations',
}

// Mock data - will be replaced with real data
const mockDonations: never[] = []
const totalAmount = 0
const donationCount = 0

export default async function DonationsPage() {
  // TODO: Fetch donations from Supabase
  // const supabase = createClient()
  // const { data: donations } = await supabase
  //   .from('donations')
  //   .select('*')
  //   .eq('status', 'paid')
  //   .order('created_at', { ascending: false })

  const donations = mockDonations

  return (
    <div className="space-y-8">
      {/* Header */}
      <FadeInView>
        <div>
          <h1 className="font-display text-3xl font-bold text-gallery-900">Donations</h1>
          <p className="text-gallery-600">Track supporter contributions</p>
        </div>
      </FadeInView>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <FadeInView delay={0.1}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gallery-500">Total Received</p>
                  <p className="text-3xl font-display font-bold text-gallery-900 mt-1">
                    {formatPrice(totalAmount)}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-accent-mint/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-accent-mint" />
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeInView>

        <FadeInView delay={0.15}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gallery-500">Total Supporters</p>
                  <p className="text-3xl font-display font-bold text-gallery-900 mt-1">
                    {donationCount}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-accent-coral/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-accent-coral" />
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeInView>

        <FadeInView delay={0.2}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gallery-500">Average Tip</p>
                  <p className="text-3xl font-display font-bold text-gallery-900 mt-1">
                    {donationCount > 0 ? formatPrice(totalAmount / donationCount) : '$0'}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-accent-lavender/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-accent-lavender" />
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeInView>
      </div>

      {/* Donations List */}
      <FadeInView delay={0.25}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Donations</CardTitle>
          </CardHeader>
          <CardContent>
            {donations.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent-coral/10 flex items-center justify-center">
                  <Heart className="w-10 h-10 text-accent-coral" />
                </div>
                <h3 className="font-display text-xl font-semibold text-gallery-900 mb-2">
                  No donations yet
                </h3>
                <p className="text-gallery-600 max-w-sm mx-auto">
                  Share your support page with friends and family to start receiving tips!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Donation items will render here */}
              </div>
            )}
          </CardContent>
        </Card>
      </FadeInView>
    </div>
  )
}
