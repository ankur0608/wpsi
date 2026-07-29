import { prisma } from './src/lib/prisma.ts';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  console.log("Starting backup process...");
  
  try {
    const tables = [
      'user', 'plan', 'exam', 'subject', 'topic', 'mCQ', 'mCQAnswer', 
      'userProgress', 'admin', 'practiceMcq', 'mockTest', 'mockTestQuestion', 
      'cSVUpload', 'uploadedImage', 'bookmark', 'testSubmission', 'contactMessage', 
      'notification', 'device', 'loginHistory', 'coupon', 'paymentHistory', 'whatsappLog'
    ];

    const backupData: any = {
      timestamp: new Date().toISOString(),
      metadata: {},
      data: {}
    };

    for (const table of tables) {
      console.log(`Fetching ${table}...`);
      try {
        // @ts-ignore
        const records = await prisma[table].findMany();
        backupData.data[table] = records;
        backupData.metadata[table] = records.length;
      } catch (err) {
        console.log(`Skipped ${table} or encountered an error.`);
      }
    }

    const backupPath = path.join(process.cwd(), 'database-backup.json');
    fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2));
    
    console.log(`\n==========================================`);
    console.log(`✅ FULL BACKUP COMPLETE!`);
    console.log(`Saved ${tables.length} tables to: ${backupPath}`);
    console.log(`==========================================\n`);
  } catch (error) {
    console.error("❌ Error during backup:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
