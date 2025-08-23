import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Unixpix — Multi-source Free Image Finder',
  description: 'Display-only, attribution-first metasearch for Unsplash, Pexels, and Pixabay. Downloads happen on the provider site.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container py-8">
          {children}
        </main>
        <footer className="border-t border-white/10">
          <div className="container py-6 text-sm text-gray-400">
            <p>Images are displayed via provider APIs and are not hosted here. Use “Go to original” to download on the provider site.</p>
            <p>© {new Date().getFullYear()} Unixpix</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
