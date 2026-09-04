import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { setSessionCookie, publicUserSelect } from '@/lib/auth';
import { authRateLimiter } from '@/lib/rate-limit';
import { authService } from '@/lib/authService';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1';
    
    if (!authRateLimiter.check(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const { mobile, deviceId, browser, os, deviceType, deviceModel, screen, timezone, language, force } = await req.json();
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

    if (deviceId) {
        const deviceInfo = { deviceId, ip, browser, os, deviceType, deviceModel, screen, timezone, language };
        const deviceCheck = await authService.handleDeviceTracking(user as any, force, deviceInfo);
        if (deviceCheck?.error) {
            return NextResponse.json(
                { 
                    error: deviceCheck.error, 
                    message: 'Your account is already linked to another device.',
                    activeDevice: {
                        browser: deviceCheck.activeDevice.browser,
                        os: deviceCheck.activeDevice.os,
                        lastLogin: deviceCheck.activeDevice.lastLogin
                    }
                },
                { status: 409 }
            );
        }
    }

    await prisma.loginHistory.create({
        data: {
            userId: user.id,
            deviceId: deviceId || null,
            ip,
            status: "SUCCESS",
            browser: browser || null,
            os: os || null,
            deviceModel: deviceModel || null
        }
    });

    const response = NextResponse.json({
      message: 'Login successful',
      user
    });

    // Create session and set cookie
    await setSessionCookie(response, user.id, deviceId);
    
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
