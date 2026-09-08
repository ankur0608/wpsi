import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest, publicUserSelect, clearSessionCookie } from '@/lib/auth';

async function computeUserPlans(user: any) {
  const payments = await prisma.paymentHistory.findMany({
    where: { userId: user.id, status: 'SUCCESS' },
    select: { examId: true, planId: true }
  });

  const planHierarchy: Record<string, number> = { 'elite': 3, 'pro_notespass': 2, 'pro': 1, 'notespass': 0, 'free': -1 };
  const examPlans: Record<string, string> = {};
  
  // Legacy or globally assigned plan
  const legacyPlan = user.planType && user.planType !== 'free' ? user.planType.toLowerCase() : 'free';
  const legacyPlanRank = planHierarchy[legacyPlan] ?? -1;

  for (const payment of payments) {
    if (!payment.examId) continue;
    const pid = payment.planId.toLowerCase();
    const currentBest = examPlans[payment.examId] || 'free';
    if ((planHierarchy[pid] ?? -1) > (planHierarchy[currentBest] ?? -1)) {
      examPlans[payment.examId] = pid;
    }
  }

  let activePlanType = legacyPlan;

  if (user.examId) {
    const examSpecificPlan = examPlans[user.examId] || 'free';
    const examSpecificRank = planHierarchy[examSpecificPlan] ?? -1;
    // The active plan is the best of their legacy global plan or exam-specific plan
    activePlanType = examSpecificRank > legacyPlanRank ? examSpecificPlan : legacyPlan;
  }

  return {
    ...user,
    planType: activePlanType,
    examPlans: examPlans
  };
}

export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);

    if (!session) {
      const response = NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
      clearSessionCookie(response);
      return response;
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: publicUserSelect,
    });

    if (!user) {
      const response = NextResponse.json(
        { error: 'User not found' },
        { status: 401 }
      );
      clearSessionCookie(response);
      return response;
    }

    const finalUser = await computeUserPlans(user);

    return NextResponse.json({ data: finalUser }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);

    if (!session) {
      const response = NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
      clearSessionCookie(response);
      return response;
    }

    const body = await request.json();
    const { name, email, mobile, birthdate, gender, xp, coins, streak, level, examId } = body;
    const normalizedName = typeof name === 'string' ? name.trim() : undefined;
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : undefined;
    const normalizedMobile = typeof mobile === 'string' ? mobile.trim() : undefined;

    if (email !== undefined && !normalizedEmail) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (normalizedEmail) {
      const existingUser = await prisma.user.findUnique({
        where: { email: normalizedEmail },
        select: { id: true },
      });

      if (existingUser && existingUser.id !== session.userId) {
        return NextResponse.json(
          { error: 'Email is already in use' },
          { status: 409 }
        );
      }
    }

    if (normalizedMobile) {
      const existingUserWithMobile = await prisma.user.findUnique({
        where: { mobile: normalizedMobile },
        select: { id: true },
      });

      if (existingUserWithMobile && existingUserWithMobile.id !== session.userId) {
        return NextResponse.json(
          { error: 'Mobile number is already in use' },
          { status: 409 }
        );
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.userId },
      data: {
        ...(name !== undefined ? { name: normalizedName || null } : {}),
        ...(normalizedEmail ? { email: normalizedEmail } : {}),
        ...(normalizedMobile ? { mobile: normalizedMobile } : {}),
        ...(birthdate !== undefined ? { birthdate: birthdate ? new Date(birthdate) : null } : {}),
        ...(gender !== undefined ? { gender: gender || null } : {}),
        ...(xp !== undefined && { xp }),
        ...(coins !== undefined && { coins }),
        ...(level !== undefined && { level }),
        ...(examId !== undefined && { 
          examId,
          exams: {
            connect: { id: examId }
          }
        }),
      },
      select: publicUserSelect,
    });

    const finalUser = await computeUserPlans(updatedUser);

    return NextResponse.json({ data: finalUser }, { status: 200 });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { error: 'Failed to update user profile' },
      { status: 500 }
    );
  }
}
