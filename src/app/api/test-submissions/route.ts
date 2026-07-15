import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';
import { XP_REWARDS, getUserLevel } from '@/lib/xp';

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, mode, responses, details } = body;

    // Reject if responses is not an array
    if (!title || !mode || !responses || !Array.isArray(responses)) {
      return NextResponse.json(
        { error: 'Missing required fields or invalid format' },
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
    const lastActivity = user.lastActivityDate ? new Date(user.lastActivityDate) : null;
    let newStreak = user.streak;
    let newTotalStudyDays = user.totalStudyDays || 0;
    
    let diffDays = 0;

    if (!lastActivity) {
      diffDays = -1; // special flag for first time
      newStreak = 1;
      newTotalStudyDays += 1;
    } else {
      // Convert to IST for accurate calendar day boundaries in India
      const getISTDate = (date: Date) => new Date(date.getTime() + (5.5 * 60 * 60 * 1000));
      const nowIST = getISTDate(now);
      const lastActivityIST = getISTDate(lastActivity);

      const todayIST = Date.UTC(nowIST.getUTCFullYear(), nowIST.getUTCMonth(), nowIST.getUTCDate());
      const lastActivityDayIST = Date.UTC(lastActivityIST.getUTCFullYear(), lastActivityIST.getUTCMonth(), lastActivityIST.getUTCDate());

      diffDays = Math.round((todayIST - lastActivityDayIST) / (1000 * 60 * 60 * 24));
      
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

    let correctAnswersCount = 0;
    let wrongAnswersCount = 0;
    let firstAttemptCount = 0;
    let fiveInARowCount = 0;
    let currentStreak = 0;
    
    // Server calculated scores
    let serverTotalMarks = responses.length;
    let serverEarnedMarks = 0;

    if (responses.length > 0) {
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

      for (const r of responses) {
        const mcq = mcqMap.get(r.mcqId);
        if (!mcq) continue;
        
        // Skip unanswered questions (usually represented as empty string or null)
        if (r.answer === null || r.answer === '' || r.answer === undefined) {
           continue;
        }

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
    
    // Secure Score Calculation
    // Using standard +1 for correct and -0.25 for wrong (assuming WPSI format)
    serverEarnedMarks = correctAnswersCount - (wrongAnswersCount * 0.25);
    const serverPercentage = serverTotalMarks > 0 ? (Math.max(0, serverEarnedMarks) / serverTotalMarks) * 100 : 0;

    // Apply Mode Completion Bonuses based on secure percentages
    if (mode === 'quick') addXp('Quick Practice Completed', XP_REWARDS.QUICK_PRACTICE);
    else if (mode === 'full') addXp('Full Practice Completed', XP_REWARDS.FULL_PRACTICE);
    else if (mode === 'timed') {
      addXp('Timed Test Completed', XP_REWARDS.TIMED_TEST_COMPLETE);
      if (serverPercentage >= 80) addXp('Timed Test (80%+ Score)', XP_REWARDS.TIMED_TEST_80_PLUS);
    }
    else if (mode === 'mock') {
      addXp('Full-Length Mock Completed', XP_REWARDS.MOCK_COMPLETE);
      if (serverPercentage >= 90) addXp('Full-Length Mock (90%+ Score)', XP_REWARDS.MOCK_90_PLUS);
    }
    else if (mode === 'quiz' || mode === 'daily') {
      addXp('Daily Quiz Completed', XP_REWARDS.DAILY_QUIZ_COMPLETE);
      if (serverPercentage === 100) addXp('Daily Quiz (100% Score)', XP_REWARDS.DAILY_QUIZ_100);
    }

    // Perfect Score Bonus
    if (serverPercentage === 100 && serverTotalMarks > 0) {
      addXp('Perfect Score (100%)', XP_REWARDS.PERFECT_SCORE);
    }

    // Streak Milestones
    if (diffDays === 1 || diffDays === -1) { // They increased their streak today
      if (newStreak % 30 === 0) addXp('30-Day Study Streak Milestone', XP_REWARDS.STREAK_30_DAY);
      else if (newStreak % 7 === 0) addXp('7-Day Study Streak Milestone', XP_REWARDS.STREAK_7_DAY);
    }

    const finalXp = Math.max(0, user.xp + totalXPGained);
    const { currentLevel } = getUserLevel(finalXp);

    const notificationsToCreate = [];
    if (currentLevel.level > user.level) {
      notificationsToCreate.push(prisma.notification.create({
        data: {
          userId: session.userId,
          title: "Level Up! 🌟",
          message: `Congratulations! You've reached ${currentLevel.name} (Level ${currentLevel.level}).`,
          type: "LEVEL_UP"
        }
      }));
    }

    if (diffDays === 1 || diffDays === -1) {
      if (newStreak % 30 === 0) {
        notificationsToCreate.push(prisma.notification.create({
          data: { userId: session.userId, title: "30-Day Streak! 🔥", message: "Amazing consistency! You earned a massive XP bonus.", type: "STREAK" }
        }));
      } else if (newStreak % 7 === 0) {
        notificationsToCreate.push(prisma.notification.create({
          data: { userId: session.userId, title: "7-Day Streak! 🔥", message: "You're on fire! You earned a streak bonus.", type: "STREAK" }
        }));
      }
    }

    if (totalXPGained > 0) {
      notificationsToCreate.push(prisma.notification.create({
        data: {
          userId: session.userId,
          title: "Session Completed 📚",
          message: `Great job! You earned a total of ${totalXPGained} XP from this session.`,
          type: "XP"
        }
      }));
    }

    const [submission, updatedUser] = await prisma.$transaction([
      prisma.testSubmission.create({
        data: {
          userId: session.userId,
          title,
          mode,
          totalMarks: serverTotalMarks,
          earnedMarks: serverEarnedMarks,
          percentage: serverPercentage,
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
      ...userProgressUpdates,
      ...notificationsToCreate
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
    const session = await getSessionFromRequest(request);

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
