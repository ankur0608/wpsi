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
    const { title, mode, totalMarks, earnedMarks, percentage, responses, details } = body;

    if (!title || !mode || totalMarks === undefined || earnedMarks === undefined || percentage === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { xp: true, streak: true, bestStreak: true, totalStudyDays: true, lastActivityDate: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastActivity = user.lastActivityDate ? new Date(user.lastActivityDate) : null;
    let newStreak = user.streak;
    let newTotalStudyDays = user.totalStudyDays || 0;

    if (!lastActivity) {
      newStreak = 1;
      newTotalStudyDays += 1;
    } else {
      const lastActivityDay = new Date(lastActivity.getFullYear(), lastActivity.getMonth(), lastActivity.getDate());
      const diffTime = today.getTime() - lastActivityDay.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        newStreak += 1;
        newTotalStudyDays += 1;
      } else if (diffDays > 1) {
        newStreak = 1;
        newTotalStudyDays += 1;
      }
    }
    
    const newBestStreak = Math.max(user.bestStreak || 0, newStreak);

    const xpGained = Math.max(0, Math.round(earnedMarks * 10));
    const newXp = user.xp + xpGained;

    let mcqAnswerUpserts: any[] = [];
    const userProgressUpdates: any[] = [];

    if (responses && Array.isArray(responses) && responses.length > 0) {
      const mcqIds = responses.map((r: any) => r.mcqId);
      const mcqs = await prisma.mCQ.findMany({
        where: { id: { in: mcqIds } },
        select: { id: true, correctAnswer: true, topic: { select: { subjectId: true } } }
      });

      const mcqMap = new Map(mcqs.map((m: any) => [m.id, m]));
      const subjectStats: Record<string, { total: number, correct: number }> = {};

      for (const r of responses) {
        const mcq = mcqMap.get(r.mcqId);
        if (!mcq) continue;

        const isCorrect = mcq.correctAnswer === r.answer;

        const subjectId = mcq.topic?.subjectId;
        if (subjectId) {
          if (!subjectStats[subjectId]) subjectStats[subjectId] = { total: 0, correct: 0 };
          subjectStats[subjectId].total += 1;
          if (isCorrect) subjectStats[subjectId].correct += 1;
        }

        mcqAnswerUpserts.push(
          prisma.mCQAnswer.upsert({
            where: { userId_mcqId: { userId: session.userId, mcqId: r.mcqId } },
            update: { answer: r.answer, isCorrect },
            create: { userId: session.userId, mcqId: r.mcqId, answer: r.answer, isCorrect }
          })
        );
      }

      for (const [subjectId, stats] of Object.entries(subjectStats)) {
        const existing = await prisma.userProgress.findFirst({
          where: { userId: session.userId, subjectId }
        });

        if (existing) {
          const newTotal = existing.totalAttempts + stats.total;
          const newCorrect = existing.correctCount + stats.correct;
          const newAccuracy = (newCorrect / newTotal) * 100;

          userProgressUpdates.push(prisma.userProgress.update({
            where: { id: existing.id },
            data: { totalAttempts: newTotal, correctCount: newCorrect, accuracy: newAccuracy }
          }));
        } else {
          const newAccuracy = (stats.correct / stats.total) * 100;
          userProgressUpdates.push(prisma.userProgress.create({
            data: { userId: session.userId, subjectId, totalAttempts: stats.total, correctCount: stats.correct, accuracy: newAccuracy }
          }));
        }
      }
    }

    const [submission, updatedUser] = await prisma.$transaction([
      prisma.testSubmission.create({
        data: {
          userId: session.userId,
          title,
          mode,
          totalMarks,
          earnedMarks,
          percentage
        },
      }),
      prisma.user.update({
        where: { id: session.userId },
        data: {
          xp: newXp,
          streak: newStreak,
          bestStreak: newBestStreak,
          totalStudyDays: newTotalStudyDays,
          lastActivityDate: now,
        }
      }),
      ...mcqAnswerUpserts,
      ...userProgressUpdates
    ], {
      timeout: 20000 // Increase timeout to 20 seconds for bulk upserts
    });

    return NextResponse.json({ data: submission, user: { xp: newXp, streak: newStreak } }, { status: 201 });
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
