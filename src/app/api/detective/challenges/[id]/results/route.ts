import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const { id } = params;

    // Mock authentication: pick first user for demo purposes
    const user = await prisma.user.findFirst();
    if (!user) {
      return NextResponse.json({ success: false, error: "No user found in DB" }, { status: 400 });
    }
    const userId = user.id;

    const participant = await prisma.challengeParticipant.findUnique({
      where: {
        challengeId_userId: {
          challengeId: id,
          userId
        }
      },
      include: {
        challenge: {
          include: {
            questions: {
              include: { mcq: true }
            }
          }
        }
      }
    });

    if (!participant) {
      return NextResponse.json({ success: false, error: "Result not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: participant });
  } catch (error) {
    console.error("Error fetching challenge results:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch challenge results" },
      { status: 500 }
    );
  }
}
