'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Settings, 
  Save, 
  Upload,
  Globe,
  Mail,
  CreditCard,
  Truck,
  Shield,
  Bell,
  Palette,
  Database,
  Key,
  Smartphone,
  Monitor
} from 'lucide-react'

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'OmoOniBag',
    siteDescription: 'A bag for every girl, every time.',
    siteUrl: 'https://omoonibag.com',
    adminEmail: 'admin@omoonibag.com',
    supportEmail: 'support@omoonibag.com',
    
    // Currency & Localization
    currency: 'NGN',
    currencySymbol: '₦',
    timezone: 'Africa/Lagos',
    language: 'en',
    
    // Payment Settings
    stripeEnabled: true,
    paystackEnabled: true,
    paypalEnabled: false,
    
    // Shipping Settings
    freeShippingThreshold: 50000,
    standardShippingRate: 2500,
    expressShippingRate: 5000,
    
    // Email Settings
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUser: 'noreply@omoonibag.com',
    smtpPassword: '••••••••',
    
    // Security Settings
    twoFactorEnabled: false,
    sessionTimeout: 30,
    passwordMinLength: 8,
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    orderNotifications: true,
    lowStockAlerts: true,
    
    // Theme Settings
    primaryColor: '#FFD700',
    secondaryColor: '#0B0B0B',
    accentColor: '#F5F5DC'
  })

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'shipping', label: 'Shipping', icon: Truck },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'theme', label: 'Theme', icon: Palette },
    { id: 'backup', label: 'Backup', icon: Database }
  ]

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log('Saving settings:', settings)
    // Show success message
  }

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Site Name</label>
          <Input
            value={settings.siteName}
            onChange={(e) => handleSettingChange('siteName', e.target.value)}
            placeholder="OmoOniBag"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Site URL</label>
          <Input
            value={settings.siteUrl}
            onChange={(e) => handleSettingChange('siteUrl', e.target.value)}
            placeholder="https://omoonibag.com"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-ink mb-2">Site Description</label>
        <Input
          value={settings.siteDescription}
          onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
          placeholder="A bag for every girl, every time."
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Admin Email</label>
          <Input
            value={settings.adminEmail}
            onChange={(e) => handleSettingChange('adminEmail', e.target.value)}
            type="email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Support Email</label>
          <Input
            value={settings.supportEmail}
            onChange={(e) => handleSettingChange('supportEmail', e.target.value)}
            type="email"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Currency</label>
          <select
            value={settings.currency}
            onChange={(e) => handleSettingChange('currency', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-background"
          >
            <option value="NGN">Nigerian Naira (NGN)</option>
            <option value="USD">US Dollar (USD)</option>
            <option value="EUR">Euro (EUR)</option>
            <option value="GBP">British Pound (GBP)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Currency Symbol</label>
          <Input
            value={settings.currencySymbol}
            onChange={(e) => handleSettingChange('currencySymbol', e.target.value)}
            placeholder="₦"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Timezone</label>
          <select
            value={settings.timezone}
            onChange={(e) => handleSettingChange('timezone', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-background"
          >
            <option value="Africa/Lagos">Africa/Lagos</option>
            <option value="Africa/Abuja">Africa/Abuja</option>
            <option value="UTC">UTC</option>
          </select>
        </div>
      </div>
    </div>
  )

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-ink">Payment Gateways</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-ink">Stripe</h4>
                <p className="text-sm text-muted-foreground">Credit/Debit Cards</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.stripeEnabled}
                onChange={(e) => handleSettingChange('stripeEnabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-ink">Paystack</h4>
                <p className="text-sm text-muted-foreground">Local Payment Methods</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.paystackEnabled}
                onChange={(e) => handleSettingChange('paystackEnabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-ink">PayPal</h4>
                <p className="text-sm text-muted-foreground">International Payments</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.paypalEnabled}
                onChange={(e) => handleSettingChange('paypalEnabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )

  const renderShippingSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Free Shipping Threshold</label>
          <Input
            value={settings.freeShippingThreshold}
            onChange={(e) => handleSettingChange('freeShippingThreshold', parseInt(e.target.value))}
            type="number"
            placeholder="50000"
          />
          <p className="text-sm text-muted-foreground mt-1">Minimum order amount for free shipping</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Standard Shipping Rate</label>
          <Input
            value={settings.standardShippingRate}
            onChange={(e) => handleSettingChange('standardShippingRate', parseInt(e.target.value))}
            type="number"
            placeholder="2500"
          />
          <p className="text-sm text-muted-foreground mt-1">Standard delivery rate</p>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-ink mb-2">Express Shipping Rate</label>
        <Input
          value={settings.expressShippingRate}
          onChange={(e) => handleSettingChange('expressShippingRate', parseInt(e.target.value))}
          type="number"
          placeholder="5000"
        />
        <p className="text-sm text-muted-foreground mt-1">Express delivery rate</p>
      </div>
    </div>
  )

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-ink mb-2">SMTP Host</label>
          <Input
            value={settings.smtpHost}
            onChange={(e) => handleSettingChange('smtpHost', e.target.value)}
            placeholder="smtp.gmail.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-2">SMTP Port</label>
          <Input
            value={settings.smtpPort}
            onChange={(e) => handleSettingChange('smtpPort', parseInt(e.target.value))}
            type="number"
            placeholder="587"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-ink mb-2">SMTP Username</label>
          <Input
            value={settings.smtpUser}
            onChange={(e) => handleSettingChange('smtpUser', e.target.value)}
            placeholder="noreply@omoonibag.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-2">SMTP Password</label>
          <Input
            value={settings.smtpPassword}
            onChange={(e) => handleSettingChange('smtpPassword', e.target.value)}
            type="password"
            placeholder="••••••••"
          />
        </div>
      </div>
      
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Test Email Configuration</h4>
        <p className="text-sm text-blue-700 mb-3">Send a test email to verify your SMTP settings</p>
        <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
          Send Test Email
        </Button>
      </div>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-blue-600" />
            <div>
              <h4 className="font-medium text-ink">Two-Factor Authentication</h4>
              <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.twoFactorEnabled}
              onChange={(e) => handleSettingChange('twoFactorEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
          </label>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-ink mb-2">Session Timeout (minutes)</label>
            <Input
              value={settings.sessionTimeout}
              onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
              type="number"
              placeholder="30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-2">Minimum Password Length</label>
            <Input
              value={settings.passwordMinLength}
              onChange={(e) => handleSettingChange('passwordMinLength', parseInt(e.target.value))}
              type="number"
              placeholder="8"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-ink">Notification Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <h4 className="font-medium text-ink">Email Notifications</h4>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-green-600" />
              <div>
                <h4 className="font-medium text-ink">SMS Notifications</h4>
                <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.smsNotifications}
                onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-purple-600" />
              <div>
                <h4 className="font-medium text-ink">Order Notifications</h4>
                <p className="text-sm text-muted-foreground">Get notified of new orders</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.orderNotifications}
                onChange={(e) => handleSettingChange('orderNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-orange-600" />
              <div>
                <h4 className="font-medium text-ink">Low Stock Alerts</h4>
                <p className="text-sm text-muted-foreground">Get notified when inventory is low</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.lowStockAlerts}
                onChange={(e) => handleSettingChange('lowStockAlerts', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )

  const renderThemeSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Primary Color</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={settings.primaryColor}
              onChange={(e) => handleSettingChange('primaryColor', e.target.value)}
              className="w-12 h-10 border border-border rounded-md cursor-pointer"
            />
            <Input
              value={settings.primaryColor}
              onChange={(e) => handleSettingChange('primaryColor', e.target.value)}
              placeholder="#FFD700"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Secondary Color</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={settings.secondaryColor}
              onChange={(e) => handleSettingChange('secondaryColor', e.target.value)}
              className="w-12 h-10 border border-border rounded-md cursor-pointer"
            />
            <Input
              value={settings.secondaryColor}
              onChange={(e) => handleSettingChange('secondaryColor', e.target.value)}
              placeholder="#0B0B0B"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Accent Color</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={settings.accentColor}
              onChange={(e) => handleSettingChange('accentColor', e.target.value)}
              className="w-12 h-10 border border-border rounded-md cursor-pointer"
            />
            <Input
              value={settings.accentColor}
              onChange={(e) => handleSettingChange('accentColor', e.target.value)}
              placeholder="#F5F5DC"
            />
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-muted/30 border border-border rounded-lg">
        <h4 className="font-medium text-ink mb-2">Preview</h4>
        <div className="flex items-center gap-4">
          <div 
            className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: settings.primaryColor }}
          >
            P
          </div>
          <div 
            className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: settings.secondaryColor }}
          >
            S
          </div>
          <div 
            className="w-16 h-16 rounded-lg flex items-center justify-center text-black font-bold"
            style={{ backgroundColor: settings.accentColor }}
          >
            A
          </div>
        </div>
      </div>
    </div>
  )

  const renderBackupSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-ink">Database Backup</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-blue-600" />
              <h4 className="font-medium text-ink">Manual Backup</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Create a backup of your database and files
            </p>
            <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
              <Database className="w-4 h-4 mr-2" />
              Create Backup
            </Button>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Upload className="w-6 h-6 text-green-600" />
              <h4 className="font-medium text-ink">Restore Backup</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Restore from a previous backup file
            </p>
            <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
              <Upload className="w-4 h-4 mr-2" />
              Restore Backup
            </Button>
          </Card>
        </div>
        
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-medium text-yellow-900 mb-2">⚠️ Important</h4>
          <p className="text-sm text-yellow-700">
            Always create a backup before making major changes. Restoring a backup will overwrite all current data.
          </p>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings()
      case 'payment':
        return renderPaymentSettings()
      case 'shipping':
        return renderShippingSettings()
      case 'email':
        return renderEmailSettings()
      case 'security':
        return renderSecuritySettings()
      case 'notifications':
        return renderNotificationSettings()
      case 'theme':
        return renderThemeSettings()
      case 'backup':
        return renderBackupSettings()
      default:
        return renderGeneralSettings()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-semibold text-ink">Settings</h1>
          <p className="text-muted-foreground">Configure your store settings and preferences</p>
        </div>
        <Button onClick={handleSave} className="bg-gold text-ink hover:bg-gold/90">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-gold/10 text-gold border border-gold/20'
                        : 'text-muted-foreground hover:text-ink hover:bg-muted/50'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <Card className="p-6">
            {renderTabContent()}
          </Card>
        </div>
      </div>
    </div>
  )
}

