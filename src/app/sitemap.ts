import type { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mystrymsg.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/signin', '/signup', '/send', '/dashboard', '/docs']
  const now = new Date().toISOString()
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: route === '' ? 1 : 0.7,
  }))
}


