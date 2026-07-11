import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { getSessionFromRequest } from '@/lib/auth';

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
    const { amount, currency = 'INR', planId } = body;

    // Check amount
    if (!amount || !planId) {
      return NextResponse.json({ success: false, error: 'Amount and planId are required' }, { status: 400 });
    }

    const options = {
      amount: amount * 100, // amount in the smallest currency unit (e.g. paise)
      currency,
      receipt: 'receipt_' + Date.now(),
      notes: {
        userId: session.userId,
        planId: planId
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
