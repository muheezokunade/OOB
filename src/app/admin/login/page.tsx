'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Eye, EyeOff, Lock, Mail, Shield, Crown, Loader2, Sparkles, ArrowRight } from 'lucide-react'
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
      <div className="min-h-screen bg-gradient-to-br from-cream to-fog flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-gold" />
          <span className="text-ink">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-fog to-stone flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #C7A955 2px, transparent 2px),
                            radial-gradient(circle at 75% 75%, #C7A955 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-pulse">
        <Crown className="w-12 h-12 text-gold/20" />
      </div>
      <div className="absolute top-40 right-10 animate-bounce">
        <Shield className="w-10 h-10 text-gold/25" />
      </div>
      <div className="absolute bottom-40 left-10 animate-pulse delay-1000">
        <Lock className="w-14 h-14 text-gold/20" />
      </div>
      <div className="absolute bottom-20 right-20 animate-bounce delay-500">
        <Sparkles className="w-8 h-8 text-gold/25" />
      </div>

      <div className="relative w-full max-w-md z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="accent" className="mb-6 text-sm px-4 py-2">
            <Crown className="w-4 h-4 mr-2" />
            Admin Portal
          </Badge>
          
          <h1 className="display-xl text-ink mb-3">
            Welcome Back
          </h1>
          
          <p className="text-lg text-muted-foreground">
            Sign in to manage your luxury brand
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-0 shadow-2xl bg-background/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-ink flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gold" />
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@omoonibag.com"
                  className="border-gold/30 focus:border-gold focus:ring-gold/20"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-ink flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gold" />
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pr-10 border-gold/30 focus:border-gold focus:ring-gold/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-gold transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Demo Credentials */}
              <div className="bg-gradient-to-r from-gold/10 to-yellow-400/10 border border-gold/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-gold" />
                  <p className="text-sm font-semibold text-ink">Demo Credentials</p>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>📧 Email: <span className="font-mono text-ink">admin@omoonibag.com</span></p>
                  <p>🔑 Password: <span className="font-mono text-ink">admin123</span></p>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                size="lg"
                className="w-full group"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    Sign In to Admin
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            {/* Back to Site */}
            <div className="mt-6 pt-6 border-t border-border text-center">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors text-sm group"
              >
                <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                Back to OmoOniBag
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
            <Shield className="w-3 h-3 text-gold" />
            <span>Secure admin access • Protected by encryption</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-ink">100%</div>
            <div className="text-xs text-muted-foreground">Secure</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-ink">24/7</div>
            <div className="text-xs text-muted-foreground">Access</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-ink">SSL</div>
            <div className="text-xs text-muted-foreground">Protected</div>
          </div>
        </div>
      </div>
    </div>
  )
}

