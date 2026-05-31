import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/settings/', '/profile/', '/api/'],
    },
    sitemap: 'https://mcqprepzone.online/sitemap.xml',
  }
}
