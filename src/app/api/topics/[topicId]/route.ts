import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ topicId: string }> }
) {
  try {
    const { topicId } = await params;
    const { searchParams } = new URL(request.url);
    const difficulty = searchParams.get('difficulty');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;

    const where: any = { topicId };
    if (difficulty && difficulty !== 'all') {
      where.difficulty = difficulty;
    }

    const mcqs = await prisma.mCQ.findMany({
      where,
      take: limit,
      select: {
        id: true,
        question: true,
        options: true,
        difficulty: true,
        topicId: true,
        // Don't send answer/explanation yet
      },
    });

    if (mcqs.length === 0) {
      // Return sample MCQs if none exist
      const sampleMcqs = [
        {
          id: 'mcq_1',
          question: 'Which of the following is the best conductor of electricity?',
          options: ['Aluminium', 'Copper', 'Silver', 'Gold'],
          difficulty: 'Easy',
          topicId,
        },
        {
          id: 'mcq_2',
          question: 'The resistivity of a conductor is expressed in which unit?',
          options: ['Ohm', 'Ohm-meter', 'Ohm/meter', 'Siemens'],
          difficulty: 'Medium',
          topicId,
        },
        {
          id: 'mcq_3',
          question: 'Which property of a conductor allows it to carry electric current?',
          options: ['High resistivity', 'Free electrons', 'Covalent bonding', 'Low conductivity'],
          difficulty: 'Easy',
          topicId,
        },
      ];
      return NextResponse.json({ data: sampleMcqs }, { status: 200 });
    }

    return NextResponse.json({ data: mcqs }, { status: 200 });
  } catch (error) {
    console.error('Error fetching MCQs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch MCQs' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ topicId: string }> }
) {
  try {
    const { topicId } = await params;
    const body = await request.json();
    const { question, options, correctAnswer, explanation, difficulty } = body;

    const mcq = await prisma.mCQ.create({
      data: {
        question,
        options,
        correctAnswer,
        explanation,
        difficulty: difficulty || 'Medium',
        topicId,
      },
    });

    return NextResponse.json({ data: mcq }, { status: 201 });
  } catch (error) {
    console.error('Error creating MCQ:', error);
    return NextResponse.json(
      { error: 'Failed to create MCQ' },
      { status: 500 }
    );
  }
}
