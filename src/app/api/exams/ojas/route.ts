import { NextRequest, NextResponse } from 'next/server';
import { GovernmentExam, ojasExamsBaseline } from '@/data/governmentExams';

export const dynamic = 'force-dynamic';

interface OjasAnnouncement {
  title: string;
  department: string;
  advtNo?: string;
  lastDate?: string;
  category?: string;
  stream?: string;
  qualification?: string;
  vacancies?: string;
  link?: string;
}

// In-memory server cache (30 minutes TTL)
interface CacheRecord {
  timestamp: number;
  data: any;
}
let serverCache: CacheRecord | null = null;
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

// Fallback baseline for live verified recruitments
const FALLBACK_OJAS_EXAMS: GovernmentExam[] = ojasExamsBaseline;

// Helper to scrape real-time notifications from https://ojas.gujarat.gov.in
async function fetchOjasPortalAnnouncements(): Promise<OjasAnnouncement[]> {
  try {
    const res = await fetch('https://ojas.gujarat.gov.in', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!res.ok) return [];

    const html = await res.text();
    const marqueeMatches = [...html.matchAll(/<marquee[^>]*>([\s\S]*?)<\/marquee>/gi)];
    const announcements: OjasAnnouncement[] = [];

    // Marquee 1 and Marquee 2 contain active job postings and deadlines
    for (const m of marqueeMatches) {
      const content = m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      
      // Parse patterns like "GSSSB - Operation Theatre Assistant ( અંતિમ તારીખ 29-October-2026 )"
      const itemRegex = /([A-Za-z0-9\/]+)\s*-\s*([^\(]+?)(?:\s*\(\s*(?:અંતિમ તારીખ|Last Date)?\s*([0-9]{1,2}-[A-Za-z]+-[0-9]{4})\s*\))?(?=\s+[A-Za-z0-9\/]+\s*-|$)/g;
      let match;
      while ((match = itemRegex.exec(content)) !== null) {
        const dept = match[1].trim();
        const title = match[2].trim();
        const lastDate = match[3] ? match[3].trim() : undefined;

        if (title.length > 3 && !title.includes('One Time Registration') && !title.includes('OTR')) {
          announcements.push({
            department: dept,
            title: `${dept} - ${title}`,
            lastDate,
            link: 'https://ojas.gujarat.gov.in/AdvtList.aspx?type=lCxUjNjnTp8='
          });
        }
      }
    }

    return announcements;
  } catch (error) {
    console.error('Error scraping OJAS portal announcements:', error);
    return [];
  }
}

// Helper to query API Setu directory for OJAS collection metadata
async function fetchApiSetuOjasMetadata() {
  try {
    const authRes = await fetch('https://directory.apisetu.gov.in/api/auth/generate-headers', {
      headers: {
        'Origin': 'https://directory.apisetu.gov.in',
        'Referer': 'https://directory.apisetu.gov.in/api-collection/ojas',
        'User-Agent': 'Mozilla/5.0'
      },
      next: { revalidate: 86400 } // Cache auth / meta for 24 hours
    });

    if (!authRes.ok) return null;

    const authData = await authRes.json();
    const headers = {
      'Origin': 'https://directory.apisetu.gov.in',
      'Referer': 'https://directory.apisetu.gov.in/api-collection/ojas',
      'User-Agent': 'Mozilla/5.0',
      'Authorization': authData.authorization,
      'ts': String(authData.ts),
      'x-nonce': authData.nonce
    };

    const query = JSON.stringify({
      facets: ["total_api"],
      hitsPerPage: 5,
      facetFilters: [["subdomainName:ojas"]]
    });

    const listRes = await fetch('https://directory.apisetu.gov.in/api/list?q=' + encodeURIComponent(query), {
      headers,
      next: { revalidate: 86400 }
    });

    if (!listRes.ok) return null;

    const listData = await listRes.json();
    if (listData?.result?.hits?.length > 0) {
      const hit = listData.result.hits[0];
      return {
        orgName: hit.orgName,
        orgDescription: hit.orgDescription,
        issuerId: hit.issuerId,
        subdomainName: hit.subdomainName,
        categories: hit.categories,
        collectionName: hit.Collections?.[0]?.collectionName,
        apiCount: hit.apiCount,
        apis: hit.Collections?.[0]?.Apis?.map((api: any) => ({
          apiName: api.apiName,
          endpoint: api.endpoint,
          spec_code: api.spec_code
        }))
      };
    }
  } catch (err) {
    console.warn('API Setu directory metadata fetch skipped/failed:', err);
  }
  return null;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const forceRefresh = searchParams.get('refresh') === 'true';

    // 1. Return from in-memory server cache if fresh
    if (!forceRefresh && serverCache && Date.now() - serverCache.timestamp < CACHE_TTL_MS) {
      return NextResponse.json(
        {
          ...serverCache.data,
          cached: true,
          cachedAt: new Date(serverCache.timestamp).toISOString(),
        },
        {
          status: 200,
          headers: {
            'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
            'X-Cache': 'HIT'
          }
        }
      );
    }

    // 2. Fetch live portal announcements from official portal and metadata concurrently
    const [scrapedAnnouncements, apiSetuMeta] = await Promise.all([
      fetchOjasPortalAnnouncements(),
      fetchApiSetuOjasMetadata()
    ]);

    // 3. Start with baseline verified exams
    let exams: GovernmentExam[] = [...FALLBACK_OJAS_EXAMS];

    // 4. If live announcements were found, update or prepend them
    if (scrapedAnnouncements.length > 0) {
      scrapedAnnouncements.forEach((item) => {
        const existing = exams.find(
          (e) => e.title.toLowerCase().includes(item.title.toLowerCase()) || 
                 item.title.toLowerCase().includes(e.shortName.toLowerCase())
        );

        if (existing) {
          if (item.lastDate) {
            existing.applicationEnd = item.lastDate;
          }
          existing.status = 'Applications Open';
          existing.isOjasVerified = true;
        }
      });
    }

    const payload = {
      success: true,
      source: "Gujarat State Recruitment Portal & Live Notifications",
      officialPortal: "https://ojas.gujarat.gov.in",
      lastSynced: new Date().toISOString(),
      total: exams.length,
      cached: false,
      exams
    };

    // Store in server cache
    serverCache = {
      timestamp: Date.now(),
      data: payload
    };

    return NextResponse.json(
      payload,
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
          'X-Cache': 'MISS'
        }
      }
    );
  } catch (error) {
    console.error('Error serving state exam data:', error);
    if (serverCache) {
      return NextResponse.json(
        { ...serverCache.data, cached: true, fallback: true },
        { status: 200 }
      );
    }
    // Even if error occurs, return fallback baseline safely
    return NextResponse.json(
      {
        success: true,
        source: "Gujarat State Baseline",
        lastSynced: new Date().toISOString(),
        total: FALLBACK_OJAS_EXAMS.length,
        cached: false,
        exams: FALLBACK_OJAS_EXAMS
      },
      { status: 200 }
    );
  }
}
