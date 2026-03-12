
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function testAuth() {
  const email = 'admin@bloggerpro.com';
  const password = 'admin123';

  try {
    console.log(`[TEST] Fetching user: ${email}`);
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      console.log("[TEST] User NOT FOUND in database.");
      return;
    }

    if (!user.password) {
      console.log("[TEST] User has NO PASSWORD set.");
      return;
    }

    console.log("[TEST] User found. Attempting bcryptjs comparison...");
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (isMatch) {
      console.log("[TEST] ✅ SUCCESS: Password matches hash in database.");
    } else {
      console.log("[TEST] ❌ FAILURE: Password does NOT match. The hash might have been created with a different library or version.");
      console.log("[TEST] DB Hash preview:", user.password.substring(0, 10) + "...");
    }

  } catch (error) {
    console.error("[TEST] Error during auth test:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testAuth();
