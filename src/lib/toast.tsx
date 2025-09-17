'use client'

import { toast } from 'sonner'

export function showApiErrorToast(message: string, detail?: any) {
  const description = typeof detail === 'string'
    ? detail
    : (detail?.error || detail?.message || undefined)
  toast.error(message, description ? { description } : undefined)
}


