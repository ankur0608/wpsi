import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const subjectId = searchParams.get("subjectId");

    if (!subjectId) {
      return NextResponse.json({ error: "Missing subjectId" }, { status: 400 });
    }

    const notes = await prisma.note.findMany({
      where: {
        subjectId,
        isActive: true,
      },
      orderBy: {
        sortOrder: "asc",
      },
    });

    return NextResponse.json({ data: notes }, {
      headers: {
        'Cache-Control': 'public, max-age=600, stale-while-revalidate=120',
      },
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
