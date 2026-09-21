/* eslint-disable */
// @ts-nocheck
"use client";

import { useState, useEffect } from 'react';
import { Loader2, ExternalLink, ShieldCheck, Rocket } from 'lucide-react';
import Link from 'next/link';

export default function RescuesPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/campaigns')
      .then(res => res.json())
      .then(data => {
        if (data.success) setCampaigns(data.data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-accent" /></div>;
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 lg:px-6">
      <div className="mb-12">
        <h1 className="text-3xl font-medium tracking-tight text-primary">Adopt a Rescue</h1>
        <p className="mt-2 text-muted-foreground">Launch a token to become the exclusive sponsor for a dog in need. 4% of all volume goes directly to their campaign.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((camp) => {
          const isClaimed = camp.tokens && camp.tokens.length > 0;
          const token = isClaimed ? camp.tokens[0] : null;

          return (
            <div key={camp.id} className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-accent/50 flex flex-col">
              <div 
                className="absolute inset-0 z-0 opacity-20 transition-opacity group-hover:opacity-30"
                style={{ backgroundImage: `url(${camp.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
              
              <div className="relative z-10 flex flex-1 flex-col p-6">
                <div className="mb-auto">
                  <span className="mb-3 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-primary">
                    {camp.shelter}
                  </span>
                  <h3 className="text-xl font-bold text-primary">{camp.name}</h3>
                </div>

                <div className="mt-8 space-y-3">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-green-500">${camp.raised.toLocaleString()} Raised</span>
                    <span className="text-muted-foreground">Goal: ${camp.goal.toLocaleString()}</span>
                  </div>
                  
                  <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
                    <div 
                      className="h-full bg-accent transition-all duration-1000"
                      style={{ width: `${Math.min((camp.raised / camp.goal) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-6">
                  <a 
                    href={
                      camp.id === 'gfm-luna' ? "https://www.gofundme.com/f/help-save-my-dog-luna-and-rebuild-my-life" :
                      camp.id === 'gfm-maxwheel' ? "https://www.gofundme.com/f/emergency-vet-fund-help-save-my-dog-from-a-serious-dental-a" :
                      "https://www.gofundme.com/f/help-save-my-dog-luna"
                    }
                    target="_blank" 
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background/50 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Original Fundraiser
                  </a>

                  {isClaimed ? (
                    <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-green-500/20 bg-green-500/10 py-3 text-sm font-medium text-green-500 mt-2">
                      <ShieldCheck className="h-4 w-4" />
                      <span>Sponsored by <strong>${token.ticker}</strong></span>
                    </div>
                  ) : (
                    <Link 
                      href={`/launch?campaignId=${camp.id}`}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-bold text-accent-foreground transition-colors hover:bg-accent/90 mt-2 shadow-lg shadow-accent/20"
                    >
                      <Rocket className="h-4 w-4" />
                      Launch Coin to Support
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
