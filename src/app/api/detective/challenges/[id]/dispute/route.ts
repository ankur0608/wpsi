import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const payload = await verifySessionToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    console.log('--- Dispute API Called ---');
    const body = await req.json();
    console.log('Dispute Body:', body);
    const { mcqId, suggestedKey, reason } = body;
    
    if (!mcqId || !suggestedKey) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    const dispute = await prisma.challengeDispute.create({
      data: {
        challengeId: (await params).id,
        mcqId,
        userId: payload.userId as string,
        suggestedKey,
        reason: reason || null,
        status: "PENDING"
      }
    });
    
    return NextResponse.json({ success: true, dispute });
  } catch (error: any) {
    console.error("Dispute API Error:", error);
    return NextResponse.json({ error: error?.message || "Internal Server Error" }, { status: 500 });
  }
}


