/* eslint-disable */
// @ts-nocheck
import { PawPrint, Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border/50 mt-20">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                <PawPrint className="h-4 w-4 text-accent" />
              </div>
              <span className="text-lg font-bold tracking-tight text-primary">ShelterFund</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Hijacking memecoin liquidity to fund real-world animal rescues. Built on Solana.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-primary mb-4">Platform</h4>
            <ul className="space-y-2.5">
              <li><Link href="/rescues" className="text-sm text-muted-foreground hover:text-accent transition-colors">Adopt a Rescue</Link></li>
              <li><Link href="/explore" className="text-sm text-muted-foreground hover:text-accent transition-colors">Explore Tokens</Link></li>
              <li><Link href="/analytics" className="text-sm text-muted-foreground hover:text-accent transition-colors">Analytics</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-primary mb-4">Resources</h4>
            <ul className="space-y-2.5">
              <li><Link href="/docs" className="text-sm text-muted-foreground hover:text-accent transition-colors">Documentation</Link></li>
              <li><Link href="/claim" className="text-sm text-muted-foreground hover:text-accent transition-colors">Shelter Portal</Link></li>
              <li><a href="https://github.com/VictorChaoss/ShelterFund" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-1">GitHub <ExternalLink className="h-3 w-3" /></a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-primary mb-4">Built With</h4>
            <ul className="space-y-2.5">
              <li><span className="text-sm text-muted-foreground">Solana Token-2022</span></li>
              <li><span className="text-sm text-muted-foreground">SPL Transfer Fees</span></li>
              <li><span className="text-sm text-muted-foreground">Next.js + Vercel</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">&copy; 2026 ShelterFund. Every trade saves a life.</p>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-muted-foreground">Solana Devnet</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
