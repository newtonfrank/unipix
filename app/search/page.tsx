"use client";

import { useState, useEffect } from 'react';
import ImageCard from '@/components/ImageCard';
import { interleaveRoundRobin } from '@/lib/merge';

export default function SearchPage({ searchParams }: { searchParams: { q?: string, u?: string, p?: string, x?: string } }) {
  const q = (searchParams.q || '').trim();
  const includeUnsplash = searchParams.u !== '0';
  const includePexels = searchParams.p !== '0';
  const includePixabay = searchParams.x !== '0';

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!q) {
        setItems([]);
        return;
      }

      setLoading(true);
      
      try {
        const results = await Promise.all([
          includeUnsplash ? fetch(`/api/unsplash/search?q=${encodeURIComponent(q)}`).then(res => res.json()) : Promise.resolve([]),
          includePexels ? fetch(`/api/pexels/search?q=${encodeURIComponent(q)}`).then(res => res.json()) : Promise.resolve([]),
          includePixabay ? fetch(`/api/pixabay/search?q=${encodeURIComponent(q)}`).then(res => res.json()) : Promise.resolve([]),
        ]);
        
        const interleaved = interleaveRoundRobin(results as any);
        setItems(interleaved);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [q, includeUnsplash, includePexels, includePixabay]);

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

      {loading && <p className="text-sm text-gray-400">Loading...</p>}

      {q && !loading && items.length === 0 && (
        <p className="text-sm text-gray-400">No results yet. Try a different query or enable more providers.</p>
      )}

      {q && !loading && items.length > 0 && (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="break-inside-avoid">
              <ImageCard item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
