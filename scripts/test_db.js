
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    const result = await prisma.$queryRaw`SELECT 1 as connected`;
    console.log("DB Connection Success:", result);
    const users = await prisma.user.count();
    console.log("User count:", users);
    const admin = await prisma.user.findUnique({ where: { email: 'admin@bloggerpro.com' } });
    console.log("Admin exists:", !!admin);
  } catch (e) {
    console.error("DB Connection Failed:", e.message);
  } finally {
    await prisma.$disconnect();
  }
}

test();
