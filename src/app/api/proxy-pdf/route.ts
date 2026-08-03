import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const parsedUrl = new URL(url);
    
    // Security: Prevent SSRF by only allowing specific trusted domains
    const allowedDomains = [
      'pub-c3e8ef5798ce468485f4b300b5ffea95.r2.dev',
      // Add other trusted domains here if needed
    ];

    if (!allowedDomains.includes(parsedUrl.hostname)) {
      return NextResponse.json({ error: 'Unauthorized domain' }, { status: 403 });
    }

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.statusText}`);
    }

    return new NextResponse(response.body, {
      headers: {
        'Content-Type': 'application/pdf',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
      },
    });
  } catch (error) {
    console.error('PDF Proxy Error:', error);
    return NextResponse.json({ error: 'Failed to fetch PDF' }, { status: 500 });
  }
}
