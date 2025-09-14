'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Eye, EyeOff, Lock, Mail, Shield, Crown, Loader2, Sparkles, ArrowLeft } from 'lucide-react'
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
      <div className="min-h-screen bg-gradient-to-br from-cream via-fog to-stone flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-gold" />
          <span className="text-ink">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-fog to-stone relative overflow-hidden">
      {/* Background Pattern - Same as homepage */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold/10"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-ink/5 via-transparent to-gold/5"></div>
      
      {/* Floating Luxury Elements */}
      <div className="absolute top-20 left-20 animate-pulse">
        <div className="w-12 h-12 bg-gradient-to-br from-gold/20 to-yellow-400/20 rounded-full flex items-center justify-center border border-gold/30">
          <Crown className="w-6 h-6 text-gold" />
        </div>
      </div>
      <div className="absolute top-40 right-20 animate-bounce">
        <div className="w-10 h-10 bg-gradient-to-br from-gold/15 to-yellow-400/15 rounded-full flex items-center justify-center border border-gold/25">
          <Shield className="w-5 h-5 text-gold" />
        </div>
      </div>
      <div className="absolute bottom-40 left-20 animate-pulse delay-1000">
        <div className="w-8 h-8 bg-gradient-to-br from-gold/10 to-yellow-400/10 rounded-full flex items-center justify-center border border-gold/20">
          <Lock className="w-4 h-4 text-gold" />
        </div>
      </div>
      <div className="absolute top-60 right-40 animate-pulse delay-500">
        <div className="w-6 h-6 bg-gradient-to-br from-gold/15 to-yellow-400/15 rounded-full flex items-center justify-center border border-gold/25">
          <Sparkles className="w-3 h-3 text-gold" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Back to Home Link */}
          <div className="mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-ink/60 hover:text-gold transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to OmoOniBag</span>
            </Link>
          </div>

          {/* Admin Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gold/20 to-yellow-400/20 border border-gold/30 rounded-full px-6 py-3 mb-6 shadow-lg">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-gold font-medium text-sm tracking-wide uppercase">Nigerian Luxury Admin</span>
            </div>
            <h1 className="text-4xl font-serif font-semibold text-ink mb-3">
              Welcome Back, <span className="text-gold">Admin</span>
            </h1>
            <p className="text-ink/70 text-lg">Access your luxury brand management portal</p>
          </div>

          <Card className="bg-white/90 border border-gold/20 p-8 shadow-2xl rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-ink">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-ink/40" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@omoonibag.com"
                    className="pl-10 bg-white/50 border-gold/30 text-ink placeholder:text-ink/50 focus:border-gold focus:ring-gold/20 h-12 rounded-xl"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-semibold text-ink">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-ink/40" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 bg-white/50 border-gold/30 text-ink placeholder:text-ink/50 focus:border-gold focus:ring-gold/20 h-12 rounded-xl"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-ink/40 hover:text-gold transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Demo Credentials */}
              <div className="bg-gradient-to-r from-gold/10 to-yellow-400/10 border border-gold/30 rounded-xl p-4">
                <p className="text-gold text-sm font-semibold mb-2 flex items-center gap-2">
                  <Crown className="w-4 h-4" />
                  Demo Credentials
                </p>
                <div className="space-y-1">
                  <p className="text-ink/70 text-sm">Email: <span className="font-mono text-ink">admin@omoonibag.com</span></p>
                  <p className="text-ink/70 text-sm">Password: <span className="font-mono text-ink">admin123</span></p>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-gold to-yellow-400 text-ink hover:from-yellow-400 hover:to-gold shadow-xl hover:shadow-gold/25 transition-all duration-300 hover:scale-105 py-4 text-lg font-semibold rounded-xl"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <Crown className="w-5 h-5 mr-2" />
                    Access Admin Portal
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Security Notice */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/60 border border-gold/20 rounded-full px-4 py-2">
              <Lock className="w-4 h-4 text-gold" />
              <p className="text-ink/60 text-sm font-medium">
                Secure admin access • Protected by encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

