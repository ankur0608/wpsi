require('dotenv').config();
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function backup() {
  console.log('Backing up User data...');
  try {
    const users = await prisma.user.findMany();
    fs.writeFileSync('users_backup.json', JSON.stringify(users, null, 2));
    console.log(`Successfully backed up ${users.length} users to users_backup.json!`);

    const models = [
      'plan', 'exam', 'subject', 'topic', 'mCQ', 'mCQAnswer', 'userProgress',
      'admin', 'practiceMcq', 'mockTest', 'mockTestQuestion', 'uploadedImage',
      'bookmark', 'testSubmission', 'contactMessage', 'notification', 'device',
      'loginHistory', 'coupon', 'paymentHistory', 'whatsappLog', 'note',
      'noteSection', 'liveExam', 'liveExamParticipant', 'challenge',
      'challengeRule', 'challengeQuestion', 'challengeParticipant', 'challengeDispute'
    ];

    const data = { User: users };
    for (const m of models) {
      try {
        if (prisma[m] && typeof prisma[m].findMany === 'function') {
          data[m] = await prisma[m].findMany();
          console.log(`- Backed up ${m}: ${data[m].length} records`);
        }
      } catch (err) {
        console.warn(`- Skipping ${m} due to schema mismatch: ${err.message}`);
      }
    }
    fs.writeFileSync('database_backup.json', JSON.stringify(data, null, 2));
    console.log('Saved all accessible tables to database_backup.json');
  } catch (e) {
    console.error('Fatal backup error:', e);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

backup();
