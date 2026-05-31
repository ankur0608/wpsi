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
