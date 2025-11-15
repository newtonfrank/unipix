import { fetchUnsplashTrending } from '@/lib/providers/unsplash'
import { NextResponse } from 'next/server'

export async function GET() {
  const data = await fetchUnsplashTrending(30)
  return NextResponse.json(data)
}
