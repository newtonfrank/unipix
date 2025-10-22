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
