'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WhatsAppCTA } from "@/components/whatsapp-cta";
import { MessageCircle, Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 bg-fog">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="display-xl mb-6">Get in Touch</h1>
            <p className="text-lg text-muted-foreground">
              Have a question about our products? Need help with sizing? 
              We&apos;re here to help and would love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="h2">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number (Optional)
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+234 000 000 0000"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us how we can help you..."
                      className="w-full px-3 py-2 border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="h3">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-ink" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Phone</h4>
                      <p className="text-muted-foreground">09061819572</p>
                      <p className="text-sm text-muted-foreground">Available 9 AM - 6 PM (WAT)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="h-5 w-5 text-ink" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">WhatsApp</h4>
                      <p className="text-muted-foreground">09061819572</p>
                      <p className="text-sm text-muted-foreground">24/7 support available</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-ink" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <p className="text-muted-foreground">hello@omo-oni-bag.com</p>
                      <p className="text-sm text-muted-foreground">We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-ink" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Location</h4>
                      <p className="text-muted-foreground">Osogbo, Osun State</p>
                      <p className="text-sm text-muted-foreground">Nigeria</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="h3">Business Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div className="flex justify-between w-full">
                        <span className="text-sm">Monday - Friday</span>
                        <span className="text-sm text-muted-foreground">9:00 AM - 6:00 PM</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div className="flex justify-between w-full">
                        <span className="text-sm">Saturday</span>
                        <span className="text-sm text-muted-foreground">10:00 AM - 4:00 PM</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div className="flex justify-between w-full">
                        <span className="text-sm">Sunday</span>
                        <span className="text-sm text-muted-foreground">Closed</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="h3">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <WhatsAppCTA 
                    variant="inline" 
                    message="Hi! I'd like to learn more about your products and services."
                    className="w-full"
                  />
                  <Button variant="outline" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-fog">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="h1 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Quick answers to common questions about our products and services
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="h3 mb-3">What is your delivery policy?</h3>
                <p className="text-muted-foreground">
                  We offer same-day delivery within Osogbo and 1-4 days delivery to other locations in Nigeria. 
                  Park delivery options are also available for your convenience.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="h3 mb-3">Do you offer exchanges or returns?</h3>
                <p className="text-muted-foreground">
                  Yes! We offer a 24-48 hour exchange policy. Items must be in original condition with tags attached. 
                  Contact us via WhatsApp for the fastest service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="h3 mb-3">How do I know my size?</h3>
                <p className="text-muted-foreground">
                  We provide detailed size guides for all our shoes. If you&apos;re unsure, reach out to us via WhatsApp 
                  with your measurements and we&apos;ll help you find the perfect fit.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="h3 mb-3">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  We accept bank transfers and payment via WhatsApp. All transactions are secure and we&apos;ll provide 
                  you with our account details once you&apos;re ready to make a purchase.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
