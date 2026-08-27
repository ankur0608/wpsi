import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const revalidate = 86400; // Cache for 24 hours

export async function GET() {
  try {
    const exams = await prisma.exam.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'asc' },
      include: {
        subjects: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' },
          include: {
            _count: {
              select: { notes: true }
            },
            topics: {
              where: { isActive: true },
              orderBy: { sortOrder: 'asc' },
              include: {
                _count: {
                  select: { mcqs: true }
                }
              }
            },
          },
        },
      },
    });

    const syllabuses = exams.map(exam => ({
      id: exam.id,
      name: exam.name,
      description: exam.description,
      isComingSoon: exam.isComingSoon,
      subjects: exam.subjects.map(subject => ({
        id: subject.id,
        name: subject.name,
        icon: subject.icon,
        part: subject.part,
        sortOrder: subject.sortOrder,
        isFree: subject.isFree,
        isActive: subject.isActive,
        isComingSoon: subject.isComingSoon,
        notesCount: subject._count?.notes || 0,
        topics: subject.topics.map(topic => ({
          ...topic,
          sortOrder: topic.sortOrder,
          mcqCount: topic._count?.mcqs || 0,
          _count: undefined // Remove internal _count object
        }))
      }))
    }));

    if (syllabuses.length === 0) {
      // Return default Exams syllabus structure
      const defaultSyllabus = {
        id: 'exam_2025',
        name: 'Exam 2025',
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


