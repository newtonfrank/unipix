import { fetchPexelsCurated } from '@/lib/providers/pexels'
import { NextResponse } from 'next/server'

export async function GET() {
  const data = await fetchPexelsCurated(30)
  return NextResponse.json(data)
}
