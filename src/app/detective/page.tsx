import { cookies } from "next/headers";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DetectiveDashboardClient from "./DetectiveDashboardClient";

export default async function DetectiveDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const payload = await verifySessionToken(token);

  let userActivity = { completed: 0, investigated: 84, accepted: 43, helpful: 62, xp: 0, role: "Junior Investigator" };
  let userId = null;
  let userName = "Profile";
  let userImage = "";

  if (payload?.userId) {
      userId = payload.userId;
      const user = await prisma.user.findUnique({
          where: { id: userId },
          include: { 
              challengeParticipants: { where: { status: "SUBMITTED" } },
              challengeDisputes: true
          }
      });
      if (user) {
          const completedCount = user.challengeParticipants.length;
          
          let investigatedCount = 0;
          let detectiveXp = 0;
          user.challengeParticipants.forEach((p: any) => {
              if (p.answers && typeof p.answers === 'object') {
                  investigatedCount += Object.keys(p.answers).length;
              }
              detectiveXp += (p.xpEarned || 0);
          });

          const acceptedCount = user.challengeDisputes.filter(d => d.status === "ACCEPTED").length;
          const helpfulCount = user.challengeDisputes.length;

          userActivity = {
              completed: completedCount,
              investigated: investigatedCount,
              accepted: acceptedCount,
              helpful: helpfulCount,
              xp: detectiveXp,
              role: detectiveXp >= 2000 ? "Master Investigator" : (detectiveXp >= 500 ? "Senior Investigator" : "Junior Investigator")
          };
          userName = user.name || "Profile";
          userImage = user.image || "";
      }
  }

  const allChallenges = await prisma.challenge.findMany({
      include: {
          questions: true,
          participants: true
      },
      orderBy: { createdAt: 'desc' }
  });

  const now = new Date();
  
  const activeExams = allChallenges.filter(c => c.status === "LIVE" && (!c.endDate || c.endDate >= now)).map(c => {
      const participant = userId ? c.participants.find(p => p.userId === userId) : null;
      return {
          id: c.id,
          title: c.title,
          duration: c.durationMinutes,
          questions: c.questions.length,
          marks: c.questions.length, // assuming 1 mark per question
          joined: c.participants.length,
          maxUsers: c.maxUsers,
          startTime: c.scheduledDate || c.createdAt,
          endTime: c.endDate, 
          tag: "LIVE",
          hasAttempted: !!participant
      };
  });

  const upcomingExams = allChallenges.filter(c => c.status === "DRAFT" && c.scheduledDate && c.scheduledDate > now).map(c => {
      const participant = userId ? c.participants.find(p => p.userId === userId) : null;
      return {
          id: c.id,
          title: c.title,
          duration: c.durationMinutes,
          startTime: c.scheduledDate,
          waiting: c.participants.length,
          maxUsers: c.maxUsers,
          tag: "UPCOMING",
          hasAttempted: !!participant
      };
  });

  const pastExams = allChallenges.filter(c => c.status === "ENDED" || (c.endDate && c.endDate < now)).map(c => {
      const participant = userId ? c.participants.find(p => p.userId === userId) : null;
      let rank = null;
      if (participant) {
          // calculate rank
          const higherScores = c.participants.filter(p => p.score > participant.score).length;
          rank = higherScores + 1;
      }
      return {
          id: c.id,
          title: c.title,
          startTime: c.scheduledDate || c.createdAt,
          endTime: c.endDate || now,
          participantCount: c.participants.length,
          maxUsers: c.maxUsers,
          userScore: participant ? participant.score : null,
          totalMarks: c.questions.length,
          userRank: rank,
          tag: "ENDED"
      };
  });

  // Calculate all-time Detective XP for everyone
  const allTimeXPData = await prisma.challengeParticipant.groupBy({
    by: ['userId'],
    where: { status: 'SUBMITTED' },
    _sum: { xpEarned: true }
  });
  const allTimeXPMap = new Map(allTimeXPData.map(d => [d.userId, d._sum.xpEarned || 0]));

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  // Calculate weekly gain for everyone
  const weeklyXPData = await prisma.challengeParticipant.groupBy({
    by: ['userId'],
    where: {
      status: 'SUBMITTED',
      submittedAt: { gte: oneWeekAgo }
    },
    _sum: { xpEarned: true }
  });
  const weeklyXPMap = new Map(weeklyXPData.map(d => [d.userId, d._sum.xpEarned || 0]));

  // Top Detectives - All Time
  const topAllTimeIds = Array.from(allTimeXPMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(e => e[0]);

  let topDetectivesAllTime: any[] = [];
  if (topAllTimeIds.length > 0) {
      const topAllTimeUsers = await prisma.user.findMany({
          where: { id: { in: topAllTimeIds } },
          select: { id: true, name: true, xp: true, image: true }
      });
      
      topDetectivesAllTime = topAllTimeIds.map(id => {
          const u = topAllTimeUsers.find(tu => tu.id === id);
          if (!u) return null;
          const detectiveXp = allTimeXPMap.get(id) || 0;
          return {
              id: u.id,
              name: u.name,
              image: u.image,
              xp: detectiveXp, 
              role: detectiveXp >= 2000 ? "MASTER INVESTIGATOR" : (detectiveXp >= 500 ? "SENIOR INVESTIGATOR" : "INVESTIGATOR"),
              weeklyGain: weeklyXPMap.get(u.id) || 0
          };
      }).filter(Boolean);
  }

  // Top Detectives - This Week
  const topWeeklyIds = Array.from(weeklyXPMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(e => e[0]);

  let topDetectivesThisWeek: any[] = [];
  if (topWeeklyIds.length > 0) {
      const topWeeklyUsers = await prisma.user.findMany({
          where: { id: { in: topWeeklyIds } },
          select: { id: true, name: true, xp: true, image: true }
      });
      
      topDetectivesThisWeek = topWeeklyIds.map(id => {
          const u = topWeeklyUsers.find(tu => tu.id === id);
          if (!u) return null;
          const detectiveXp = allTimeXPMap.get(id) || 0;
          return {
              id: u.id,
              name: u.name,
              image: u.image,
              xp: detectiveXp, 
              role: detectiveXp >= 2000 ? "MASTER INVESTIGATOR" : (detectiveXp >= 500 ? "SENIOR INVESTIGATOR" : "INVESTIGATOR"),
              weeklyGain: weeklyXPMap.get(u.id) || 0
          };
      }).filter(Boolean);
  }

  if (topDetectivesThisWeek.length === 0) {
      topDetectivesThisWeek = topDetectivesAllTime; 
  }

  return (
      <DetectiveDashboardClient 
          active={activeExams} 
          upcoming={upcomingExams} 
          past={pastExams} 
          activity={userActivity}
          topDetectivesAllTime={topDetectivesAllTime}
          topDetectivesThisWeek={topDetectivesThisWeek}
          currentUser={{ name: userName, image: userImage }}
      />
  );
}
