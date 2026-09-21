const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres.vzuancaembgyocvjtuww:ITPcdukSI6SD6nE5@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
    }
  }
});

async function main() {
  try {
    console.log("Adding url column...");
    await prisma.$executeRawUnsafe(`ALTER TABLE "Campaign" ADD COLUMN IF NOT EXISTS "url" TEXT NOT NULL DEFAULT 'https://www.gofundme.com';`);
    console.log("Column added successfully!");
    
    // Seed it too
    console.log("Deleting old campaigns...");
    await prisma.campaign.deleteMany({});
    
    const campaigns = [
      {
        id: 'gfm-luna',
        name: "Help Save My Dog and Rebuild My Life",
        shelter: "Carla Ianni",
        goal: 5000,
        raised: 0,
        image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1000&auto=format&fit=crop",
        url: "https://www.gofundme.com/f/help-save-my-dog-luna-and-rebuild-my-life"
      },
      {
        id: 'gfm-maxwheel',
        name: "Emergency Vet Fund: Serious Dental",
        shelter: "Jaida Aliyah",
        goal: 2000,
        raised: 0,
        image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop",
        url: "https://www.gofundme.com/f/emergency-vet-fund-help-save-my-dog-from-a-serious-dental-a"
      },
      {
        id: 'gfm-edisurg',
        name: "Help save my dog (Laura Ruiz)",
        shelter: "Laura Lara Ruiz",
        goal: 1500,
        raised: 0,
        image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1000&auto=format&fit=crop",
        url: "https://www.gofundme.com/f/help-save-my-dog-luna"
      }
    ];

    for (const camp of campaigns) {
      await prisma.campaign.create({ data: camp });
      console.log(`Added ${camp.name}`);
    }
    
    console.log("Done seeding!");
  } catch(e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}
main();
