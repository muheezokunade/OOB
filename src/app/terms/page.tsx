import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | OmoOniBag',
  description: 'Read our terms of service for using OmoOniBag website and services.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-fog">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif font-bold text-ink mb-8">Terms of Service</h1>
          
          <div className="bg-white/90 border border-gold/20 rounded-2xl p-8 shadow-xl">
            <p className="text-ink/70 mb-6">
              <strong>Last updated:</strong> December 2024
            </p>
            
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-ink mb-4">1. Acceptance of Terms</h2>
                <p className="text-ink/70">
                  By accessing and using the OmoOniBag website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-ink mb-4">2. Use License</h2>
                <div className="space-y-4 text-ink/70">
                  <p>Permission is granted to temporarily download one copy of the materials on OmoOniBag's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or for any public display</li>
                    <li>Attempt to reverse engineer any software contained on the website</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-ink mb-4">3. Product Information</h2>
                <div className="space-y-4 text-ink/70">
                  <p>We strive to provide accurate product descriptions, images, and pricing. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.</p>
                  <p>All products are subject to availability. We reserve the right to discontinue any product at any time.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-ink mb-4">4. Pricing and Payment</h2>
                <div className="space-y-4 text-ink/70">
                  <p>All prices are listed in Nigerian Naira (₦) and are subject to change without notice. We reserve the right to refuse or cancel any order at any time.</p>
                  <p>Payment must be received before order processing and shipment. We accept various payment methods as displayed during checkout.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-ink mb-4">5. Shipping and Delivery</h2>
                <div className="space-y-4 text-ink/70">
                  <p>We ship to addresses within Nigeria only. Delivery times are estimates and may vary based on location and circumstances beyond our control.</p>
                  <p>Risk of loss and title for products purchased pass to you upon delivery to the carrier.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-ink mb-4">6. Returns and Refunds</h2>
                <div className="space-y-4 text-ink/70">
                  <p>Our return policy is detailed in our Returns section. Returns must be initiated within 30 days of delivery and items must be in original condition.</p>
                  <p>Refunds will be processed to the original payment method within 5-7 business days after we receive the returned item.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-ink mb-4">7. User Accounts</h2>
                <div className="space-y-4 text-ink/70">
                  <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times.</p>
                  <p>You are responsible for safeguarding the password and for all activities that occur under your account.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-ink mb-4">8. Prohibited Uses</h2>
                <div className="space-y-4 text-ink/70">
                  <p>You may not use our website:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                    <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                    <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                    <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                    <li>To submit false or misleading information</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-ink mb-4">9. Disclaimer</h2>
                <div className="space-y-4 text-ink/70">
                  <p>The information on this website is provided on an 'as is' basis. To the fullest extent permitted by law, OmoOniBag excludes all representations, warranties, conditions and terms relating to our website and the use of this website.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-ink mb-4">10. Limitation of Liability</h2>
                <div className="space-y-4 text-ink/70">
                  <p>In no event shall OmoOniBag, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the website.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-ink mb-4">11. Governing Law</h2>
                <div className="space-y-4 text-ink/70">
                  <p>These Terms shall be interpreted and governed by the laws of Nigeria, without regard to its conflict of law provisions.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-ink mb-4">12. Changes to Terms</h2>
                <div className="space-y-4 text-ink/70">
                  <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-ink mb-4">13. Contact Information</h2>
                <div className="space-y-4 text-ink/70">
                  <p>If you have any questions about these Terms of Service, please contact us:</p>
                  <div className="bg-gold/10 border border-gold/20 rounded-lg p-4">
                    <p><strong>Email:</strong> legal@omo-oni-bag.com</p>
                    <p><strong>Phone:</strong> 09061819572</p>
                    <p><strong>Address:</strong> Lagos, Nigeria</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




