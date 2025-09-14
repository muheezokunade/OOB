'use client'

import { useEffect } from 'react'
import { DynamicBanner } from '@/components/dynamic-banner'
import { useBannerStore } from '@/store/banner-store'

export function HeroBanner() {
  const { banners, loading, fetchBanners } = useBannerStore()

  useEffect(() => {
    fetchBanners('hero')
  }, [fetchBanners])

  if (loading) {
    return (
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-cream to-fog shadow-2xl animate-pulse">
        <div className="flex items-center justify-center h-full">
          <div className="text-muted-foreground">Loading...</div>
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
