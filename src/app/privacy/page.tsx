import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | OmoOniBag',
  description: 'Learn how OmoOniBag collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-fog">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif font-bold text-ink mb-8">Privacy Policy</h1>
          
          <div className="bg-white/90 border border-gold/20 rounded-2xl p-8 shadow-xl">
            <p className="text-ink/70 mb-6">
              <strong>Last updated:</strong> December 2024
            </p>
            
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-ink mb-4">1. Information We Collect</h2>
                <div className="space-y-4 text-ink/70">
                  <div>
                    <h3 className="font-semibold text-ink mb-2">Personal Information</h3>
                    <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us. This may include:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Name and contact information</li>
                      <li>Billing and shipping addresses</li>
                      <li>Payment information</li>
                      <li>Account credentials</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-ink mb-2">Usage Information</h3>
                    <p>We automatically collect certain information about your use of our website, including:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Device information and IP address</li>
                      <li>Browser type and version</li>
                      <li>Pages visited and time spent</li>
                      <li>Referring website information</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-ink mb-4">2. How We Use Your Information</h2>
                <div className="space-y-4 text-ink/70">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Process and fulfill your orders</li>
                    <li>Provide customer support</li>
                    <li>Send you updates about your orders</li>
                    <li>Improve our website and services</li>
                    <li>Send marketing communications (with your consent)</li>
                    <li>Prevent fraud and ensure security</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-ink mb-4">3. Information Sharing</h2>
                <div className="space-y-4 text-ink/70">
                  <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>With service providers who assist us in operating our business</li>
                    <li>When required by law or to protect our rights</li>
                    <li>In connection with a business transfer or acquisition</li>
                    <li>With your explicit consent</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-ink mb-4">4. Data Security</h2>
                <div className="space-y-4 text-ink/70">
                  <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>SSL encryption for data transmission</li>
                    <li>Secure servers and databases</li>
                    <li>Regular security audits</li>
                    <li>Limited access to personal information</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-ink mb-4">5. Your Rights</h2>
                <div className="space-y-4 text-ink/70">
                  <p>You have the right to:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Delete your personal information</li>
                    <li>Opt out of marketing communications</li>
                    <li>Data portability</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-ink mb-4">6. Cookies and Tracking</h2>
                <div className="space-y-4 text-ink/70">
                  <p>We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie settings through your browser preferences.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-ink mb-4">7. Contact Us</h2>
                <div className="space-y-4 text-ink/70">
                  <p>If you have any questions about this Privacy Policy, please contact us:</p>
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

