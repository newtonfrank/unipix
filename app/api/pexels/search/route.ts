import { searchPexels } from '@/lib/providers/pexels'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') || ''
  const data = q ? await searchPexels(q, 30) : []
  return NextResponse.json(data)
}
