import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/practice-mcqs
// Query: subject, topic, difficulty, page, limit
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const subject    = searchParams.get('subject')    ?? undefined;
    const topic      = searchParams.get('topic')      ?? undefined;
    const difficulty = searchParams.get('difficulty') ?? undefined;
    const page       = Math.max(1, Number(searchParams.get('page')  ?? '1'));
    const limit      = Math.min(500, Math.max(1, Number(searchParams.get('limit') ?? '200')));
    const skip       = (page - 1) * limit;

    const where: any = {};
    if (subject && subject !== 'all') {
      const subjectList = subject.split('|').map(s => s.trim());
      where.topic = { subject: { name: { in: subjectList } } };
    }
    if (topic && topic !== 'all') {
      const topicList = topic.split('|').map(t => t.trim());
      where.topic = { ...where.topic, name: { in: topicList } };
    }
    if (difficulty) {
      where.difficulty = difficulty;
    }

    const [total, rawMcqs] = await Promise.all([
      prisma.mCQ.count({ where }),
      prisma.mCQ.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          difficulty: true,
          question: true,
      optionA: true,
      optionB: true,
      optionC: true,
      optionD: true,
      correctAnswer: true,
      explanation: true,
      language: true,
      translationId: true,
      topic: {
        select: {
          name: true,
          subject: {
            select: { name: true, part: true }
          }
        }
      }
    },
  }),
]);

// Fetch translations
const ids = rawMcqs.map(m => m.id);
const translationIds = rawMcqs.map(m => m.translationId).filter(Boolean) as string[];

let translations: any[] = [];
if (ids.length > 0 || translationIds.length > 0) {
  translations = await prisma.mCQ.findMany({
    where: {
      OR: [
        ...(translationIds.length > 0 ? [{ id: { in: translationIds } }] : []),
        ...(ids.length > 0 ? [{ translationId: { in: ids } }] : []),
        ...(translationIds.length > 0 ? [{ translationId: { in: translationIds } }] : [])
      ],
      id: { notIn: ids }
    }
  });
}

const mcqs = rawMcqs.map((m) => {
  const mcqTranslations = translations.filter(t => 
    (m.translationId && t.id === m.translationId) || 
    (t.translationId === m.id) || 
    (m.translationId && t.translationId === m.translationId)
  );

  return {
    id: m.id,
    subject: m.topic?.subject?.name || 'Unknown',
    part: m.topic?.subject?.part || 'A',
    topic: m.topic?.name || 'Unknown',
    difficulty: m.difficulty,
    question: m.question,
    optionA: m.optionA,
    optionB: m.optionB,
    optionC: m.optionC,
    optionD: m.optionD,
    correctAnswer: m.correctAnswer,
    explanation: m.explanation,
    language: m.language,
    translationId: m.translationId,
    translations: mcqTranslations
  };
});

    return Response.json({ success: true, data: mcqs, meta: { total, page, limit } });
  } catch (err) {
    console.error('[GET /api/practice-mcqs]', err);
    return Response.json({ success: false, message: 'Failed to fetch MCQs', error: err instanceof Error ? err.message : String(err), stack: err instanceof Error ? err.stack : undefined }, { status: 500 });
  }
}
