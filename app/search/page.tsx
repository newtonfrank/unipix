"use client";

import { interleaveRoundRobin } from '@/lib/merge'
import { searchUnsplash } from '@/lib/providers/unsplash'
import { searchPexels } from '@/lib/providers/pexels'
import { searchPixabay } from '@/lib/providers/pixabay'
import { checkEnv } from '@/lib/env'
import ImageCard from '@/components/ImageCard'
import Link from 'next/link'


export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string, u?: string, p?: string, x?: string }> }) {
  checkEnv()
  const params = await searchParams
  const q = (params.q || '').trim()
  const includeUnsplash = params.u !== '0'
  const includePexels = params.p !== '0'
  const includePixabay = params.x !== '0'

  let items: any[] = []
  if (q) {
    const results = await Promise.all([
      includeUnsplash ? searchUnsplash(q, 24) : Promise.resolve([]),
      includePexels ? searchPexels(q, 24) : Promise.resolve([]),
      includePixabay ? searchPixabay(q, 24) : Promise.resolve([]),
    ])
    items = interleaveRoundRobin(results as any)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-semibold">Search</h1>
      <form className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center" action="/search" method="get">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Try: sunset, workspace, mountains…"
          className="flex-1 rounded-lg bg-white/10 border border-white/10 px-3 py-2 outline-none"
        />
        <div className="flex items-center gap-3 text-sm">
          <label className="flex items-center gap-1">
            <input type="checkbox" name="u" value="1" defaultChecked={includeUnsplash} />
            Unsplash
          </label>
          <label className="flex items-center gap-1">
            <input type="checkbox" name="p" value="1" defaultChecked={includePexels} />
            Pexels
          </label>
          <label className="flex items-center gap-1">
            <input type="checkbox" name="x" value="1" defaultChecked={includePixabay} />
            Pixabay
          </label>
        </div>
        <button className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm hover:bg-white/20">Search</button>
      </form>

      {!q && <p className="text-sm text-gray-400">Enter a search term to fetch results from all providers. Downloads happen on the provider site.</p>}

      {q && items.length === 0 && (
        <p className="text-sm text-gray-400">No results yet. Try a different query or enable more providers.</p>
      )}

      {q && items.length > 0 && (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="break-inside-avoid">
              <ImageCard item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export const revalidate = 60;
