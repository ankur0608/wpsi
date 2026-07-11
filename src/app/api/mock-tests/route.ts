import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    const mockTests = await prisma.mockTest.findMany({
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
