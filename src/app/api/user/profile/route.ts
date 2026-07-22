import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest, publicUserSelect, clearSessionCookie } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);

    if (!session) {
      const response = NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
      clearSessionCookie(response);
      return response;
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: publicUserSelect,
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);

    if (!session) {
      const response = NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
      clearSessionCookie(response);
      return response;
    }

    const body = await request.json();
    const { name, email, mobile, xp, coins, streak, level } = body;
    const normalizedName = typeof name === 'string' ? name.trim() : undefined;
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : undefined;
    const normalizedMobile = typeof mobile === 'string' ? mobile.trim() : undefined;

    if (email !== undefined && !normalizedEmail) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (normalizedEmail) {
      const existingUser = await prisma.user.findUnique({
        where: { email: normalizedEmail },
        select: { id: true },
      });

      if (existingUser && existingUser.id !== session.userId) {
        return NextResponse.json(
          { error: 'Email is already in use' },
          { status: 409 }
        );
      }
    }

    if (normalizedMobile) {
      const existingUserWithMobile = await prisma.user.findUnique({
        where: { mobile: normalizedMobile },
        select: { id: true },
      });

      if (existingUserWithMobile && existingUserWithMobile.id !== session.userId) {
        return NextResponse.json(
          { error: 'Mobile number is already in use' },
          { status: 409 }
        );
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.userId },
      data: {
        ...(name !== undefined ? { name: normalizedName || null } : {}),
        ...(normalizedEmail ? { email: normalizedEmail } : {}),
        ...(normalizedMobile ? { mobile: normalizedMobile } : {}),
        ...(xp !== undefined && { xp }),
        ...(coins !== undefined && { coins }),
        ...(streak !== undefined && { streak }),
        ...(level !== undefined && { level }),
      },
      select: publicUserSelect,
    });

    return NextResponse.json({ data: updatedUser }, { status: 200 });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { error: 'Failed to update user profile' },
      { status: 500 }
    );
  }
}
