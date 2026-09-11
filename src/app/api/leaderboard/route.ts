import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);

    const timeframe = request.nextUrl.searchParams.get('timeframe') || 'allTime';
    const examId = request.nextUrl.searchParams.get('examId');

    const userWhereClause = examId ? { examId } : {};

    let topUsers: any[] = [];
    let totalUsers = await prisma.user.count({ where: userWhereClause });

    if (timeframe === 'allTime') {
      topUsers = await prisma.user.findMany({
        where: userWhereClause,
        orderBy: { xp: 'desc' },
        take: 30,
        select: {
          id: true,
          name: true,
          xp: true,
          level: true,
          streak: true,
          image: true,
          planType: true
        }
      });
    } else {
      const dateCutoff = new Date();
      if (timeframe === 'weekly') {
          dateCutoff.setDate(dateCutoff.getDate() - 7);
      } else if (timeframe === 'monthly') {
          dateCutoff.setDate(dateCutoff.getDate() - 30);
      }

      // Fetch all submissions in timeframe
      const submissions = await prisma.testSubmission.findMany({
          where: { 
              createdAt: { gte: dateCutoff },
              ...(examId ? { user: { examId } } : {})
          },
          select: { userId: true, xpEarned: true, earnedMarks: true, mode: true, percentage: true, totalMarks: true }
      });

      // Calculate true XP per user
      const userXPMap: Record<string, number> = {};
      submissions.forEach(sub => {
          let xpEarned = sub.xpEarned;
          if (xpEarned === 0 && sub.earnedMarks !== 0) {
              xpEarned = sub.earnedMarks * 10;
              if (sub.mode === 'full') xpEarned += 100;
              else if (sub.mode === 'mock') xpEarned += 150;
              else if (sub.mode === 'timed') xpEarned += 75;
              else if (sub.mode === 'quick') xpEarned += 30;
              
              if (sub.percentage >= 80 && sub.mode === 'timed') xpEarned += 30;
              if (sub.percentage >= 90 && sub.mode === 'mock') xpEarned += 75;
              if (sub.percentage === 100 && sub.totalMarks > 0) xpEarned += 40;
          }
          userXPMap[sub.userId] = (userXPMap[sub.userId] || 0) + xpEarned;
      });

      // Sort and take top 30
      const sortedUsers = Object.entries(userXPMap)
          .sort(([, xpA], [, xpB]) => xpB - xpA)
          .slice(0, 30);

      const userIds = sortedUsers.map(([id]) => id);
      const usersData = await prisma.user.findMany({
          where: { id: { in: userIds } },
          select: { id: true, name: true, level: true, streak: true, image: true, planType: true }
      });

      topUsers = sortedUsers.map(([userId, xp]) => {
          const u = usersData.find(user => user.id === userId);
          return {
              id: userId,
              name: u?.name || 'Aspirant',
              xp: Math.round(xp), // Ensure integer XP
              level: u?.level || 1,
              streak: u?.streak || 0,
              image: u?.image || null,
              planType: u?.planType || 'free'
          };
      });
    }

    let userRank = null;
    let userStats = null;

    if (session) {
        // Calculate the user's overall rank
        const currentUser = await prisma.user.findUnique({
            where: { id: session.userId },
            select: { id: true, name: true, xp: true, level: true, streak: true, image: true, planType: true }
        });
        
        if (currentUser) {
            userStats = currentUser;
            
            if (timeframe === 'allTime') {
                const rankCount = await prisma.user.count({
                    where: { 
                        xp: { gt: currentUser.xp },
                        ...(examId ? { examId } : {})
                    }
                });
                userRank = rankCount + 1;
            } else {
                const dateCutoff = new Date();
                if (timeframe === 'weekly') {
                    dateCutoff.setDate(dateCutoff.getDate() - 7);
                } else if (timeframe === 'monthly') {
                    dateCutoff.setDate(dateCutoff.getDate() - 30);
                }
                
                const userSubmissions = await prisma.testSubmission.findMany({
                    where: { userId: session.userId, createdAt: { gte: dateCutoff } },
                    select: { xpEarned: true, earnedMarks: true, mode: true, percentage: true, totalMarks: true }
                });
                
                let myXP = 0;
                userSubmissions.forEach(sub => {
                    let xpEarned = sub.xpEarned;
                    if (xpEarned === 0 && sub.earnedMarks !== 0) {
                        xpEarned = sub.earnedMarks * 10;
                        if (sub.mode === 'full') xpEarned += 100;
                        else if (sub.mode === 'mock') xpEarned += 150;
                        else if (sub.mode === 'timed') xpEarned += 75;
                        else if (sub.mode === 'quick') xpEarned += 30;
                        
                        if (sub.percentage >= 80 && sub.mode === 'timed') xpEarned += 30;
                        if (sub.percentage >= 90 && sub.mode === 'mock') xpEarned += 75;
                        if (sub.percentage === 100 && sub.totalMarks > 0) xpEarned += 40;
                    }
                    myXP += xpEarned;
                });
                
                const topUserIndex = topUsers.findIndex(u => u.id === session.userId);
                if (topUserIndex !== -1) {
                    userRank = topUserIndex + 1;
                } else {
                    userRank = null; 
                }
                
                currentUser.xp = Math.round(myXP);
                userStats = currentUser;
            }
        }
    }

    // Format data for the frontend
    const leaderboardData = topUsers.map((u, index) => {
        const name = (u.name && u.name.trim().length > 0) ? u.name.trim() : "Aspirant";
        const avatar = name.substring(0, 2).toUpperCase();
        const xpString = u.xp >= 1000 ? (u.xp / 1000).toFixed(1) + 'k XP' : u.xp + ' XP';
        const changeOptions = ['up', 'same'];
        const changeSeed = (u.id.length + index) % 2;
        const change = changeOptions[changeSeed];
        const rankChangeAmount = change === 'same' ? 0 : 50 + (((u.id.charCodeAt(0) + index) % 20) * 10);
        
        return {
            rank: index + 1,
            id: u.id,
            name: name,
            avatar: avatar,
            xp: xpString,
            rawXp: u.xp,
            change: change,
            rankChangeAmount: rankChangeAmount,
            score: Math.min(100, Math.floor(u.xp / 100) || 0),
            streak: u.streak,
            isUser: session?.userId === u.id,
            image: u.image || null,
            planType: u.planType
        };
    });

    return NextResponse.json({
      leaderboardData,
      userRank,
      userStats,
      totalUsers
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}
