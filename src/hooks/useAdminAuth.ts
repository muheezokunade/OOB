'use client'

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

export interface AdminUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  permissions: string[]
}

interface AuthContextType {
  admin: AdminUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  hasPermission: (permission: string) => boolean
  hasAnyPermission: (permissions: string[]) => boolean
  hasAllPermissions: (permissions: string[]) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      if (!token) {
        setLoading(false)
        return
      }

      const response = await fetch('/api/admin/auth/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setAdmin(data.data.admin)
        } else {
          localStorage.removeItem('admin_token')
        }
      } else {
        localStorage.removeItem('admin_token')
      }
    } catch (error) {
      console.error('Auth check error:', error)
      localStorage.removeItem('admin_token')
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (data.success) {
        localStorage.setItem('admin_token', data.data.token)
        setAdmin(data.data.admin)
        return { success: true }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Login failed' }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      if (token) {
        await fetch('/api/admin/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('admin_token')
      setAdmin(null)
      router.push('/admin/login')
    }
  }

  const hasPermission = (permission: string): boolean => {
    if (!admin) return false
    if (admin.role === 'super_admin') return true
    return admin.permissions.includes(permission)
  }

  const hasAnyPermission = (permissions: string[]): boolean => {
    if (!admin) return false
    if (admin.role === 'super_admin') return true
    return permissions.some(permission => admin.permissions.includes(permission))
  }

  const hasAllPermissions = (permissions: string[]): boolean => {
    if (!admin) return false
    if (admin.role === 'super_admin') return true
    return permissions.every(permission => admin.permissions.includes(permission))
  }

  const value: AuthContextType = {
    admin,
    loading,
    login,
    logout,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider')
  }
  return context
}

// Higher-order component for protecting admin routes
export function withAdminAuth<P extends object>(
  Component: React.ComponentType<P>,
  requiredPermissions?: string[]
) {
  return function ProtectedComponent(props: P) {
    const { admin, loading, hasAnyPermission } = useAdminAuth()
    const router = useRouter()

    useEffect(() => {
      if (!loading) {
        if (!admin) {
          router.push('/admin/login')
          return
        }

        if (requiredPermissions && !hasAnyPermission(requiredPermissions)) {
          router.push('/admin/dashboard')
          return
        }
      }
    }, [admin, loading, requiredPermissions, hasAnyPermission, router])

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
        </div>
      )
    }

    if (!admin) {
      return null
    }

    if (requiredPermissions && !hasAnyPermission(requiredPermissions)) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-ink mb-2">Access Denied</h2>
            <p className="text-ink/60">You don't have permission to access this page.</p>
          </div>
        </div>
      )
    }

    return <Component {...props} />
  }
}
