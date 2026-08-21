import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";
import CommunityClient from "./CommunityClient";

export default async function CommunityPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const challenge = await prisma.challenge.findUnique({
    where: { id: params.id }
  });

  if (!challenge) {
    notFound();
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const payload = await verifySessionToken(token);
  
  if (!payload?.userId) {
    notFound(); // Or redirect to login
  }

  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user) notFound();

  const rawParticipants = await prisma.challengeParticipant.findMany({
    where: { challengeId: params.id, status: "SUBMITTED" },
    include: { user: true },
    orderBy: { score: 'desc' }
  });

  const isParticipant = rawParticipants.some(p => p.userId === payload.userId);
  if (!isParticipant) {
    redirect(`/detective/${params.id}/exam`);
  }

  const participants = rawParticipants.map((p, idx) => ({
    id: p.userId,
    name: p.user.name || "Student",
    xp: p.xpEarned,
    rank: idx + 1,
    role: p.xpEarned >= 2000 ? "SENIOR INVESTIGATOR" : "PARTICIPANT",
    helped: 0,
    reports: 0
  }));

  const currentUser = { id: user.id, name: user.name || "Student", image: user.image || null };

  return <CommunityClient challengeId={challenge.id} challengeTitle={challenge.title} participants={participants} currentUser={currentUser} />;
}
