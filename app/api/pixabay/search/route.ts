import { searchPixabay } from '@/lib/providers/pixabay'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') || ''
  const data = q ? await searchPixabay(q, 30) : []
  return NextResponse.json(data)
}
