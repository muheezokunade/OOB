import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Award, Clock } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 bg-fog">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="accent" className="mb-4">Our Story</Badge>
            <h1 className="display-xl mb-6">About OmoOniBag</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded during the challenges of 2020, OmoOniBag emerged from a simple desire: 
              to create beautiful, functional bags and shoes that every woman could afford and love.
            </p>
          </div>
        </div>
      </section>

      {/* Story Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="h1">Born from Boredom & Sapa</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Like many great stories, ours began in unexpected circumstances. During the global pause of 2020, 
                we found ourselves with time to reflect on what truly matters. The idea of creating something 
                beautiful, something that could bring joy to everyday moments, took root.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We started small, with a vision to make luxury accessible. Every bag, every shoe is designed 
                with the modern Nigerian woman in mind - someone who values quality, style, and practicality.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/features/bags-feature.svg"
                alt="Our journey"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-coal text-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="h1 mb-6">Our Mission</h2>
            <p className="text-lg text-background/80 leading-relaxed mb-8">
              To create a bag for every girl, every time. We believe that luxury shouldn&apos;t be exclusive - 
              it should be accessible, practical, and beautiful.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-ink" />
                </div>
                <h3 className="h3 mb-3">Passion</h3>
                <p className="text-background/80">
                  Every piece is crafted with love and attention to detail
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-ink" />
                </div>
                <h3 className="h3 mb-3">Community</h3>
                <p className="text-background/80">
                  Building a community of confident, stylish women
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-ink" />
                </div>
                <h3 className="h3 mb-3">Quality</h3>
                <p className="text-background/80">
                  Premium materials and craftsmanship in every product
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/features/shoes-feature.svg"
                alt="Craftsmanship"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="h1">Craftsmanship</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From supple leathers to polished hardware, each piece is considered for quality, 
                comfort, and timeless style. We work with skilled artisans who share our commitment 
                to excellence.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium mb-1">Premium Materials</h4>
                    <p className="text-muted-foreground">Only the finest leathers and hardware</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium mb-1">Attention to Detail</h4>
                    <p className="text-muted-foreground">Every stitch, every curve, every finish matters</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium mb-1">Timeless Design</h4>
                    <p className="text-muted-foreground">Pieces that will never go out of style</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 bg-fog">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="h1 mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground">
              Key milestones in our growth and commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-ink" />
                </div>
                <h3 className="h3 mb-2">2020</h3>
                <p className="text-muted-foreground">Founded during the global pause</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-ink" />
                </div>
                <h3 className="h3 mb-2">500+</h3>
                <p className="text-muted-foreground">Happy customers served</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-ink" />
                </div>
                <h3 className="h3 mb-2">50+</h3>
                <p className="text-muted-foreground">Unique designs created</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-ink" />
                </div>
                <h3 className="h3 mb-2">24/7</h3>
                <p className="text-muted-foreground">Customer support available</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="h1 mb-6">Join Our Community</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Be part of a growing community of women who value quality, style, and authenticity. 
              Follow our journey and discover your next favorite piece.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://instagram.com/omo-oni-bag"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-gold text-ink font-medium rounded-md hover:bg-gold/90 transition-colors"
              >
                Follow on Instagram
              </a>
              <a
                href="https://wa.me/2349061819572"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground font-medium rounded-md hover:bg-muted transition-colors"
              >
                Message on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
