import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ mcqId: string }> }
) {
  try {
    const { mcqId } = await params;

    const mcq = await prisma.mCQ.findUnique({
      where: { id: mcqId },
    });

    if (!mcq) {
      return NextResponse.json(
        { error: 'MCQ not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: mcq }, { status: 200 });
  } catch (error) {
    console.error('Error fetching MCQ:', error);
    return NextResponse.json(
      { error: 'Failed to fetch MCQ' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ mcqId: string }> }
) {
  try {
    const session = getSessionFromRequest(request);

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { mcqId } = await params;
    const body = await request.json();
    const { answer } = body;

    // Get the MCQ to check correct answer
    const mcq = await prisma.mCQ.findUnique({
      where: { id: mcqId },
    });

    if (!mcq) {
      return NextResponse.json(
        { error: 'MCQ not found' },
        { status: 404 }
      );
    }

    const isCorrect = answer === mcq.correctAnswer;

    // Save answer
    const mcqAnswer = await prisma.mCQAnswer.upsert({
      where: {
        userId_mcqId: {
          userId: session.userId,
          mcqId,
        },
      },
      update: {
        answer,
        isCorrect,
      },
      create: {
        userId: session.userId,
        mcqId,
        answer,
        isCorrect,
      },
    });

    return NextResponse.json(
      {
        data: {
          ...mcqAnswer,
          correctAnswer: mcq.correctAnswer,
          explanation: mcq.explanation,
          isCorrect,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error submitting MCQ answer:', error);
    return NextResponse.json(
      { error: 'Failed to submit answer' },
      { status: 500 }
    );
  }
}
