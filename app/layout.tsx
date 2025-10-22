import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'Unipix — Multi-source Free Image Finder',
  description: 'Display-only, attribution-first metasearch for Unsplash, Pexels, and Pixabay. Downloads happen on the provider site.',
  keywords: 'free images, stock photos, Unsplash, Pexels, Pixabay, image search, royalty-free images',
  authors: [{ name: 'Unipix' }],
  creator: 'Unipix',
  publisher: 'Unipix',
  icons: {
    icon: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Unipix — Multi-source Free Image Finder',
    description: 'Display-only, attribution-first metasearch for Unsplash, Pexels, and Pixabay. Downloads happen on the provider site.',
    url: 'https://Unipix.vercel.app',
    siteName: 'Unipix',
    images: [
      {
        url: 'https://Unipix.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Unipix - Multi-source Free Image Finder',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unipix — Multi-source Free Image Finder',
    description: 'Display-only, attribution-first metasearch for Unsplash, Pexels, and Pixabay. Downloads happen on the provider site.',
    images: ['https://Unipix.vercel.app/og-image.png'],
    creator: '@Unipix',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXXXXXXXX" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans bg-background">
        <ThemeProvider
          defaultTheme="system"
          storageKey="ui-theme"
        >
          <div className="min-h-screen bg-background">
            <Navbar />
            <main className="w-full p-6">
              {children}
            </main>
            <footer className="border-t border-gray-700 dark:border-gray-800 bg-background w-full">
              <div className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-sm text-gray-400 space-y-2">
                  <p>Images are displayed via provider APIs and are not hosted here. Use "Go to original" to download on the provider site.</p>
                  <p>© {new Date().getFullYear()} Unipix — Multi-source Free Image Finder</p>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
