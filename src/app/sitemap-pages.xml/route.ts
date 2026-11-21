import { NextResponse } from 'next/server';
import { getAllGovernmentExams } from '@/data/governmentExams';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours

export async function GET() {
  const baseUrl = 'https://mcqprepzone.online';
  const now = new Date().toISOString();

  const staticPages = [
    { url: baseUrl, changefreq: 'daily', priority: '1.0' },
    { url: `${baseUrl}/government-exams`, changefreq: 'daily', priority: '0.95' },
    { url: `${baseUrl}/daily-challenge`, changefreq: 'daily', priority: '0.85' },
    { url: `${baseUrl}/pricing`, changefreq: 'weekly', priority: '0.8' },
    { url: `${baseUrl}/features`, changefreq: 'monthly', priority: '0.8' },
    { url: `${baseUrl}/about`, changefreq: 'monthly', priority: '0.7' },
    { url: `${baseUrl}/contact`, changefreq: 'monthly', priority: '0.6' },
    { url: `${baseUrl}/support`, changefreq: 'monthly', priority: '0.6' },
    { url: `${baseUrl}/faq`, changefreq: 'weekly', priority: '0.7' },
    { url: `${baseUrl}/testimonials`, changefreq: 'monthly', priority: '0.6' },
    { url: `${baseUrl}/cancellation`, changefreq: 'monthly', priority: '0.4' },
    { url: `${baseUrl}/privacy`, changefreq: 'monthly', priority: '0.4' },
    { url: `${baseUrl}/terms`, changefreq: 'monthly', priority: '0.4' },
  ];

  const exams = getAllGovernmentExams();
  const examUrls = exams.map((exam) => ({
    url: `${baseUrl}/government-exams/${exam.id}`,
    changefreq: 'weekly',
    priority: '0.9',
  }));

  const allUrls = [...staticPages, ...examUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${now}</lastmod>
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
