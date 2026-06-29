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
      
      // Estimate XP earned from this submission
      let xpEarned = sub.earnedMarks * 10;
      if (sub.mode === 'full') xpEarned = 150;
      else if (sub.mode === 'sectional') xpEarned = 75;

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

    // Level Progression Logic
    const levels = [
      { lvl: 1, name: 'Beginner', min: 0, max: 500 },
      { lvl: 2, name: 'Learner', min: 500, max: 1000 },
      { lvl: 3, name: 'Practitioner', min: 1000, max: 1750 },
      { lvl: 4, name: 'Skilled', min: 1750, max: 2500 },
      { lvl: 5, name: 'Advanced', min: 2500, max: 3400 },
      { lvl: 6, name: 'Expert', min: 3400, max: 4000 },
      { lvl: 7, name: 'Master', min: 4000, max: 5000 },
      { lvl: 8, name: 'Legend', min: 5000, max: 100000 }
    ];

    let currentLevelObj = levels[0];
    for (let l of levels) {
      if (user.xp >= l.min && user.xp < l.max) {
        currentLevelObj = l;
        break;
      }
      if (l.lvl === 8 && user.xp >= l.min) {
        currentLevelObj = l;
      }
    }
    
    // Force sync the user level in DB if it mismatches
    if (user.level !== currentLevelObj.lvl) {
       await prisma.user.update({ where: { id: userId }, data: { level: currentLevelObj.lvl } });
       user.level = currentLevelObj.lvl;
    }

    const currentLevelProgress = user.xp >= 5000 ? 100 : ((user.xp - currentLevelObj.min) / (currentLevelObj.max - currentLevelObj.min)) * 100;

    // Dynamic sources mock based on total XP (since we don't have historical logs of ALL time)
    const sources = [
      { name: 'Practice Questions', xp: Math.floor(user.xp * 0.6), percentage: 60, color: 'bg-primary-500' },
      { name: 'Sectional Mock Tests', xp: Math.floor(user.xp * 0.2), percentage: 20, color: 'bg-purple-500' },
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
          rank: currentLevelObj.name,
          levelMin: currentLevelObj.min,
          levelMax: currentLevelObj.max,
          progressPercentage: currentLevelProgress
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
        levels
      }
    });
  } catch (error) {
    console.error('Error fetching XP data:', error);
    return NextResponse.json({ error: 'Failed to fetch XP data' }, { status: 500 });
  }
}
