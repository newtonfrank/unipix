import { env } from '@/lib/env'

export async function fetchPixabayTrending(count: number) {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${env.PIXABAY_API_KEY}&per_page=${count}&order=popular`,
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    )
    
    if (!response.ok) {
      throw new Error(`Pixabay API error: ${response.status} ${response.statusText}`)
    }
    
    const data = await response.json()
    
    // Transform the data to match the expected format
    return data.hits.map((item: any) => ({
      id: item.id,
      previewUrl: item.largeImageURL,
      thumbUrl: item.webformatURL,
      alt: item.tags || '',
      width: item.imageWidth,
      height: item.imageHeight,
      provider: 'pixabay',
      authorName: item.user,
      authorUrl: `https://pixabay.com/users/${item.user}-${item.user_id}/`,
      sourcePageUrl: item.pageURL
    }))
  } catch (error) {
    console.error('Error fetching from Pixabay:', error)
    return []
  }
}

export async function searchPixabay(query: string, count: number): Promise<any[]> {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${env.PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&per_page=${count}`,
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    )
    
    if (!response.ok) {
      throw new Error(`Pixabay API error: ${response.status} ${response.statusText}`)
    }
    
    const data = await response.json()
    
    // Transform the data to match the expected format
    return data.hits.map((item: any) => ({
      id: item.id,
      previewUrl: item.largeImageURL,
      thumbUrl: item.webformatURL,
      alt: item.tags || '',
      width: item.imageWidth,
      height: item.imageHeight,
      provider: 'pixabay',
      authorName: item.user,
      authorUrl: `https://pixabay.com/users/${item.user}-${item.user_id}/`,
      sourcePageUrl: item.pageURL
    }))
  } catch (error) {
    console.error('Error searching Pixabay:', error)
    return []
  }
}
