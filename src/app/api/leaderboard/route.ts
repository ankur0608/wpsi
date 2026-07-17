import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);

    // Fetch top 10 users based on XP
    const topUsers = await prisma.user.findMany({
      orderBy: { xp: 'desc' },
      take: 10,
      select: {
        id: true,
        name: true,
        xp: true,
        level: true,
        streak: true,
        image: true
      }
    });

    let userRank = null;
    let userStats = null;
    let totalUsers = 0;

    totalUsers = await prisma.user.count();

    if (session) {
        // Calculate the user's overall rank
        const currentUser = await prisma.user.findUnique({
            where: { id: session.userId },
            select: { id: true, name: true, xp: true, level: true, streak: true, image: true }
        });
        
        if (currentUser) {
            userStats = currentUser;
            const rankCount = await prisma.user.count({
                where: {
                    xp: {
                        gt: currentUser.xp
                    }
                }
            });
            userRank = rankCount + 1;
        }
    }

    // Format data for the frontend
    const leaderboardData = topUsers.map((u, index) => {
        const name = (u.name && u.name.trim().length > 0) ? u.name.trim() : "WPSI Aspirant";
        const avatar = name.substring(0, 2).toUpperCase();
        const xpString = u.xp >= 1000 ? (u.xp / 1000).toFixed(1) + 'k XP' : u.xp + ' XP';
        
        return {
            rank: index + 1,
            id: u.id,
            name: name,
            avatar: avatar,
            xp: xpString,
            rawXp: u.xp,
            change: "same", // Future enhancement: track historical rank
            score: Math.min(100, Math.floor(u.xp / 100) || 0),
            streak: u.streak,
            isUser: session?.userId === u.id,
            image: u.image || null
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
