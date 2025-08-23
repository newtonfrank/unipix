import { fetchPixabayTrending } from '@/lib/providers/pixabay'
import { NextResponse } from 'next/server'

export async function GET() {
  const data = await fetchPixabayTrending(30)
  return NextResponse.json(data)
}
