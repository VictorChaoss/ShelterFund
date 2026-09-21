const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  try {
    const data = await prisma.campaign.findMany({ include: { tokens: true } });
    console.log(data);
  } catch(e) {
    console.error(e);
  }
}
main();
