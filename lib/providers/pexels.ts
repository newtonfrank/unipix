import { env } from '@/lib/env'

export async function fetchPexelsCurated(count: number): Promise<any[]> {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/curated?per_page=${count}`,
      {
        headers: {
          Authorization: env.PEXELS_API_KEY
        }
      }
    )
    
    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status} ${response.statusText}`)
    }
    
    const data = await response.json()
    
    // Transform the data to match the expected format
    return data.photos.map((item: any) => ({
      id: item.id,
      previewUrl: item.src.large2x || item.src.large,
      thumbUrl: item.src.tiny,
      alt: item.alt || '',
      width: item.width,
      height: item.height,
      provider: 'pexels',
      authorName: item.photographer,
      authorUrl: item.photographer_url,
      sourcePageUrl: item.url
    }))
  } catch (error) {
    console.error('Error fetching from Pexels:', error)
    return []
  }
}

export async function fetchPexelsTrending(query: string, count: number): Promise<any[]> {
  // Pexels doesn't have a direct "trending" endpoint, so we'll use search
  return searchPexels(query, count)
}

export async function searchPexels(query: string, count: number): Promise<any[]> {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count}`,
      {
        headers: {
          Authorization: env.PEXELS_API_KEY
        }
      }
    )
    
    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status} ${response.statusText}`)
    }
    
    const data = await response.json()
    
    // Transform the data to match the expected format
    return data.photos.map((item: any) => ({
      id: item.id,
      previewUrl: item.src.large2x || item.src.large,
      thumbUrl: item.src.tiny,
      alt: item.alt || '',
      width: item.width,
      height: item.height,
      provider: 'pexels',
      authorName: item.photographer,
      authorUrl: item.photographer_url,
      sourcePageUrl: item.url
    }))
  } catch (error) {
    console.error('Error searching Pexels:', error)
    return []
  }
}
