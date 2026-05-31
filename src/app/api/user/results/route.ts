import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = getSessionFromRequest(request);

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Fetch all test submissions for the user
    const submissions = await prisma.testSubmission.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: 'desc' },
    });

    if (submissions.length === 0) {
      return NextResponse.json({
        data: {
          totalTests: 0,
          avgMarks: 0,
          avgAccuracy: 0,
          highestScore: 0,
          recentSubmissions: []
        }
      }, { status: 200 });
    }

    let totalEarnedMarks = 0;
    let totalAccuracySum = 0;
    let highestScore = 0;

    const recentSubmissions = submissions.map(sub => {
      totalEarnedMarks += sub.earnedMarks;
      totalAccuracySum += sub.percentage;
      
      if (sub.percentage > highestScore) {
        highestScore = sub.percentage;
      }

      return {
        id: sub.id,
        title: sub.title,
        date: new Date(sub.createdAt).toLocaleString('en-US', { 
          day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true 
        }),
        marks: sub.earnedMarks,
        totalMarks: sub.totalMarks,
        percentage: sub.percentage
      };
    });

    const totalTests = submissions.length;
    const avgAccuracy = totalAccuracySum / totalTests;
    const avgMarks = totalEarnedMarks / totalTests;

    return NextResponse.json({
      data: {
        totalTests,
        avgMarks,
        avgAccuracy,
        highestScore,
        recentSubmissions
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user results:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user results' },
      { status: 500 }
    );
  }
}

// Trigger rebuild
