'use client'

import { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface CheckoutStepProps {
  title: string
  icon?: ReactNode
  children: ReactNode
  className?: string
}

export function CheckoutStep({ title, icon, children, className }: CheckoutStepProps) {
  return (
    <Card className={`bg-gradient-to-b from-cream to-fog/30 border-gold/20 ${className || ''}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-ink">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}


