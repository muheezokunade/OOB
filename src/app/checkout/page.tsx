'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CreditCard, MapPin, Package, CheckCircle } from 'lucide-react'
import { useCartStore, useCartItemCount } from '@/store/cart-store'
import { useOrderStore, ShippingMethod, PaymentData } from '@/store/order-store'
import { useAuthStore } from '@/store/auth-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { CheckoutStep } from '@/components/checkout/checkout-step'
import { ShippingForm } from '@/components/checkout/shipping-form'
import { PaymentForm } from '@/components/checkout/payment-form'
import { OrderReview } from '@/components/checkout/order-review'
import { OrderConfirmation } from '@/components/checkout/order-confirmation'
import { AuthModal } from '@/components/auth/auth-modal'
import { formatCurrency } from '@/store/cart-store'
import { cn } from '@/lib/utils'

const steps = [
  { id: 'shipping', title: 'Shipping', icon: MapPin },
  { id: 'payment', title: 'Payment', icon: CreditCard },
  { id: 'review', title: 'Review', icon: CheckCircle },
  { id: 'complete', title: 'Complete', icon: Package }
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart } = useCartStore()
  const { isAuthenticated, openAuthModal } = useAuthStore()
  const {
    checkoutStep,
    selectedShippingMethod,
    selectedPaymentMethod,
    paymentData,
    shippingMethods,
    setCheckoutStep,
    selectShippingMethod,
    selectPaymentMethod,
    setPaymentData,
    createOrder,
    processPayment,
    isLoading,
    error
  } = useOrderStore()

  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    country: 'Nigeria',
    postalCode: '',
    additionalInfo: ''
  })

  const [billingAddress, setBillingAddress] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    country: 'Nigeria',
    postalCode: '',
    additionalInfo: ''
  })

  const [orderNotes, setOrderNotes] = useState('')

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && checkoutStep !== 'complete') {
      router.push('/cart')
    }
  }, [items.length, checkoutStep, router])

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated && checkoutStep !== 'complete') {
      openAuthModal('login')
    }
  }, [isAuthenticated, checkoutStep, openAuthModal])

  const handleNext = () => {
    switch (checkoutStep) {
      case 'shipping':
        if (selectedShippingMethod) {
          setCheckoutStep('payment')
        }
        break
      case 'payment':
        if (selectedPaymentMethod && paymentData) {
          setCheckoutStep('review')
        }
        break
      case 'review':
        handlePlaceOrder()
        break
    }
  }

  const handleBack = () => {
    switch (checkoutStep) {
      case 'payment':
        setCheckoutStep('shipping')
        break
      case 'review':
        setCheckoutStep('payment')
        break
    }
  }

  const handlePlaceOrder = async () => {
    try {
      // Process payment first
      const paymentResult = await processPayment(paymentData!)
      
      if (!paymentResult.success) {
        return
      }

      // Create order
      const order = await createOrder({
        items,
        shippingAddress: {
          id: 'temp',
          type: 'home',
          isDefault: true,
          ...shippingAddress
        },
        billingAddress: {
          id: 'temp',
          type: 'home',
          isDefault: true,
          ...billingAddress
        },
        shippingMethod: selectedShippingMethod!,
        paymentMethod: selectedPaymentMethod!,
        paymentData: paymentData!,
        notes: orderNotes,
        customerEmail: 'demo@example.com', // Get from auth
        customerPhone: shippingAddress.phone
      })

      // Clear cart and show confirmation
      clearCart()
      setCheckoutStep('complete')
    } catch (error) {
      console.error('Order placement failed:', error)
    }
  }

  const canProceed = () => {
    switch (checkoutStep) {
      case 'shipping':
        return selectedShippingMethod && 
               shippingAddress.firstName && 
               shippingAddress.lastName && 
               shippingAddress.phone && 
               shippingAddress.street && 
               shippingAddress.city && 
               shippingAddress.state
      case 'payment':
        return selectedPaymentMethod && paymentData
      case 'review':
        return true
      default:
        return false
    }
  }

  const getStepIndex = () => {
    return steps.findIndex(step => step.id === checkoutStep)
  }

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = selectedShippingMethod?.price || 0
  const tax = Math.round(subtotal * 0.075) // 7.5% VAT
  const total = subtotal + shipping + tax

  if (checkoutStep === 'complete') {
    return <OrderConfirmation />
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream to-fog flex items-center justify-center">
        <Card className="w-full max-w-md bg-gradient-to-b from-cream to-fog border-gold/20">
          <CardContent className="p-8 text-center">
            <Package className="w-16 h-16 text-ink/30 mx-auto mb-4" />
            <h2 className="text-xl font-serif font-semibold text-ink mb-2">Your cart is empty</h2>
            <p className="text-ink/60 mb-6">Add some items to your cart to proceed with checkout.</p>
            <Button 
              onClick={() => router.push('/shop')}
              className="bg-gradient-to-r from-gold to-yellow-400 text-ink hover:from-yellow-400 hover:to-gold"
            >
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-fog">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb 
          items={[
            { label: 'Cart', href: '/cart' },
            { label: 'Checkout', isActive: true }
          ]} 
          className="mb-6" 
        />

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-ink/60 hover:text-ink"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-serif font-semibold text-ink">Checkout</h1>
            <p className="text-ink/60">Complete your order securely</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = step.id === checkoutStep
              const isCompleted = index < getStepIndex()
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all",
                    isActive && "border-gold bg-gold text-ink",
                    isCompleted && "border-gold bg-gold text-ink",
                    !isActive && !isCompleted && "border-ink/20 text-ink/40"
                  )}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={cn(
                    "ml-2 text-sm font-medium",
                    isActive && "text-ink",
                    isCompleted && "text-ink",
                    !isActive && !isCompleted && "text-ink/40"
                  )}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      "w-16 h-0.5 mx-4",
                      isCompleted ? "bg-gold" : "bg-ink/20"
                    )} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {checkoutStep === 'shipping' && (
              <ShippingForm
                shippingAddress={shippingAddress}
                setShippingAddress={setShippingAddress}
                billingAddress={billingAddress}
                setBillingAddress={setBillingAddress}
                shippingMethods={shippingMethods}
                selectedShippingMethod={selectedShippingMethod}
                onSelectShippingMethod={selectShippingMethod}
                orderNotes={orderNotes}
                setOrderNotes={setOrderNotes}
              />
            )}

            {checkoutStep === 'payment' && (
              <PaymentForm
                selectedPaymentMethod={selectedPaymentMethod}
                onSelectPaymentMethod={selectPaymentMethod}
                paymentData={paymentData}
                setPaymentData={setPaymentData}
              />
            )}

            {checkoutStep === 'review' && (
              <OrderReview
                items={items}
                shippingAddress={shippingAddress}
                billingAddress={billingAddress}
                shippingMethod={selectedShippingMethod!}
                paymentMethod={selectedPaymentMethod!}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
                orderNotes={orderNotes}
              />
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-b from-cream to-fog/30 border-gold/20 sticky top-8">
              <CardHeader>
                <CardTitle className="text-ink">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-ink truncate">{item.name}</p>
                        <p className="text-xs text-ink/60">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-ink">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gold/20 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-ink/60">Subtotal</span>
                    <span className="text-ink">{formatCurrency(subtotal)}</span>
                  </div>
                  
                  {selectedShippingMethod && (
                    <div className="flex justify-between text-sm">
                      <span className="text-ink/60">Shipping</span>
                      <span className="text-ink">{formatCurrency(shipping)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-ink/60">Tax (7.5%)</span>
                    <span className="text-ink">{formatCurrency(tax)}</span>
                  </div>
                  
                  <div className="flex justify-between font-semibold text-lg border-t border-gold/20 pt-2">
                    <span className="text-ink">Total</span>
                    <span className="text-ink">{formatCurrency(total)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    {checkoutStep !== 'shipping' && (
                      <Button
                        variant="outline"
                        onClick={handleBack}
                        className="flex-1 border-gold/30 text-gold hover:bg-gold hover:text-ink"
                      >
                        Back
                      </Button>
                    )}
                    
                    <Button
                      onClick={handleNext}
                      disabled={!canProceed() || isLoading}
                      className="flex-1 bg-gradient-to-r from-gold to-yellow-400 text-ink hover:from-yellow-400 hover:to-gold"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                          Processing...
                        </div>
                      ) : (
                        <>
                          {checkoutStep === 'review' ? 'Place Order' : 'Continue'}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal />
    </div>
  )
}