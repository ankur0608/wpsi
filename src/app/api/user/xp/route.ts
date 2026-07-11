import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';
import { XP_LEVELS, getUserLevel } from '@/lib/xp';

export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);

    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const userId = session.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        xp: true,
        level: true,
        streak: true
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Fetch all submissions to calculate analytics and lifetime sources
    const allSubmissions = await prisma.testSubmission.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' }
    });

    // Calculate stats
    const now = new Date();
    let todayXP = 0;
    let weeklyXP = 0;
    let monthlyXP = 0;
    
    let practiceXP = 0;
    let timedXP = 0;
    let mockXP = 0;

    const dailyXPMap: Record<string, number> = {};
    const recentHistory: any[] = [];

    allSubmissions.forEach((sub: any) => {
      const date = new Date(sub.createdAt);
      const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24));
      
      // Approximate XP earned for this submission based on XP_REWARDS logic
      let xpEarned = Math.max(0, sub.earnedMarks * 10);
      if (sub.mode === 'full') xpEarned += 100;
      else if (sub.mode === 'mock') xpEarned += 150;
      else if (sub.mode === 'timed') xpEarned += 75;
      else if (sub.mode === 'quick') xpEarned += 30;
      
      if (sub.percentage >= 80 && sub.mode === 'timed') xpEarned += 30;
      if (sub.percentage >= 90 && sub.mode === 'mock') xpEarned += 75;
      if (sub.percentage === 100 && sub.totalMarks > 0) xpEarned += 40;

      // Group by date for highestDayXP
      const dateString = date.toISOString().split('T')[0];
      if (!dailyXPMap[dateString]) dailyXPMap[dateString] = 0;
      dailyXPMap[dateString] += xpEarned;

      // Time-based stats
      if (diffDays === 0) todayXP += xpEarned;
      if (diffDays <= 7) weeklyXP += xpEarned;
      if (diffDays <= 30) monthlyXP += xpEarned;

      // Source-based stats
      if (sub.mode === 'quick' || sub.mode === 'full') practiceXP += xpEarned;
      else if (sub.mode === 'timed') timedXP += xpEarned;
      else if (sub.mode === 'mock') mockXP += xpEarned;

      // Add to recent history if it's one of the latest 5
      if (recentHistory.length < 5) {
        recentHistory.push({
          title: sub.title,
          date: date.toISOString(),
          xp: xpEarned,
          mode: sub.mode
        });
      }
    });

    const highestDayXP = Object.values(dailyXPMap).length > 0 ? Math.max(...Object.values(dailyXPMap)) : 0;
    
    // Streak and other bonuses are whatever is left over from their actual total XP
    const calculatedXPFromTests = practiceXP + timedXP + mockXP;
    const streakXP = Math.max(0, user.xp - calculatedXPFromTests);

    const { currentLevel, nextLevel, progress } = getUserLevel(user.xp);
    
    // Force sync the user level in DB if it mismatches
    if (user.level !== currentLevel.level) {
       await prisma.user.update({ where: { id: userId }, data: { level: currentLevel.level } });
       user.level = currentLevel.level;
    }

    // Format levels for frontend mapping
    const formattedLevels = XP_LEVELS.map((l, index) => {
      const next = XP_LEVELS[index + 1];
      return {
        lvl: l.level,
        name: l.name,
        min: l.xpRequired,
        max: next ? next.xpRequired : l.xpRequired + 50000
      };
    });

    // Calculate percentages for sources
    const totalXP = Math.max(1, user.xp); // prevent divide by zero
    const sources = [
      { name: 'Practice Questions', xp: practiceXP, percentage: Math.round((practiceXP / totalXP) * 100), color: 'bg-primary-500' },
      { name: 'Sectional / Timed Tests', xp: timedXP, percentage: Math.round((timedXP / totalXP) * 100), color: 'bg-purple-500' },
      { name: 'Full-Length Mock Exams', xp: mockXP, percentage: Math.round((mockXP / totalXP) * 100), color: 'bg-indigo-500' },
      { name: 'Streak Rewards & Milestones', xp: streakXP, percentage: Math.round((streakXP / totalXP) * 100), color: 'bg-orange-500' }
    ];

    return NextResponse.json({
      success: true,
      data: {
        user: {
          name: user.name || 'Student',
          xp: user.xp,
          level: user.level,
          streak: user.streak,
          rank: currentLevel.name,
          levelMin: currentLevel.xpRequired,
          levelMax: nextLevel ? nextLevel.xpRequired : currentLevel.xpRequired,
          progressPercentage: progress
        },
        analytics: {
          todayXP,
          weeklyXP,
          monthlyXP,
          averageDayXP: Math.round(monthlyXP / 30) || 0,
          averageWeekXP: Math.round(monthlyXP / 4) || 0,
          highestDayXP: Math.max(todayXP, highestDayXP)
        },
        recentHistory,
        sources,
        levels: formattedLevels
      }
    });
  } catch (error) {
    console.error('Error fetching XP data:', error);
    return NextResponse.json({ error: 'Failed to fetch XP data' }, { status: 500 });
  }
}
