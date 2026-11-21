import { NextResponse } from 'next/server';
import { blogPosts } from '@/data/blogs';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours

export async function GET() {
  const baseUrl = 'https://mcqprepzone.online';
  const now = new Date().toISOString();

  // Blog hub page
  const blogHub = {
    url: `${baseUrl}/blog`,
    lastmod: now,
    changefreq: 'daily',
    priority: '0.9',
  };

  const blogUrls = blogPosts.map((post) => {
    let postDate = now;
    if (post.date) {
      const parsed = new Date(post.date);
      if (!isNaN(parsed.getTime())) {
        postDate = parsed.toISOString();
      }
    }

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastmod: postDate,
      changefreq: 'weekly',
      priority: '0.8',
    };
  });

  const allUrls = [blogHub, ...blogUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
