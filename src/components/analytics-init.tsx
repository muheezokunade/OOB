'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { analytics } from '@/lib/analytics'

export function AnalyticsInit() {
  const pathname = usePathname()

  useEffect(() => {
    analytics.initialize()
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      analytics.trackPageView(window.location.href, document.title)
    }
  }, [pathname])

  return null
}


