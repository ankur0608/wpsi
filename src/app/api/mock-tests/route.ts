import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';

    const whereClause: any = { isActive: true };
    if (query) {
      whereClause.title = {
        contains: query,
        mode: 'insensitive',
      };
    }

    const mockTests = await prisma.mockTest.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        _count: {
          select: { questions: true }
        }
      }
    });

    return NextResponse.json(mockTests);
  } catch (error) {
    console.error('Failed to fetch mock tests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mock tests' },
      { status: 500 }
    );
  }
}
