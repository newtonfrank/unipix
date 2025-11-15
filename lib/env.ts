import { z } from 'zod'

const EnvSchema = z.object({
  UNSPLASH_ACCESS_KEY: z.string().min(1, 'Missing UNSPLASH_ACCESS_KEY'),
  PEXELS_API_KEY: z.string().min(1, 'Missing PEXELS_API_KEY'),
  PIXABAY_API_KEY: z.string().min(1, 'Missing PIXABAY_API_KEY'),
  APP_NAME: z.string().default('StockBridge')
})

export const env = (() => {
  const parsed = EnvSchema.safeParse({
    UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
    PEXELS_API_KEY: process.env.PEXELS_API_KEY,
    PIXABAY_API_KEY: process.env.PIXABAY_API_KEY,
    APP_NAME: process.env.APP_NAME || 'StockBridge'
  })
  if (!parsed.success) {
    // We don't throw at import time to keep dev UX; call checkEnv() to assert.
    return null as any
  }
  return parsed.data
})()

export function checkEnv() {
  if (!env) {
    const missing = [
      !process.env.UNSPLASH_ACCESS_KEY && 'UNSPLASH_ACCESS_KEY',
      !process.env.PEXELS_API_KEY && 'PEXELS_API_KEY',
      !process.env.PIXABAY_API_KEY && 'PIXABAY_API_KEY'
    ].filter(Boolean)
    throw new Error(`Missing environment variables: ${missing.join(', ')}`)
  }
}
