'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { PageWrapper } from '@/components/layout/page-wrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { FadeInView } from '@/components/shared/animated-page'
import { Lock, Mail, ArrowRight, Palette, Loader2 } from 'lucide-react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const supabase = createClient()

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      setIsLoading(false)
      return
    }

    if (data.session) {
      // Wait a moment for cookies to be set
      await new Promise(resolve => setTimeout(resolve, 100))

      // Force a hard navigation to ensure middleware runs fresh
      window.location.href = redirect
    } else {
      setError('Login failed - no session created')
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      <Input
        type="email"
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        type="password"
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button
        type="submit"
        variant="accent"
        className="w-full"
        isLoading={isLoading}
      >
        <Mail className="w-4 h-4" />
        Sign in
      </Button>
    </form>
  )
}

function LoginFormFallback() {
  return (
    <div className="space-y-4">
      <Input
        type="email"
        label="Email"
        placeholder="Enter your email"
        disabled
      />
      <Input
        type="password"
        label="Password"
        placeholder="Enter your password"
        disabled
      />
      <Button
        type="button"
        variant="accent"
        className="w-full"
        disabled
      >
        <Loader2 className="w-4 h-4 animate-spin" />
        Loading...
      </Button>
    </div>
  )
}

export default function LoginPage() {
  return (
    <PageWrapper>
      <section className="min-h-[70vh] flex items-center py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <FadeInView>
              <Card className="shadow-soft-lg">
                <CardHeader className="text-center pb-2">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent-coral to-accent-lavender flex items-center justify-center">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Admin Login</CardTitle>
                  <CardDescription>
                    Sign in to manage Gayle&apos;s Gallery
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <Suspense fallback={<LoginFormFallback />}>
                    <LoginForm />
                  </Suspense>

                  <div className="mt-6 pt-6 border-t border-gallery-100 text-center">
                    <Link
                      href="/"
                      className="text-sm text-gallery-600 hover:text-gallery-900 inline-flex items-center gap-1"
                    >
                      <Palette className="w-4 h-4" />
                      Back to gallery
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </FadeInView>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
