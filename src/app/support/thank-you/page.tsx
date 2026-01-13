import Link from 'next/link'
import { PageWrapper } from '@/components/layout/page-wrapper'
import { Button } from '@/components/ui/button'
import { FadeInView } from '@/components/shared/animated-page'
import { Heart, Sparkles, Palette, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Thank You!',
  description: 'Thank you for supporting Gayle\'s art!',
}

export default function ThankYouPage() {
  return (
    <PageWrapper>
      <section className="min-h-[70vh] flex items-center py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <FadeInView>
              <div className="relative inline-block mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent-coral to-accent-blush flex items-center justify-center shadow-glow-coral">
                  <Heart className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent-sunshine flex items-center justify-center animate-bounce">
                  <Sparkles className="w-4 h-4 text-gallery-800" />
                </div>
              </div>
            </FadeInView>

            <FadeInView delay={0.1}>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-gallery-900 mb-6">
                Thank you so much!
              </h1>
            </FadeInView>

            <FadeInView delay={0.2}>
              <p className="text-lg text-gallery-600 mb-4">
                Your generous support means the world to Gayle and helps fuel her creative journey.
              </p>
              <p className="text-gallery-600 mb-8">
                Thanks to supporters like you, she can continue creating beautiful art
                and sharing her imagination with the world.
              </p>
            </FadeInView>

            <FadeInView delay={0.3}>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-accent-coral/5 via-accent-lavender/5 to-accent-mint/5 border border-gallery-100 mb-8">
                <p className="font-display text-xl text-gallery-800 italic">
                  &ldquo;Thank you for believing in me! I&apos;ll keep painting and making art just for you!&rdquo;
                </p>
                <p className="text-gallery-600 mt-2">— Gayle</p>
              </div>
            </FadeInView>

            <FadeInView delay={0.4}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="accent" asChild>
                  <Link href="/gallery">
                    <Palette className="w-5 h-5" />
                    Explore gallery
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/">
                    Back to home
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
