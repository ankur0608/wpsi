import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";
import ExamClient from "./ExamClient";

export default async function ExamPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const payload = await verifySessionToken(token);
  
  if (!payload?.userId) {
    redirect("/login");
  }

  const existingSubmission = await prisma.challengeParticipant.findUnique({
    where: {
      challengeId_userId: {
        userId: payload.userId,
        challengeId: params.id
      }
    }
  });

  if (existingSubmission && existingSubmission.status === "SUBMITTED") {
    redirect(`/detective/${params.id}/results`);
  }

  const challenge = await prisma.challenge.findUnique({
    where: { id: params.id },
    include: {
      questions: {
        include: {
          mcq: {
            select: {
              id: true,
              question: true,
              optionA: true,
              optionB: true,
              optionC: true,
              optionD: true,
              imageUrl: true,
              // Intentionally omitting correctAnswer here so it's not exposed to the client
            }
          }
        }
      }
    }
  });

  if (!challenge) {
    notFound();
  }

  return (
    <ExamClient 
      challenge={{
        id: challenge.id,
        title: challenge.title,
        durationMinutes: challenge.durationMinutes,
        questions: challenge.questions.map(q => q.mcq)
      }}
    />
  );
}
