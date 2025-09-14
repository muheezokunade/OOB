'use client'

import { useState } from 'react'
import { CreditCard, Smartphone, Shield, Check } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { PaymentData } from '@/store/order-store'
import { cn } from '@/lib/utils'

interface PaymentFormProps {
  selectedPaymentMethod: string | null
  onSelectPaymentMethod: (method: string) => void
  paymentData: PaymentData | null
  setPaymentData: (data: PaymentData) => void
}

const paymentMethods = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    description: 'Visa, Mastercard, American Express',
    icon: CreditCard,
    features: ['Secure', 'Instant']
  },
  {
    id: 'paystack',
    name: 'Paystack',
    description: 'Pay with bank transfer, card, or USSD',
    icon: Smartphone,
    features: ['Bank Transfer', 'USSD', 'Card']
  },
  {
    id: 'flutterwave',
    name: 'Flutterwave',
    description: 'Pay with card, bank transfer, or mobile money',
    icon: Smartphone,
    features: ['Bank Transfer', 'Mobile Money', 'Card']
  }
]

export function PaymentForm({
  selectedPaymentMethod,
  onSelectPaymentMethod,
  paymentData,
  setPaymentData
}: PaymentFormProps) {
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  })

  const handleCardDataChange = (field: string, value: string) => {
    let formattedValue = value

    // Format card number with spaces
    if (field === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim()
      if (formattedValue.length > 19) return // Max 16 digits + 3 spaces
    }

    // Format expiry date
    if (field === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(.{2})/, '$1/').trim()
      if (formattedValue.length > 5) return // MM/YY format
    }

    // Format CVV
    if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '')
      if (formattedValue.length > 4) return // Max 4 digits
    }

    const newCardData = { ...cardData, [field]: formattedValue }
    setCardData(newCardData)

    // Update payment data
    if (selectedPaymentMethod === 'card') {
      setPaymentData({
        method: 'card',
        cardData: newCardData
      })
    }
  }

  const handlePaymentMethodSelect = (methodId: string) => {
    onSelectPaymentMethod(methodId)
    
    if (methodId === 'card') {
      setPaymentData({
        method: 'card',
        cardData
      })
    } else {
      setPaymentData({
        method: methodId,
        cardData: null
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Payment Methods */}
      <Card className="bg-gradient-to-b from-cream to-fog/30 border-gold/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-ink">
            <CreditCard className="w-5 h-5 text-gold" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {paymentMethods.map((method) => {
              const Icon = method.icon
              return (
                <div
                  key={method.id}
                  className={cn(
                    "p-4 border-2 rounded-lg cursor-pointer transition-all",
                    selectedPaymentMethod === method.id
                      ? "border-gold bg-gold/5"
                      : "border-gold/20 hover:border-gold/40"
                  )}
                  onClick={() => handlePaymentMethodSelect(method.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                        selectedPaymentMethod === method.id
                          ? "border-gold bg-gold"
                          : "border-gold/40"
                      )}>
                        {selectedPaymentMethod === method.id && (
                          <Check className="w-3 h-3 text-ink" />
                        )}
                      </div>
                      <Icon className="w-5 h-5 text-gold" />
                      <div>
                        <h3 className="font-medium text-ink">{method.name}</h3>
                        <p className="text-sm text-ink/60">{method.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {method.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Card Details */}
      {selectedPaymentMethod === 'card' && (
        <Card className="bg-gradient-to-b from-cream to-fog/30 border-gold/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-ink">
              <Shield className="w-5 h-5 text-gold" />
              Card Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Card Number *</label>
              <Input
                value={cardData.cardNumber}
                onChange={(e) => handleCardDataChange('cardNumber', e.target.value)}
                placeholder="1234 5678 9012 3456"
                className="border-gold/30 focus:border-gold"
                maxLength={19}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-2">Cardholder Name *</label>
              <Input
                value={cardData.cardName}
                onChange={(e) => handleCardDataChange('cardName', e.target.value)}
                placeholder="John Doe"
                className="border-gold/30 focus:border-gold"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Expiry Date *</label>
                <Input
                  value={cardData.expiryDate}
                  onChange={(e) => handleCardDataChange('expiryDate', e.target.value)}
                  placeholder="MM/YY"
                  className="border-gold/30 focus:border-gold"
                  maxLength={5}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-2">CVV *</label>
                <Input
                  value={cardData.cvv}
                  onChange={(e) => handleCardDataChange('cvv', e.target.value)}
                  placeholder="123"
                  className="border-gold/30 focus:border-gold"
                  maxLength={4}
                  type="password"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <Shield className="w-4 h-4 text-green-600" />
              <p className="text-sm text-green-700">
                Your payment information is encrypted and secure
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Gateway Info */}
      {(selectedPaymentMethod === 'paystack' || selectedPaymentMethod === 'flutterwave') && (
        <Card className="bg-gradient-to-b from-cream to-fog/30 border-gold/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-ink">
              <Smartphone className="w-5 h-5 text-gold" />
              Payment Gateway
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">
                  {selectedPaymentMethod === 'paystack' ? 'Paystack Payment' : 'Flutterwave Payment'}
                </h4>
                <p className="text-sm text-blue-700">
                  {selectedPaymentMethod === 'paystack' 
                    ? 'You will be redirected to Paystack to complete your payment securely. You can pay with your bank account, card, or USSD.'
                    : 'You will be redirected to Flutterwave to complete your payment securely. You can pay with your bank account, card, or mobile money.'
                  }
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="font-medium text-ink">Available Payment Options:</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedPaymentMethod === 'paystack' ? (
                    <>
                      <Badge variant="secondary">Bank Transfer</Badge>
                      <Badge variant="secondary">USSD</Badge>
                      <Badge variant="secondary">Card Payment</Badge>
                      <Badge variant="secondary">Paystack Wallet</Badge>
                    </>
                  ) : (
                    <>
                      <Badge variant="secondary">Bank Transfer</Badge>
                      <Badge variant="secondary">Mobile Money</Badge>
                      <Badge variant="secondary">Card Payment</Badge>
                      <Badge variant="secondary">Barter</Badge>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
