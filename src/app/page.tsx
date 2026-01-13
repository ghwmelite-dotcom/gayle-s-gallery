import Link from 'next/link'
import { ArrowRight, Heart, Palette, Sparkles, Star } from 'lucide-react'
import { PageWrapper } from '@/components/layout/page-wrapper'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FadeInView } from '@/components/shared/animated-page'

export default function HomePage() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent-coral/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-lavender/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-mint/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FadeInView>
              <Badge variant="lavender" className="mb-6">
                <Sparkles className="w-3 h-3 mr-1" />
                Welcome to Gayle&apos;s world of art
              </Badge>
            </FadeInView>

            <FadeInView delay={0.1}>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-gallery-900 mb-6 text-balance">
                Where{' '}
                <span className="gradient-text">imagination</span>
                {' '}meets canvas
              </h1>
            </FadeInView>

            <FadeInView delay={0.2}>
              <p className="text-xl text-gallery-600 mb-8 max-w-2xl mx-auto text-balance">
                Discover the magical, colorful world of Gayle&apos;s original paintings.
                Each piece tells a unique story, capturing wonder and creativity.
              </p>
            </FadeInView>

            <FadeInView delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="accent" size="lg" asChild>
                  <Link href="/gallery">
                    <Palette className="w-5 h-5" />
                    Explore Gallery
                  </Link>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/about">
                    Meet Gayle
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </FadeInView>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-1/4 left-8 animate-float hidden lg:block">
          <div className="w-16 h-16 rounded-2xl bg-accent-coral/20 backdrop-blur-sm flex items-center justify-center">
            <Star className="w-8 h-8 text-accent-coral" />
          </div>
        </div>
        <div className="absolute bottom-1/4 right-8 animate-float hidden lg:block" style={{ animationDelay: '2s' }}>
          <div className="w-16 h-16 rounded-2xl bg-accent-mint/20 backdrop-blur-sm flex items-center justify-center">
            <Heart className="w-8 h-8 text-accent-mint" />
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <FadeInView>
            <div className="text-center mb-16">
              <Badge variant="coral" className="mb-4">Featured</Badge>
              <h2 className="font-display text-4xl font-bold text-gallery-900 mb-4">
                Latest creations
              </h2>
              <p className="text-gallery-600 max-w-xl mx-auto">
                Explore Gayle&apos;s newest paintings, each one a unique window into her creative imagination.
              </p>
            </div>
          </FadeInView>

          {/* Placeholder for featured artworks - will be dynamic */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <FadeInView key={i} delay={i * 0.1}>
                <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-gallery-100 to-gallery-200 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/50 flex items-center justify-center">
                      <Palette className="w-8 h-8 text-gallery-400" />
                    </div>
                    <p className="text-gallery-500">Artwork coming soon</p>
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>

          <FadeInView delay={0.4}>
            <div className="text-center mt-12">
              <Button variant="primary" asChild>
                <Link href="/gallery">
                  View all artwork
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-24 bg-gradient-to-br from-gallery-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-3xl bg-gradient-to-br from-accent-coral/10 via-accent-lavender/10 to-accent-mint/10 p-8 md:p-12 overflow-hidden">
              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-sunshine/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <div className="relative z-10 text-center">
                <FadeInView>
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white shadow-soft flex items-center justify-center">
                    <Heart className="w-10 h-10 text-accent-coral" />
                  </div>
                </FadeInView>

                <FadeInView delay={0.1}>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-gallery-900 mb-4">
                    Support a young artist
                  </h2>
                </FadeInView>

                <FadeInView delay={0.2}>
                  <p className="text-gallery-600 max-w-xl mx-auto mb-8">
                    Your support helps Gayle continue creating beautiful art. Every contribution
                    goes towards art supplies, education, and nurturing her creative journey.
                  </p>
                </FadeInView>

                <FadeInView delay={0.3}>
                  <Button variant="accent" size="lg" asChild>
                    <Link href="/support">
                      <Heart className="w-5 h-5" />
                      Send a tip
                    </Link>
                  </Button>
                </FadeInView>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <FadeInView>
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-accent-lavender/20 to-accent-mint/20 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-8xl">👩‍🎨</span>
                    <p className="mt-4 text-gallery-500">Artist photo</p>
                  </div>
                </div>
              </FadeInView>

              <div>
                <FadeInView>
                  <Badge variant="mint" className="mb-4">About the Artist</Badge>
                </FadeInView>

                <FadeInView delay={0.1}>
                  <h2 className="font-display text-4xl font-bold text-gallery-900 mb-6">
                    Meet Gayle
                  </h2>
                </FadeInView>

                <FadeInView delay={0.2}>
                  <p className="text-gallery-600 mb-4">
                    Gayle is a young artist with a passion for bringing imagination to life through
                    vibrant colors and playful compositions. Her work reflects the wonder and joy
                    of seeing the world through creative eyes.
                  </p>
                </FadeInView>

                <FadeInView delay={0.3}>
                  <p className="text-gallery-600 mb-8">
                    Each painting is a unique expression of her artistic journey, capturing moments
                    of inspiration and transforming them into beautiful works of art.
                  </p>
                </FadeInView>

                <FadeInView delay={0.4}>
                  <Button variant="secondary" asChild>
                    <Link href="/about">
                      Learn more
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </FadeInView>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
