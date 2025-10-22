import { fetchPexelsCurated } from '@/lib/providers/pexels'
import { NextResponse } from 'next/server'

export async function GET() {
  const data = await fetchPexelsCurated('curated', 30)
  return NextResponse.json(data)
}
