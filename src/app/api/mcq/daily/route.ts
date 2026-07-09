import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic'; // Prevent static generation of this route since it returns random data

export async function GET() {
  try {
    // Fetch random MCQs grouped by difficulty
    // 10 Easy, 5 Medium, 5 Hard
    const easyMcqs = await prisma.$queryRaw`SELECT * FROM "MCQ" WHERE "difficulty" = 'Easy' ORDER BY RANDOM() LIMIT 10`;
    const mediumMcqs = await prisma.$queryRaw`SELECT * FROM "MCQ" WHERE "difficulty" = 'Medium' ORDER BY RANDOM() LIMIT 5`;
    const hardMcqs = await prisma.$queryRaw`SELECT * FROM "MCQ" WHERE "difficulty" = 'Hard' ORDER BY RANDOM() LIMIT 5`;

    const combined = [
      ...(Array.isArray(easyMcqs) ? easyMcqs : []),
      ...(Array.isArray(mediumMcqs) ? mediumMcqs : []),
      ...(Array.isArray(hardMcqs) ? hardMcqs : [])
    ];

    // Fetch translations
    const ids = combined.map(m => m.id);
    const translationIds = combined.map(m => m.translationId).filter(Boolean);
    
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

    // Shuffle and attach translations
    const shuffled = combined.sort(() => Math.random() - 0.5).map(m => {
      const mcqTranslations = translations.filter(t => 
        (m.translationId && t.id === m.translationId) || 
        (t.translationId === m.id) || 
        (m.translationId && t.translationId === m.translationId)
      );
      return {
        ...m,
        translations: mcqTranslations
      };
    });

    return NextResponse.json({ data: shuffled }, { status: 200 });
  } catch (error) {
    console.error('Error fetching daily MCQs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch daily MCQs' },
      { status: 500 }
    );
  }
}
