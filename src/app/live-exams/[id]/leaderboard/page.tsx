import { getLiveExamLeaderboard } from "@/app/actions/live-exam";
import { cookies } from "next/headers";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import LeaderboardClient from "./LeaderboardClient";

export default async function LeaderboardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const payload = await verifySessionToken(token);
  let currentUser = null;
  let isParticipant = false;

  if (payload?.userId) {
     const user = await prisma.user.findUnique({ where: { id: payload.userId } });
     if (user) {
         currentUser = { id: user.id, name: user.name, image: user.image };
         
         const participant = await prisma.liveExamParticipant.findUnique({
             where: { liveExamId_userId: { liveExamId: id, userId: user.id } }
         });
         isParticipant = !!participant;
     }
  }

  const result = await getLiveExamLeaderboard(id);

  return (
      <LeaderboardClient 
          liveExamId={id} 
          result={result} 
          currentUser={currentUser} 
          isParticipant={isParticipant} 
      />
  );
}
