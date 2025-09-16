'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function AdminRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in by checking localStorage
    const token = localStorage.getItem('admin_token')
    
    if (token) {
      // User is logged in, redirect to dashboard
      router.push('/admin/dashboard')
    } else {
      // User is not logged in, redirect to login
      router.push('/admin/login')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-fog flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-ink/70">Redirecting to admin panel...</p>
      </div>
    </div>
  )
}



