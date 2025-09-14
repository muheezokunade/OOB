'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CloudinaryImage } from '@/components/ui/cloudinary-image'
import { ChevronLeft, ChevronRight, Star, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Banner {
  id: string
  title: string
  subtitle?: string
  image: string
  link?: string
  linkText?: string
  type: string
  category?: string
  priority: number
  isActive: boolean
  startDate?: string
  endDate?: string
}

interface DynamicBannerProps {
  banners: Banner[]
  autoSlideInterval?: number // in milliseconds
  showIndicators?: boolean
  showNavigation?: boolean
  className?: string
}

export function DynamicBanner({
  banners,
  autoSlideInterval = 5000,
  showIndicators = true,
  showNavigation = true,
  className
}: DynamicBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Filter active banners
  const activeBanners = banners.filter(banner => {
    if (!banner.isActive) return false
    
    const now = new Date()
    const startDate = banner.startDate ? new Date(banner.startDate) : null
    const endDate = banner.endDate ? new Date(banner.endDate) : null
    
    if (startDate && now < startDate) return false
    if (endDate && now > endDate) return false
    
    return true
  })

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying || activeBanners.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === activeBanners.length - 1 ? 0 : prevIndex + 1
      )
    }, autoSlideInterval)

    return () => clearInterval(interval)
  }, [isAutoPlaying, activeBanners.length, autoSlideInterval])

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? activeBanners.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === activeBanners.length - 1 ? 0 : currentIndex + 1)
  }

  if (activeBanners.length === 0) {
    return (
      <div className={cn("relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-cream to-fog shadow-2xl", className)}>
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">No banners available</p>
        </div>
      </div>
    )
  }

  const currentBanner = activeBanners[currentIndex]

  return (
    <div 
      className={cn("relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-cream to-fog shadow-2xl", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Banner Image */}
      <div className="relative w-full h-full">
        <CloudinaryImage
          src={currentBanner.image}
          alt={currentBanner.title}
          fill
          className="object-cover transition-opacity duration-500"
          priority={currentIndex === 0}
          quality="auto"
          crop="fill"
          gravity="auto"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-coal/60 via-transparent to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          {/* Top Badges */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2">
              {currentBanner.category && (
                <Badge variant="accent" className="text-xs">
                  {currentBanner.category}
                </Badge>
              )}
              {currentBanner.type === 'hero' && (
                <Badge variant="secondary" className="text-xs bg-background/20 text-background border-background/20">
                  Premium Collection
                </Badge>
              )}
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-gold fill-current" />
                  <span className="text-xs font-medium">Premium Quality</span>
                </div>
              </div>
              
              <div className="bg-coal text-background rounded-full px-3 py-1 shadow-lg">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span className="text-xs font-medium">Trending Now</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Content */}
          <div className="text-background">
            <h2 className="text-2xl font-bold mb-2 leading-tight">
              {currentBanner.title}
            </h2>
            {currentBanner.subtitle && (
              <p className="text-background/90 mb-4 text-sm leading-relaxed">
                {currentBanner.subtitle}
              </p>
            )}
            {currentBanner.link && currentBanner.linkText && (
              <Button 
                asChild 
                variant="secondary" 
                size="sm"
                className="group"
              >
                <Link href={currentBanner.link}>
                  {currentBanner.linkText}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {showNavigation && activeBanners.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/20 backdrop-blur-sm hover:bg-background/30 rounded-full p-2 transition-all duration-200"
            aria-label="Previous banner"
          >
            <ChevronLeft className="w-5 h-5 text-background" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/20 backdrop-blur-sm hover:bg-background/30 rounded-full p-2 transition-all duration-200"
            aria-label="Next banner"
          >
            <ChevronRight className="w-5 h-5 text-background" />
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && activeBanners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {activeBanners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                index === currentIndex 
                  ? "bg-background scale-125" 
                  : "bg-background/50 hover:bg-background/75"
              )}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Auto-play indicator */}
      {isAutoPlaying && activeBanners.length > 1 && (
        <div className="absolute top-4 left-4 bg-background/20 backdrop-blur-sm rounded-full px-2 py-1">
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 bg-background rounded-full animate-pulse" />
            <span className="text-xs text-background">Auto</span>
          </div>
        </div>
      )}
    </div>
  )
}
