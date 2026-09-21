/* eslint-disable */
// @ts-nocheck
import Link from 'next/link';
import { ArrowRight, PawPrint, HeartPulse, ShieldCheck, Rocket, Zap, Users, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* ══ BACKGROUND EFFECTS ══ */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute top-1/2 -left-40 h-[400px] w-[400px] rounded-full bg-accent/3 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-pink-500/3 blur-[100px]" />
      </div>

      {/* ══ HERO ══ */}
      <section className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 lg:px-6 sm:pt-24 sm:pb-32">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-medium text-accent mb-8">
            <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Built on Solana Token-2022
          </div>

          <h1 className="animate-fade-up delay-100 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="gradient-text">Sponsor a Rescue.</span>
            <br />
            <span className="text-primary">Launch a Coin.</span>
          </h1>

          <p className="animate-fade-up delay-200 mt-6 text-lg text-muted-foreground text-balance leading-relaxed max-w-2xl mx-auto">
            The biggest runners in crypto history are animals — DOGE, WIF, BONK, POPCAT. 
            It's time to harness that insane liquidity to make an actual difference.
          </p>

          <div className="animate-fade-up delay-300 mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/rescues" className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-accent px-8 text-sm font-bold text-white transition-all hover:bg-accent/90 glow-accent-strong">
              Adopt a Rescue
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/docs" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card/50 px-8 text-sm font-medium text-primary transition-all hover:bg-secondary hover:border-border/80">
              Read the Manifesto
            </Link>
          </div>
        </div>

        {/* Floating Paws */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <PawPrint className="absolute top-20 left-[15%] h-6 w-6 text-accent/10 animate-float" />
          <PawPrint className="absolute top-40 right-[18%] h-8 w-8 text-accent/8 animate-float-slow delay-200" />
          <PawPrint className="absolute bottom-32 left-[10%] h-5 w-5 text-accent/6 animate-float delay-500" />
          <PawPrint className="absolute bottom-20 right-[12%] h-7 w-7 text-pink-400/8 animate-float-slow delay-300" />
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section className="relative mx-auto max-w-7xl px-4 pb-20 lg:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { step: '01', title: 'Pick a Dog', desc: 'Browse verified GoFundMe campaigns for dogs needing surgery, wheelchairs, or emergency care.', icon: HeartPulse, color: 'text-rose-400' },
            { step: '02', title: 'Launch a Token', desc: 'Deploy a coin on PumpSwap with creator fees routed to ShelterFund.', icon: Rocket, color: 'text-pink-400' },
            { step: '03', title: 'Save a Life', desc: 'As the coin trades, creator fees accumulate and get routed directly to the dog\'s GoFundMe campaign.', icon: Zap, color: 'text-fuchsia-400' },
          ].map((item, i) => (
            <div key={i} className={`animate-fade-up delay-${(i+1)*100} group relative rounded-2xl border border-border bg-card/50 p-8 transition-all hover:border-accent/30 hover-glow`}>
              <span className="font-mono text-xs text-muted-foreground/50">{item.step}</span>
              <item.icon className={`h-8 w-8 ${item.color} mt-4 mb-4 transition-transform group-hover:scale-110`} />
              <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FEATURE BENTO ══ */}
      <section className="relative mx-auto max-w-7xl px-4 pb-20 lg:px-6">
        <div className="grid gap-4 sm:grid-cols-6">
          {/* Rescue Pool - Large */}
          <Link href="/rescues" className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 transition-all hover:border-accent/40 hover-glow sm:col-span-4 sm:h-[320px]">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/8 via-transparent to-pink-500/5" />
            <div className="relative flex h-full flex-col justify-between p-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent mb-6">
                  <HeartPulse className="h-3.5 w-3.5" />
                  CORE FEATURE
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3 sm:text-3xl">The Rescue Pool</h3>
                <p className="text-muted-foreground max-w-md leading-relaxed">Browse real, verified GoFundMe campaigns. Pick a dog. Become their exclusive crypto sponsor.</p>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-accent transition-all group-hover:gap-3">
                Browse Rescues <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>

          {/* Stats Preview */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card/50 sm:col-span-2 sm:h-[320px]">
            <div className="flex h-full flex-col justify-center p-8 text-center">
              <div className="animate-float">
                <PawPrint className="h-12 w-12 mx-auto text-accent/30 mb-6" />
              </div>
              <span className="text-5xl font-bold text-primary">4%</span>
              <span className="mt-2 text-sm font-medium text-muted-foreground">of every trade<br/>saves a life</span>
              <div className="mt-6 h-px w-16 mx-auto bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
              <span className="mt-4 font-mono text-xs text-muted-foreground/60">SPL Transfer Fee Extension</span>
            </div>
          </div>

          {/* Explore */}
          <Link href="/explore" className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 transition-all hover:border-border/80 hover-glow sm:col-span-3 sm:h-[260px]">
            <div className="relative flex h-full flex-col justify-between p-8">
              <div>
                <TrendingUp className="h-8 w-8 text-rose-400 mb-4 transition-transform group-hover:scale-110" />
                <h3 className="text-xl font-bold text-primary mb-2">Live Leaderboard</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Track the volume and impact of every token launched on the platform.</p>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground group-hover:text-primary transition-all group-hover:gap-3">
                Explore Tokens <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>

          {/* On-Chain Transparency */}
          <Link href="/docs" className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 transition-all hover:border-border/80 hover-glow sm:col-span-3 sm:h-[260px]">
            <div className="absolute inset-0 bg-gradient-to-tl from-green-500/5 to-transparent" />
            <div className="relative flex h-full flex-col justify-between p-8">
              <div>
                <ShieldCheck className="h-8 w-8 text-green-400 mb-4 transition-transform group-hover:scale-110" />
                <h3 className="text-xl font-bold text-primary mb-2">On-Chain Transparency</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">The 4% fee is hardcoded into the Solana smart contract. Every payout is verifiable on-chain.</p>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground group-hover:text-primary transition-all group-hover:gap-3">
                Read the Docs <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ══ TRUST BAR ══ */}
      <section className="relative border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground/50">
            <div className="flex items-center gap-2 text-sm font-medium">
              <ShieldCheck className="h-4 w-4" />
              <span>Immutable 4% Fee</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2 text-sm font-medium">
              <Zap className="h-4 w-4" />
              <span>Solana Token-2022</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2 text-sm font-medium">
              <Users className="h-4 w-4" />
              <span>Verified GoFundMe Campaigns</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2 text-sm font-medium">
              <HeartPulse className="h-4 w-4" />
              <span>Real Dogs. Real Impact.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
