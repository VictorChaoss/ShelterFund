/* eslint-disable */
// @ts-nocheck
import { Heart, Coins, ArrowRightLeft, FileCheck, PawPrint, ShieldCheck } from 'lucide-react';

export default function DocsPage() {
  const steps = [
    {
      icon: Heart,
      title: "1. Pick a Rescue",
      description: "Browse real, active GoFundMe campaigns for dogs needing surgery, wheelchairs, or emergency care. Each campaign is verified and linked directly to the original fundraiser."
    },
    {
      icon: Coins,
      title: "2. Launch Their Token",
      description: "Create a Solana token exclusively for that dog. Under the hood, we use Token-2022 with a hardcoded transfer fee — a percentage of every trade is automatically withheld by the Solana protocol. Nobody can change it, not even us."
    },
    {
      icon: ArrowRightLeft,
      title: "3. Trading Generates Fees",
      description: "As the coin trades on DEXs, transfer fees accumulate in holder accounts on-chain. Our backend periodically harvests these fees and converts them into USDC."
    },
    {
      icon: FileCheck,
      title: "4. Fees Go to the Dog",
      description: "The converted USDC is routed directly to the GoFundMe campaign organizer once they verify their identity through our Shelter Claim Portal. Every payout is logged with a public on-chain receipt."
    }
  ];

  return (
    <div className="relative">
      {/* Background glow */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-[300px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-4xl px-4 py-8 lg:px-6">
        <div className="mb-12 text-center animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-medium text-accent mb-6">
            <PawPrint className="h-3.5 w-3.5" />
            How ShelterFund Works
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">The Manifesto</h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            The biggest runners in crypto history are animals. It's time to send something with actual meaning. We are repurposing memecoin liquidity to fund real-world animal rescues.
          </p>
        </div>

        <div className="relative mb-16">
          <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent hidden md:block"></div>
          <div className="space-y-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className={`animate-fade-up delay-${(i+1)*100} relative flex flex-col md:flex-row gap-6 md:gap-12`}>
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-background bg-card shadow-sm z-10 mx-auto md:mx-0 glow-accent">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1 rounded-2xl border border-border bg-card/50 p-6 transition-all hover:border-accent/20 hover-glow">
                    <h3 className="text-lg font-bold text-primary mb-2">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Example */}
        <div className="animate-fade-up delay-500 rounded-2xl bg-accent/5 p-8 text-center border border-accent/20 mb-12">
          <h3 className="text-2xl font-bold text-primary mb-4">Example: $BELLA</h3>
          <p className="text-muted-foreground mb-2 leading-relaxed text-sm max-w-2xl mx-auto">
            A user launches $BELLA to fund a $1,500 ACL surgery for a rescue dog. The coin goes viral and generates $50,000 in trading volume. 4% of that ($2,000) accumulates in transfer fees. ShelterFund harvests the fees, converts to USDC, pays the $1,500 vet bill via GoFundMe, and posts the on-chain receipt. The remaining $500 rolls over to the next dog in need.
          </p>
          <p className="text-xs text-muted-foreground/50 mt-4">This is a hypothetical example for illustration purposes.</p>
        </div>

        {/* Trust section */}
        <div className="grid gap-4 sm:grid-cols-3 mb-12">
          {[
            { icon: ShieldCheck, title: "Immutable Fee", desc: "The transfer fee is hardcoded at token creation. Nobody can change or remove it." },
            { icon: PawPrint, title: "Verified Campaigns", desc: "Every campaign links to a real, active GoFundMe with a real dog in need." },
            { icon: FileCheck, title: "On-Chain Receipts", desc: "Every fee harvest and payout is recorded on the Solana blockchain forever." },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card/50 p-6 text-center">
              <item.icon className="h-6 w-6 mx-auto text-accent mb-3" />
              <h4 className="font-bold text-primary text-sm mb-1">{item.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
