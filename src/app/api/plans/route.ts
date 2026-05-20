import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const plans = await prisma.plan.findMany({
      orderBy: { price: 'asc' },
    });

    if (plans.length === 0) {
      // Return default plans if none exist
      const defaultPlans = [
        {
          name: 'Free',
          price: 0,
          description: 'Get started with basic features',
          features: ['Access to limited MCQs', 'Basic progress tracking'],
          isPopular: false,
        },
        {
          name: 'Pro',
          price: 249,
          description: 'Unlock full WPSI 2025 combo',
          features: [
            'Part A + B full access',
            'Unlimited mock tests',
            'Progress analytics',
            'Expert solutions',
            'Priority support',
          ],
          isPopular: true,
        },
        {
          name: 'Premium',
          price: 499,
          description: 'Complete exam preparation',
          features: [
            'Everything in Pro',
            '1-on-1 doubt clearing',
            'Custom study plans',
            'Weekly webinars',
            'Certificate of completion',
          ],
          isPopular: false,
        },
      ];

      return NextResponse.json({ data: defaultPlans }, { status: 200 });
    }

    return NextResponse.json({ data: plans }, { status: 200 });
  } catch (error) {
    console.error('Error fetching plans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch plans' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, price, description, features, isPopular } = body;

    const plan = await prisma.plan.create({
      data: {
        name,
        price,
        description,
        features,
        isPopular,
      },
    });

    return NextResponse.json({ data: plan }, { status: 201 });
  } catch (error) {
    console.error('Error creating plan:', error);
    return NextResponse.json(
      { error: 'Failed to create plan' },
      { status: 500 }
    );
  }
}
