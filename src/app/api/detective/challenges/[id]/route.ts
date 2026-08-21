import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const { id } = params;

    const challenge = await prisma.challenge.findUnique({
      where: { id },
      include: {
        _count: {
          select: { participants: true, questions: true }
        },
        questions: {
          include: {
            mcq: {
              select: {
                id: true,
                question: true,
                optionA: true,
                optionB: true,
                optionC: true,
                optionD: true,
                imageUrl: true,
                difficulty: true,
                topic: {
                  select: { name: true, subject: { select: { name: true } } }
                }
              }
            }
          }
        }
      }
    });

    if (!challenge) {
      return NextResponse.json(
        { success: false, error: "Challenge not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: challenge });
  } catch (error) {
    console.error("Error fetching challenge details:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch challenge details" },
      { status: 500 }
    );
  }
}
