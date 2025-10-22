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
    url: 'https://images.unsplash.com/photo-1670884307115-ab10e0498cc6?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=boliviainteligente-uzkTua45keU-unsplash.jpg&w=1920',
    alt: 'Abstract',
    user: {
      name: 'Boliviainteligente',
      profileUrl: 'https://unsplash.com/@boliviainteligente'
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
