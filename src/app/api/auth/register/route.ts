import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { setSessionCookie } from '@/lib/auth';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, mobile, otp, verificationId } = await req.json();
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const normalizedName = typeof name === 'string' ? name.trim() : '';
    const normalizedMobile = typeof mobile === 'string' ? mobile.trim() : '';

    if (!normalizedEmail || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (!normalizedName) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }
    
    if (!normalizedMobile) {
       return NextResponse.json(
        { error: 'Mobile number is required' },
        { status: 400 }
      );
    }

    // Verify OTP using the cookie set by /api/auth/verify-otp
    const cookieStore = await cookies();
    const verifiedMobile = cookieStore.get('verified_mobile')?.value;

    if (!verifiedMobile || verifiedMobile !== normalizedMobile) {
       return NextResponse.json(
        { error: 'Mobile number not verified. Please verify your number first.' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
         OR: [
            { email: normalizedEmail },
            { mobile: normalizedMobile }
         ]
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email or mobile already exists' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: normalizedName,
        email: normalizedEmail,
        mobile: normalizedMobile,
        isMobileVerified: true,
        password: hashedPassword,
      },
    });

    const response = NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          level: user.level,
          xp: user.xp,
          coins: user.coins,
          streak: user.streak,
        },
      },
      { status: 201 }
    );

    setSessionCookie(response, user.id);
    
    // Clear the verified_mobile cookie
    response.cookies.delete('verified_mobile');

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
