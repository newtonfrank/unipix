"use client";

import Image from 'next/image'
import Link from 'next/link'
import ProviderBadge from './ProviderBadge'
import { UnifiedImage } from '@/lib/types'
import { useState, useEffect } from 'react'

export default function ImageCard({ item }: { item: UnifiedImage }) {
  const [imageError, setImageError] = useState(false);
  const isUnsplash = item.provider === 'unsplash'
  const goToOriginalHref = isUnsplash
    ? `/api/unsplash/track-download?download_location=${encodeURIComponent(item.unsplashDownloadLocation || '')}&redirect_to=${encodeURIComponent(item.sourcePageUrl)}`
    : item.sourcePageUrl

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <div
        className="relative w-full"
        style={{ aspectRatio: `${item.width}/${item.height}` }}
      >
        {!imageError ? (
          <Image
            src={item.previewUrl}
            alt={item.alt || 'Stock image'}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.05]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            priority={false}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
            <span className="text-sm">Image not available</span>
          </div>
        )}
      </div>
      <div className="p-3 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="text-sm font-medium truncate">
            <Link href={item.authorUrl} target="_blank" className="no-underline hover:opacity-90">
              {item.authorName}
            </Link>
          </div>
          <div className="text-xs text-gray-400 truncate">
            <Link href={item.sourcePageUrl} target="_blank" className="no-underline hover:opacity-90">
              View on {item.provider.charAt(0).toUpperCase() + item.provider.slice(1)}
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ProviderBadge provider={item.provider} />
          <Link
            href={goToOriginalHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs rounded-md border border-white/10 bg-white/10 px-2 py-1 no-underline hover:bg-white/20"
          >
            Go to original
          </Link>
        </div>
      </div>
    </div>
  )
}
