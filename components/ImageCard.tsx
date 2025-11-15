"use client";

import Image from 'next/image'
import Link from 'next/link'
import ProviderBadge from './ProviderBadge'
import { UnifiedImage } from '@/lib/types'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ImageCard({ item, aspectRatio = 'aspect-[3/2]' }: { item: UnifiedImage, aspectRatio?: string }) {
  const [imageError, setImageError] = useState(false);
  const isUnsplash = item.provider === 'unsplash'
  const goToOriginalHref = isUnsplash
    ? `/api/unsplash/track-download?download_location=${encodeURIComponent(item.unsplashDownloadLocation || '')}&redirect_to=${encodeURIComponent(item.sourcePageUrl)}`
    : item.sourcePageUrl

  return (
    <motion.div 
      className="group relative overflow-hidden rounded-lg bg-transparent shadow-none"
      whileHover={{ y: -5 }}
    >
      <div
        className={`relative w-full ${aspectRatio}`}
      >
        {!imageError ? (
          <Image
            src={item.previewUrl}
            alt={item.alt || 'Stock image'}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            priority={false}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-700 text-gray-400">
            <span className="text-sm">Image not available</span>
          </div>
        )}
        
        {/* Overlay for image details on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="text-white">
            <div className="font-medium text-sm truncate">
              <Link href={item.authorUrl} target="_blank" className="no-underline hover:text-blue-300 transition-colors">
                {item.authorName}
              </Link>
            </div>
            <div className="text-xs text-gray-300 flex items-center justify-between mt-1">
              <div className="flex items-center gap-2">
                <span className="truncate max-w-[120px]">
                  {item.provider.charAt(0).toUpperCase() + item.provider.slice(1)}
                </span>
                <ProviderBadge provider={item.provider} />
              </div>
              <Link
                href={goToOriginalHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-white/20 hover:bg-white/30 rounded py-1 px-2 no-underline transition-colors"
              >
                Go to original
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
