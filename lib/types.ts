export type Provider = 'unsplash' | 'pexels' | 'pixabay'

export type UnifiedImage = {
  id: string
  provider: Provider
  width: number
  height: number
  alt: string
  thumbUrl: string     // small thumbnail
  previewUrl: string   // medium/regular for grid
  authorName: string
  authorUrl: string    // include required params (e.g. Unsplash UTM)
  sourcePageUrl: string
  unsplashDownloadLocation?: string // only for Unsplash
}
