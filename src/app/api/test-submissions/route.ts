import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session = getSessionFromRequest(request);

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, mode, totalMarks, earnedMarks, percentage } = body;

    if (!title || !mode || totalMarks === undefined || earnedMarks === undefined || percentage === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const submission = await prisma.testSubmission.create({
      data: {
        userId: session.userId,
        title,
        mode,
        totalMarks,
        earnedMarks,
        percentage
      },
    });

    return NextResponse.json({ data: submission }, { status: 201 });
  } catch (error) {
    console.error('Error saving test submission:', error);
    return NextResponse.json(
      { error: 'Failed to save test submission' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = getSessionFromRequest(request);

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const submissions = await prisma.testSubmission.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: 'desc' },
    });

    let averagePercentage = 0;
    if (submissions.length > 0) {
      const sum = submissions.reduce((acc, sub) => acc + sub.percentage, 0);
      averagePercentage = Math.round(sum / submissions.length);
    }

    return NextResponse.json({ 
      data: {
        submissions,
        averagePercentage,
        totalTests: submissions.length
      } 
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching test submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch test submissions' },
      { status: 500 }
    );
  }
}
