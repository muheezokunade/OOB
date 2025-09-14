'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminHeader } from '@/components/admin/admin-header'
import { AdminAuthProvider, useAdminAuth } from '@/hooks/useAdminAuth'

function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const { admin, loading } = useAdminAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading && !admin && pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [admin, loading, pathname, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream to-fog flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-ink/70">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  // Show login page without layout
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // Show admin layout for authenticated users
  if (admin) {
    return (
      <div className="admin-layout min-h-screen bg-gradient-to-br from-cream via-fog to-stone">
        <div className="flex h-screen">
          {/* Sidebar */}
          <AdminSidebar />
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col ml-0 overflow-hidden">
            <AdminHeader />
            <main className="flex-1 p-6 bg-gradient-to-br from-cream/50 to-fog/30 overflow-auto">
              <div className="max-w-full">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminAuthProvider>
      <AdminLayoutContent>
        {children}
      </AdminLayoutContent>
    </AdminAuthProvider>
  )
}
