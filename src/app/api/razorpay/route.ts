import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { getSessionFromRequest } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Initialize razorpay object
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_dummy_key_id',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'rzp_test_dummy_key_secret',
});

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }

    const body = await req.json();
    const { currency = 'INR', planId, couponCode } = body;

    // Check planId
    if (!planId) {
      return NextResponse.json({ success: false, error: 'planId is required' }, { status: 400 });
    }

    // Securely look up the amount based on planId
    let amount = 0;
    
    // First try database
    const dbPlan = await prisma.plan.findUnique({
      where: { name: planId }
    });
    
    if (dbPlan) {
      amount = dbPlan.price;
    } else {
      // Fallbacks matching pricing.json
      if (planId === 'Pro' || planId === 'pro') amount = 299;
      else if (planId === 'Elite' || planId === 'elite' || planId === 'Premium' || planId === 'premium') amount = 499;
      else {
        return NextResponse.json({ success: false, error: 'Invalid planId' }, { status: 400 });
      }
    }

    if (amount <= 0) {
      return NextResponse.json({ success: false, error: 'Invalid plan amount' }, { status: 400 });
    }

    let appliedCouponId = null;
    let finalAmount = amount;

    // Verify and apply coupon if provided
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode.toUpperCase() }
      });
      if (coupon && coupon.isActive && (!coupon.expiresAt || new Date(coupon.expiresAt) > new Date())) {
        const discountAmount = Math.floor((amount * coupon.discountPercent) / 100);
        finalAmount = amount - discountAmount;
        appliedCouponId = coupon.id;
      }
    }

    // Ensure final amount is strictly > 0 for Razorpay
    if (finalAmount <= 0) {
      return NextResponse.json({ success: false, error: 'Invalid final amount' }, { status: 400 });
    }

    // Create a PENDING PaymentHistory record
    const paymentRecord = await prisma.paymentHistory.create({
      data: {
        userId: session.userId,
        planId: planId,
        amount: finalAmount,
        couponId: appliedCouponId,
        status: "PENDING"
      }
    });

    const options = {
      amount: finalAmount * 100, // amount in the smallest currency unit (e.g. paise)
      currency,
      receipt: 'receipt_' + Date.now(),
      notes: {
        userId: session.userId,
        planId: planId,
        paymentHistoryId: paymentRecord.id
      }
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error('Error creating razorpay order:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}
