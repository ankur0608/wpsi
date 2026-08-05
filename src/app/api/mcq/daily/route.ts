import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);
    let userSeedOffset = 0;
    
    if (session && session.userId) {
       for (let i = 0; i < session.userId.length; i++) {
           userSeedOffset += session.userId.charCodeAt(i);
       }
    }

    // Generate a daily seed based on the current date + user offset (between -1 and 1 for Postgres)
    const today = new Date();
    const seedStr = `${today.getUTCFullYear()}-${today.getUTCMonth() + 1}-${today.getUTCDate()}-${userSeedOffset}`;
    
    let hash = 0;
    for (let i = 0; i < seedStr.length; i++) {
        const char = seedStr.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    
    const seedVal = (Math.abs(hash) % 1000000) / 1000000.0;

    // Fetch random MCQs grouped by difficulty using a transaction to maintain the seed on the connection
    // 10 Easy, 5 Medium, 5 Hard
    const [_, easyMcqs, mediumMcqs, hardMcqs] = await prisma.$transaction([
      prisma.$executeRaw`SELECT setseed(${seedVal})`,
      prisma.$queryRaw`SELECT * FROM "MCQ" WHERE "difficulty" = 'Easy' AND "translationId" IS NULL ORDER BY RANDOM() LIMIT 10`,
      prisma.$queryRaw`SELECT * FROM "MCQ" WHERE "difficulty" = 'Medium' AND "translationId" IS NULL ORDER BY RANDOM() LIMIT 5`,
      prisma.$queryRaw`SELECT * FROM "MCQ" WHERE "difficulty" = 'Hard' AND "translationId" IS NULL ORDER BY RANDOM() LIMIT 5`
    ]);

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

    // Process and attach translations (Order is preserved: 10 Easy, 5 Medium, 5 Hard)
    const processed = combined.map(m => {
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

    return NextResponse.json({ data: processed }, { status: 200 });
  } catch (error) {
    console.error('Error fetching daily MCQs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch daily MCQs' },
      { status: 500 }
    );
  }
}
