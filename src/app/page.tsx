/* eslint-disable */
// @ts-nocheck
import Link from 'next/link';
import { ArrowRight, PawPrint, HeartPulse, ShieldCheck, Rocket } from 'lucide-react';

export default function Home() {
  return (
    <div className="mx-auto w-full px-4 py-8 lg:px-6 xl:max-w-7xl sm:pt-12">
      <section className="mx-auto mb-12 max-w-3xl text-center sm:mb-20">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl text-balance">
          Sponsor a Rescue. Launch a Coin.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground text-balance leading-relaxed">
          The biggest runners in crypto history are animals—DOGE, WIF, BONK, POPCAT. It's time to harness that insane liquidity to make an actual difference. Browse our pool of verified GoFundMe campaigns, claim a dog in need, and launch their exclusive Solana meme coin.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/rescues" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-8 text-sm font-bold text-white transition-all hover:bg-accent/90 shadow-lg shadow-accent/20">
            Adopt a Rescue
          </Link>
          <Link href="/docs" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-transparent px-8 text-sm font-medium text-primary transition-colors hover:bg-secondary">
            Read the docs
          </Link>
        </div>
      </section>

      <section aria-label="Features" className="grid gap-3 sm:grid-cols-6">
        
        <Link href="/rescues" className="group relative flex aspect-[4/3] flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-accent/50 hover:shadow-lg sm:col-span-3 sm:aspect-auto sm:h-[280px]">
          <div className="absolute inset-0 flex items-center justify-center p-6 bg-gradient-to-br from-accent/5 to-transparent">
             <div className="text-center">
               <HeartPulse className="h-10 w-10 mx-auto text-accent mb-4" />
               <h3 className="text-xl font-bold text-primary mb-2">The Rescue Pool</h3>
               <p className="font-mono text-xs text-muted-foreground max-w-xs mx-auto">Browse verified dogs needing surgery and claim one to sponsor.</p>
             </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between p-6">
            <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">Adopt a Rescue</span>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-all group-hover:translate-x-1">Open <ArrowRight className="h-4 w-4" /></span>
          </div>
        </Link>

        <Link href="/explore" className="group relative flex aspect-[4/3] flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-border/80 hover:shadow-lg sm:col-span-3 sm:aspect-auto sm:h-[280px]">
          <div className="absolute inset-0 flex items-center justify-center p-6">
             <div className="text-center">
               <Rocket className="h-10 w-10 mx-auto text-muted-foreground mb-4 group-hover:text-primary transition-colors" />
               <h3 className="text-xl font-bold text-primary mb-2">Live Token Deployments</h3>
               <p className="font-mono text-xs text-muted-foreground max-w-xs mx-auto">Track the volume of every token launched to support our animals.</p>
             </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between p-6">
            <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">Explore Tokens</span>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1">Open <ArrowRight className="h-4 w-4" /></span>
          </div>
        </Link>

        <div className="group relative flex aspect-[4/3] flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all sm:col-span-2 sm:aspect-auto sm:h-[280px]">
          <div className="p-6">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">How it works</span>
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent">1</div>
                <p className="text-sm text-primary">Pick a GoFundMe campaign</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent">2</div>
                <p className="text-sm text-primary">Deploy a SPL Token-2022 coin</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent">3</div>
                <p className="text-sm text-primary">4% volume goes to the dog</p>
              </div>
            </div>
          </div>
        </div>

        <Link href="/docs" className="group relative flex aspect-[4/3] flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-border/80 hover:shadow-lg sm:col-span-4 sm:aspect-auto sm:h-[280px]">
          <div className="absolute inset-0 flex items-center justify-center p-6 bg-gradient-to-tl from-secondary/50 to-transparent">
             <div className="text-center">
               <ShieldCheck className="h-10 w-10 mx-auto text-green-500 mb-4" />
               <h3 className="text-xl font-bold text-primary mb-2">On-Chain Transparency</h3>
               <p className="font-mono text-xs text-muted-foreground max-w-sm mx-auto">The 4% transfer fee is hardcoded into the Solana smart contract. Payouts are verified via on-chain receipts.</p>
             </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between p-6">
            <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">Documentation</span>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1">Open <ArrowRight className="h-4 w-4" /></span>
          </div>
        </Link>
      </section>
    </div>
  );
}
