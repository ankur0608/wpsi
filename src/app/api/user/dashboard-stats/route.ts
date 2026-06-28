import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = getSessionFromRequest(request);

    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const userId = session.userId;

    // 1. Basic Stats
    const mockTestsAttempted = await prisma.testSubmission.count({
      where: { userId },
    });

    const mcqsSolved = await prisma.mCQAnswer.count({
      where: { userId },
    });

    const answers = await prisma.mCQAnswer.findMany({
      where: { userId },
      select: { isCorrect: true },
    });

    let averageAccuracy = 0;
    if (answers.length > 0) {
      const correct = answers.filter(a => a.isCorrect).length;
      averageAccuracy = (correct / answers.length) * 100;
    }

    // 2. Resume Practice (most recent subject)
    const recentProgress = await prisma.userProgress.findFirst({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      // Subject is just an ID in UserProgress, but wait, schema says subjectId is a string, and relation is to Subject model?
      // Wait, let's just query UserProgress and we will manually match or we'll fetch the subject details if possible.
      // Wait, is Subject actually linked? Schema says: user: User, subjectId: String. There is NO subject relation defined in UserProgress in schema.prisma?
      // Ah! Line 122: subjectId String. Line 123: no subject relation. Oh wait, it is just subjectId.
    });

    // 3. Weak Subjects
    const weakProgresses = await prisma.userProgress.findMany({
      where: { userId, totalAttempts: { gt: 0 } },
      orderBy: { accuracy: 'asc' },
      take: 3,
    });

    // 4. Syllabus Coverage
    const allProgresses = await prisma.userProgress.findMany({
      where: { userId },
    });

    // Let's fetch all subjects to join the data
    const allSubjects = await prisma.subject.findMany({
      select: { id: true, name: true, part: true }
    });
    
    const subjectMap = new Map(allSubjects.map(s => [s.id, s]));

    // Build Resume Practice
    let resumePractice = null;
    if (recentProgress && subjectMap.has(recentProgress.subjectId)) {
        const subj = subjectMap.get(recentProgress.subjectId);
        resumePractice = {
            subjectName: subj?.name,
            part: subj?.part,
            totalAttempts: recentProgress.totalAttempts,
            accuracy: recentProgress.accuracy,
        };
    }

    // Build Weak Topics
    const weakTopics = weakProgresses.map(wp => {
        const subj = subjectMap.get(wp.subjectId);
        return {
            subjectName: subj?.name || "Unknown",
            accuracy: wp.accuracy,
            errors: wp.totalAttempts - wp.correctCount
        };
    });

    // Build Syllabus Coverage
    let partA_attempted = 0;
    let partB_attempted = 0;
    let partA_total = allSubjects.filter(s => s.part.includes('A')).length || 1;
    let partB_total = allSubjects.filter(s => s.part.includes('B')).length || 1;

    allProgresses.forEach(p => {
        const subj = subjectMap.get(p.subjectId);
        if (subj?.part.includes('A')) partA_attempted++;
        if (subj?.part.includes('B')) partB_attempted++;
    });

    const syllabusCoverage = {
        overall: Math.round(((partA_attempted + partB_attempted) / (partA_total + partB_total)) * 100) || 0,
        partA: Math.round((partA_attempted / partA_total) * 100) || 0,
        partB: Math.round((partB_attempted / partB_total) * 100) || 0,
    };

    // 5. Weekly Activity
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const recentAnswers = await prisma.mCQAnswer.findMany({
      where: {
        userId,
        createdAt: {
          gte: sevenDaysAgo,
          lte: today,
        }
      },
      select: { createdAt: true }
    });

    const activityCounts = [0, 0, 0, 0, 0, 0, 0];
    const dayLabels = ['', '', '', '', '', '', ''];
    
    for (let i = 0; i < 7; i++) {
        const d = new Date(sevenDaysAgo);
        d.setDate(d.getDate() + i);
        dayLabels[i] = d.toLocaleDateString('en-US', { weekday: 'short' });
    }

    recentAnswers.forEach(ans => {
        const diffTime = ans.createdAt.getTime() - sevenDaysAgo.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays >= 0 && diffDays < 7) {
            activityCounts[diffDays]++;
        }
    });

    const maxActivity = Math.max(...activityCounts, 5); 
    const weeklyActivity = activityCounts.map(count => `${Math.round((count / maxActivity) * 100)}%`);

    // 6. Rank Calculation
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { xp: true }
    });
    
    const userXp = currentUser?.xp || 0;
    const usersWithHigherXp = await prisma.user.count({
      where: { xp: { gt: userXp } }
    });
    const rank = usersWithHigherXp + 1;

    return NextResponse.json({
      data: {
        mockTestsAttempted,
        mcqsSolved,
        averageAccuracy: parseFloat(averageAccuracy.toFixed(1)),
        resumePractice,
        weakTopics,
        syllabusCoverage,
        weeklyActivity,
        dayLabels,
        rank,
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
