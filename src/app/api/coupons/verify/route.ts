import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }

    const body = await req.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json({ success: false, error: 'Coupon code is required' }, { status: 400 });
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() }
    });

    if (!coupon) {
      return NextResponse.json({ success: false, error: 'Invalid coupon code' }, { status: 400 });
    }

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
        discountPercent: coupon.discountPercent
      } 
    });

  } catch (error: any) {
    console.error('Error verifying coupon:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to verify coupon' },
      { status: 500 }
    );
  }
}
