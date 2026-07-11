import { SignJWT, jwtVerify } from 'jose';
import type { NextRequest, NextResponse } from 'next/server';

export const SESSION_COOKIE_NAME = 'wpsi_session';
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7;

interface SessionPayload {
  userId: string;
  expiresAt: number;
  [key: string]: unknown;
}

function getAuthSecret() {
  const secret = process.env.AUTH_SESSION_SECRET;

  if (secret) {
    return secret;
  }

  if (process.env.NODE_ENV !== 'production') {
    return 'dev-only-auth-secret-change-me';
  }

  throw new Error('AUTH_SESSION_SECRET is required in production.');
}

// Convert secret string to Uint8Array for jose
const getEncodedSecret = () => new TextEncoder().encode(getAuthSecret());

export async function createSessionToken(userId: string) {
  const expiresAt = Date.now() + SESSION_DURATION_MS;

  const jwt = await new SignJWT({ userId, expiresAt })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(new Date(expiresAt))
    .sign(getEncodedSecret());

  return jwt;
}

export async function verifySessionToken(token?: string | null): Promise<SessionPayload | null> {
  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, getEncodedSecret(), {
      algorithms: ['HS256'],
    });

    if (!payload.userId || typeof payload.expiresAt !== 'number' || payload.expiresAt <= Date.now()) {
      return null;
    }

    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function getSessionFromRequest(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  return await verifySessionToken(token);
}

export async function setSessionCookie(response: NextResponse, userId: string) {
  const token = await createSessionToken(userId);
  const payload = await verifySessionToken(token);

  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: payload ? new Date(payload.expiresAt) : undefined,
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
}

export const publicUserSelect = {
  id: true,
  email: true,
  name: true,
  image: true,
  planType: true,
  level: true,
  xp: true,
  coins: true,
  streak: true,
  bestStreak: true,
  totalStudyDays: true,
  createdAt: true,
} as const;

// --- Reset Token Logic ---
export async function createResetToken(email: string) {
  const expiresAt = Date.now() + 1000 * 60 * 15; // 15 mins expiration
  const jwt = await new SignJWT({ email, expiresAt })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(new Date(expiresAt))
    .sign(getEncodedSecret());
    
  return jwt;
}

export async function verifyResetToken(token: string): Promise<string | null> {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getEncodedSecret(), {
      algorithms: ['HS256'],
    });

    if (!payload.email || typeof payload.expiresAt !== 'number' || payload.expiresAt <= Date.now()) {
      return null;
    }

    return payload.email as string;
  } catch {
    return null;
  }
}
