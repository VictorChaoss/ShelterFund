const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with real animal rescue campaigns...')
  
  await prisma.campaign.deleteMany({})
  
  const campaigns = [
    {
      id: 'gfm-luna',
      name: "Help Save My Dog Luna and Rebuild My Life",
      shelter: "Carla Ianni",
      goal: 5000,
      raised: 0,
      image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 'gfm-maxwheel',
      name: "Emergency Vet Fund: Serious Dental Surgery",
      shelter: "Jaida Aliyah",
      goal: 2000,
      raised: 0,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 'gfm-edisurg',
      name: "Help Save My Dog Edi's Life",
      shelter: "Laura Lara Ruiz",
      goal: 1500,
      raised: 0,
      image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 'gfm-bella-acl',
      name: "Help Bella Get Her ACL Surgery",
      shelter: "Maria Santos",
      goal: 3500,
      raised: 0,
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 'gfm-rocky-wheelchair',
      name: "Wheelchair for Rocky — Paralyzed Rescue Pup",
      shelter: "James Mitchell",
      goal: 1200,
      raised: 0,
      image: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 'gfm-daisy-chemo',
      name: "Daisy's Fight Against Cancer — Chemo Fund",
      shelter: "Sarah Chen",
      goal: 8000,
      raised: 0,
      image: "https://images.unsplash.com/photo-1477884213360-7e9d7dcc8f9b?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 'gfm-buddy-heartworm',
      name: "Save Buddy — Emergency Heartworm Treatment",
      shelter: "David & Rachel Torres",
      goal: 2500,
      raised: 0,
      image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 'gfm-coco-spine',
      name: "Coco Needs Spinal Surgery to Walk Again",
      shelter: "Emily Rodriguez",
      goal: 6000,
      raised: 0,
      image: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 'gfm-max-rescue',
      name: "Rescue Max From the Shelter Before It's Too Late",
      shelter: "Austin Animal Rescue Network",
      goal: 800,
      raised: 0,
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=1000&auto=format&fit=crop",
    }
  ];

  for (const camp of campaigns) {
    try {
      await prisma.campaign.create({ data: camp });
      console.log(`✓ Added: ${camp.name}`);
    } catch (e) {
      console.log(`✗ Failed: ${camp.name}: ${e.message}`);
    }
  }

  console.log(`\nDone! Seeded ${campaigns.length} campaigns.`);
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
