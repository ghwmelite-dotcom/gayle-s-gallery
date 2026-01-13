'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageWrapper } from '@/components/layout/page-wrapper'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { PaintDotsLoader } from '@/components/ui/loading'
import { BookOpen, Send, Sparkles, Heart, Star, Palette, Music, Sun } from 'lucide-react'

interface GuestbookEntry {
  id: string
  name: string
  message: string
  emoji: string
  created_at: string
}

const emojiOptions = [
  { emoji: '🎨', label: 'Art' },
  { emoji: '❤️', label: 'Love' },
  { emoji: '⭐', label: 'Star' },
  { emoji: '🌟', label: 'Sparkle' },
  { emoji: '🌈', label: 'Rainbow' },
  { emoji: '🦋', label: 'Butterfly' },
  { emoji: '🌸', label: 'Flower' },
  { emoji: '✨', label: 'Magic' },
]

function GuestbookCard({ entry, index }: { entry: GuestbookEntry; index: number }) {
  const date = new Date(entry.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  // Rotate cards slightly for a playful effect
  const rotation = (index % 5 - 2) * 2

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: rotation }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02, rotate: 0, zIndex: 10 }}
      className="relative"
    >
      <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg border border-white/40 hover:shadow-xl transition-shadow">
        {/* Emoji badge */}
        <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-accent-coral to-accent-lavender flex items-center justify-center text-xl shadow-md">
          {entry.emoji}
        </div>

        {/* Message */}
        <p className="text-gallery-700 mb-4 leading-relaxed">{entry.message}</p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="font-display font-semibold text-gallery-900">{entry.name}</span>
          <span className="text-xs text-gallery-400">{date}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function GuestbookPage() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    emoji: '🎨',
  })
  const [submitMessage, setSubmitMessage] = useState('')

  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    try {
      const response = await fetch('/api/guestbook')
      const data = await response.json()
      if (data.entries) {
        setEntries(data.entries)
      }
    } catch (error) {
      console.error('Error fetching guestbook:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.message.trim()) return

    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitMessage('Thank you for signing the guestbook!')
        setFormData({ name: '', message: '', emoji: '🎨' })
        setShowForm(false)
        // Add the new entry to the top
        if (data.entry) {
          setEntries([data.entry, ...entries])
        }
      } else {
        setSubmitMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting:', error)
      setSubmitMessage('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-10 right-1/4 w-72 h-72 bg-accent-lavender/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, delay: 2 }}
            className="absolute bottom-10 left-1/4 w-80 h-80 bg-accent-mint/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent-lavender to-accent-mint flex items-center justify-center shadow-lg"
            >
              <BookOpen className="w-10 h-10 text-white" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Badge variant="lavender" className="mb-4">
                <Sparkles className="w-3 h-3 mr-1" />
                Leave Your Mark
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display text-4xl md:text-5xl font-bold text-gallery-900 mb-6"
            >
              Guestbook
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-gallery-600 max-w-xl mx-auto mb-8"
            >
              Leave a message for Gayle! Your kind words inspire and encourage
              her to keep creating beautiful art.
            </motion.p>

            {/* Sign button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                variant="accent"
                size="lg"
                onClick={() => setShowForm(!showForm)}
              >
                <Sparkles className="w-5 h-5" />
                {showForm ? 'Cancel' : 'Sign the Guestbook'}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <AnimatePresence>
        {showForm && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pb-8 overflow-hidden"
          >
            <div className="container mx-auto px-4">
              <div className="max-w-xl mx-auto">
                <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl border border-white/40">
                  <div className="space-y-6">
                    <Input
                      label="Your name"
                      placeholder="What should we call you?"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      maxLength={50}
                      required
                    />

                    <Textarea
                      label="Your message"
                      placeholder="Write something nice for Gayle..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      maxLength={500}
                      required
                    />

                    {/* Emoji picker */}
                    <div>
                      <label className="block text-sm font-medium text-gallery-700 mb-3">
                        Pick an emoji
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {emojiOptions.map((option) => (
                          <button
                            key={option.emoji}
                            type="button"
                            onClick={() => setFormData({ ...formData, emoji: option.emoji })}
                            className={`w-12 h-12 rounded-xl text-2xl flex items-center justify-center transition-all ${
                              formData.emoji === option.emoji
                                ? 'bg-gradient-to-br from-accent-coral to-accent-lavender scale-110 shadow-lg'
                                : 'bg-gallery-100 hover:bg-gallery-200'
                            }`}
                          >
                            {option.emoji}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="accent"
                      className="w-full"
                      disabled={isSubmitting || !formData.name.trim() || !formData.message.trim()}
                      isLoading={isSubmitting}
                    >
                      <Send className="w-5 h-5" />
                      Sign Guestbook
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Success/Error Message */}
      <AnimatePresence>
        {submitMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="container mx-auto px-4 pb-8"
          >
            <div className="max-w-xl mx-auto p-4 rounded-xl bg-accent-mint/20 text-center">
              <p className="text-gallery-700 font-medium">{submitMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Entries Section */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center py-16">
              <PaintDotsLoader />
            </div>
          ) : entries.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gallery-100 to-gallery-200 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-gallery-400" />
              </div>
              <h3 className="font-display text-xl font-semibold text-gallery-900 mb-2">
                Be the first to sign!
              </h3>
              <p className="text-gallery-600">
                The guestbook is waiting for its first message.
              </p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {entries.map((entry, index) => (
                <GuestbookCard key={entry.id} entry={entry} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  )
}
