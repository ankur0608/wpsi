import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);

    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const userId = session.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        planType: true,
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get today's date at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Sum up MCQs solved today
    const submissionsToday = await prisma.testSubmission.findMany({
      where: {
        userId: userId,
        createdAt: {
          gte: today,
        },
      },
      select: {
        totalMarks: true,
      }
    });

    const mcqsSolvedToday = submissionsToday.reduce((acc, sub) => acc + sub.totalMarks, 0);

    return NextResponse.json({
      success: true,
      data: {
        mcqsSolvedToday,
        planType: user.planType || 'free',
      }
    });
  } catch (error) {
    console.error('Error fetching user limits:', error);
    return NextResponse.json({ error: 'Failed to fetch user limits' }, { status: 500 });
  }
}
