'use client'

import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { PageWrapper } from '@/components/layout/page-wrapper'
import { Button } from '@/components/ui/button'
import { Confetti } from '@/components/ui/confetti'
import { Heart, Sparkles, Palette, ArrowRight, Share2 } from 'lucide-react'

function ThankYouContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [showConfetti, setShowConfetti] = useState(false)
  const [confettiKey, setConfettiKey] = useState(0)

  useEffect(() => {
    // Trigger confetti bursts when the page loads
    if (sessionId) {
      // Initial burst
      setShowConfetti(true)
      setConfettiKey((k) => k + 1)

      // Additional bursts for celebration
      const timers = [
        setTimeout(() => {
          setShowConfetti(false)
          setTimeout(() => {
            setShowConfetti(true)
            setConfettiKey((k) => k + 1)
          }, 50)
        }, 800),
        setTimeout(() => {
          setShowConfetti(false)
          setTimeout(() => {
            setShowConfetti(true)
            setConfettiKey((k) => k + 1)
          }, 50)
        }, 1600),
      ]

      return () => timers.forEach(clearTimeout)
    }
  }, [sessionId])

  return (
    <PageWrapper>
      <Confetti key={confettiKey} isActive={showConfetti} pieces={80} duration={4000} />

      <section className="relative min-h-[80vh] flex items-center justify-center py-20 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-coral/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-lavender/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 4,
            }}
            className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent-mint/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Animated heart icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
              className="relative inline-block mb-8"
            >
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-accent-coral via-accent-blush to-accent-lavender flex items-center justify-center shadow-2xl">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Heart className="w-14 h-14 text-white fill-white" />
                </motion.div>
              </div>
              {/* Sparkles around the heart */}
              {[0, 60, 120, 180, 240, 300].map((rotation, i) => (
                <motion.div
                  key={rotation}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="absolute"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${rotation}deg) translateY(-70px)`,
                  }}
                >
                  <Sparkles className="w-5 h-5 text-accent-sunshine" />
                </motion.div>
              ))}
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-display text-4xl md:text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-accent-coral via-accent-lavender to-accent-mint bg-clip-text text-transparent">
                Thank You!
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-gallery-600 mb-4"
            >
              Your generosity means the world to Gayle!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-accent-coral/5 via-accent-lavender/5 to-accent-mint/5 border border-gallery-100 mb-8 max-w-lg mx-auto"
            >
              <p className="font-display text-xl text-gallery-800 italic">
                &ldquo;Thank you for believing in me! I&apos;ll keep painting and making art just for you!&rdquo;
              </p>
              <p className="text-gallery-600 mt-2">— Gayle</p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-gallery-500 mb-10 max-w-lg mx-auto"
            >
              Your support helps fuel creativity, purchase art supplies, and nurture
              a young artist&apos;s dreams. You&apos;re amazing!
            </motion.p>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Button variant="accent" size="lg" asChild>
                <Link href="/gallery">
                  <Palette className="w-5 h-5" />
                  Explore Gallery
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/">
                  Back to Home
                </Link>
              </Button>
            </motion.div>

            {/* Share section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-16 p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20"
            >
              <p className="text-sm text-gallery-600 mb-4">
                Help spread the word about Gayle&apos;s art
              </p>
              <div className="flex items-center justify-center gap-3">
                <button className="p-3 rounded-full bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                <button className="p-3 rounded-full bg-[#4267B2]/10 hover:bg-[#4267B2]/20 text-[#4267B2] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button className="p-3 rounded-full bg-gallery-100 hover:bg-gallery-200 text-gallery-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <PageWrapper>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="animate-pulse text-center">
            <div className="w-28 h-28 mx-auto rounded-full bg-gallery-200 mb-8" />
            <div className="h-12 w-64 mx-auto bg-gallery-200 rounded-lg mb-4" />
            <div className="h-6 w-48 mx-auto bg-gallery-200 rounded-lg" />
          </div>
        </div>
      </PageWrapper>
    }>
      <ThankYouContent />
    </Suspense>
  )
}
