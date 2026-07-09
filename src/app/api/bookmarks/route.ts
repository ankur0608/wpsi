import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = getSessionFromRequest(request);

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: session.userId },
      include: {
        mcq: {
          include: {
            topic: {
              select: {
                name: true,
                subject: {
                  select: {
                    name: true,
                    part: true,
                  }
                }
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Fetch translations
    const ids = bookmarks.map(b => b.mcq.id);
    const translationIds = bookmarks.map(b => b.mcq.translationId).filter(Boolean) as string[];
    
    let translations: any[] = [];
    if (ids.length > 0 || translationIds.length > 0) {
      translations = await prisma.mCQ.findMany({
        where: {
          OR: [
            ...(translationIds.length > 0 ? [{ id: { in: translationIds } }] : []),
            ...(ids.length > 0 ? [{ translationId: { in: ids } }] : []),
            ...(translationIds.length > 0 ? [{ translationId: { in: translationIds } }] : [])
          ],
          id: { notIn: ids }
        }
      });
    }

    // Attach translations
    const data = bookmarks.map(b => {
      const m = b.mcq;
      const mcqTranslations = translations.filter(t => 
        (m.translationId && t.id === m.translationId) || 
        (t.translationId === m.id) || 
        (m.translationId && t.translationId === m.translationId)
      );
      return {
        ...b,
        mcq: {
          ...m,
          translations: mcqTranslations
        }
      };
    });

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookmarks' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("[POST /api/bookmarks] Handling incoming request...");
    const session = getSessionFromRequest(request);

    if (!session) {
      console.log("[POST /api/bookmarks] Failed: Not authenticated");
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { mcqId } = body;
    console.log(`[POST /api/bookmarks] User: ${session.userId}, mcqId: ${mcqId}`);

    if (!mcqId) {
      console.log("[POST /api/bookmarks] Failed: mcqId missing in body");
      return NextResponse.json(
        { error: 'mcqId is required' },
        { status: 400 }
      );
    }

    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        userId_mcqId: {
          userId: session.userId,
          mcqId: mcqId,
        }
      }
    });

    if (existingBookmark) {
      // Remove bookmark
      console.log(`[POST /api/bookmarks] Bookmark exists. Removing bookmark ID: ${existingBookmark.id}`);
      await prisma.bookmark.delete({
        where: { id: existingBookmark.id }
      });
      console.log("[POST /api/bookmarks] Bookmark removed successfully");
      return NextResponse.json({ bookmarked: false }, { status: 200 });
    } else {
      // Add bookmark
      console.log("[POST /api/bookmarks] Bookmark does not exist. Creating new bookmark...");
      await prisma.bookmark.create({
        data: {
          userId: session.userId,
          mcqId: mcqId,
        }
      });
      console.log("[POST /api/bookmarks] Bookmark created successfully");
      return NextResponse.json({ bookmarked: true }, { status: 201 });
    }
  } catch (error) {
    console.error('[POST /api/bookmarks] Error toggling bookmark:', error);
    return NextResponse.json(
      { error: 'Failed to toggle bookmark' },
      { status: 500 }
    );
  }
}
