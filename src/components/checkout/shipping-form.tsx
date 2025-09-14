'use client'

import { useState } from 'react'
import { MapPin, Truck, Clock, Check } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { ShippingMethod } from '@/store/order-store'
import { formatCurrency } from '@/store/cart-store'
import { cn } from '@/lib/utils'

interface Address {
  firstName: string
  lastName: string
  phone: string
  street: string
  city: string
  state: string
  country: string
  postalCode: string
  additionalInfo: string
}

interface ShippingFormProps {
  shippingAddress: Address
  setShippingAddress: (address: Address) => void
  billingAddress: Address
  setBillingAddress: (address: Address) => void
  shippingMethods: ShippingMethod[]
  selectedShippingMethod: ShippingMethod | null
  onSelectShippingMethod: (method: ShippingMethod) => void
  orderNotes: string
  setOrderNotes: (notes: string) => void
}

export function ShippingForm({
  shippingAddress,
  setShippingAddress,
  billingAddress,
  setBillingAddress,
  shippingMethods,
  selectedShippingMethod,
  onSelectShippingMethod,
  orderNotes,
  setOrderNotes
}: ShippingFormProps) {
  const [useSameAddress, setUseSameAddress] = useState(true)

  const handleShippingAddressChange = (field: keyof Address, value: string) => {
    setShippingAddress({
      ...shippingAddress,
      [field]: value
    })
  }

  const handleBillingAddressChange = (field: keyof Address, value: string) => {
    setBillingAddress({
      ...billingAddress,
      [field]: value
    })
  }

  const handleUseSameAddressChange = (checked: boolean) => {
    setUseSameAddress(checked)
    if (checked) {
      setBillingAddress(shippingAddress)
    }
  }

  return (
    <div className="space-y-6">
      {/* Shipping Address */}
      <Card className="bg-gradient-to-b from-cream to-fog/30 border-gold/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-ink">
            <MapPin className="w-5 h-5 text-gold" />
            Shipping Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-2">First Name *</label>
              <Input
                value={shippingAddress.firstName}
                onChange={(e) => handleShippingAddressChange('firstName', e.target.value)}
                placeholder="Enter your first name"
                className="border-gold/30 focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Last Name *</label>
              <Input
                value={shippingAddress.lastName}
                onChange={(e) => handleShippingAddressChange('lastName', e.target.value)}
                placeholder="Enter your last name"
                className="border-gold/30 focus:border-gold"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-2">Phone Number *</label>
            <Input
              value={shippingAddress.phone}
              onChange={(e) => handleShippingAddressChange('phone', e.target.value)}
              placeholder="+234 901 234 5678"
              className="border-gold/30 focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-2">Street Address *</label>
            <Input
              value={shippingAddress.street}
              onChange={(e) => handleShippingAddressChange('street', e.target.value)}
              placeholder="123 Main Street, Apartment 4B"
              className="border-gold/30 focus:border-gold"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-2">City *</label>
              <Input
                value={shippingAddress.city}
                onChange={(e) => handleShippingAddressChange('city', e.target.value)}
                placeholder="Lagos"
                className="border-gold/30 focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-2">State *</label>
              <Input
                value={shippingAddress.state}
                onChange={(e) => handleShippingAddressChange('state', e.target.value)}
                placeholder="Lagos State"
                className="border-gold/30 focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Postal Code</label>
              <Input
                value={shippingAddress.postalCode}
                onChange={(e) => handleShippingAddressChange('postalCode', e.target.value)}
                placeholder="100001"
                className="border-gold/30 focus:border-gold"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-2">Additional Information</label>
            <Input
              value={shippingAddress.additionalInfo}
              onChange={(e) => handleShippingAddressChange('additionalInfo', e.target.value)}
              placeholder="Building name, landmarks, delivery instructions..."
              className="border-gold/30 focus:border-gold"
            />
          </div>
        </CardContent>
      </Card>

      {/* Billing Address */}
      <Card className="bg-gradient-to-b from-cream to-fog/30 border-gold/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-ink">
            <MapPin className="w-5 h-5 text-gold" />
            Billing Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="same-address"
              checked={useSameAddress}
              onCheckedChange={handleUseSameAddressChange}
            />
            <label htmlFor="same-address" className="text-sm font-medium text-ink">
              Same as shipping address
            </label>
          </div>

          {!useSameAddress && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">First Name *</label>
                  <Input
                    value={billingAddress.firstName}
                    onChange={(e) => handleBillingAddressChange('firstName', e.target.value)}
                    placeholder="Enter your first name"
                    className="border-gold/30 focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Last Name *</label>
                  <Input
                    value={billingAddress.lastName}
                    onChange={(e) => handleBillingAddressChange('lastName', e.target.value)}
                    placeholder="Enter your last name"
                    className="border-gold/30 focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-2">Phone Number *</label>
                <Input
                  value={billingAddress.phone}
                  onChange={(e) => handleBillingAddressChange('phone', e.target.value)}
                  placeholder="+234 901 234 5678"
                  className="border-gold/30 focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-2">Street Address *</label>
                <Input
                  value={billingAddress.street}
                  onChange={(e) => handleBillingAddressChange('street', e.target.value)}
                  placeholder="123 Main Street, Apartment 4B"
                  className="border-gold/30 focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">City *</label>
                  <Input
                    value={billingAddress.city}
                    onChange={(e) => handleBillingAddressChange('city', e.target.value)}
                    placeholder="Lagos"
                    className="border-gold/30 focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">State *</label>
                  <Input
                    value={billingAddress.state}
                    onChange={(e) => handleBillingAddressChange('state', e.target.value)}
                    placeholder="Lagos State"
                    className="border-gold/30 focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Postal Code</label>
                  <Input
                    value={billingAddress.postalCode}
                    onChange={(e) => handleBillingAddressChange('postalCode', e.target.value)}
                    placeholder="100001"
                    className="border-gold/30 focus:border-gold"
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Shipping Methods */}
      <Card className="bg-gradient-to-b from-cream to-fog/30 border-gold/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-ink">
            <Truck className="w-5 h-5 text-gold" />
            Shipping Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {shippingMethods.map((method) => (
              <div
                key={method.id}
                className={cn(
                  "p-4 border-2 rounded-lg cursor-pointer transition-all",
                  selectedShippingMethod?.id === method.id
                    ? "border-gold bg-gold/5"
                    : "border-gold/20 hover:border-gold/40"
                )}
                onClick={() => onSelectShippingMethod(method)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                      selectedShippingMethod?.id === method.id
                        ? "border-gold bg-gold"
                        : "border-gold/40"
                    )}>
                      {selectedShippingMethod?.id === method.id && (
                        <Check className="w-3 h-3 text-ink" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-ink">{method.name}</h3>
                      <p className="text-sm text-ink/60">{method.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-ink">{formatCurrency(method.price)}</p>
                    <div className="flex items-center gap-1 text-xs text-ink/60">
                      <Clock className="w-3 h-3" />
                      {method.estimatedDays} days
                    </div>
                  </div>
                </div>
                
                {method.features && method.features.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {method.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Order Notes */}
      <Card className="bg-gradient-to-b from-cream to-fog/30 border-gold/20">
        <CardHeader>
          <CardTitle className="text-ink">Order Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            value={orderNotes}
            onChange={(e) => setOrderNotes(e.target.value)}
            placeholder="Any special instructions for your order?"
            className="w-full p-3 border border-gold/30 rounded-lg focus:border-gold focus:outline-none resize-none"
            rows={3}
          />
        </CardContent>
      </Card>
    </div>
  )
}


