'use client'

import { useAuthStore } from '@/store/auth-store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { UserDashboard } from '@/components/account/user-dashboard'
import { AuthModal } from '@/components/auth/auth-modal'

export default function AccountPage() {
  const { isAuthenticated, openAuthModal } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      openAuthModal('login')
    }
  }, [isAuthenticated, openAuthModal])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream to-fog flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-serif font-semibold text-ink mb-2">Please log in</h2>
          <p className="text-ink/60">You need to be logged in to access your account.</p>
        </div>
        <AuthModal />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-fog">
      <div className="container mx-auto px-4 py-8">
        <UserDashboard />
      </div>
    </div>
  )
}


