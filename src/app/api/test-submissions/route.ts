import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';
import { XP_REWARDS, getUserLevel } from '@/lib/xp';

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
      select: { xp: true, streak: true, bestStreak: true, totalStudyDays: true, lastActivityDate: true, level: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastActivity = user.lastActivityDate ? new Date(user.lastActivityDate) : null;
    let newStreak = user.streak;
    let newTotalStudyDays = user.totalStudyDays || 0;
    
    let diffDays = 0;

    if (!lastActivity) {
      diffDays = -1; // special flag for first time
      newStreak = 1;
      newTotalStudyDays += 1;
    } else {
      const lastActivityDay = new Date(lastActivity.getFullYear(), lastActivity.getMonth(), lastActivity.getDate());
      const diffTime = today.getTime() - lastActivityDay.getTime();
      diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        newStreak += 1;
        newTotalStudyDays += 1;
      } else if (diffDays > 1) {
        newStreak = 1;
        newTotalStudyDays += 1;
      }
    }
    
    const newBestStreak = Math.max(user.bestStreak || 0, newStreak);

    // --- XP CALCULATION ENGINE ---
    let totalXPGained = 0;
    let xpEvents: { reason: string, amount: number }[] = [];

    function addXp(reason: string, amount: number) {
      if (amount !== 0) {
        totalXPGained += amount;
        xpEvents.push({ reason, amount });
      }
    }

    let mcqAnswerUpserts: any[] = [];
    const userProgressUpdates: any[] = [];

    if (responses && Array.isArray(responses) && responses.length > 0) {
      const mcqIds = responses.map((r: any) => r.mcqId);
      
      const [mcqs, existingAnswersList] = await Promise.all([
        prisma.mCQ.findMany({
          where: { id: { in: mcqIds } },
          select: { id: true, correctAnswer: true, topic: { select: { subjectId: true } } }
        }),
        prisma.mCQAnswer.findMany({
          where: { userId: session.userId, mcqId: { in: mcqIds } },
          select: { mcqId: true, isCorrect: true }
        })
      ]);

      const mcqMap = new Map(mcqs.map((m: any) => [m.id, m]));
      const existingAnswersMap = new Map(existingAnswersList.map(a => [a.mcqId, a.isCorrect]));
      const subjectStats: Record<string, { total: number, correct: number }> = {};

      let correctAnswersCount = 0;
      let wrongAnswersCount = 0;
      let firstAttemptCount = 0;
      let fiveInARowCount = 0;
      let currentStreak = 0;

      for (const r of responses) {
        const mcq = mcqMap.get(r.mcqId);
        if (!mcq) continue;

        const isCorrect = mcq.correctAnswer === r.answer;
        const previousAnswerExists = existingAnswersMap.has(r.mcqId);
        const previouslyCorrect = existingAnswersMap.get(r.mcqId) === true;

        if (isCorrect) {
          if (!previouslyCorrect) {
            correctAnswersCount++;
          }
          if (!previousAnswerExists) {
            firstAttemptCount++;
          }
          currentStreak++;
          if (currentStreak === 5) {
            fiveInARowCount++;
            currentStreak = 0;
          }
        } else {
          wrongAnswersCount++;
          currentStreak = 0; // reset streak
        }

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

      // Add XP for questions
      if (correctAnswersCount > 0) addXp(`Correct Answers (${correctAnswersCount})`, correctAnswersCount * XP_REWARDS.CORRECT_ANSWER);
      if (wrongAnswersCount > 0) addXp(`Wrong Answers Penalty (${wrongAnswersCount})`, wrongAnswersCount * XP_REWARDS.WRONG_ANSWER);
      if (firstAttemptCount > 0) addXp(`First Attempt Bonus (${firstAttemptCount})`, firstAttemptCount * XP_REWARDS.FIRST_ATTEMPT_BONUS);
      if (fiveInARowCount > 0) addXp(`5-in-a-row Streaks (${fiveInARowCount})`, fiveInARowCount * XP_REWARDS.STREAK_5_CORRECT);

      // Add XP for daily study (if they solved at least 5 questions and haven't played today)
      if (responses.length >= 5 && diffDays !== 0) {
        addXp('Daily Study Streak', XP_REWARDS.DAILY_STUDY_STREAK);
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

    // Apply Mode Completion Bonuses
    if (mode === 'quick') addXp('Quick Practice Completed', XP_REWARDS.QUICK_PRACTICE);
    else if (mode === 'full') addXp('Full Practice Completed', XP_REWARDS.FULL_PRACTICE);
    else if (mode === 'timed') {
      addXp('Timed Test Completed', XP_REWARDS.TIMED_TEST_COMPLETE);
      if (percentage >= 80) addXp('Timed Test (80%+ Score)', XP_REWARDS.TIMED_TEST_80_PLUS);
    }
    else if (mode === 'mock') {
      addXp('Full-Length Mock Completed', XP_REWARDS.MOCK_COMPLETE);
      if (percentage >= 90) addXp('Full-Length Mock (90%+ Score)', XP_REWARDS.MOCK_90_PLUS);
    }
    else if (mode === 'quiz' || mode === 'daily') {
      addXp('Daily Quiz Completed', XP_REWARDS.DAILY_QUIZ_COMPLETE);
      if (percentage === 100) addXp('Daily Quiz (100% Score)', XP_REWARDS.DAILY_QUIZ_100);
    }

    // Perfect Score Bonus
    if (percentage === 100 && totalMarks > 0) {
      addXp('Perfect Score (100%)', XP_REWARDS.PERFECT_SCORE);
    }

    // Streak Milestones
    if (diffDays === 1 || diffDays === -1) { // They increased their streak today
      if (newStreak % 30 === 0) addXp('30-Day Study Streak Milestone', XP_REWARDS.STREAK_30_DAY);
      else if (newStreak % 7 === 0) addXp('7-Day Study Streak Milestone', XP_REWARDS.STREAK_7_DAY);
    }

    const finalXp = Math.max(0, user.xp + totalXPGained);
    const { currentLevel } = getUserLevel(finalXp);

    const [submission, updatedUser] = await prisma.$transaction([
      prisma.testSubmission.create({
        data: {
          userId: session.userId,
          title,
          mode,
          totalMarks,
          earnedMarks,
          percentage,
          details
        },
      }),
      prisma.user.update({
        where: { id: session.userId },
        data: {
          xp: finalXp,
          level: currentLevel.level, // Update level based on new XP
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

    return NextResponse.json({ 
      data: submission, 
      user: { xp: finalXp, streak: newStreak, level: currentLevel.level },
      xpEvents,
      totalXPGained
    }, { status: 201 });
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
