import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ConsoleFilter } from "@/components/console-filter";

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
  openGraph: {
    title: "OmoOniBag - A bag for every girl, every time",
    description: "Luxury bags and shoes crafted to elevate everyday moments.",
    type: "website",
    locale: "en_NG",
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
        <ConsoleFilter />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
