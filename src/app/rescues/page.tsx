/* eslint-disable */
// @ts-nocheck
"use client";

import { useState, useEffect } from 'react';
import { Loader2, ExternalLink, ShieldCheck, Rocket, HeartPulse, PawPrint } from 'lucide-react';
import Link from 'next/link';

const CAMPAIGN_URLS: Record<string, string> = {};

export default function RescuesPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [claimedLocal, setClaimedLocal] = useState<any>({});
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const claimed = JSON.parse(localStorage.getItem('claimedTokens') || '{}');
    setClaimedLocal(claimed);

    fetch('/api/campaigns')
      .then(res => res.json())
      .then(data => {
        if (data.success) setCampaigns(data.data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
        <p className="text-sm text-muted-foreground">Loading rescues...</p>
      </div>
    );
  }

  const categories = ["All", "Medical", "GoFundMe", "Shelters"];
  const filteredCampaigns = activeCategory === "All" 
    ? campaigns 
    : campaigns.filter(c => c.category === activeCategory);

  return (
    <div className="relative">
      {/* Background glow */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-accent/5 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-8 lg:px-6">
        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-medium text-accent mb-4">
            <HeartPulse className="h-3.5 w-3.5" />
            {filteredCampaigns.length} Rescues Available
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Adopt a Rescue</h1>
          <p className="mt-3 text-muted-foreground max-w-lg">
            Each dog below has a real, active GoFundMe. Pick one, launch their exclusive token, and 4% of all volume goes directly to their campaign.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8 flex flex-wrap gap-2 animate-fade-up delay-100">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-accent text-accent-foreground glow-accent'
                  : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-primary'
              }`}
            >
              {cat === "GoFundMe" ? "Individual (GoFundMe)" : cat === "Medical" ? "Emergency & Medical" : cat}
            </button>
          ))}
        </div>

        {/* Campaign Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCampaigns.map((camp, i) => {
            const isClaimed = (camp.tokens && camp.tokens.length > 0) || !!claimedLocal[camp.id];
            const token = isClaimed ? (claimedLocal[camp.id] || camp.tokens[0]) : null;
            const gofundmeUrl = CAMPAIGN_URLS[camp.id];

            return (
              <div 
                key={camp.id}  
                className={`animate-fade-up delay-${(i+1)*100} group relative overflow-hidden rounded-2xl border bg-card/50 transition-all flex flex-col ${
                  isClaimed 
                    ? 'border-green-500/20' 
                    : 'border-border hover:border-accent/40 hover-glow'
                }`}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={camp.image} 
                    alt={camp.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  
                  {/* Status Badge */}
                  {isClaimed ? (
                    <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-green-500/20 border border-green-500/30 px-3 py-1 text-xs font-bold text-green-400 backdrop-blur-sm">
                      <ShieldCheck className="h-3 w-3" />
                      Sponsored
                    </div>
                  ) : (
                    <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-accent/20 border border-accent/30 px-3 py-1 text-xs font-bold text-accent backdrop-blur-sm animate-pulse">
                      <PawPrint className="h-3 w-3" />
                      Needs Sponsor
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-auto">
                    <span className="text-xs font-medium text-muted-foreground">{camp.shelter}</span>
                    <h3 className="mt-1 text-lg font-bold text-primary leading-snug">{camp.name}</h3>
                  </div>

                  {/* Progress */}
                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-green-400">${camp.raised.toLocaleString()} raised</span>
                      <span className="text-muted-foreground">Goal: ${camp.goal.toLocaleString()}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-accent to-pink-400 transition-all duration-1000"
                        style={{ width: `${Math.max(Math.min((camp.raised / camp.goal) * 100, 100), 2)}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-col gap-2">
                    {gofundmeUrl && (
                      <a 
                        href={gofundmeUrl}
                        target="_blank" 
                        rel="noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        View on GoFundMe
                      </a>
                    )}

                    {isClaimed ? (
                      <div className="flex items-center justify-center gap-2 rounded-xl border border-green-500/20 bg-green-500/5 py-2.5 text-xs font-bold text-green-400">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        Sponsored by ${token.ticker}
                      </div>
                    ) : (
                      <Link 
                        href={`/launch?campaignId=${camp.id}`}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-bold text-accent-foreground transition-all hover:bg-accent/90 glow-accent"
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
    </div>
  );
}
