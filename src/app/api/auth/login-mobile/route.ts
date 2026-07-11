import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { setSessionCookie, publicUserSelect } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { mobile } = await req.json();
    const normalizedMobile = typeof mobile === 'string' ? mobile.trim() : '';

    if (!normalizedMobile) {
      return NextResponse.json(
        { error: 'Mobile number is required' },
        { status: 400 }
      );
    }

    // Verify that the mobile number was successfully verified via OTP
    const verifiedMobileCookie = req.cookies.get('verified_mobile');

    if (!verifiedMobileCookie || verifiedMobileCookie.value !== normalizedMobile) {
      return NextResponse.json(
        { error: 'Mobile number not verified or verification expired' },
        { status: 401 }
      );
    }

    // Find the user by mobile number
    const user = await prisma.user.findFirst({
      where: { mobile: normalizedMobile },
      select: publicUserSelect,
    });

    if (!user) {
      return NextResponse.json(
        { error: 'No account found with this mobile number. Please register.' },
        { status: 404 }
      );
    }

    const response = NextResponse.json({
      message: 'Login successful',
      user
    });

    // Create session and set cookie
    await setSessionCookie(response, user.id);
    
    // Clear the verified_mobile cookie as it's no longer needed
    response.cookies.delete('verified_mobile');

    return response;

  } catch (error) {
    console.error('Mobile login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
