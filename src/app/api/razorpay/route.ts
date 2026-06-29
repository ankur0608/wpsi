import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// Initialize razorpay object
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy_key_id',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'rzp_test_dummy_key_secret',
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, currency = 'INR', receipt = 'receipt_' + Date.now() } = body;

    // Check amount
    if (!amount) {
      return NextResponse.json({ success: false, error: 'Amount is required' }, { status: 400 });
    }

    const options = {
      amount: amount * 100, // amount in the smallest currency unit (e.g. paise)
      currency,
      receipt,
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
