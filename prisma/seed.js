const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with live animal rescue campaigns...')
  
  // Wipe existing campaigns so we can recreate them with URLs
  await prisma.campaign.deleteMany({})
  
  const campaigns = [
    {
      id: 'gfm-luna',
      name: "Luna's Heartworm Treatment",
      shelter: "Local Humane Society",
      goal: 1200,
      raised: 0,
      image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1000&auto=format&fit=crop",
      url: "https://www.humanesociety.org/"
    },
    {
      id: 'gfm-maxwheel',
      name: "Max's Wheelchair Fund",
      shelter: "Best Friends Animal Society",
      goal: 800,
      raised: 0,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop",
      url: "https://bestfriends.org/"
    },
    {
      id: 'gfm-edisurg',
      name: "Edi's Life-Saving Surgery",
      shelter: "Austin Pets Alive!",
      goal: 2500,
      raised: 0,
      image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1000&auto=format&fit=crop",
      url: "https://www.austinpetsalive.org/"
    },
    {
      id: 'gfm-bella',
      name: "Bella's Emergency Surgery",
      shelter: "SPCA International",
      goal: 3000,
      raised: 0,
      image: "https://images.unsplash.com/photo-1537151608804-ea2f1423f5aa?q=80&w=1000&auto=format&fit=crop",
      url: "https://www.spcai.org/"
    },
    {
      id: 'gfm-charlie',
      name: "Charlie Needs a Home",
      shelter: "Hope Animal Rescue",
      goal: 1500,
      raised: 0,
      image: "https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=1000&auto=format&fit=crop",
      url: "https://www.hopeanimalrescue.com/"
    },
    {
      id: 'gfm-daisy',
      name: "Daisy's Prosthetic Leg",
      shelter: "Second Chance Rescue",
      goal: 4000,
      raised: 0,
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1000&auto=format&fit=crop",
      url: "https://nycsecondchancerescue.org/"
    },
    {
      id: 'gfm-rocky',
      name: "Help Rocky Walk Again",
      shelter: "Paws for Life",
      goal: 2200,
      raised: 0,
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1000&auto=format&fit=crop",
      url: "https://pawsforlifek9.org/"
    },
    {
      id: 'gfm-milo',
      name: "Milo's Recovery Fund",
      shelter: "Street Dog Foundation",
      goal: 1800,
      raised: 0,
      image: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80&w=1000&auto=format&fit=crop",
      url: "https://www.streetdogfoundation.com/"
    },
    {
      id: 'gfm-bailey',
      name: "Bailey's Chemotherapy",
      shelter: "Mutts & Co.",
      goal: 5000,
      raised: 0,
      image: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?q=80&w=1000&auto=format&fit=crop",
      url: "https://www.muttsandco.com/"
    }
  ];

  for (const camp of campaigns) {
    try {
      await prisma.campaign.create({ data: camp });
      console.log(`Added ${camp.name}`);
    } catch (e) {
      console.log(`Failed to add ${camp.name}: ${e.message}`);
    }
  }

  console.log('Database seeded with URLs.');
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
