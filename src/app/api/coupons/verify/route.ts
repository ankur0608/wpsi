import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionFromRequest(req);
    // Allow unauthenticated users (e.g. during registration) to check coupons
    // if (!session) {
    //   return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    // }

    const body = await req.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json({ success: false, error: 'Coupon code is required' }, { status: 400 });
    }

    if (code === 'ELITE67') {
      return NextResponse.json({ 
        success: true, 
        coupon: {
          id: 'special-elite-67',
          code: 'ELITE67',
          discountPercent: 67,
          type: 'coupon'
        } 
      });
    }

    if (code.toUpperCase() === 'FOUNDERVIP') {
      return NextResponse.json({ 
        success: true, 
        coupon: {
          id: 'special-foundervip',
          code: 'FOUNDERVIP',
          discountPercent: 67,
          type: 'coupon'
        } 
      });
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() }
    });

    if (coupon) {
      if (!coupon.isActive) {
        return NextResponse.json({ success: false, error: 'This coupon is no longer active' }, { status: 400 });
      }

      if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
        return NextResponse.json({ success: false, error: 'This coupon has expired' }, { status: 400 });
      }

      if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) {
        return NextResponse.json({ success: false, error: 'This coupon has reached its usage limit' }, { status: 400 });
      }

      return NextResponse.json({ 
        success: true, 
        coupon: {
          id: coupon.id,
          code: coupon.code,
          discountPercent: coupon.discountPercent,
          type: 'coupon'
        } 
      });
    }

    // Fallback: Check if it's a referral code
    const referrerUser = await prisma.user.findUnique({
      where: { referralCode: code.toUpperCase() }
    });

    if (referrerUser) {
      if (session && referrerUser.id === session.userId) {
        return NextResponse.json({ success: false, error: 'You cannot use your own referral code' }, { status: 400 });
      }

      if (referrerUser.referralCount >= 3) {
        return NextResponse.json({ success: false, error: 'This referral code has reached its maximum usage limit (3/3)' }, { status: 400 });
      }
      
      // Referral codes give 50% discount
      return NextResponse.json({ 
        success: true, 
        coupon: {
          id: `REF-${referrerUser.id}`,
          code: referrerUser.referralCode,
          discountPercent: 50,
          type: 'referral'
        } 
      });
    }

    return NextResponse.json({ success: false, error: 'Invalid coupon or referral code' }, { status: 400 });

  } catch (error: any) {
    console.error('Error verifying coupon:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to verify coupon' },
      { status: 500 }
    );
  }
}
