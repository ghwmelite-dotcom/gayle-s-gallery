'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PageWrapper } from '@/components/layout/page-wrapper'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { FadeInView } from '@/components/shared/animated-page'
import { Heart, Sparkles, Gift, Palette, Check, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const tipAmounts = [
  { value: 5, label: '$5', description: 'Buy some paint' },
  { value: 10, label: '$10', description: 'New brushes' },
  { value: 25, label: '$25', description: 'Canvas & supplies' },
  { value: 50, label: '$50', description: 'Art class fund' },
]

export default function SupportPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25)
  const [customAmount, setCustomAmount] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!finalAmount || finalAmount < 1) return

    setIsLoading(true)

    try {
      const response = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalAmount,
          name,
          email,
          message,
          isAnonymous,
        }),
      })

      const data = await response.json()

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url
      } else {
        throw new Error(data.error || 'Failed to create checkout session')
      }
    } catch (error) {
      console.error('Donation error:', error)
      alert('Something went wrong. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-accent-coral/15 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-accent-lavender/15 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <FadeInView>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent-coral to-accent-blush flex items-center justify-center shadow-glow-coral">
                <Heart className="w-10 h-10 text-white" />
              </div>
            </FadeInView>

            <FadeInView delay={0.1}>
              <Badge variant="coral" className="mb-4">
                <Sparkles className="w-3 h-3 mr-1" />
                Support Gayle
              </Badge>
            </FadeInView>

            <FadeInView delay={0.2}>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-gallery-900 mb-6 text-balance">
                Help a young artist grow
              </h1>
            </FadeInView>

            <FadeInView delay={0.3}>
              <p className="text-lg text-gallery-600 max-w-xl mx-auto">
                Your support helps Gayle continue her artistic journey. Every contribution
                goes towards art supplies, classes, and nurturing her creative passion.
              </p>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <FadeInView>
              <Card className="shadow-soft-lg">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Amount Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gallery-700 mb-4">
                        Select an amount
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {tipAmounts.map((tip) => (
                          <button
                            key={tip.value}
                            type="button"
                            onClick={() => {
                              setSelectedAmount(tip.value)
                              setCustomAmount('')
                            }}
                            className={cn(
                              'relative p-4 rounded-xl border-2 transition-all duration-200 text-center',
                              selectedAmount === tip.value && !customAmount
                                ? 'border-accent-coral bg-accent-coral/5'
                                : 'border-gallery-200 hover:border-gallery-300'
                            )}
                          >
                            {selectedAmount === tip.value && !customAmount && (
                              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-accent-coral flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                            <span className="block font-display text-xl font-bold text-gallery-900">
                              {tip.label}
                            </span>
                            <span className="block text-xs text-gallery-500 mt-1">
                              {tip.description}
                            </span>
                          </button>
                        ))}
                      </div>

                      {/* Custom Amount */}
                      <div className="mt-4">
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gallery-500 font-medium">
                            $
                          </span>
                          <input
                            type="number"
                            min="1"
                            step="1"
                            placeholder="Custom amount"
                            value={customAmount}
                            onChange={(e) => {
                              setCustomAmount(e.target.value)
                              setSelectedAmount(null)
                            }}
                            className="w-full pl-8 pr-4 py-3 rounded-xl border border-gallery-200 focus:outline-none focus:ring-2 focus:ring-accent-coral focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Personal Info */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="anonymous"
                          checked={isAnonymous}
                          onChange={(e) => setIsAnonymous(e.target.checked)}
                          className="w-4 h-4 rounded border-gallery-300 text-accent-coral focus:ring-accent-coral"
                        />
                        <label htmlFor="anonymous" className="text-sm text-gallery-600">
                          Make my donation anonymous
                        </label>
                      </div>

                      {!isAnonymous && (
                        <div className="grid sm:grid-cols-2 gap-4">
                          <Input
                            label="Your name"
                            placeholder="Jane Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          <Input
                            label="Email"
                            type="email"
                            placeholder="jane@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      )}

                      <Textarea
                        label="Leave a message (optional)"
                        placeholder="Write an encouraging message for Gayle..."
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <Button
                        type="submit"
                        variant="accent"
                        size="lg"
                        className="w-full"
                        isLoading={isLoading}
                        disabled={!finalAmount || finalAmount < 1}
                      >
                        <Gift className="w-5 h-5" />
                        {finalAmount ? `Send $${finalAmount} tip` : 'Select an amount'}
                      </Button>
                      <p className="text-center text-xs text-gallery-500 mt-4">
                        Secure payment powered by Stripe. Your support means the world!
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* What Your Support Does */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <FadeInView>
            <div className="text-center mb-16">
              <Badge variant="mint" className="mb-4">How It Helps</Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gallery-900 mb-4">
                Your support makes a difference
              </h2>
              <p className="text-gallery-600 max-w-xl mx-auto">
                Every contribution helps Gayle continue her artistic journey.
              </p>
            </div>
          </FadeInView>

          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Palette,
                color: 'coral',
                title: 'Art Supplies',
                description: 'Quality paints, brushes, canvases, and other materials to bring her visions to life.',
              },
              {
                icon: Sparkles,
                color: 'lavender',
                title: 'Art Classes',
                description: 'Lessons and workshops to learn new techniques and develop her skills.',
              },
              {
                icon: Heart,
                color: 'mint',
                title: 'Creative Growth',
                description: 'Resources and experiences that nurture her passion for art.',
              },
            ].map((item, index) => (
              <FadeInView key={item.title} delay={index * 0.1}>
                <div className="text-center p-6">
                  <div className={cn(
                    'w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center',
                    item.color === 'coral' && 'bg-accent-coral/10',
                    item.color === 'lavender' && 'bg-accent-lavender/10',
                    item.color === 'mint' && 'bg-accent-mint/10'
                  )}>
                    <item.icon className={cn(
                      'w-8 h-8',
                      item.color === 'coral' && 'text-accent-coral',
                      item.color === 'lavender' && 'text-accent-lavender',
                      item.color === 'mint' && 'text-accent-mint'
                    )} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-gallery-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gallery-600">{item.description}</p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-gallery-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <FadeInView>
              <h2 className="font-display text-3xl font-bold text-gallery-900 mb-4">
                Want to see the art first?
              </h2>
            </FadeInView>

            <FadeInView delay={0.1}>
              <p className="text-gallery-600 mb-8">
                Explore Gayle&apos;s gallery and discover the beautiful paintings
                your support helps create.
              </p>
            </FadeInView>

            <FadeInView delay={0.2}>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/gallery">
                  <Palette className="w-5 h-5" />
                  Explore gallery
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </FadeInView>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
