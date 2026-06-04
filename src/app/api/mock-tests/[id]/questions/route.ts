import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const mockTest = await prisma.mockTest.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: { no: 'asc' }
        }
      }
    });

    if (!mockTest) {
      return Response.json({ success: false, message: 'Mock test not found' }, { status: 404 });
    }

    // Map questions to match the ApiMcqRow interface expected by the practice page
    const mcqs = mockTest.questions.map(q => ({
      id: q.id,
      subject: mockTest.title, // Use mock test title as subject
      part: 'A',
      topic: 'Mock Test',      // Default topic
      difficulty: q.difficulty,
      question: q.question,
      optionA: q.optionA,
      optionB: q.optionB,
      optionC: q.optionC,
      optionD: q.optionD,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      language: 'English',
      translationId: null,
    }));

    return Response.json({ 
      success: true, 
      data: mcqs, 
      meta: { total: mcqs.length } 
    });
  } catch (err) {
    console.error('[GET /api/mock-tests/[id]/questions]', err);
    return Response.json(
      { 
        success: false, 
        message: 'Failed to fetch mock test questions', 
        error: err instanceof Error ? err.message : String(err) 
      }, 
      { status: 500 }
    );
  }
}
