import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }

    let user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        name: true,
        referralCode: true,
        referralCount: true,
        referralCoupons: {
          where: { usedCount: 0, isActive: true },
          select: {
            id: true,
            code: true,
            discountPercent: true,
            createdAt: true
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    // Retroactively generate a referral code for existing users who don't have one
    if (!user.referralCode) {
      const cleanName = (user.name || 'USER').replace(/[^a-zA-Z0-9]/g, '').toUpperCase().substring(0, 10);
      const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
      const newReferralCode = `${cleanName}-${randomChars}`;
      
      await prisma.user.update({
        where: { id: user.id },
        data: { referralCode: newReferralCode }
      });
      
      user.referralCode = newReferralCode;
    }

    return NextResponse.json({ 
      success: true, 
      referralCode: user.referralCode,
      referralCount: user.referralCount,
      rewards: user.referralCoupons
    });

  } catch (error: any) {
    console.error('Error fetching referrals:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch referrals' },
      { status: 500 }
    );
  }
}
