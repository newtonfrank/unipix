import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const dl = req.nextUrl.searchParams.get('download_location')
    const redirectTo = req.nextUrl.searchParams.get('redirect_to') || 'https://unsplash.com'
    const key = process.env.UNSPLASH_ACCESS_KEY
    if (!dl || !key) {
      return NextResponse.redirect(redirectTo)
    }
    // Call Unsplash download_location to register the download
    await fetch(dl, {
      headers: { Authorization: `Client-ID ${key}` },
      cache: 'no-store'
    }).catch(() => {})
    return NextResponse.redirect(redirectTo)
  } catch {
    return NextResponse.redirect('https://unsplash.com')
  }
}
