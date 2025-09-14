'use client'

import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User, Phone, X } from 'lucide-react'
import { useAuthStore, RegisterData } from '@/store/auth-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function AuthModal() {
  const {
    showAuthModal,
    authMode,
    isLoading,
    error,
    login,
    register,
    forgotPassword,
    closeAuthModal,
    setAuthMode,
    clearError
  } = useAuthStore()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  if (!showAuthModal) return null

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (error) clearError()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (authMode === 'login') {
      await login(formData.email, formData.password)
    } else if (authMode === 'register') {
      if (formData.password !== formData.confirmPassword) {
        return
      }

      const registerData: RegisterData = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone || undefined
      }

      await register(registerData)
    } else if (authMode === 'forgot-password') {
      await forgotPassword(formData.email)
    }
  }

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: ''
    })
    clearError()
  }

  const switchMode = (mode: typeof authMode) => {
    setAuthMode(mode)
    resetForm()
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gradient-to-b from-cream to-fog border-gold/20 shadow-2xl">
        <CardHeader className="relative pb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={closeAuthModal}
            className="absolute right-2 top-2 text-ink/60 hover:text-ink"
          >
            <X className="w-5 h-5" />
          </Button>
          
          <div className="text-center">
            <CardTitle className="text-2xl font-serif text-ink mb-2">
              {authMode === 'login' && 'Welcome Back'}
              {authMode === 'register' && 'Create Account'}
              {authMode === 'forgot-password' && 'Reset Password'}
            </CardTitle>
            <p className="text-ink/60 text-sm">
              {authMode === 'login' && 'Sign in to your OmoOniBag account'}
              {authMode === 'register' && 'Join our exclusive community'}
              {authMode === 'forgot-password' && 'Enter your email to reset your password'}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Register Fields */}
            {authMode === 'register' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-ink/40" />
                    <Input
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="pl-10 border-gold/20 focus:border-gold"
                      required
                    />
                  </div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-ink/40" />
                    <Input
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="pl-10 border-gold/20 focus:border-gold"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-ink/40" />
                  <Input
                    type="tel"
                    placeholder="Phone Number (Optional)"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="pl-10 border-gold/20 focus:border-gold"
                  />
                </div>
              </>
            )}

            {/* Email Field */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-ink/40" />
              <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="pl-10 border-gold/20 focus:border-gold"
                required
              />
            </div>

            {/* Password Fields */}
            {authMode !== 'forgot-password' && (
              <>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-ink/40" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 pr-10 border-gold/20 focus:border-gold"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-ink/40 hover:text-ink"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>

                {authMode === 'register' && (
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-ink/40" />
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="pl-10 pr-10 border-gold/20 focus:border-gold"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-ink/40 hover:text-ink"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                )}

                {/* Password Validation for Register */}
                {authMode === 'register' && formData.confirmPassword && (
                  <div className="text-sm">
                    {formData.password !== formData.confirmPassword ? (
                      <p className="text-red-600">Passwords do not match</p>
                    ) : (
                      <p className="text-green-600">Passwords match</p>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || (authMode === 'register' && formData.password !== formData.confirmPassword)}
              className="w-full bg-gradient-to-r from-gold to-yellow-400 text-ink hover:from-yellow-400 hover:to-gold font-medium"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                <>
                  {authMode === 'login' && 'Sign In'}
                  {authMode === 'register' && 'Create Account'}
                  {authMode === 'forgot-password' && 'Send Reset Link'}
                </>
              )}
            </Button>
          </form>

          {/* Mode Switching */}
          <div className="space-y-3 pt-4 border-t border-gold/20">
            {authMode === 'login' && (
              <div className="text-center space-y-2">
                <button
                  onClick={() => switchMode('forgot-password')}
                  className="text-sm text-gold hover:text-yellow-600 transition-colors"
                >
                  Forgot your password?
                </button>
                <div className="text-sm text-ink/60">
                  Don't have an account?{' '}
                  <button
                    onClick={() => switchMode('register')}
                    className="text-gold hover:text-yellow-600 font-medium transition-colors"
                  >
                    Sign up
                  </button>
                </div>
              </div>
            )}

            {authMode === 'register' && (
              <div className="text-center">
                <div className="text-sm text-ink/60">
                  Already have an account?{' '}
                  <button
                    onClick={() => switchMode('login')}
                    className="text-gold hover:text-yellow-600 font-medium transition-colors"
                  >
                    Sign in
                  </button>
                </div>
              </div>
            )}

            {authMode === 'forgot-password' && (
              <div className="text-center">
                <div className="text-sm text-ink/60">
                  Remember your password?{' '}
                  <button
                    onClick={() => switchMode('login')}
                    className="text-gold hover:text-yellow-600 font-medium transition-colors"
                  >
                    Sign in
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Benefits for Register */}
          {authMode === 'register' && (
            <div className="bg-gradient-to-r from-gold/10 to-yellow-400/10 p-4 rounded-lg">
              <h4 className="font-medium text-ink mb-2">Member Benefits</h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-ink/70">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gold rounded-full" />
                  Exclusive offers
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gold rounded-full" />
                  Order tracking
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gold rounded-full" />
                  Wishlist sync
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gold rounded-full" />
                  Priority support
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}



