import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ConsoleFilter } from "@/components/console-filter";
import { AnalyticsInit } from "@/components/analytics-init";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "OmoOniBag - A bag for every girl, every time",
  description: "Luxury bags and shoes crafted to elevate everyday moments. Premium quality, fast delivery, and easy exchange.",
  keywords: ["luxury bags", "designer shoes", "Nigerian fashion", "premium leather", "handbags", "clutches", "totes"],
  authors: [{ name: "OmoOniBag" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'),
  alternates: { canonical: '/' },
  openGraph: {
    title: "OmoOniBag - A bag for every girl, every time",
    description: "Luxury bags and shoes crafted to elevate everyday moments.",
    type: "website",
    locale: "en_NG",
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} data-scroll-behavior="smooth">
      <body className="font-sans antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-gold text-ink px-3 py-2 rounded">Skip to content</a>
        <ConsoleFilter />
        <AnalyticsInit />
        <Toaster richColors closeButton />
        <Navbar />
        <main id="main" className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
