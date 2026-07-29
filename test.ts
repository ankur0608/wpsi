import { prisma } from './src/lib/prisma.ts';

async function main() {
  try {
    const logs = await prisma.whatsappLog.findMany();
    console.log("Success! Records:", logs.length);
  } catch (error) {
    console.error("Error fetching whatsappLog:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
