'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  Bell, 
  User, 
  LogOut, 
  Settings, 
  Moon, 
  Sun,
  ChevronDown,
  Crown,
  Shield
} from 'lucide-react'
import { useAdminAuth } from '@/hooks/useAdminAuth'

export function AdminHeader() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { admin, logout } = useAdminAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'super_admin':
        return <Crown className="w-3 h-3" />
      case 'admin':
        return <Shield className="w-3 h-3" />
      default:
        return <User className="w-3 h-3" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'text-gold'
      case 'admin':
        return 'text-blue-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <header className="bg-gradient-to-r from-cream to-fog border-b border-gold/20 shadow-lg">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products, orders, customers..."
              className="pl-10 bg-stone/30 border-gold/20 focus:bg-white focus:ring-2 focus:ring-gold focus:border-gold text-ink placeholder:text-ink/60"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="text-ink/70 hover:text-ink hover:bg-stone/30"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="relative text-ink/70 hover:text-ink hover:bg-stone/30"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-gold to-yellow-400 rounded-full text-xs text-ink flex items-center justify-center font-bold shadow-md">
              3
            </span>
          </Button>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 text-ink/70 hover:text-ink hover:bg-stone/30"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-gold to-yellow-400 rounded-full flex items-center justify-center shadow-md">
                <User className="w-4 h-4 text-ink" />
              </div>
              <span className="hidden sm:block text-ink font-medium">
                {admin ? `${admin.firstName} ${admin.lastName}` : 'Admin User'}
              </span>
              <ChevronDown className="w-4 h-4" />
            </Button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-gradient-to-b from-cream to-fog border border-gold/20 rounded-lg shadow-xl z-50 backdrop-blur-sm">
                <div className="p-3 border-b border-gold/20">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-ink">
                      {admin ? `${admin.firstName} ${admin.lastName}` : 'Admin User'}
                    </p>
                    {admin && (
                      <span className={`${getRoleColor(admin.role)}`}>
                        {getRoleIcon(admin.role)}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-ink/60">
                    {admin ? admin.email : 'admin@omoonibag.com'}
                  </p>
                  {admin && (
                    <p className="text-xs text-ink/40 capitalize">
                      {admin.role.replace('_', ' ')}
                    </p>
                  )}
                </div>
                <div className="p-1">
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-ink/70 hover:text-ink hover:bg-stone/30 rounded-md transition-colors">
                    <User className="w-4 h-4" />
                    Profile
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-ink/70 hover:text-ink hover:bg-stone/30 rounded-md transition-colors">
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <hr className="my-1 border-gold/20" />
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
