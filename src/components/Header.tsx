/* eslint-disable */
// @ts-nocheck
"use client";

import { Search } from 'lucide-react';
import Link from 'next/link';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        <div className="flex xl:hidden">
          <span className="text-xl font-bold">ShelterFund</span>
        </div>
        
        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="relative w-full max-w-lg">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search campaigns or coins"
              className="h-10 w-full rounded-full border border-border bg-background pl-10 pr-4 text-sm text-primary placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/launch"
            className="hidden rounded-full bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90 md:block"
          >
            Launch Coin
          </Link>
          <div className="wallet-button-container">
            <WalletMultiButton style={{ backgroundColor: 'transparent', border: '1px solid hsl(var(--border))', borderRadius: '9999px', height: '40px', fontSize: '14px', fontWeight: '500', color: 'hsl(var(--primary))' }} />
          </div>
        </div>
      </div>
    </header>
  );
}
