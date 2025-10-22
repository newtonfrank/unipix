'use client';

import { motion } from 'framer-motion';
import ImageCard from '@/components/ImageCard';
import Link from 'next/link';
import { UnifiedImage } from '@/lib/types';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

interface HomePageClientProps {
  featuredItems: UnifiedImage[];
  trendingItems: UnifiedImage[];
  heroImage: {
    url: string;
    alt: string;
    user: {
      name: string;
      profileUrl: string;
    };
  };
}

export default function HomePageClient({ featuredItems, trendingItems, heroImage }: HomePageClientProps) {
  return (
    <motion.div 
      className="w-full space-y-6"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Unipix",
            "url": "https://unipix-newton..vercel.app",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://unipix-newton.vercel.app/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
      
      {/* Hero Section */}
      <motion.div
        className="rounded-3xl overflow-hidden shadow-md shadow-black/5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900"
        variants={item}
      >
        <div
          className="relative h-96 bg-cover bg-center flex items-center justify-center px-4 p-12 rounded-3xl"
          style={{ backgroundImage: `url(${heroImage.url})` }}
        >
          <div className="absolute inset-0 bg-black/40 dark:bg-black/50 backdrop-blur-sm"></div>
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-4">
            <motion.h1 
              className="text-4xl md:text-5xl font-semibold mb-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Discover Stunning Free Images
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl mb-8 max-w-2xl text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Search and browse high-quality images from Unsplash, Pexels, and Pixabay in one place.
            </motion.p>
            
            {/* Search Bar */}
            <motion.form
              action="/search"
              method="get"
              className="w-full max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  name="q"
                  placeholder="Search for images..."
                  className="flex-1 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 shadow-sm px-4 py-3 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 shadow-sm transition-colors duration-200"
                >
                  Search
                </button>
              </div>
            </motion.form>
          </div>
          
          {/* Attribution */}
          <div className="absolute bottom-4 right-4 text-white text-sm bg-black/30 backdrop-blur-sm px-3 py-1 rounded-lg">
            Photo by <a 
              href={heroImage.user.profileUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="underline hover:text-blue-300 transition-colors"
            >
              {heroImage.user.name}
            </a> on Unsplash
          </div>
        </div>
      </motion.div>

      {/* Editor's Picks Section */}
      <motion.section variants={item}>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">Editor's Picks</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Curated selection from Unsplash, Pexels, and Pixabay.</p>
          </div>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {featuredItems.map((item, index) => {
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
            <motion.div 
              key={item.id} 
              className="break-inside-avoid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <ImageCard item={item} aspectRatio={aspectRatio} />
            </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Trending Images Section */}
      <motion.section variants={item}>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">Trending Now</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Most popular images from Unsplash, Pexels, and Pixabay.</p>
          </div>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {trendingItems.map((item, index) => {
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
            <motion.div 
              key={item.id} 
              className="break-inside-avoid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <ImageCard item={item} aspectRatio={aspectRatio} />
            </motion.div>
            );
          })}
        </div>
      </motion.section>
    </motion.div>
  );
}