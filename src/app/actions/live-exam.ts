"use server";

import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME, verifySessionToken } from '@/lib/auth';

async function getUserId() {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const payload = await verifySessionToken(token);
    if (!payload) return null;
    return payload.userId;
}

export async function getLiveExamDetails(liveExamId: string) {
    try {
        const liveExam = await prisma.liveExam.findUnique({
            where: { id: liveExamId },
            include: {
                mockTest: {
                    include: {
                        questions: {
                            select: {
                                id: true,
                                question: true,
                                optionA: true,
                                optionB: true,
                                optionC: true,
                                optionD: true,
                                difficulty: true,
                                language: true,
                            }
                        } // Don't expose correct answer here
                    }
                }
            }
        });

        if (!liveExam) return { error: "Live Exam not found" };

        return { data: liveExam };
    } catch (error) {
        console.error("Error fetching live exam details:", error);
        return { error: "Failed to fetch live exam" };
    }
}

export async function joinLiveExam(liveExamId: string) {
    try {
        const userId = await getUserId();
        if (!userId) return { error: "Unauthorized" };

        const liveExam = await prisma.liveExam.findUnique({
            where: { id: liveExamId }
        });

        if (!liveExam) return { error: "Live Exam not found" };

        const now = new Date();
        if (now < liveExam.startTime) {
            return { error: "Exam has not started yet" };
        }
        if (now > liveExam.endTime) {
            return { error: "Exam has already ended" };
        }

        const participant = await prisma.liveExamParticipant.upsert({
            where: {
                liveExamId_userId: {
                    liveExamId,
                    userId
                }
            },
            update: {},
            create: {
                liveExamId,
                userId
            }
        });

        return { data: participant };
    } catch (error) {
        console.error("Error joining live exam:", error);
        return { error: "Failed to join live exam" };
    }
}

export async function submitLiveExam(liveExamId: string, answers: Record<string, string>) {
    try {
        const userId = await getUserId();
        if (!userId) return { error: "Unauthorized" };

        const liveExam = await prisma.liveExam.findUnique({
            where: { id: liveExamId },
            include: {
                mockTest: {
                    include: { questions: true }
                }
            }
        });

        if (!liveExam) return { error: "Live Exam not found" };

        // Even if exam is over, we might allow submission slightly after or exactly at end time.
        // But let's prevent submission if already submitted.
        const participant = await prisma.liveExamParticipant.findUnique({
             where: {
                liveExamId_userId: { liveExamId, userId }
            }
        });

        if (!participant) return { error: "Not a participant" };
        if (participant.submittedAt) return { error: "Already submitted" };

        // Calculate score
        let score = 0;
        let totalMarks = liveExam.mockTest.questions.length;
        
        liveExam.mockTest.questions.forEach((q) => {
            if (answers[q.id] === q.correctAnswer) {
                score++;
            }
        });

        const updatedParticipant = await prisma.liveExamParticipant.update({
             where: {
                liveExamId_userId: { liveExamId, userId }
            },
            data: {
                score,
                totalMarks,
                answers,
                submittedAt: new Date()
            }
        });

        return { data: updatedParticipant };

    } catch (error) {
         console.error("Error submitting live exam:", error);
         return { error: "Failed to submit live exam" };
    }
}

export async function getLiveExamLeaderboard(liveExamId: string) {
    try {
         const liveExam = await prisma.liveExam.findUnique({
            where: { id: liveExamId }
        });

        if (!liveExam) return { error: "Live Exam not found" };

        const now = new Date();
        const leaderboardTime = new Date(liveExam.endTime.getTime() + 30 * 60000); // 30 mins after end time

        if (now < leaderboardTime) {
            return {
                error: "Leaderboard not available yet",
                availableAt: leaderboardTime
            };
        }

        const participants = await prisma.liveExamParticipant.findMany({
            where: { liveExamId },
            orderBy: [
                { score: 'desc' },
                { submittedAt: 'asc' }
            ],
            include: {
                user: { select: { id: true, name: true, email: true, image: true } }
            }
        });

        return { data: participants };
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        return { error: "Failed to fetch leaderboard" };
    }
}

export async function getLiveExamReview(liveExamId: string) {
    try {
        const userId = await getUserId();
        if (!userId) return { error: "Unauthorized" };

        const liveExam = await prisma.liveExam.findUnique({
             where: { id: liveExamId },
             include: {
                mockTest: {
                    include: { questions: true }
                }
            }
        });

        if (!liveExam) return { error: "Live Exam not found" };

        const participant = await prisma.liveExamParticipant.findUnique({
            where: {
               liveExamId_userId: { liveExamId, userId }
           }
       });

       if (!participant) return { error: "Not a participant" };

       // Need to make sure exam has ended to view review
       if (new Date() < liveExam.endTime) {
           return { error: "Exam has not ended yet" };
       }

       return { 
           data: {
               participant,
               questions: liveExam.mockTest.questions
           }
       };

    } catch (error) {
         console.error("Error fetching review:", error);
         return { error: "Failed to fetch exam review" };
    }
}
