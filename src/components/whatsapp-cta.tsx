'use client'

import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'

interface WhatsAppCTAProps {
  phone?: string
  message?: string
  className?: string
  variant?: 'floating' | 'inline'
}

export function WhatsAppCTA({ 
  phone = '2349061819572',
  message,
  className,
  variant = 'floating'
}: WhatsAppCTAProps) {
  const handleClick = () => {
    const url = getWhatsAppUrl(phone, message)
    window.open(url, '_blank')
  }

  if (variant === 'floating') {
    return (
      <Button
        onClick={handleClick}
        size="icon"
        variant="accent"
        className={`
          fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-elevated
          hover:scale-110 transition-transform duration-200
          animate-in slide-in-from-bottom-2 duration-500 delay-1000
          ${className}
        `}
        aria-label="Message us on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Button
      onClick={handleClick}
      variant="accent"
      className={className}
    >
      <MessageCircle className="h-4 w-4 mr-2" />
      Message on WhatsApp
    </Button>
  )
}

