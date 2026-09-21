import { Heart, Coins, ArrowRightLeft, FileCheck } from 'lucide-react';

export default function DocsPage() {
  const steps = [
    {
      icon: Heart,
      title: "1. Pick a Rescue",
      description: "Browse urgent animal cases from verified local shelters or platforms like Waggle. Select the specific animal or shelter fund you want your coin's fees to support."
    },
    {
      icon: Coins,
      title: "2. Launch on pump.fun",
      description: "Upload your meme, name your coin, and deploy it through our interface. Under the hood, we hardcode the creator fee address to our platform's smart contract. You can't change it, and we can't steal it."
    },
    {
      icon: ArrowRightLeft,
      title: "3. On-chain Claims & Swaps",
      description: "As the coin trades, creator fees (SOL) accumulate. Our backend periodically claims these fees on-chain, automatically swapping them into USDC to preserve value."
    },
    {
      icon: FileCheck,
      title: "4. Fiat Payouts & Receipts",
      description: "We off-ramp the USDC to USD and route it directly to the shelter's bank account or GoFundMe/Waggle API. Every single payout is logged with a public receipt on this site."
    }
  ];

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 lg:px-6">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-medium tracking-tight text-primary">The Manifesto</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          The biggest runners in crypto history are animals. It's time to send something with actual meaning. We are hijacking memecoin liquidity to fund real-world animal rescues.
        </p>
      </div>

      <div className="relative mb-16">
        <div className="absolute left-8 top-8 bottom-8 w-px bg-border hidden md:block"></div>
        <div className="space-y-12">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="relative flex flex-col md:flex-row gap-6 md:gap-12">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-background bg-card shadow-sm z-10 mx-auto md:mx-0">
                  <Icon className="h-6 w-6 text-accent fill-accent/20" />
                </div>
                <div className="flex-1 rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-primary mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl bg-accent/10 p-8 text-center border border-accent/20">
        <h3 className="text-2xl font-bold text-primary mb-4">Example: $BELLA</h3>
        <p className="text-muted-foreground mb-6">
          A user launches $BELLA to fund a $1,500 ACL surgery for a rescue dog. The coin goes viral and generates $50,000 in trading volume. 1% of that ($500) accumulates in creator fees. ShelterFund claims the $500, off-ramps it, pays the vet bill via Waggle, and posts the receipt here. Once the $1,500 goal is met, ongoing fees automatically roll over to the next dog in need.
        </p>
      </div>
    </div>
  );
}
