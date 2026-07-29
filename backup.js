const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const backupPath = path.join(__dirname, 'database-backup.json');

  // Check if backup already exists for today
  if (fs.existsSync(backupPath)) {
    const stats = fs.statSync(backupPath);
    const lastModified = new Date(stats.mtime);
    const now = new Date();
    
    // If it's the same day, don't run again
    if (
      lastModified.getFullYear() === now.getFullYear() &&
      lastModified.getMonth() === now.getMonth() &&
      lastModified.getDate() === now.getDate()
    ) {
      console.log("✅ Local backup already performed today. Skipping backup...");
      return;
    }
  }

  console.log("Starting daily local backup process...");
  
  try {
    const tables = [
      'user', 'plan', 'exam', 'subject', 'topic', 'mCQ', 'mCQAnswer', 
      'userProgress', 'admin', 'practiceMcq', 'mockTest', 'mockTestQuestion', 
      'cSVUpload', 'uploadedImage', 'bookmark', 'testSubmission', 'contactMessage', 
      'notification', 'device', 'loginHistory', 'coupon', 'paymentHistory', 'whatsappLog'
    ];

    const backupData = {
      timestamp: new Date().toISOString(),
      metadata: {},
      data: {}
    };

    for (const table of tables) {
      console.log(`Fetching ${table}...`);
      try {
        const records = await prisma[table].findMany();
        backupData.data[table] = records;
        backupData.metadata[table] = records.length;
      } catch (err) {
        console.log(`Skipped ${table} or encountered an error.`);
      }
    }

    fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2));
    
    console.log(`\n==========================================`);
    console.log(`✅ FULL BACKUP COMPLETE!`);
    console.log(`Saved ${tables.length} tables to: ${backupPath}`);
    console.log(`==========================================\n`);
  } catch (error) {
    console.error("❌ Error during backup:", error);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
