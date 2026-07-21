import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);

    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const userId = session.userId;

    // Fetch up to 50 latest submissions
    const recentSubmissions = await prisma.testSubmission.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
      take: 50
    });

    const history = recentSubmissions.map((sub: any) => {
      // Approximate XP earned for this submission based on XP_REWARDS logic
      let xpEarned = Math.max(0, sub.earnedMarks * 10);
      if (sub.mode === 'full') xpEarned += 100;
      else if (sub.mode === 'mock') xpEarned += 150;
      else if (sub.mode === 'timed') xpEarned += 75;
      else if (sub.mode === 'quick') xpEarned += 30;
      
      if (sub.percentage >= 80 && sub.mode === 'timed') xpEarned += 30;
      if (sub.percentage >= 90 && sub.mode === 'mock') xpEarned += 75;
      if (sub.percentage === 100 && sub.totalMarks > 0) xpEarned += 40;

      return {
        id: sub.id,
        title: sub.title,
        date: sub.createdAt,
        xp: xpEarned,
        mode: sub.mode
      };
    });

    return NextResponse.json({ success: true, data: history }, { status: 200 });

  } catch (error: any) {
    console.error('XP History API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
