/* eslint-disable */
// @ts-nocheck
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PawPrint } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  
  const links = [
    { href: '/rescues', label: 'Adopt a Rescue' },
    { href: '/explore', label: 'Explore' },
    { href: '/docs', label: 'Docs' },
  ];

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
            <PawPrint className="h-4 w-4 text-accent" />
          </div>
          <span className="text-lg font-bold tracking-tight text-primary">ShelterFund</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map(link => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href 
                  ? 'text-accent bg-accent/10' 
                  : 'text-muted-foreground hover:text-primary hover:bg-secondary/50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link 
            href="/rescues" 
            className="hidden sm:inline-flex h-9 items-center justify-center rounded-lg bg-accent px-4 text-sm font-bold text-accent-foreground transition-all hover:bg-accent/90 animate-pulse-glow"
          >
            Sponsor a Dog
          </Link>
          <div className="wallet-button-container">
            <WalletMultiButton style={{ backgroundColor: 'transparent', border: '1px solid hsl(330 10% 14%)', borderRadius: '0.5rem', height: '36px', fontSize: '13px', fontWeight: '500', color: 'hsl(330 10% 98%)' }} />
          </div>
        </div>
      </div>
    </header>
  );
}
