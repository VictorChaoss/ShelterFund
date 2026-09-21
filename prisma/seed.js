const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with more live animal rescue campaigns...')
  
  const campaigns = [
    {
      id: 'gfm-bella',
      name: "Bella's Emergency Surgery",
      shelter: "SPCA International",
      goal: 3000,
      raised: 0,
      image: "https://images.unsplash.com/photo-1537151608804-ea2f1423f5aa?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 'gfm-charlie',
      name: "Charlie Needs a Home",
      shelter: "Hope Animal Rescue",
      goal: 1500,
      raised: 0,
      image: "https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 'gfm-daisy',
      name: "Daisy's Prosthetic Leg",
      shelter: "Second Chance Rescue",
      goal: 4000,
      raised: 0,
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 'gfm-rocky',
      name: "Help Rocky Walk Again",
      shelter: "Paws for Life",
      goal: 2200,
      raised: 0,
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 'gfm-milo',
      name: "Milo's Recovery Fund",
      shelter: "Street Dog Foundation",
      goal: 1800,
      raised: 0,
      image: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 'gfm-bailey',
      name: "Bailey's Chemotherapy",
      shelter: "Mutts & Co.",
      goal: 5000,
      raised: 0,
      image: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  for (const camp of campaigns) {
    try {
      await prisma.campaign.create({ data: camp });
      console.log(`Added ${camp.name}`);
    } catch (e) {
      console.log(`Skipped ${camp.name} (already exists)`);
    }
  }

  console.log('Database seeded with additional campaigns.');
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
