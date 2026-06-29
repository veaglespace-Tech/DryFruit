import type { Metadata } from "next";
import { Playfair_Display, Poppins, Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import { Toaster } from "react-hot-toast";
import CartSidebar from "@/components/layout/CartSidebar";
import SearchOverlay from "@/components/layout/SearchOverlay";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-button",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nutriroots.com"),
  title: {
    default: "NutriRoots | Premium Dry Fruits & Nuts Online",
    template: "%s | NutriRoots",
  },
  description:
    "Discover India's finest selection of premium dry fruits, nuts, and superfoods. 100% natural, farm-fresh, chemical-free. Shop almonds, cashews, pistachios, walnuts, dates and more.",
  keywords: [
    "dry fruits online",
    "premium dry fruits India",
    "buy almonds online",
    "cashews online",
    "pistachios India",
    "organic dry fruits",
    "NutriRoots",
    "healthy snacks",
    "natural nuts",
  ],
  authors: [{ name: "NutriRoots" }],
  creator: "NutriRoots",
  publisher: "NutriRoots",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://nutriroots.com",
    siteName: "NutriRoots",
    title: "NutriRoots | Premium Dry Fruits & Nuts Online",
    description:
      "India's finest premium dry fruits, nuts & superfoods. 100% natural, farm-fresh, chemical-free.",
    images: [
      {
        url: "/images/hero/hero-bg.png",
        width: 1200,
        height: 630,
        alt: "NutriRoots Premium Dry Fruits",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NutriRoots | Premium Dry Fruits & Nuts Online",
    description: "India's finest premium dry fruits, nuts & superfoods.",
    images: ["/images/hero/hero-bg.png"],
    creator: "@nutriroots",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="nutriroots" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#6B3E26" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body
        className={`${playfairDisplay.variable} ${poppins.variable} ${inter.variable} antialiased`}
      >
        <ReduxProvider>
          {children}
          <CartSidebar />
          <SearchOverlay />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#fff',
                color: '#2D2D2D',
                border: '1px solid #EFE7DD',
                borderRadius: '12px',
                fontFamily: 'var(--font-body, Poppins)',
                fontSize: '0.875rem',
                boxShadow: '0 8px 32px rgba(107, 62, 38, 0.12)',
              },
              success: {
                iconTheme: { primary: '#6B3E26', secondary: '#fff' },
              },
            }}
          />
        </ReduxProvider>
      </body>
    </html>
  );
}
