const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const res = await prisma.mCQ.findMany({
      select: {
        id: true,
        topic: {
          select: {
            name: true,
            syllabus: {
              select: {
                subject: {
                  select: { name: true }
                }
              }
            }
          }
        }
      }
    });
    console.log('Success:', res.length);
  } catch (e) {
    console.error('Error:', e);
  }
}

main().finally(() => prisma.$disconnect());
