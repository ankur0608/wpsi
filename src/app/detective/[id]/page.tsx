import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ChallengeDetailsClient from "./ChallengeDetailsClient";
import { cookies } from "next/headers";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";

export default async function ChallengeDetailsPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const challenge = await prisma.challenge.findUnique({
    where: { id: params.id },
    include: {
      questions: true,
      participants: true
    }
  });

  if (!challenge) {
    notFound();
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const payload = await verifySessionToken(token);
  
  let hasAttempted = false;
  if (payload?.userId) {
    hasAttempted = challenge.participants.some(p => p.userId === payload.userId);
  }

  const activeParticipantsCount = challenge.participants.length;

  return (
    <ChallengeDetailsClient 
      challenge={{
        id: challenge.id,
        title: challenge.title,
        durationMinutes: challenge.durationMinutes,
        questionsCount: challenge.questions.length,
        marks: challenge.questions.length,
        endDate: challenge.endDate,
        participantsCount: activeParticipantsCount,
        hasAttempted
      }}
    />
  );
}
