import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';

  // Enforce canonical non-WWW domain redirect (HTTP 301 Permanent Redirect)
  if (host.startsWith('www.')) {
    const nonWwwHost = host.replace(/^www\./i, '');
    const url = request.nextUrl.clone();
    url.host = nonWwwHost;
    url.protocol = 'https:';
    url.port = '';
    return NextResponse.redirect(url, 301);
  }

  const token = request.cookies.get('mcq_session')?.value;
  const path = request.nextUrl.pathname;
  
  const isAuthPage = path === '/login' || path === '/register';

  // If the user has a session cookie and is trying to access login/register,
  // redirect them to the dashboard.
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
