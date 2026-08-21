import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";
import ResultsClient from "./ResultsClient";

export default async function ResultsPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const payload = await verifySessionToken(token);
  
  if (!payload?.userId) {
    notFound();
  }

  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user) notFound();

  const participant = await prisma.challengeParticipant.findFirst({
    where: {
      challengeId: params.id,
      userId: user.id
    },
    include: {
      challenge: {
        include: {
          questions: {
            include: { 
              mcq: {
                include: {
                  topic: {
                    include: {
                      subject: true
                    }
                  }
                }
              } 
            }
          }
        }
      }
    }
  });

  if (!participant || participant.status !== "SUBMITTED") {
    redirect(`/detective/${params.id}/exam`);
  }

  // Fetch leaderboard
  const allParticipants = await prisma.challengeParticipant.findMany({
    where: {
      challengeId: params.id,
      // I'll remove status: "SUBMITTED" so we get ALL participants for the chat count.
      // But leaderboard should only show SUBMITTED.
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          xp: true
        }
      }
    },
    orderBy: [
      { score: 'desc' }
    ]
  });

  const totalParticipants = allParticipants.length;

  const leaderboard = allParticipants
    .filter(p => p.status === "SUBMITTED")
    .map((p, index) => {
      const timeTaken = p.submittedAt && p.createdAt 
        ? Math.floor((p.submittedAt.getTime() - p.createdAt.getTime()) / 1000)
        : 0;
      
      const h = Math.floor(timeTaken / 3600);
      const m = Math.floor((timeTaken % 3600) / 60);
      const s = timeTaken % 60;
      
      let timeTakenStr = "";
      if (h > 0) timeTakenStr += `${h}h `;
      if (m > 0 || h > 0) timeTakenStr += `${m}m `;
      timeTakenStr += `${s}s`;

      return {
        rank: index + 1, // Note: rank is now index + 1 of the filtered array
        userId: p.user.id,
        name: p.user.name || "Student",
        image: p.user.image,
        xp: p.user.xp || 0,
        xpEarned: p.xpEarned || 0,
        score: p.score,
        timeTakenStr: timeTakenStr.trim(),
        isCurrentUser: p.user.id === user.id
      };
    });


  // Calculate stats
  let correctCount = 0;
  let wrongCount = 0;
  let notAttempted = 0;

  const userAnswers = participant.answers as Record<string, string> || {};
  const questions = participant.challenge.questions.map(q => q.mcq);

  questions.forEach(q => {
    const ua = userAnswers[q.id];
    if (ua) {
      if (ua === q.correctAnswer) correctCount++;
      else wrongCount++;
    } else {
      notAttempted++;
    }
  });

  const accuracy = correctCount + wrongCount > 0 
    ? Math.round((correctCount / (correctCount + wrongCount)) * 100) 
    : 0;

  const totalTimeTakenSeconds = participant.submittedAt && participant.createdAt 
    ? Math.floor((participant.submittedAt.getTime() - participant.createdAt.getTime()) / 1000)
    : 0;

  const m = Math.floor(totalTimeTakenSeconds / 60);
  const s = totalTimeTakenSeconds % 60;
  const timeTakenStr = `${m}m ${s}s`;

  // Calculate Subject Analysis
  const subjectMap: Record<string, { total: number, correct: number, wrong: number, notAttempted: number }> = {};
  questions.forEach(q => {
    const subjectName = q.topic?.subject?.name || "Other";
    if (!subjectMap[subjectName]) {
      subjectMap[subjectName] = { total: 0, correct: 0, wrong: 0, notAttempted: 0 };
    }
    
    subjectMap[subjectName].total++;
    const ua = userAnswers[q.id];
    if (ua) {
      if (ua === q.correctAnswer) subjectMap[subjectName].correct++;
      else subjectMap[subjectName].wrong++;
    } else {
      subjectMap[subjectName].notAttempted++;
    }
  });

  const subjectAnalysis = Object.entries(subjectMap).map(([name, stats]) => ({
    subjectName: name,
    ...stats
  }));

  return (
    <ResultsClient 
      challengeId={participant.challengeId}
      challengeTitle={participant.challenge.title}
      score={participant.score}
      totalMarks={questions.length}
      xpEarned={participant.xpEarned}
      stats={{
        accuracy,
        correctCount,
        wrongCount,
        notAttempted,
        timeTakenStr
      }}
      questions={questions}
      userAnswers={userAnswers}
      currentUser={{
        id: user.id,
        name: user.name || "Student",
        image: user.image || null
      }}
      leaderboard={leaderboard}
      subjectAnalysis={subjectAnalysis}
      totalParticipants={totalParticipants}
    />
  );
}
