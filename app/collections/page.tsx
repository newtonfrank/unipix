"use client";

import { useState, useEffect } from 'react';
import ImageCard from '@/components/ImageCard';
import { interleaveRoundRobin } from '@/lib/merge';

export default function CollectionsPage() {
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true);
      
      try {
        // Define trending categories
        const categories = [
          'nature', 'technology', 'people', 'animals', 'business',
          'travel', 'food', 'abstract', 'city', 'fashion'
        ];
        
        // Create collection objects with category data
        const collectionData = await Promise.all(categories.map(async (category) => {
          try {
            // Fetch images for each category from all providers
            const results = await Promise.all([
              fetch(`/api/unsplash/search?q=${encodeURIComponent(category)}&count=6`).then(res => res.json()),
              fetch(`/api/pexels/search?q=${encodeURIComponent(category)}&count=6`).then(res => res.json()),
              fetch(`/api/pixabay/search?q=${encodeURIComponent(category)}&count=6`).then(res => res.json())
            ]);
            
            const interleaved = interleaveRoundRobin(results as any);
            
            return {
              id: category,
              title: category.charAt(0).toUpperCase() + category.slice(1),
              items: interleaved.slice(0, 6) // Take only first 6 items
            };
          } catch (error) {
            console.error(`Error fetching ${category} collection:`, error);
            return {
              id: category,
              title: category.charAt(0).toUpperCase() + category.slice(1),
              items: []
            };
          }
        }));
        
        setCollections(collectionData);
      } catch (error) {
        console.error('Error fetching collections:', error);
        setCollections([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-semibold">Collections</h1>
      
      {loading && <p className="text-sm text-gray-400">Loading collections...</p>}
      
      {!loading && collections.length === 0 && (
        <p className="text-sm text-gray-400">No collections available at the moment.</p>
      )}
      
      {!loading && collections.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {collections.map((collection) => (
            <div key={collection.id} className="border border-white/10 rounded-lg overflow-hidden">
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{collection.title}</h2>
                {collection.items.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {collection.items.map((item: any) => (
                      <div key={item.id} className="aspect-square overflow-hidden rounded">
                        <img
                          src={item.thumbUrl}
                          alt={item.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 mb-4">No images available</p>
                )}
                <button
                  className="w-full rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
                  onClick={() => window.location.href = `/search?q=${collection.id}`}
                >
                  View Collection
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}