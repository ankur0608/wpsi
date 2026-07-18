import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { setSessionCookie } from '@/lib/auth';
import { cookies } from 'next/headers';
import { authRateLimiter } from '@/lib/rate-limit';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1';
    if (!authRateLimiter.check(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const { name, email, password, mobile, deviceId, browser, os, deviceType, screen, timezone, language } = await req.json();

    if (!name || !email || !password || !mobile) {
      return NextResponse.json(
        { error: "Name, email, password, and mobile number are required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const verifiedMobile = cookieStore.get('verified_mobile')?.value;

    if (!verifiedMobile || verifiedMobile !== mobile) {
        return NextResponse.json(
            { error: "Mobile number must be verified before registration" },
            { status: 401 }
        );
    }

    // 1. Check if user with email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // 1.5 Check if user with mobile already exists
    const existingMobileUser = await prisma.user.findUnique({
      where: { mobile },
    });

    if (existingMobileUser) {
      return NextResponse.json(
        { error: "User with this mobile number already exists" },
        { status: 409 }
      );
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create the user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        mobile,
        isMobileVerified: true,
      },
    });

    if (deviceId) {
        await prisma.device.create({
            data: {
                deviceId,
                userId: user.id,
                browser,
                os,
                deviceType,
                screen,
                timezone,
                language,
                lastIp: ip
            }
        });
    }

    await prisma.loginHistory.create({
        data: {
            userId: user.id,
            deviceId: deviceId || null,
            ip,
            status: "SUCCESS",
            browser: browser || null,
            os: os || null
        }
    });

    // 4. Set session cookie for automatic login
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

    response.cookies.delete('verified_mobile');
    await setSessionCookie(response, user.id);

    return response;
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    );
  }
}
