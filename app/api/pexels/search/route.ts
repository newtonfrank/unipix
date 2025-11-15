import { searchPexels } from '@/lib/providers/pexels'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') || ''
  const count = parseInt(req.nextUrl.searchParams.get('count') || '30')
  const data = q ? await searchPexels(q, count) : []
  return NextResponse.json(data)
}
