/* eslint-disable */
// @ts-nocheck
"use client";

import { useState } from 'react';
import { ShieldCheck, Mail, Link, Wallet, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ClaimPortal() {
  const [step, setStep] = useState(1);
  const [wallet, setWallet] = useState("");

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 lg:px-6">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
          <ShieldCheck className="h-8 w-8 text-accent fill-accent/20" />
        </div>
        <h1 className="text-3xl font-medium tracking-tight text-primary">Shelter Claim Portal</h1>
        <p className="mt-2 text-muted-foreground">
          Are you an official animal shelter? Verify your identity to claim the USDC raised by the community.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-sm">
        {/* Progress Bar */}
        <div className="flex items-center justify-between border-b border-border p-6 text-sm font-medium text-muted-foreground">
          <span className={step >= 1 ? "text-accent" : ""}>1. Find Campaign</span>
          <span className={step >= 2 ? "text-accent" : ""}>2. Verify Identity</span>
          <span className={step >= 3 ? "text-accent" : ""}>3. Claim USDC</span>
        </div>

        <div className="p-8">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-xl font-bold text-primary">Search for your Shelter</h2>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="e.g. Austin Pets Alive" 
                  className="w-full rounded-lg border border-border bg-background p-4 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
                
                {/* Mock Search Result */}
                <div className="rounded-xl border border-border p-4 transition-colors hover:border-accent cursor-pointer bg-secondary/30" onClick={() => setStep(2)}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-primary">Austin Pets Alive!</h3>
                      <p className="text-sm text-muted-foreground">2 active campaigns</p>
                    </div>
                    <div className="text-right">
                      <span className="block text-2xl font-bold text-green-500">$15,420 USDC</span>
                      <span className="text-xs text-muted-foreground">Ready to claim</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-xl font-bold text-primary">Verify Authorization</h2>
              <p className="text-sm text-muted-foreground">To prevent fraud, you must prove you represent Austin Pets Alive!</p>
              
              <div className="space-y-4">
                <button onClick={() => setStep(3)} className="flex w-full items-center justify-between rounded-xl border border-border bg-background p-4 transition-colors hover:border-accent hover:bg-secondary/30">
                  <div className="flex items-center gap-3">
                    <Link className="h-5 w-5 text-[#1DA1F2]" />
                    <span className="font-medium text-primary">Verify with Official Link</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </button>
                
                <button onClick={() => setStep(3)} className="flex w-full items-center justify-between rounded-xl border border-border bg-background p-4 transition-colors hover:border-accent hover:bg-secondary/30">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-accent" />
                    <span className="font-medium text-primary">Verify via Official Domain Email</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center gap-2 text-green-500 mb-6">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-bold">Identity Verified: Austin Pets Alive!</span>
              </div>
              
              <h2 className="text-xl font-bold text-primary">Withdraw Funds</h2>
              <p className="text-sm text-muted-foreground">Enter your shelter's official Solana wallet address to receive the USDC.</p>
              
              <div className="space-y-4">
                <div className="relative">
                  <Wallet className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Enter Solana Address (e.g. 8xG...)" 
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background p-3 pl-11 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
                
                <button 
                  className="w-full rounded-lg bg-accent py-4 font-bold text-accent-foreground transition-colors hover:bg-accent/90 disabled:opacity-50"
                  disabled={!wallet}
                  onClick={async () => {
                    try {
                      const res = await fetch('/api/claim', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          campaignId: 'gfm-edisurg',
                          walletTo: wallet,
                          amountUsdc: 15420
                        })
                      });
                      const data = await res.json();
                      if (data.success) {
                        alert(`Success! 15,420 USDC has been withdrawn to ${wallet}. Transaction Signature: ${data.claim.txSignature}`);
                      } else {
                        alert(`Error: ${data.error}`);
                      }
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                >
                  Withdraw $15,420 USDC
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
