import { notFound } from 'next/navigation'

// Mock blog post data - in a real app, this would come from a database or CMS
const blogPosts = {
  'how-to-find-best-free-stock-images': {
    title: 'How to Find the Best Free Stock Images',
    date: '2023-10-15',
    author: 'Jane Doe',
    content: `
      <p>Finding high-quality free stock images can be challenging, but with the right approach, you can discover stunning visuals for your projects without breaking the bank.</p>
      
      <h2>1. Know Your Needs</h2>
      <p>Before you start searching, define what kind of images you need. Consider the mood, color scheme, and subject matter that aligns with your project.</p>
      
      <h2>2. Use Multiple Sources</h2>
      <p>Don't limit yourself to a single platform. Popular sources include Unsplash, Pexels, Pixabay, and our very own Unixpix search engine.</p>
      
      <h2>3. Pay Attention to Licenses</h2>
      <p>Always check the license terms to ensure you can use the images for your intended purpose, especially for commercial projects.</p>
      
      <h2>4. Use Specific Keywords</h2>
      <p>Instead of generic terms, use specific keywords to find more relevant results. For example, instead of "business," try "diverse business team meeting."</p>
      
      <h2>5. Leverage Advanced Search Features</h2>
      <p>Take advantage of filters for orientation, size, color, and more to narrow down your search results.</p>
    `,
  },
  'understanding-image-licenses': {
    title: 'Understanding Image Licenses: A Complete Guide',
    date: '2023-10-01',
    author: 'John Smith',
    content: `
      <p>Navigating the world of image licenses can be complex. Understanding the different types of licenses is crucial for legal and ethical use of images.</p>
      
      <h2>1. Public Domain</h2>
      <p>Images in the public domain are free to use without restrictions. These are typically very old images or those explicitly released into the public domain.</p>
      
      <h2>2. Creative Commons</h2>
      <p>Creative Commons licenses offer various levels of permissions. Some require attribution, while others may restrict commercial use or derivative works.</p>
      
      <h2>3. Royalty-Free</h2>
      <p>Royalty-free images can be used multiple times without paying additional fees, but they may still have usage restrictions.</p>
      
      <h2>4. Rights-Managed</h2>
      <p>Rights-managed images require payment for each specific use, often based on factors like duration, geographic location, and media type.</p>
      
      <h2>5. Editorial Use Only</h2>
      <p>These images can only be used for editorial purposes, such as news articles, and cannot be used in advertising or promotional materials.</p>
    `,
  },
  'top-10-sources-free-stock-photos-2023': {
    title: 'Top 10 Sources for Free Stock Photos in 2023',
    date: '2023-09-20',
    author: 'Alice Johnson',
    content: `
      <p>Discover the best websites for finding free stock photos and illustrations to enhance your creative projects in 2023.</p>
      
      <h2>1. Unsplash</h2>
      <p>Known for high-quality, professional images with a simple licensing model. All photos are free to use for any purpose.</p>
      
      <h2>2. Pexels</h2>
      <p>Offers a vast collection of free stock photos and videos. Images are high-resolution and perfect for commercial use.</p>
      
      <h2>3. Pixabay</h2>
      <p>Features a wide variety of free images, illustrations, and vectors. All content is released under Creative Commons CC0.</p>
      
      <h2>4. Unixpix</h2>
      <p>Our own meta-search engine that aggregates images from multiple sources, making it easier to find the perfect image.</p>
      
      <h2>5. Freepik</h2>
      <p>Provides free vectors, stock photos, and PSD files. Requires attribution for free use or offers a premium subscription.</p>
      
      <h2>6. StockVault</h2>
      <p>Offers free photos, vectors, and icons. Content is user-contributed and released under various Creative Commons licenses.</p>
      
      <h2>7. Picjumbo</h2>
      <p>Features a collection of free stock photos that can be used for personal and commercial projects.</p>
      
      <h2>8. Gratisography</h2>
      <p>Known for quirky and unusual free stock photos. All images are free to use for personal and commercial purposes.</p>
      
      <h2>9. Burst (by Shopify)</h2>
      <p>Curated collection of free stock photos focused on entrepreneurship and business. Perfect for commercial use.</p>
      
      <h2>10. Life of Pix</h2>
      <p>High-quality free stock photos with a focus on lifestyle and nature. All images are free for personal and commercial use.</p>
    `,
  },
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = blogPosts[resolvedParams.slug as keyof typeof blogPosts]
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The blog post you are looking for does not exist.',
    }
  }
  
  return {
    title: post.title,
    description: `Read about ${post.title.toLowerCase()} on Unixpix blog.`,
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }))
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = blogPosts[resolvedParams.slug as keyof typeof blogPosts]

  // Show 404 page if post doesn't exist
  if (!post) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <span>By {post.author}</span> • <span>{post.date}</span>
      </div>
      <div 
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  )
}