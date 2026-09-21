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
          <nav className="flex items-center gap-6">
            <Link href="/rescues" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Adopt a Rescue
            </Link>
            <Link href="/explore" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Explore
            </Link>
            <Link href="/docs" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Docs
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            href="/rescues" 
            className="hidden rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground transition-colors hover:bg-accent/90 sm:block shadow-lg shadow-accent/20"
          >
            Sponsor a Dog
          </Link>
          <div className="wallet-button-container">
            <WalletMultiButton style={{ backgroundColor: 'transparent', border: '1px solid hsl(var(--border))', borderRadius: '9999px', height: '40px', fontSize: '14px', fontWeight: '500', color: 'hsl(var(--primary))' }} />
          </div>
        </div>
      </div>
    </header>
  );
}
