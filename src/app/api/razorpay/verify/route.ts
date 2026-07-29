import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';
import Razorpay from 'razorpay';

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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET || 'rzp_test_dummy_key_secret';

    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest('hex');

    if (digest !== razorpay_signature) {
      return NextResponse.json({ success: false, error: 'Invalid signature' }, { status: 400 });
    }

    // Securely fetch the order from Razorpay to get the actual planId that was paid for
    const order = await razorpay.orders.fetch(razorpay_order_id);
    
    if (!order || !order.notes || !order.notes.planId) {
      return NextResponse.json({ success: false, error: 'Invalid order data from Razorpay' }, { status: 400 });
    }

    const securePlanId = order.notes.planId as string;
    const paymentHistoryId = order.notes.paymentHistoryId as string;

    // Optional: Double check if the user matches
    if (order.notes.userId !== session.userId) {
       return NextResponse.json({ success: false, error: 'Payment does not belong to this user' }, { status: 403 });
    }

    // Update user's plan in the database using the securePlanId
    await prisma.user.update({
      where: { id: session.userId },
      data: { planType: securePlanId }
    });

    if (paymentHistoryId) {
      const paymentHistory = await prisma.paymentHistory.update({
        where: { id: paymentHistoryId },
        data: {
          status: 'SUCCESS',
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id
        }
      });

      if (paymentHistory.couponId) {
        await prisma.coupon.update({
          where: { id: paymentHistory.couponId },
          data: { usedCount: { increment: 1 } }
        });
      }
    }

    // Process Referral Reward
    const appliedReferralCode = order.notes.referralCode as string;
    if (appliedReferralCode) {
      const referrerUser = await prisma.user.findUnique({
        where: { referralCode: appliedReferralCode }
      });

      if (referrerUser && referrerUser.id !== session.userId) {
        // Increment referral count
        const updatedReferrer = await prisma.user.update({
          where: { id: referrerUser.id },
          data: { referralCount: { increment: 1 } }
        });

        const count = updatedReferrer.referralCount;
        
        let rewardDiscount = 0;
        if (count === 1) rewardDiscount = 50;
        else if (count === 2) rewardDiscount = 75;
        else if (count >= 3) rewardDiscount = 100;

        if (rewardDiscount > 0) {
          const rewardCode = `REWARD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
          await prisma.coupon.create({
            data: {
              code: rewardCode,
              discountPercent: rewardDiscount,
              maxUses: 1,
              referrerId: referrerUser.id
            }
          });
        }
      }
    }

    return NextResponse.json({ success: true, message: 'Payment verified successfully', planId: securePlanId });
  } catch (error: any) {
    console.error('Error verifying razorpay payment:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
}
