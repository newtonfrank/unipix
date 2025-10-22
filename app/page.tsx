import { checkEnv } from '@/lib/env'
import ImageCard from '@/components/ImageCard'
import Link from 'next/link'
import { useState } from 'react'
import { fetchDailyImages } from '@/lib/daily-images'
import HomePageClient from './home-client'

export const revalidate = 86400 // Revalidate every 24 hours (86400 seconds)

export default async function HomePage() {
  checkEnv()
  // Fetch daily images (changes every 24 hours)
  const { featuredItems, trendingItems } = await fetchDailyImages();
  
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

  return (
    <HomePageClient 
      featuredItems={featuredItems} 
      trendingItems={trendingItems} 
      heroImage={heroImage} 
    />
  )
}
