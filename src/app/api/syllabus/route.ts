import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const syllabuses = await prisma.syllabus.findMany({
      include: {
        subjects: {
          include: {
            topics: true,
          },
        },
      },
    });

    if (syllabuses.length === 0) {
      // Return default WPSI syllabus structure
      const defaultSyllabus = {
        id: 'wpsi_2025',
        name: 'WPSI 2025',
        subjects: [
          {
            id: 'part_a',
            name: 'Part A: General & Aptitude',
            icon: 'fa-brain',
            topics: [
              { id: 'topic_1', name: 'Series' },
              { id: 'topic_2', name: 'Coding' },
              { id: 'topic_3', name: 'Reasoning' },
            ],
          },
          {
            id: 'part_b',
            name: 'Part B: Technical Subjects',
            icon: 'fa-microchip',
            topics: [
              { id: 'topic_4', name: 'Digital Electronics' },
              { id: 'topic_5', name: 'Communication Engineering' },
              { id: 'topic_6', name: 'Network Theory' },
              { id: 'topic_7', name: 'Electromagnetic Theory' },
            ],
          },
        ],
      };

      return NextResponse.json({ data: [defaultSyllabus] }, { status: 200 });
    }

    return NextResponse.json({ data: syllabuses }, { status: 200 });
  } catch (error) {
    console.error('Error fetching syllabuses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch syllabuses' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    const syllabus = await prisma.syllabus.create({
      data: { name },
    });

    return NextResponse.json({ data: syllabus }, { status: 201 });
  } catch (error) {
    console.error('Error creating syllabus:', error);
    return NextResponse.json(
      { error: 'Failed to create syllabus' },
      { status: 500 }
    );
  }
}
