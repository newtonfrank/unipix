import { interleaveRoundRobin } from '@/lib/merge'
import { fetchUnsplashTrending, searchUnsplash } from '@/lib/providers/unsplash'
import { fetchPexelsCurated } from '@/lib/providers/pexels'
import { fetchPixabayTrending, searchPixabay } from '@/lib/providers/pixabay'
import { checkEnv } from '@/lib/env'
import ImageCard from '@/components/ImageCard'
import Link from 'next/link'
import { useState } from 'react'

export const revalidate = 300 // Revalidate every 5 minutes

export default async function HomePage() {
  checkEnv()
  // For the hero section background image, we would ideally fetch a featured image
  // For now, we'll use a placeholder
  const heroImage = {
    url: 'https://images.unsplash.com/photo-1750688650387-48fbdc7399b3',
    alt: 'Abstract',
    user: {
      name: 'Jonas Degener',
      profileUrl: 'https://unsplash.com/@jonasdegener'
    }
  }

  // Fetch trending images
  const [trendingU, trendingP, trendingX] = await Promise.all([
    fetchUnsplashTrending(18),
    fetchPexelsCurated('trending', 18), // Using curated as trending for Pexels
    fetchPixabayTrending(18)
  ])
  const trendingItems = interleaveRoundRobin([trendingU, trendingP, trendingX])

  // Fetch editor's picks (using search with 'featured' tag as a proxy)
  // For Pexels, we already have fetchPexelsCurated which might be editor's picks
  const [featuredU, featuredP, featuredX] = await Promise.all([
    searchUnsplash('featured', 18), // Using search for featured on Unsplash
    fetchPexelsCurated('featured', 18), // Using curated as editor's picks for Pexels
    searchPixabay('featured', 18) // Using search for featured on Pixabay
  ])
  const featuredItems = interleaveRoundRobin([featuredU, featuredP, featuredX])

  return (
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Unixpix",
            "url": "https://unixpix.vercel.app",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://unixpix.vercel.app/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
      {/* Hero Section */}
      <div
        className="relative overflow-hidden rounded-2xl h-96 bg-cover bg-center flex items-center justify-center px-4"
        style={{ backgroundImage: `url(${heroImage.url})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Discover Stunning Free Images</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl text-white">
            Search and browse high-quality images from Unsplash, Pexels, and Pixabay in one place.
          </p>
          
          {/* Search Bar */}
          <form
            action="/search"
            method="get"
            className="w-full max-w-2xl"
          >
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                name="q"
                placeholder="Search for images..."
                className="flex-1 rounded-lg bg-white/90 border border-white/20 px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        
        {/* Attribution */}
        <div className="absolute bottom-4 right-4 text-white text-sm">
          Photo by <a href={heroImage.user.profileUrl} target="_blank" rel="noopener noreferrer" className="underline">{heroImage.user.name}</a> on Unsplash
        </div>
      </div>

      {/* Container for the rest of the content to maintain original layout */}
      <div className="container">
        {/* Editor's Picks Section */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold">Editor's Picks</h2>
            <p className="text-sm text-gray-400">Curated selection from Unsplash, Pexels, and Pixabay.</p>
          </div>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {featuredItems.map((item) => (
            <div key={item.id} className="break-inside-avoid">
              <ImageCard item={item} />
            </div>
          ))}
        </div>

        {/* Trending Images Section */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold">Trending Now</h2>
            <p className="text-sm text-gray-400">Most popular images from Unsplash, Pexels, and Pixabay.</p>
          </div>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {trendingItems.map((item) => (
            <div key={item.id} className="break-inside-avoid">
              <ImageCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
