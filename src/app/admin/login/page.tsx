'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Eye, EyeOff, Lock, Mail, Shield, Crown, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useAdminAuth } from '@/hooks/useAdminAuth'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const { login, admin, loading } = useAdminAuth()
  const router = useRouter()

  // Redirect if already logged in
  useEffect(() => {
    if (admin && !loading) {
      router.push('/admin/dashboard')
    }
  }, [admin, loading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const result = await login(email, password)
    
    if (result.success) {
      router.push('/admin/dashboard')
    } else {
      setError(result.error || 'Login failed')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ink via-coal to-ink flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-gold" />
          <span className="text-cream">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ink via-coal to-ink flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,215,0,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,215,0,0.05),transparent_50%)]"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 animate-pulse">
        <Crown className="w-8 h-8 text-gold/30" />
      </div>
      <div className="absolute top-40 right-20 animate-bounce">
        <Shield className="w-6 h-6 text-gold/40" />
      </div>
      <div className="absolute bottom-40 left-20 animate-pulse delay-1000">
        <Lock className="w-7 h-7 text-gold/25" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Admin Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gold/20 to-yellow-400/20 backdrop-blur-sm border border-gold/30 rounded-full px-6 py-3 mb-6">
            <Crown className="w-5 h-5 text-gold" />
            <span className="text-gold font-medium text-sm tracking-wide uppercase">Admin Portal</span>
          </div>
          <h1 className="text-3xl font-serif text-cream mb-2">Welcome Back</h1>
          <p className="text-fog">Sign in to manage your luxury brand</p>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border border-gold/20 p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-cream">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-fog" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@omoonibag.com"
                  className="pl-10 bg-white/10 border-gold/30 text-cream placeholder:text-fog focus:border-gold focus:ring-gold/20"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-cream">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-fog" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 bg-white/10 border-gold/30 text-cream placeholder:text-fog focus:border-gold focus:ring-gold/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fog hover:text-gold transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            {/* Demo Credentials */}
            <div className="bg-gold/10 border border-gold/30 rounded-lg p-4">
              <p className="text-gold text-sm font-medium mb-2">Demo Credentials:</p>
              <p className="text-fog text-xs">Email: admin@omoonibag.com</p>
              <p className="text-fog text-xs">Password: admin123</p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-gold to-yellow-400 text-ink hover:from-yellow-400 hover:to-gold shadow-2xl hover:shadow-gold/25 transition-all duration-500 hover:scale-105 py-3 text-lg font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In to Admin'
              )}
            </Button>
          </form>

          {/* Back to Site */}
          <div className="mt-6 text-center">
            <Link 
              href="/" 
              className="text-fog hover:text-gold transition-colors text-sm"
            >
              ← Back to OmoOniBag
            </Link>
          </div>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-fog/60 text-xs">
            🔒 Secure admin access • Protected by encryption
          </p>
        </div>
      </div>
    </div>
  )
}

