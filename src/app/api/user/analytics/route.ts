import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);

    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const userId = session.userId;

    // Fetch all answers for the user to compute granular analytics
    const answers = await prisma.mCQAnswer.findMany({
      where: { userId },
      include: {
        mcq: {
          select: {
            difficulty: true,
            topic: {
              select: {
                id: true,
                name: true,
                subject: {
                  select: {
                    id: true,
                    name: true,
                    icon: true,
                  }
                }
              }
            }
          }
        }
      }
    });

    // Fetch mock tests
    const mocks = await prisma.testSubmission.findMany({
      where: { userId },
    });

    // 1. Basic Stats
    const questionsSolved = answers.length;
    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const averageAccuracy = questionsSolved > 0 ? Math.round((correctAnswers / questionsSolved) * 100) : 0;
    const mocksTaken = mocks.length;
    const avgMockScore = mocks.length > 0 ? Math.round(mocks.reduce((sum, m) => sum + m.percentage, 0) / mocks.length) : 0;

    // We don't have study hours natively, we'll approximate based on 30s per question
    const estimatedStudyHours = Math.round((questionsSolved * 30) / 3600);
    const questionsPerHour = estimatedStudyHours > 0 ? Math.round(questionsSolved / estimatedStudyHours) : 0;

    // 2. Process Subjects, Topics, and Difficulty
    let easyTotal = 0, easyCorrect = 0;
    let medTotal = 0, medCorrect = 0;
    let hardTotal = 0, hardCorrect = 0;

    const subjectsCache = new Map<string, any>();

    answers.forEach(ans => {
      const isCorrect = ans.isCorrect;
      
      // Difficulty
      const diff = ans.mcq?.difficulty?.toLowerCase() || 'medium';
      if (diff === 'easy') {
        easyTotal++;
        if (isCorrect) easyCorrect++;
      } else if (diff === 'hard') {
        hardTotal++;
        if (isCorrect) hardCorrect++;
      } else {
        medTotal++;
        if (isCorrect) medCorrect++;
      }

      // Subjects & Topics
      const subject = ans.mcq?.topic?.subject;
      const topic = ans.mcq?.topic;

      if (subject && topic) {
        if (!subjectsCache.has(subject.id)) {
          subjectsCache.set(subject.id, {
            id: subject.id,
            name: subject.name,
            icon: subject.icon || '📚',
            attempted: 0,
            correct: 0,
            topicsMap: new Map<string, any>()
          });
        }

        const subjData = subjectsCache.get(subject.id);
        subjData.attempted++;
        if (isCorrect) subjData.correct++;

        if (!subjData.topicsMap.has(topic.id)) {
          subjData.topicsMap.set(topic.id, {
            id: topic.id,
            name: topic.name,
            subjectName: subject.name,
            attempted: 0,
            correct: 0
          });
        }

        const topicData = subjData.topicsMap.get(topic.id);
        topicData.attempted++;
        if (isCorrect) topicData.correct++;
      }
    });

    // Formatting Subjects Data
    const formattedSubjects = Array.from(subjectsCache.values()).map(subj => {
      const subjAccuracy = subj.attempted > 0 ? Math.round((subj.correct / subj.attempted) * 100) : 0;
      let label = 'Average';
      if (subjAccuracy >= 80) label = 'Strong';
      else if (subjAccuracy < 60) label = 'Weak';

      const topics = Array.from(subj.topicsMap.values()).map((t: any) => ({
        name: t.name,
        subjectName: t.subjectName,
        attempted: t.attempted,
        correct: t.correct,
        accuracy: t.attempted > 0 ? Math.round((t.correct / t.attempted) * 100) : 0
      })).sort((a, b) => b.attempted - a.attempted);

      return {
        id: subj.id,
        name: subj.name,
        icon: subj.icon,
        attempted: subj.attempted,
        correct: subj.correct,
        accuracy: subjAccuracy,
        label,
        topics
      };
    }).sort((a, b) => b.attempted - a.attempted); // sort by most attempted

    // Extract all topics across all subjects to find weak/strong areas
    const allTopics: any[] = [];
    formattedSubjects.forEach(s => allTopics.push(...s.topics));

    // Filter to topics with at least 5 attempts to avoid skewed 0/1 or 1/1 stats
    const eligibleTopics = allTopics.filter(t => t.attempted >= 5);
    
    // Sort ascending by accuracy for weak topics
    const weakTopics = [...eligibleTopics].sort((a, b) => a.accuracy - b.accuracy).slice(0, 4);
    // Sort descending by accuracy for strong topics
    const strongTopics = [...eligibleTopics].sort((a, b) => b.accuracy - a.accuracy).slice(0, 4);

    return NextResponse.json({
      success: true,
      data: {
        performance: {
          questionsSolved,
          correctAnswers,
          averageAccuracy,
          estimatedStudyHours,
          questionsPerHour,
          mocksTaken,
          avgMockScore
        },
        difficulty: {
          easy: { attempted: easyTotal, accuracy: easyTotal > 0 ? Math.round((easyCorrect/easyTotal)*100) : 0 },
          medium: { attempted: medTotal, accuracy: medTotal > 0 ? Math.round((medCorrect/medTotal)*100) : 0 },
          hard: { attempted: hardTotal, accuracy: hardTotal > 0 ? Math.round((hardCorrect/hardTotal)*100) : 0 },
        },
        subjects: formattedSubjects,
        weakTopics,
        strongTopics
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching full analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
