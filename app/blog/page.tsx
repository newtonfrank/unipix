import Link from 'next/link'

export const metadata = {
  title: 'Blog - Unixpix',
  description: 'Read our latest blog posts about free stock images, photography tips, and more.',
}

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: 'How to Find the Best Free Stock Images',
      excerpt: 'Learn tips and tricks for finding high-quality free stock images for your projects.',
      date: '2023-10-15',
      slug: 'how-to-find-best-free-stock-images',
    },
    {
      id: 2,
      title: 'Understanding Image Licenses: A Complete Guide',
      excerpt: 'Navigate the complex world of image licenses and understand what you can and cannot do with free images.',
      date: '2023-10-01',
      slug: 'understanding-image-licenses',
    },
    {
      id: 3,
      title: 'Top 10 Sources for Free Stock Photos in 2023',
      excerpt: 'Discover the best websites for finding free stock photos and illustrations.',
      date: '2023-09-20',
      slug: 'top-10-sources-free-stock-photos-2023',
    },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Blog</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Read our latest blog posts about free stock images, photography tips, and more.
      </p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <div key={post.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">{post.date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}