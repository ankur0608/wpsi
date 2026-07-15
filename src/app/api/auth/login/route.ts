import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { setSessionCookie } from '@/lib/auth';
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

    if (!isValidPassword) {
      await prisma.loginHistory.create({
        data: {
            userId: user.id,
            deviceId: deviceId || null,
            ip,
            status: "FAILED",
            browser: browser || null,
            os: os || null
        }
      });
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    if (deviceId) {
        const userDevices = await prisma.device.findMany({
            where: { userId: user.id }
        });
        
        const existingDevice = userDevices.find(d => d.deviceId === deviceId);
        
        if (userDevices.length > 0 && !existingDevice) {
            if (force) {
                await prisma.device.deleteMany({ where: { userId: user.id } });
            } else {
                const activeDevice = userDevices[0];
                await prisma.loginHistory.create({
                    data: { userId: user.id, deviceId, ip, status: "BLOCKED_DEVICE", browser, os }
                });
                return NextResponse.json(
                    { 
                        error: 'ACTIVE_DEVICE', 
                        message: 'Your account is already linked to another device.',
                        activeDevice: {
                            browser: activeDevice.browser,
                            os: activeDevice.os,
                            lastLogin: activeDevice.lastLogin
                        }
                    },
                    { status: 409 }
                );
            }
        }
        
        if (existingDevice) {
            await prisma.device.update({
                where: { id: existingDevice.id },
                data: { lastLogin: new Date(), lastIp: ip }
            });
        } else {
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
