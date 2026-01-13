import Link from 'next/link'
import { PageWrapper } from '@/components/layout/page-wrapper'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FadeInView } from '@/components/shared/animated-page'
import { Heart, Palette, Sparkles, Star, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'About Gayle',
  description: 'Learn about Gayle, a young artist creating magical paintings that capture imagination and wonder.',
}

export default function AboutPage() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-accent-coral/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent-lavender/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <FadeInView>
                <div className="relative">
                  <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-accent-mint/20 via-accent-lavender/20 to-accent-coral/20 flex items-center justify-center overflow-hidden">
                    {/* Placeholder for artist photo */}
                    <div className="text-center p-8">
                      <span className="text-[120px] block mb-4">👩‍🎨</span>
                      <p className="text-gallery-500">Artist photo coming soon</p>
                    </div>
                  </div>
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-accent-sunshine/80 flex items-center justify-center animate-float shadow-soft">
                    <Star className="w-10 h-10 text-gallery-800" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-2xl bg-accent-coral/80 flex items-center justify-center animate-float shadow-soft" style={{ animationDelay: '1s' }}>
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                </div>
              </FadeInView>

              {/* Content */}
              <div>
                <FadeInView>
                  <Badge variant="lavender" className="mb-4">
                    <Sparkles className="w-3 h-3 mr-1" />
                    About the Artist
                  </Badge>
                </FadeInView>

                <FadeInView delay={0.1}>
                  <h1 className="font-display text-4xl md:text-5xl font-bold text-gallery-900 mb-6">
                    Hi, I&apos;m Gayle!
                  </h1>
                </FadeInView>

                <FadeInView delay={0.2}>
                  <div className="space-y-4 text-gallery-600">
                    <p className="text-lg">
                      I&apos;m a young artist who loves creating colorful paintings that come
                      straight from my imagination. Every time I pick up a brush, it&apos;s like
                      going on an adventure!
                    </p>
                    <p>
                      I started painting when I was little, and it quickly became my favorite
                      thing to do. I love mixing colors and seeing what happens, adding little
                      details that make each painting special, and creating worlds that only
                      exist in my mind.
                    </p>
                    <p>
                      My paintings are about the things I love most - nature, animals, dreams,
                      and all the magical things I imagine. I hope when you look at my art,
                      it makes you smile and dream too!
                    </p>
                  </div>
                </FadeInView>

                <FadeInView delay={0.3}>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Button variant="accent" asChild>
                      <Link href="/gallery">
                        <Palette className="w-4 h-4" />
                        See my artwork
                      </Link>
                    </Button>
                    <Button variant="secondary" asChild>
                      <Link href="/support">
                        <Heart className="w-4 h-4" />
                        Support me
                      </Link>
                    </Button>
                  </div>
                </FadeInView>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <FadeInView>
            <div className="text-center mb-16">
              <Badge variant="coral" className="mb-4">Fun Facts</Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gallery-900">
                A little more about me
              </h2>
            </div>
          </FadeInView>

          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { emoji: '🎨', title: 'Favorite Color', value: 'All of them!' },
              { emoji: '🖌️', title: 'Favorite Medium', value: 'Acrylic paint' },
              { emoji: '🌸', title: 'Favorite Subject', value: 'Nature & animals' },
              { emoji: '💭', title: 'Inspiration', value: 'Dreams & imagination' },
              { emoji: '⭐', title: 'Art Goal', value: 'Make people smile' },
              { emoji: '📚', title: 'Also Loves', value: 'Reading & exploring' },
            ].map((fact, index) => (
              <FadeInView key={fact.title} delay={index * 0.1}>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-gallery-50 to-white border border-gallery-100 hover:shadow-soft transition-shadow">
                  <span className="text-4xl mb-3 block">{fact.emoji}</span>
                  <h3 className="font-display font-semibold text-gallery-900 mb-1">
                    {fact.title}
                  </h3>
                  <p className="text-gallery-600">{fact.value}</p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Artist Statement */}
      <section className="py-24 bg-gradient-to-br from-accent-lavender/5 to-accent-mint/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <FadeInView>
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white shadow-soft flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-accent-lavender" />
              </div>
            </FadeInView>

            <FadeInView delay={0.1}>
              <blockquote className="font-display text-2xl md:text-3xl font-medium text-gallery-900 mb-6 text-balance">
                &ldquo;Art is how I share the pictures in my head with the world.
                Every painting is a piece of my imagination that I get to keep forever.&rdquo;
              </blockquote>
            </FadeInView>

            <FadeInView delay={0.2}>
              <p className="text-gallery-600">— Gayle</p>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-3xl bg-gradient-to-br from-accent-coral/10 via-accent-lavender/10 to-accent-mint/10 p-8 md:p-12">
              <div className="text-center">
                <FadeInView>
                  <h2 className="font-display text-3xl font-bold text-gallery-900 mb-4">
                    Ready to see my art?
                  </h2>
                </FadeInView>

                <FadeInView delay={0.1}>
                  <p className="text-gallery-600 max-w-xl mx-auto mb-8">
                    Explore my gallery and find a painting that speaks to you.
                    Each one has its own special story!
                  </p>
                </FadeInView>

                <FadeInView delay={0.2}>
                  <Button variant="accent" size="lg" asChild>
                    <Link href="/gallery">
                      Explore the gallery
                      <ArrowRight className="w-5 h-5" />
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
