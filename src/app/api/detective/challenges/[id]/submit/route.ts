import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function POST(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const { id } = params;
    const body = await request.json();
    const { answers } = body; // Expected { [mcqId]: "optionA" | "optionB" | ... }

    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const payload = await verifySessionToken(token);
    
    if (!payload?.userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = payload.userId;

    // Check if challenge exists
    const challenge = await prisma.challenge.findUnique({
      where: { id },
      include: {
        questions: {
          include: { mcq: true }
        }
      }
    });

    if (!challenge) {
      return NextResponse.json({ success: false, error: "Challenge not found" }, { status: 404 });
    }

    // Evaluate answers
    let correctCount = 0;
    let wrongCount = 0;
    let score = 0;

    for (const q of challenge.questions) {
      const userAnswer = answers[q.mcqId];
      if (userAnswer) {
        if (userAnswer === q.mcq.correctAnswer) {
          correctCount++;
          score += 1;
        } else {
          wrongCount++;
          score -= 0.25;
        }
      }
    }

    // Prevent negative score
    score = Math.max(0, score);
    const xpEarned = Math.floor(score * 10);

    // Create or update participant
    const participant = await prisma.challengeParticipant.upsert({
      where: {
        challengeId_userId: {
          challengeId: id,
          userId
        }
      },
      update: {
        score,
        xpEarned,
        answers,
        status: "SUBMITTED",
        submittedAt: new Date()
      },
      create: {
        challengeId: id,
        userId,
        score,
        xpEarned,
        answers,
        status: "SUBMITTED",
        submittedAt: new Date()
      }
    });

    return NextResponse.json({ success: true, data: participant });
  } catch (error) {
    console.error("Error submitting challenge:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit challenge" },
      { status: 500 }
    );
  }
}
