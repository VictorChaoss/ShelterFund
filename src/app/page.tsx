/* eslint-disable */
// @ts-nocheck
import Link from 'next/link';
import { ArrowRight, Compass, PawPrint, BarChart3, Rocket, FileText } from 'lucide-react';

export default function Home() {
  return (
    <div className="mx-auto w-full px-4 py-8 lg:px-6 xl:max-w-7xl sm:pt-12">
      <section className="mx-auto mb-12 max-w-3xl text-center sm:mb-20">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl text-balance">
          Send something with actual meaning.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground text-balance leading-relaxed">
          Random memecoins are always sending. The biggest runners in crypto history are all animals—DOGE, WIF, BONK, POPCAT. It's time to harness that insane liquidity to make a difference. Launch a coin on ShelterFund, and a hardcoded 4% tax automatically routes to save real animals in need.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/launch" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-white transition-colors hover:bg-accent/90">
            Launch a coin
          </Link>
          <Link href="/docs" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-transparent px-6 text-sm font-medium text-primary transition-colors hover:bg-secondary">
            Read the docs
          </Link>
        </div>
      </section>

      <section aria-label="Features" className="grid gap-3 sm:grid-cols-6">
        <Link href="/explore" className="group relative flex aspect-[4/3] flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-border/80 hover:shadow-lg sm:col-span-3 sm:aspect-auto sm:h-[280px]">
          <div className="absolute inset-0 flex items-center justify-center p-6">
             <p className="text-center font-mono text-xs text-muted-foreground max-w-xs">Every coin launched through this site to save an animal is listed here.</p>
          </div>
          <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between p-6">
            <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">Explore</span>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1">Open <ArrowRight className="h-4 w-4" /></span>
          </div>
        </Link>
        
        <Link href="/rescues" className="group relative flex aspect-[4/3] flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-border/80 hover:shadow-lg sm:col-span-3 sm:aspect-auto sm:h-[280px]">
          <div className="absolute inset-0 flex items-center justify-center p-6">
             <p className="text-center font-mono text-xs text-muted-foreground max-w-xs">Every payout to a shelter is listed here once it is sent.</p>
          </div>
          <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between p-6">
            <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">Rescues & Payouts</span>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1">Open <ArrowRight className="h-4 w-4" /></span>
          </div>
        </Link>

        <Link href="/analytics" className="group relative flex aspect-[4/3] flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-border/80 hover:shadow-lg sm:col-span-2 sm:aspect-auto sm:h-[280px]">
          <div className="p-6">
            <span className="text-xs text-muted-foreground">Fees claimed</span>
            <span className="mt-2 block text-4xl font-medium tracking-tight text-primary">$124,500.00</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between p-6 mt-auto">
            <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">Analytics</span>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1">Open <ArrowRight className="h-4 w-4" /></span>
          </div>
        </Link>

        <Link href="/launch" className="group relative flex aspect-[4/3] flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-border/80 hover:shadow-lg sm:col-span-2 sm:aspect-auto sm:h-[280px]">
           <div className="p-6">
             <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">Fees route to</span>
             <div className="mt-4 space-y-2">
               <div className="flex items-center gap-3 rounded-lg border border-accent bg-background p-2">
                 <PawPrint className="h-4 w-4 text-accent fill-accent" />
                 <span className="text-sm font-bold text-primary">Bella's ACL Surgery</span>
               </div>
               <div className="flex items-center gap-3 rounded-lg p-2 opacity-50">
                 <PawPrint className="h-4 w-4 text-muted-foreground" />
                 <span className="text-sm text-primary">Max's Wheelchair</span>
               </div>
             </div>
           </div>
          <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between p-6">
            <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">Launch</span>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1">Open <ArrowRight className="h-4 w-4" /></span>
          </div>
        </Link>

        <Link href="/docs" className="group relative flex aspect-[4/3] flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-border/80 hover:shadow-lg sm:col-span-2 sm:aspect-auto sm:h-[280px]">
          <div className="p-6 space-y-4">
             <div className="flex flex-col gap-1">
               <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">Launching</span>
               <span className="text-sm font-bold text-primary">Coin created on pump.fun</span>
             </div>
             <div className="flex flex-col gap-1">
               <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">Routing</span>
               <span className="text-sm font-bold text-primary">Fees reach the shelter</span>
             </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between p-6">
            <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">Docs</span>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1">Open <ArrowRight className="h-4 w-4" /></span>
          </div>
        </Link>
      </section>
    </div>
  );
}
