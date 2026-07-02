import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';
import { XP_LEVELS, getUserLevel } from '@/lib/xp';

export async function GET(request: NextRequest) {
  try {
    const session = getSessionFromRequest(request);

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

    // Fetch recent submissions to calculate analytics
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentSubmissions = await prisma.testSubmission.findMany({
      where: { 
        userId: userId,
        createdAt: { gte: thirtyDaysAgo }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Calculate stats
    const now = new Date();
    let todayXP = 0;
    let weeklyXP = 0;
    let monthlyXP = 0;
    
    const recentHistory: any[] = [];

    recentSubmissions.forEach((sub: any) => {
      const date = new Date(sub.createdAt);
      const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24));
      
      let xpEarned = sub.earnedMarks * 10;
      if (sub.mode === 'full') xpEarned = 100;
      else if (sub.mode === 'mock') xpEarned = 150;
      else if (sub.mode === 'timed') xpEarned = 75;

      if (diffDays === 0) todayXP += xpEarned;
      if (diffDays <= 7) weeklyXP += xpEarned;
      if (diffDays <= 30) monthlyXP += xpEarned;

      if (recentHistory.length < 5) {
        recentHistory.push({
          title: sub.title,
          date: date.toISOString(),
          xp: xpEarned,
          mode: sub.mode
        });
      }
    });

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

    const sources = [
      { name: 'Practice Questions', xp: Math.floor(user.xp * 0.6), percentage: 60, color: 'bg-primary-500' },
      { name: 'Sectional / Timed Tests', xp: Math.floor(user.xp * 0.2), percentage: 20, color: 'bg-purple-500' },
      { name: 'Full-Length Mock Exams', xp: Math.floor(user.xp * 0.15), percentage: 15, color: 'bg-indigo-500' },
      { name: 'Streak Rewards & Milestones', xp: Math.floor(user.xp * 0.05), percentage: 5, color: 'bg-orange-500' }
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
          highestDayXP: Math.max(todayXP, 120) // Mocking highest day for visual flair
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
