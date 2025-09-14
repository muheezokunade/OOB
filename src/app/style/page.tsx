import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/product-card";
import { getNewProducts } from "@/data/products";

export default function StyleGuidePage() {
  const sampleProduct = getNewProducts()[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 bg-fog">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="display-xl mb-4">Style Guide</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive guide to OmoOniBag&apos;s design system, components, and brand guidelines.
            </p>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="h1 mb-8">Typography</h2>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Display Typography</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h1 className="display-2xl mb-2">Display 2XL</h1>
                  <p className="text-sm text-muted-foreground">clamp(44px, 6vw, 72px) / Playfair Display / 600</p>
                </div>
                <div>
                  <h1 className="display-xl mb-2">Display XL</h1>
                  <p className="text-sm text-muted-foreground">40px / Playfair Display / 600</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Headings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h1 className="h1 mb-2">Heading 1</h1>
                  <p className="text-sm text-muted-foreground">32px / Playfair Display / 600</p>
                </div>
                <div>
                  <h2 className="h2 mb-2">Heading 2</h2>
                  <p className="text-sm text-muted-foreground">24px / Playfair Display / 600</p>
                </div>
                <div>
                  <h3 className="h3 mb-2">Heading 3</h3>
                  <p className="text-sm text-muted-foreground">20px / Playfair Display / 600</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Body Text</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="body mb-2">Body text - Inter font family for optimal readability</p>
                  <p className="text-sm text-muted-foreground">16px / Inter / 400</p>
                </div>
                <div>
                  <p className="caption mb-2">Caption text for smaller details</p>
                  <p className="text-sm text-muted-foreground">13px / Inter / 400</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Colors */}
      <section className="py-16 bg-fog">
        <div className="container mx-auto px-4">
          <h2 className="h1 mb-8">Color Palette</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Brand Colors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-ink rounded-lg"></div>
                  <div>
                    <p className="font-medium">Ink</p>
                    <p className="text-sm text-muted-foreground">#0B0B0B</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-coal rounded-lg"></div>
                  <div>
                    <p className="font-medium">Coal</p>
                    <p className="text-sm text-muted-foreground">#111111</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-cream rounded-lg border border-border"></div>
                  <div>
                    <p className="font-medium">Cream</p>
                    <p className="text-sm text-muted-foreground">#F6F3EE</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-fog rounded-lg border border-border"></div>
                  <div>
                    <p className="font-medium">Fog</p>
                    <p className="text-sm text-muted-foreground">#E7E3DD</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-stone rounded-lg border border-border"></div>
                  <div>
                    <p className="font-medium">Stone</p>
                    <p className="text-sm text-muted-foreground">#D9D9D9</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gold rounded-lg"></div>
                  <div>
                    <p className="font-medium">Gold</p>
                    <p className="text-sm text-muted-foreground">#C7A955</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Semantic Colors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-background rounded-lg border border-border"></div>
                  <div>
                    <p className="font-medium">Background</p>
                    <p className="text-sm text-muted-foreground">#F6F3EE</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-foreground rounded-lg"></div>
                  <div>
                    <p className="font-medium">Foreground</p>
                    <p className="text-sm text-muted-foreground">#0B0B0B</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-muted rounded-lg border border-border"></div>
                  <div>
                    <p className="font-medium">Muted</p>
                    <p className="text-sm text-muted-foreground">#E7E3DD</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent rounded-lg"></div>
                  <div>
                    <p className="font-medium">Accent</p>
                    <p className="text-sm text-muted-foreground">#C7A955</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-destructive rounded-lg"></div>
                  <div>
                    <p className="font-medium">Destructive</p>
                    <p className="text-sm text-muted-foreground">#DC2626</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Primary Text</h4>
                  <p className="text-sm text-muted-foreground">Use Ink (#0B0B0B) for primary text</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Secondary Text</h4>
                  <p className="text-sm text-muted-foreground">Use Coal (#111111) for secondary text</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Accents</h4>
                  <p className="text-sm text-muted-foreground">Use Gold (#C7A955) sparingly for highlights</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Backgrounds</h4>
                  <p className="text-sm text-muted-foreground">Use Cream (#F6F3EE) as primary background</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="h1 mb-8">Buttons</h2>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="accent">Accent</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Button Sizes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">Extra Large</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="py-16 bg-fog">
        <div className="container mx-auto px-4">
          <h2 className="h1 mb-8">Badges</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Badge Variants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="accent">Accent</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Form Elements */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="h1 mb-8">Form Elements</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Input Fields</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Default Input</label>
                <Input placeholder="Enter text here..." />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Input</label>
                <Input type="email" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Disabled Input</label>
                <Input disabled placeholder="Disabled input" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Product Card */}
      <section className="py-16 bg-fog">
        <div className="container mx-auto px-4">
          <h2 className="h1 mb-8">Product Card</h2>
          
          <div className="max-w-sm">
            <ProductCard product={sampleProduct} />
          </div>
        </div>
      </section>

      {/* Grid System */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="h1 mb-8">Grid System</h2>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>12-Column Grid (Desktop)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-12 gap-4">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div key={i} className="h-8 bg-gold rounded text-center text-xs flex items-center justify-center">
                      {i + 1}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8-Column Grid (Tablet)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-8 gap-4">
                  {Array.from({ length: 8 }, (_, i) => (
                    <div key={i} className="h-8 bg-gold rounded text-center text-xs flex items-center justify-center">
                      {i + 1}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4-Column Grid (Mobile)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  {Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className="h-8 bg-gold rounded text-center text-xs flex items-center justify-center">
                      {i + 1}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Spacing Scale */}
      <section className="py-16 bg-fog">
        <div className="container mx-auto px-4">
          <h2 className="h1 mb-8">Spacing Scale</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Spacing Tokens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-1 h-1 bg-foreground rounded-full"></div>
                <span className="w-16 text-sm">1 (4px)</span>
                <div className="h-4 bg-muted rounded" style={{ width: '4px' }}></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-foreground rounded-full"></div>
                <span className="w-16 text-sm">2 (8px)</span>
                <div className="h-4 bg-muted rounded" style={{ width: '8px' }}></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-foreground rounded-full"></div>
                <span className="w-16 text-sm">3 (12px)</span>
                <div className="h-4 bg-muted rounded" style={{ width: '12px' }}></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-foreground rounded-full"></div>
                <span className="w-16 text-sm">4 (16px)</span>
                <div className="h-4 bg-muted rounded" style={{ width: '16px' }}></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 bg-foreground rounded-full"></div>
                <span className="w-16 text-sm">6 (24px)</span>
                <div className="h-4 bg-muted rounded" style={{ width: '24px' }}></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-foreground rounded-full"></div>
                <span className="w-16 text-sm">8 (32px)</span>
                <div className="h-4 bg-muted rounded" style={{ width: '32px' }}></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-foreground rounded-full"></div>
                <span className="w-16 text-sm">12 (48px)</span>
                <div className="h-4 bg-muted rounded" style={{ width: '48px' }}></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-foreground rounded-full"></div>
                <span className="w-16 text-sm">16 (64px)</span>
                <div className="h-4 bg-muted rounded" style={{ width: '64px' }}></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
