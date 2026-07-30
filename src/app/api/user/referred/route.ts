import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { referralCode: true }
    });

    if (!user || !user.referralCode) {
      return NextResponse.json({ success: false, error: 'User not found or no referral code' }, { status: 404 });
    }

    const referredUsers = await prisma.user.findMany({
      where: { referredBy: user.referralCode },
      select: {
        id: true,
        name: true,
        createdAt: true,
        planType: true,
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ 
      success: true, 
      referredUsers 
    });

  } catch (error: any) {
    console.error('Error fetching referred users:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch referred users' },
      { status: 500 }
    );
  }
}
