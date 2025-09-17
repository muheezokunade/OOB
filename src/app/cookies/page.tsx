import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy | OmoOniBag',
  description: 'Learn about how OmoOniBag uses cookies and similar technologies to enhance your browsing experience.',
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-fog">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif font-bold text-ink mb-8">Cookie Policy</h1>
          
          <div className="bg-white/90 border border-gold/20 rounded-2xl p-8 shadow-xl">
            <p className="text-ink/70 mb-6">
              <strong>Last updated:</strong> December 2024
            </p>
            
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-ink mb-4">What Are Cookies?</h2>
                <p className="text-ink/70">
                  Cookies are small text files that are placed on your computer or mobile device when you visit our website. They help us provide you with a better experience by remembering your preferences and enabling certain website functions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-ink mb-4">How We Use Cookies</h2>
                <div className="space-y-4 text-ink/70">
                  <p>We use cookies for several purposes:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>To remember your preferences and settings</li>
                    <li>To keep you signed in to your account</li>
                    <li>To remember items in your shopping cart</li>
                    <li>To analyze how our website is used</li>
                    <li>To provide personalized content and recommendations</li>
                    <li>To improve our website performance</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-ink mb-4">Types of Cookies We Use</h2>
                
                <div className="space-y-6">
                  <div className="border border-gold/20 rounded-lg p-4">
                    <h3 className="font-semibold text-ink mb-2">🍪 Essential Cookies</h3>
                    <p className="text-ink/70 text-sm mb-2">These cookies are necessary for the website to function properly.</p>
                    <ul className="text-ink/70 text-sm space-y-1">
                      <li>• Shopping cart functionality</li>
                      <li>• User authentication</li>
                      <li>• Security features</li>
                      <li>• Basic website navigation</li>
                    </ul>
                  </div>
                  
                  <div className="border border-gold/20 rounded-lg p-4">
                    <h3 className="font-semibold text-ink mb-2">📊 Analytics Cookies</h3>
                    <p className="text-ink/70 text-sm mb-2">These cookies help us understand how visitors interact with our website.</p>
                    <ul className="text-ink/70 text-sm space-y-1">
                      <li>• Page views and time spent</li>
                      <li>• Popular products and pages</li>
                      <li>• Traffic sources</li>
                      <li>• User behavior patterns</li>
                    </ul>
                  </div>
                  
                  <div className="border border-gold/20 rounded-lg p-4">
                    <h3 className="font-semibold text-ink mb-2">🎯 Marketing Cookies</h3>
                    <p className="text-ink/70 text-sm mb-2">These cookies are used to deliver relevant advertisements and track campaign performance.</p>
                    <ul className="text-ink/70 text-sm space-y-1">
                      <li>• Personalized ads</li>
                      <li>• Social media integration</li>
                      <li>• Email marketing tracking</li>
                      <li>• Conversion tracking</li>
                    </ul>
                  </div>
                  
                  <div className="border border-gold/20 rounded-lg p-4">
                    <h3 className="font-semibold text-ink mb-2">⚙️ Preference Cookies</h3>
                    <p className="text-ink/70 text-sm mb-2">These cookies remember your choices and preferences.</p>
                    <ul className="text-ink/70 text-sm space-y-1">
                      <li>• Language preferences</li>
                      <li>• Currency settings</li>
                      <li>• Display preferences</li>
                      <li>• Wishlist items</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-ink mb-4">Managing Your Cookie Preferences</h2>
                <div className="space-y-4 text-ink/70">
                  <p>You have several options for managing cookies:</p>
                  
                  <div className="bg-gold/10 border border-gold/20 rounded-lg p-4">
                    <h3 className="font-semibold text-ink mb-2">Browser Settings</h3>
                    <p className="text-sm mb-2">Most web browsers allow you to control cookies through their settings. You can:</p>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Block all cookies</li>
                      <li>Block third-party cookies only</li>
                      <li>Delete existing cookies</li>
                      <li>Set preferences for specific websites</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gold/10 border border-gold/20 rounded-lg p-4">
                    <h3 className="font-semibold text-ink mb-2">Cookie Consent Banner</h3>
                    <p className="text-sm">When you first visit our website, you'll see a cookie consent banner where you can choose which types of cookies to accept.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-ink mb-4">Third-Party Cookies</h2>
                <div className="space-y-4 text-ink/70">
                  <p>We may also use third-party services that set their own cookies:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gold/20 rounded-lg p-4">
                      <h3 className="font-semibold text-ink mb-2">Google Analytics</h3>
                      <p className="text-sm">Helps us analyze website traffic and user behavior</p>
                    </div>
                    
                    <div className="border border-gold/20 rounded-lg p-4">
                      <h3 className="font-semibold text-ink mb-2">Social Media</h3>
                      <p className="text-sm">Facebook, Instagram, and other social platforms</p>
                    </div>
                    
                    <div className="border border-gold/20 rounded-lg p-4">
                      <h3 className="font-semibold text-ink mb-2">Payment Processors</h3>
                      <p className="text-sm">Secure payment processing and fraud prevention</p>
                    </div>
                    
                    <div className="border border-gold/20 rounded-lg p-4">
                      <h3 className="font-semibold text-ink mb-2">Email Marketing</h3>
                      <p className="text-sm">Newsletter and promotional email tracking</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-ink mb-4">Impact of Disabling Cookies</h2>
                <div className="space-y-4 text-ink/70">
                  <p>If you choose to disable cookies, some features of our website may not work properly:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>You may need to sign in repeatedly</li>
                    <li>Your shopping cart may not save items</li>
                    <li>Personalized recommendations may not appear</li>
                    <li>Some website features may be unavailable</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-ink mb-4">Updates to This Policy</h2>
                <div className="space-y-4 text-ink/70">
                  <p>We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.</p>
                  <p>We will notify you of any material changes by posting the updated policy on our website with a new "Last updated" date.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-ink mb-4">Contact Us</h2>
                <div className="space-y-4 text-ink/70">
                  <p>If you have any questions about our use of cookies, please contact us:</p>
                  <div className="bg-gold/10 border border-gold/20 rounded-lg p-4">
                    <p><strong>Email:</strong> privacy@omo-oni-bag.com</p>
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




