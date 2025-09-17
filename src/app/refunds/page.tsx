import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund Policy | OmoOniBag',
  description: 'Learn about our refund policy, return process, and money-back guarantee for your purchases.',
}

export default function RefundsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-fog">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif font-bold text-ink mb-8">Refund Policy</h1>
          
          <div className="bg-white/90 border border-gold/20 rounded-2xl p-8 shadow-xl mb-8">
            <h2 className="text-2xl font-semibold text-ink mb-6">💰 Our Refund Promise</h2>
            <p className="text-ink/70 text-lg">
              We want you to be completely satisfied with your OmoOniBag purchase. If you're not happy with your order, we'll make it right.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Refund Eligibility */}
            <div className="bg-white/90 border border-gold/20 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-semibold text-ink mb-6">✅ Refund Eligibility</h2>
              
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-ink mb-2">Eligible for Refund</h3>
                  <ul className="text-ink/70 text-sm space-y-1">
                    <li>• Items in original condition</li>
                    <li>• Within 30 days of delivery</li>
                    <li>• With original packaging and tags</li>
                    <li>• Defective or damaged items</li>
                    <li>• Wrong item received</li>
                    <li>• Size exchanges (unavailable size)</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-semibold text-ink mb-2">Not Eligible for Refund</h3>
                  <ul className="text-ink/70 text-sm space-y-1">
                    <li>• Items worn or used</li>
                    <li>• Items without original tags</li>
                    <li>• Custom or personalized items</li>
                    <li>• Items damaged by misuse</li>
                    <li>• Returned after 30 days</li>
                    <li>• Final sale items</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Refund Process */}
            <div className="bg-white/90 border border-gold/20 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-semibold text-ink mb-6">📋 Refund Process</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-ink">Contact Us</h3>
                    <p className="text-ink/70 text-sm">Reach out via WhatsApp or email to initiate your return</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-ink">Get Return Authorization</h3>
                    <p className="text-ink/70 text-sm">We'll provide you with a return authorization number</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-ink">Package & Ship</h3>
                    <p className="text-ink/70 text-sm">Pack items securely and ship to our return address</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-ink">Receive Refund</h3>
                    <p className="text-ink/70 text-sm">Refund processed within 5-7 business days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white/90 border border-gold/20 rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-ink mb-6">⏱️ Refund Timeline</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📦</span>
                </div>
                <h3 className="font-semibold text-ink mb-2">Return Received</h3>
                <p className="text-ink/60 text-sm">1-2 business days</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="font-semibold text-ink mb-2">Quality Check</h3>
                <p className="text-ink/60 text-sm">1-2 business days</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="font-semibold text-ink mb-2">Refund Processed</h3>
                <p className="text-ink/60 text-sm">3-5 business days</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white/90 border border-gold/20 rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-ink mb-6">💳 Refund Methods</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border border-gold/20 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">💳</span>
                </div>
                <div>
                  <h3 className="font-semibold text-ink">Credit/Debit Card</h3>
                  <p className="text-ink/70 text-sm">Refunded to original payment method within 5-7 business days</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 border border-gold/20 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">🏦</span>
                </div>
                <div>
                  <h3 className="font-semibold text-ink">Bank Transfer</h3>
                  <p className="text-ink/70 text-sm">Direct bank transfer within 3-5 business days</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 border border-gold/20 rounded-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">📱</span>
                </div>
                <div>
                  <h3 className="font-semibold text-ink">Mobile Money</h3>
                  <p className="text-ink/70 text-sm">Refunded to mobile money account within 1-3 business days</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gold/10 border border-gold/20 rounded-2xl p-8 shadow-xl text-center">
            <h2 className="text-2xl font-semibold text-ink mb-4">Need Help with a Return?</h2>
            <p className="text-ink/70 mb-6">
              Our customer service team is here to help you with any return or refund questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/2349061819572"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                📱 WhatsApp Support
              </a>
              <a 
                href="mailto:returns@omo-oni-bag.com"
                className="inline-flex items-center gap-2 bg-gold text-ink px-6 py-3 rounded-lg font-medium hover:bg-gold/90 transition-colors"
              >
                📧 Email Returns
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




