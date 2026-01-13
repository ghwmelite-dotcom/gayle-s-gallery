'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { FadeInView } from '@/components/shared/animated-page'
import { Settings, Save, Globe, Palette, Mail, Instagram } from 'lucide-react'

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)

  // Site settings state
  const [siteName, setSiteName] = useState("Gayle's Gallery")
  const [tagline, setTagline] = useState('Art that tells stories')
  const [contactEmail, setContactEmail] = useState('')
  const [instagram, setInstagram] = useState('')
  const [aboutText, setAboutText] = useState('')

  const handleSave = async () => {
    setIsLoading(true)
    // TODO: Save settings to Supabase
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    alert('Settings saved! (Supabase integration coming soon)')
  }

  return (
    <div className="max-w-4xl space-y-8">
      {/* Header */}
      <FadeInView>
        <div>
          <h1 className="font-display text-3xl font-bold text-gallery-900">Settings</h1>
          <p className="text-gallery-600">Configure your gallery settings</p>
        </div>
      </FadeInView>

      {/* General Settings */}
      <FadeInView delay={0.1}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-lavender/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-accent-lavender" />
              </div>
              <div>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Basic information about your gallery</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Site Name"
              placeholder="Your gallery name"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
            />
            <Input
              label="Tagline"
              placeholder="A short description"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
            />
            <Textarea
              label="About Text"
              placeholder="Tell visitors about the artist..."
              rows={4}
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
            />
          </CardContent>
        </Card>
      </FadeInView>

      {/* Contact & Social */}
      <FadeInView delay={0.2}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-mint/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-accent-mint" />
              </div>
              <div>
                <CardTitle>Contact & Social</CardTitle>
                <CardDescription>How visitors can reach you</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Contact Email"
              type="email"
              placeholder="hello@gaylesgallery.com"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
            <Input
              label="Instagram Handle"
              placeholder="@gaylesgallery"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </CardContent>
        </Card>
      </FadeInView>

      {/* Appearance */}
      <FadeInView delay={0.3}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-coral/10 flex items-center justify-center">
                <Palette className="w-5 h-5 text-accent-coral" />
              </div>
              <div>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the look of your gallery</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-xl bg-gallery-50 border border-gallery-100">
              <div className="flex items-center gap-3">
                <Badge variant="lavender">Coming Soon</Badge>
                <span className="text-gallery-600">Theme customization options</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeInView>

      {/* Save Button */}
      <FadeInView delay={0.4}>
        <div className="flex justify-end">
          <Button variant="accent" onClick={handleSave} isLoading={isLoading}>
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </FadeInView>
    </div>
  )
}
