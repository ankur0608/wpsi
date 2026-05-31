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

    const userId = session.userId;

    const mockTestsAttempted = await prisma.testSubmission.count({
      where: { userId },
    });

    const mcqsSolved = await prisma.mCQAnswer.count({
      where: { userId },
    });

    const answers = await prisma.mCQAnswer.findMany({
      where: { userId },
      select: { isCorrect: true },
    });

    let averageAccuracy = 0;
    if (answers.length > 0) {
      const correct = answers.filter(a => a.isCorrect).length;
      averageAccuracy = (correct / answers.length) * 100;
    }

    return NextResponse.json({
      data: {
        mockTestsAttempted,
        mcqsSolved,
        averageAccuracy: parseFloat(averageAccuracy.toFixed(1)),
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
