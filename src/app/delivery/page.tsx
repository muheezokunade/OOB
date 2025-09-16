import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Delivery & Returns | OmoOniBag',
  description: 'Learn about our delivery options, shipping times, and return policy for your luxury bags and shoes.',
}

export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-fog">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif font-bold text-ink mb-8">Delivery & Returns</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/90 border border-gold/20 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-semibold text-ink mb-4">🚚 Delivery Information</h2>
              <div className="space-y-4 text-ink/80">
                <div>
                  <h3 className="font-semibold text-ink mb-2">Standard Delivery</h3>
                  <p>3-5 business days within Lagos</p>
                  <p>5-7 business days nationwide</p>
                  <p className="text-gold font-medium">₦2,500</p>
                </div>
                <div>
                  <h3 className="font-semibold text-ink mb-2">Express Delivery</h3>
                  <p>1-2 business days within Lagos</p>
                  <p>2-3 business days nationwide</p>
                  <p className="text-gold font-medium">₦4,500</p>
                </div>
                <div>
                  <h3 className="font-semibold text-ink mb-2">Same Day Delivery</h3>
                  <p>Available in Lagos (orders before 2PM)</p>
                  <p className="text-gold font-medium">₦6,500</p>
                </div>
              </div>
            </div>

            <div className="bg-white/90 border border-gold/20 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-semibold text-ink mb-4">↩️ Returns & Exchanges</h2>
              <div className="space-y-4 text-ink/80">
                <div>
                  <h3 className="font-semibold text-ink mb-2">Return Policy</h3>
                  <p>30 days from delivery date</p>
                  <p>Items must be unworn and in original packaging</p>
                </div>
                <div>
                  <h3 className="font-semibold text-ink mb-2">Exchange Policy</h3>
                  <p>Free size exchanges within 14 days</p>
                  <p>Color exchanges subject to availability</p>
                </div>
                <div>
                  <h3 className="font-semibold text-ink mb-2">Refund Process</h3>
                  <p>Refunds processed within 5-7 business days</p>
                  <p>Original payment method will be credited</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white/90 border border-gold/20 rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-ink mb-6">📞 Need Help?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="font-semibold text-ink mb-2">WhatsApp</h3>
                <p className="text-ink/60">09061819572</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📧</span>
                </div>
                <h3 className="font-semibold text-ink mb-2">Email</h3>
                <p className="text-ink/60">hello@omo-oni-bag.com</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">⏰</span>
                </div>
                <h3 className="font-semibold text-ink mb-2">Hours</h3>
                <p className="text-ink/60">Mon-Fri: 9AM-6PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



