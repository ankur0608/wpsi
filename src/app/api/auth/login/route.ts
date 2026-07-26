import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { setSessionCookie } from '@/lib/auth';
import { authRateLimiter } from '@/lib/rate-limit';
import { authService } from '@/lib/authService';
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

    const { email, password, deviceId, browser, os, deviceType, screen, timezone, language, force } = await req.json();
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

    if (!normalizedEmail || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    const deviceInfo = { deviceId, ip, browser, os, deviceType, screen, timezone, language };

    if (!isValidPassword) {
      await authService.logFailedAttempt(user.id, deviceInfo);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    if (deviceId) {
      const deviceCheck = await authService.handleDeviceTracking(user.id, force, deviceInfo);
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

    await authService.logSuccessfulAttempt(user.id, deviceInfo);

    const response = NextResponse.json(
      {
        message: 'Login successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          level: user.level,
          xp: user.xp,
          coins: user.coins,
          streak: user.streak,
          planType: user.planType,
        },
      },
      { status: 200 }
    );

    await setSessionCookie(response, user.id, deviceId);

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
