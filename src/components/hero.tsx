'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface HeroProps {
  title: string
  subtitle: string
  image: string
  primaryCta: {
    text: string
    href: string
  }
  secondaryCta: {
    text: string
    href: string
  }
  className?: string
}

export function Hero({ 
  title, 
  subtitle, 
  image, 
  primaryCta, 
  secondaryCta, 
  className 
}: HeroProps) {
  return (
    <section className={cn("relative h-screen overflow-hidden", className)}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="display-2xl text-background mb-6 animate-in slide-in-from-bottom-4 duration-700">
              {title}
            </h1>
            <p className="text-xl text-background/90 mb-8 animate-in slide-in-from-bottom-4 duration-700 delay-200">
              {subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-bottom-4 duration-700 delay-400">
              <Button
                asChild
                size="xl"
                variant="accent"
                className="font-medium"
              >
                <Link href={primaryCta.href}>
                  {primaryCta.text}
                </Link>
              </Button>
              
              <Button
                asChild
                size="xl"
                variant="outline"
                className="font-medium border-background text-background hover:bg-background hover:text-foreground"
              >
                <Link href={secondaryCta.href}>
                  {secondaryCta.text}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-background/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-background/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}

