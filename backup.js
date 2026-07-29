const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log("Starting backup process...");
  
  try {
    console.log("Fetching users...");
    const users = await prisma.user.findMany();
    
    console.log("Fetching coupons...");
    const coupons = await prisma.coupon.findMany();
    
    console.log("Fetching payment history...");
    const paymentHistory = await prisma.paymentHistory.findMany();

    const backupData = {
      timestamp: new Date().toISOString(),
      metadata: {
        totalUsers: users.length,
        totalCoupons: coupons.length,
        totalPayments: paymentHistory.length
      },
      data: {
        users,
        coupons,
        paymentHistory
      }
    };

    const backupPath = path.join(__dirname, 'database-backup.json');
    fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2));
    
    console.log(`\n==========================================`);
    console.log(`✅ BACKUP COMPLETE!`);
    console.log(`Saved ${users.length} users, ${coupons.length} coupons, and ${paymentHistory.length} payments.`);
    console.log(`File saved to: ${backupPath}`);
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
