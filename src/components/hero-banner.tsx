'use client'

import { useEffect, useState } from 'react'
import { DynamicBanner, type Banner } from '@/components/dynamic-banner'


export function HeroBanner() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/banners?type=hero&active=true')
        if (!response.ok) {
          throw new Error('Failed to fetch banners')
        }
        const data = await response.json()
        setBanners(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchBanners()
  }, [])

  if (loading) {
    return (
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-cream to-fog shadow-2xl animate-pulse">
        <div className="flex items-center justify-center h-full">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-red-100 to-red-200 shadow-2xl">
        <div className="flex items-center justify-center h-full">
          <div className="text-red-600">Error: {error}</div>
        </div>
      </div>
    )
  }

  // If no banners, show a fallback
  if (!banners || banners.length === 0) {
    return (
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-cream to-fog shadow-2xl">
        <div className="flex items-center justify-center h-full">
          <div className="text-muted-foreground">No banners available</div>
        </div>
      </div>
    )
  }

  return (
    <DynamicBanner
      banners={banners}
      autoSlideInterval={6000}
      showIndicators={true}
      showNavigation={true}
      className="w-full"
    />
  )
}
