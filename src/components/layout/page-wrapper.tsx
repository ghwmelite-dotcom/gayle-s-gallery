'use client'

import { Header } from './header'
import { Footer } from './footer'
import { AnimatedPage } from '@/components/shared/animated-page'

interface PageWrapperProps {
  children: React.ReactNode
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <>
      <Header />
      <main className="flex-1">
        <AnimatedPage>{children}</AnimatedPage>
      </main>
      <Footer />
    </>
  )
}
