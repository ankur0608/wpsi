import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const challenges = await prisma.challenge.findMany({
      where: {
        status: "LIVE"
      },
      include: {
        _count: {
          select: { participants: true, questions: true }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json({ success: true, data: challenges });
  } catch (error) {
    console.error("Error fetching live challenges:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch challenges" },
      { status: 500 }
    );
  }
}
