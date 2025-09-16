'use client'

import { useEffect } from 'react'

export function ConsoleFilter() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Store original console methods
      const originalError = console.error
      const originalWarn = console.warn
      const originalLog = console.log

      // Filter out noisy development messages
      console.error = (...args: any[]) => {
        const message = args[0]?.toString() || ''
        
        if (
          message.includes('runtime.lastError') ||
          message.includes('extension port') ||
          message.includes('message channel is closed') ||
          message.includes('back/forward cache')
        ) {
          return
        }
        
        originalError.apply(console, args)
      }

      console.warn = (...args: any[]) => {
        const message = args[0]?.toString() || ''
        
        if (
          message.includes('React DevTools') ||
          message.includes('Download the React DevTools')
        ) {
          return
        }
        
        originalWarn.apply(console, args)
      }

      console.log = (...args: any[]) => {
        const message = args[0]?.toString() || ''
        
        if (
          message.includes('Injected CSS loaded successfully') ||
          message.includes('[Fast Refresh] rebuilding') ||
          message.includes('[Fast Refresh] done')
        ) {
          return
        }
        
        originalLog.apply(console, args)
      }

      // Cleanup function
      return () => {
        console.error = originalError
        console.warn = originalWarn
        console.log = originalLog
      }
    }
  }, [])

  return null
}





