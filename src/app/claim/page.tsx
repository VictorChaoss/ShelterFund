/* eslint-disable */
// @ts-nocheck
"use client";

import { useState, useEffect } from 'react';
import { ShieldCheck, Mail, Link, Wallet, ArrowRight, CheckCircle2, Loader2, PawPrint, Heart } from 'lucide-react';

export default function ClaimPortal() {
  const [step, setStep] = useState(1);
  const [wallet, setWallet] = useState("");
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/campaigns')
      .then(res => res.json())
      .then(data => {
        if (data.success) setCampaigns(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredCampaigns = campaigns.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.shelter.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 lg:px-6">
      <div className="mb-8 text-center animate-fade-up">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 animate-pulse-glow">
          <ShieldCheck className="h-8 w-8 text-accent" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Shelter Claim Portal</h1>
        <p className="mt-2 text-muted-foreground max-w-md mx-auto">
          Are you the organizer of a GoFundMe campaign? Verify your identity to claim the fees raised by the community.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card/50 shadow-sm animate-fade-up delay-200">
        {/* Progress Bar */}
        <div className="flex items-center justify-between border-b border-border p-6 text-sm font-medium text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${step >= 1 ? 'bg-accent text-accent-foreground' : 'bg-secondary text-muted-foreground'}`}>1</div>
            <span className={step >= 1 ? "text-primary" : ""}>Find Campaign</span>
          </div>
          <div className="h-px flex-1 mx-3 bg-border" />
          <div className="flex items-center gap-2">
            <div className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${step >= 2 ? 'bg-accent text-accent-foreground' : 'bg-secondary text-muted-foreground'}`}>2</div>
            <span className={step >= 2 ? "text-primary" : ""}>Verify Identity</span>
          </div>
          <div className="h-px flex-1 mx-3 bg-border" />
          <div className="flex items-center gap-2">
            <div className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${step >= 3 ? 'bg-accent text-accent-foreground' : 'bg-secondary text-muted-foreground'}`}>3</div>
            <span className={step >= 3 ? "text-primary" : ""}>Claim Fees</span>
          </div>
        </div>

        <div className="p-8">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-primary">Find Your Campaign</h2>
              <p className="text-sm text-muted-foreground">Search for the GoFundMe campaign that was sponsored by a ShelterFund token.</p>
              
              <input 
                type="text" 
                placeholder="Search by dog name or organizer..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-border bg-background p-4 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              
              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-accent" />
                </div>
              ) : filteredCampaigns.length === 0 ? (
                <div className="rounded-xl border border-border p-8 text-center">
                  <PawPrint className="h-8 w-8 mx-auto text-muted-foreground/30 mb-3" />
                  <p className="text-sm text-muted-foreground">No campaigns found. Try a different search.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredCampaigns.map(camp => (
                    <div 
                      key={camp.id}
                      className={`rounded-xl border p-4 transition-all cursor-pointer ${
                        selectedCampaign?.id === camp.id 
                          ? 'border-accent bg-accent/5' 
                          : 'border-border hover:border-accent/30 bg-secondary/20'
                      }`}
                      onClick={() => setSelectedCampaign(camp)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <img src={camp.image} className="h-10 w-10 rounded-lg object-cover" alt={camp.name} />
                          <div>
                            <h3 className="font-bold text-primary text-sm">{camp.name}</h3>
                            <p className="text-xs text-muted-foreground">{camp.shelter}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="block text-sm font-bold text-green-400">${camp.raised.toLocaleString()} raised</span>
                          <span className="text-xs text-muted-foreground">Goal: ${camp.goal.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedCampaign && (
                <button 
                  onClick={() => setStep(2)} 
                  className="w-full rounded-xl bg-accent py-3 font-bold text-accent-foreground transition-colors hover:bg-accent/90 flex items-center justify-center gap-2"
                >
                  Continue with {selectedCampaign.name}
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <img src={selectedCampaign?.image} className="h-10 w-10 rounded-lg object-cover" />
                <div>
                  <h2 className="text-xl font-bold text-primary">Verify You Own This Campaign</h2>
                  <p className="text-sm text-muted-foreground">{selectedCampaign?.name}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">To prevent fraud, you must prove you are the organizer of this GoFundMe campaign.</p>
              
              <div className="space-y-3">
                <button onClick={() => setStep(3)} className="flex w-full items-center justify-between rounded-xl border border-border bg-background p-4 transition-all hover:border-accent hover:bg-secondary/30">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                      <Link className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="text-left">
                      <span className="font-medium text-primary block text-sm">Verify via GoFundMe Link</span>
                      <span className="text-xs text-muted-foreground">Add a verification code to your campaign description</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </button>
                
                <button onClick={() => setStep(3)} className="flex w-full items-center justify-between rounded-xl border border-border bg-background p-4 transition-all hover:border-accent hover:bg-secondary/30">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                      <Mail className="h-5 w-5 text-accent" />
                    </div>
                    <div className="text-left">
                      <span className="font-medium text-primary block text-sm">Verify via Email</span>
                      <span className="text-xs text-muted-foreground">We'll send a code to the email linked to the GoFundMe</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>

              <button onClick={() => setStep(1)} className="w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors">
                ← Back to search
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-green-400 mb-2">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-bold text-sm">Identity Verified: {selectedCampaign?.shelter}</span>
              </div>
              
              <h2 className="text-xl font-bold text-primary">Withdraw Accumulated Fees</h2>
              <p className="text-sm text-muted-foreground">Enter your Solana wallet address to receive the USDC from trading fees generated by your campaign's token.</p>
              
              <div className="rounded-xl bg-secondary/30 p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Campaign</span>
                  <span className="font-bold text-primary">{selectedCampaign?.name}</span>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">Fees Available</span>
                  <span className="font-bold text-green-400">$0.00 USDC</span>
                </div>
                <p className="mt-3 text-xs text-muted-foreground/60">Fees will accumulate here as the sponsored token generates trading volume.</p>
              </div>
              
              <div className="space-y-4">
                <div className="relative">
                  <Wallet className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Enter Solana wallet address..." 
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background p-3 pl-11 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
                
                <button 
                  className="w-full rounded-xl bg-accent py-4 font-bold text-accent-foreground transition-colors hover:bg-accent/90 disabled:opacity-50 flex items-center justify-center gap-2"
                  disabled={!wallet}
                  onClick={() => {
                    alert("No fees available to withdraw yet. Fees will appear here once the sponsored token generates trading volume.");
                  }}
                >
                  <Heart className="h-4 w-4" />
                  Withdraw Fees
                </button>
              </div>

              <button onClick={() => { setStep(1); setSelectedCampaign(null); }} className="w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors">
                ← Search for a different campaign
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
