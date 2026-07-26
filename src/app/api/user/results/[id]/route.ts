import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSessionFromRequest(request);

    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { id } = await params;

    const submission = await prisma.testSubmission.findUnique({
      where: { id }
    });

    if (!submission || submission.userId !== session.userId) {
      return NextResponse.json({ error: 'Result not found' }, { status: 404 });
    }

    let mcqs = (submission.details as any[]) || [];

    // 1. Fetch live MCQs to resolve translationIds
    const ids = mcqs.map(m => m.id).filter(Boolean);
    if (ids.length > 0) {
      const rawMcqs = await prisma.mCQ.findMany({
        where: { id: { in: ids } },
        select: { id: true, translationId: true }
      });

      const translationIds = rawMcqs.map(m => m.translationId).filter(Boolean) as string[];

      let translations: any[] = [];
      if (translationIds.length > 0 || ids.length > 0) {
        translations = await prisma.mCQ.findMany({
          where: {
            OR: [
              ...(translationIds.length > 0 ? [{ id: { in: translationIds } }] : []),
              ...(ids.length > 0 ? [{ translationId: { in: ids } }] : []),
              ...(translationIds.length > 0 ? [{ translationId: { in: translationIds } }] : [])
            ],
            language: 'Gujarati'
          }
        });
      }

      // 2. Inject Gujarati translations if translationId matches
      mcqs = mcqs.map(m => {
        const raw = rawMcqs.find(r => r.id === m.id);
        if (raw) {
          const guj = translations.find(t => 
            (raw.translationId && t.id === raw.translationId) || 
            (t.translationId === m.id) || 
            (raw.translationId && t.translationId === raw.translationId)
          );
          
          if (guj) {
            m.questionGuj = guj.question;
            m.optionsGuj = { A: guj.optionA, B: guj.optionB, C: guj.optionC, D: guj.optionD };
            if (guj.explanation) m.explanationGuj = guj.explanation;
          }
        }
        return m;
      });
    }

    const payload = {
      id: submission.id,
      title: submission.title,
      mode: submission.mode,
      date: new Date(submission.createdAt).toLocaleString('en-US', { 
        day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true 
      }),
      marks: submission.earnedMarks,
      totalMarks: submission.totalMarks,
      percentage: submission.percentage,
      mcqs: mcqs
    };

    return NextResponse.json({ data: payload }, { status: 200 });
  } catch (error) {
    console.error('Error fetching test result:', error);
    return NextResponse.json({ error: 'Failed to fetch result details' }, { status: 500 });
  }
}
