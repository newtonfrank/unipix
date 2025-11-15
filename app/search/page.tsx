"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ImageCard from '@/components/ImageCard';
import { interleaveRoundRobin } from '@/lib/merge';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const q = (searchParams.get('q') || '').trim();
  const includeUnsplash = searchParams.get('u') !== '0';
  const includePexels = searchParams.get('p') !== '0';
  const includePixabay = searchParams.get('x') !== '0';

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
    <div className="w-full space-y-8">
      <div className="text-center py-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-2">Search Free Images</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover high-quality images from Unsplash, Pexels, and Pixabay
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <form className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center" action="/search" method="get">
          <div className="flex-1">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Search for images... (e.g. sunset, mountains, workspace)"
              className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 shadow-sm px-4 py-3 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200"
            />
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="u-checkbox" 
                name="u" 
                value="1" 
                defaultChecked={includeUnsplash} 
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="u-checkbox" className="text-gray-700 dark:text-gray-300">Unsplash</label>
            </div>
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="p-checkbox" 
                name="p" 
                value="1" 
                defaultChecked={includePexels} 
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="p-checkbox" className="text-gray-700 dark:text-gray-300">Pexels</label>
            </div>
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="x-checkbox" 
                name="x" 
                value="1" 
                defaultChecked={includePixabay} 
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="x-checkbox" className="text-gray-700 dark:text-gray-300">Pixabay</label>
            </div>
          </div>
          <button className="rounded-xl bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 shadow-sm transition-colors duration-200">
            Search
          </button>
        </form>
      </div>

      {!q && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Enter a search term to fetch results from all providers. Downloads happen on the provider site.
          </p>
        </div>
      )}

      {loading && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      )}

      {q && !loading && items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            No results yet. Try a different query or enable more providers.
          </p>
        </div>
      )}

      {q && !loading && items.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Search Results for <span className="text-blue-600">"{q}"</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {items.length} images found
            </p>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {items.map((item, index) => {
              // Different aspect ratios for bento-style design
              let aspectRatio;
              switch(index % 8) {
                case 0:
                case 4:
                  aspectRatio = 'aspect-[4/3]'; // Regular rectangle
                  break;
                case 1:
                case 5:
                  aspectRatio = 'aspect-square'; // Square
                  break;
                case 2:
                case 6:
                  aspectRatio = 'aspect-[3/2]'; // Wider rectangle
                  break;
                case 3:
                case 7:
                  aspectRatio = 'aspect-[3/4]'; // Portrait
                  break;
                default:
                  aspectRatio = 'aspect-[3/2]'; // Fallback
              }
              
              return (
              <div key={item.id} className="break-inside-avoid">
                <ImageCard item={item} aspectRatio={aspectRatio} />
              </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
