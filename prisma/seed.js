const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with live animal rescue campaigns...')
  
  await prisma.campaign.create({
    data: {
      id: 'gfm-edisurg',
      name: "Edi's Life-Saving Surgery",
      shelter: "Austin Pets Alive!",
      goal: 2500,
      raised: 0,
      image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1000&auto=format&fit=crop",
    }
  })

  await prisma.campaign.create({
    data: {
      id: 'gfm-maxwheel',
      name: "Max's Wheelchair Fund",
      shelter: "Best Friends Animal Society",
      goal: 800,
      raised: 0,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop",
    }
  })

  await prisma.campaign.create({
    data: {
      id: 'gfm-luna',
      name: "Luna's Heartworm Treatment",
      shelter: "Local Humane Society",
      goal: 1200,
      raised: 0,
      image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1000&auto=format&fit=crop",
    }
  })

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
