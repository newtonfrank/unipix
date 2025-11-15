import { fetchDailyUnsplashImages, searchUnsplash } from '@/lib/providers/unsplash';
import { fetchDailyPexelsImages, fetchPexelsCurated } from '@/lib/providers/pexels';
import { fetchDailyPixabayImages, searchPixabay } from '@/lib/providers/pixabay';
import { interleaveRoundRobin } from '@/lib/merge';

/**
 * Fetches daily images from all providers with consistent results for the entire day
 */
export async function fetchDailyImages() {
  // Use current date to ensure the same images for the entire day
  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  
  try {
    // Fetch trending images for the day using date-based queries to get different images each day
    const [trendingU, trendingP, trendingX] = await Promise.all([
      fetchDailyUnsplashImages(18),
      fetchDailyPexelsImages(18), // Using date-based search to get different images each day
      fetchDailyPixabayImages(18)
    ]);
    
    const trendingItems = interleaveRoundRobin([trendingU, trendingP, trendingX]);

    // Fetch editor's picks for the day - using date-based search terms for variety
    const date = new Date();
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
    
    // Use different search terms for featured images based on the day
    const featuredSearchTerms = [
      'beautiful', 'amazing', 'stunning', 'incredible', 'awesome', 
      'wonderful', 'fantastic', 'awesome', 'gorgeous', 'magnificent',
      'breathtaking', 'spectacular', 'impressive', 'outstanding', 'remarkable'
    ];
    
    const featuredSearchTerm = featuredSearchTerms[dayOfYear % featuredSearchTerms.length];
    
    const [featuredU, featuredP, featuredX] = await Promise.all([
      searchUnsplash(featuredSearchTerm, 18), // Using dynamic featured search on Unsplash
      fetchDailyPexelsImages(18), // Using date-based search as featured for Pexels
      searchPixabay(featuredSearchTerm, 18) // Using dynamic featured search on Pixabay
    ]);
    
    const featuredItems = interleaveRoundRobin([featuredU, featuredP, featuredX]);

    return {
      featuredItems,
      trendingItems,
      date: today // Include date for transparency
    };
  } catch (error) {
    console.error('Error fetching daily images:', error);
    
    // Return empty arrays in case of error to prevent page crashes
    return {
      featuredItems: [],
      trendingItems: [],
      date: today
    };
  }
}