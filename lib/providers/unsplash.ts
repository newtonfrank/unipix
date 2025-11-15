import { env } from '@/lib/env'

export async function fetchUnsplashTrending(count: number) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos?per_page=${count}&order_by=popular`,
      {
        headers: {
          Authorization: `Client-ID ${env.UNSPLASH_ACCESS_KEY}`
        }
      }
    )
    
    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status} ${response.statusText}`)
    }
    
    const data = await response.json()
    
    // Transform the data to match the expected format
    return data.map((item: any) => ({
      id: item.id,
      previewUrl: item.urls.regular,
      thumbUrl: item.urls.thumb,
      alt: item.alt_description || item.description || '',
      width: item.width,
      height: item.height,
      provider: 'unsplash',
      authorName: item.user.name,
      authorUrl: item.user.links.html,
      sourcePageUrl: item.links.html,
      unsplashDownloadLocation: item.links.download_location
    }))
  } catch (error) {
    console.error('Error fetching from Unsplash:', error)
    return []
  }
}

// Function to get daily trending images using a date-based approach
export async function fetchDailyUnsplashImages(count: number) {
  try {
    // Generate a daily changing search term based on the current date
    const date = new Date();
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
    
    // Use a different search term each day to get different results
    const searchTerms = [
      'nature', 'landscape', 'architecture', 'technology', 'people',
      'animals', 'food', 'travel', 'business', 'health', 'art', 'music',
      'sports', 'science', 'fashion', 'home', 'garden', 'transportation',
      'weather', 'space', 'ocean', 'mountains', 'forest', 'desert'
    ];
    
    const searchTerm = searchTerms[dayOfYear % searchTerms.length];
    
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchTerm)}&per_page=${count}&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${env.UNSPLASH_ACCESS_KEY}`
        }
      }
    )
    
    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status} ${response.statusText}`)
    }
    
    const data = await response.json()
    
    // Transform the data to match the expected format
    return data.results.map((item: any) => ({
      id: item.id,
      previewUrl: item.urls.regular,
      thumbUrl: item.urls.thumb,
      alt: item.alt_description || item.description || '',
      width: item.width,
      height: item.height,
      provider: 'unsplash',
      authorName: item.user.name,
      authorUrl: item.user.links.html,
      sourcePageUrl: item.links.html,
      unsplashDownloadLocation: item.links.download_location
    }))
  } catch (error) {
    console.error('Error fetching from Unsplash:', error)
    return []
  }
}

// No need to redefine searchUnsplash here

export async function searchUnsplash(query: string, count: number): Promise<any[]> {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}`,
      {
        headers: {
          Authorization: `Client-ID ${env.UNSPLASH_ACCESS_KEY}`
        }
      }
    )
    
    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status} ${response.statusText}`)
    }
    
    const data = await response.json()
    
    // Transform the data to match the expected format
    return data.results.map((item: any) => ({
      id: item.id,
      previewUrl: item.urls.regular,
      thumbUrl: item.urls.thumb,
      alt: item.alt_description || item.description || '',
      width: item.width,
      height: item.height,
      provider: 'unsplash',
      authorName: item.user.name,
      authorUrl: item.user.links.html,
      sourcePageUrl: item.links.html,
      unsplashDownloadLocation: item.links.download_location
    }))
  } catch (error) {
    console.error('Error searching Unsplash:', error)
    return []
  }
}
