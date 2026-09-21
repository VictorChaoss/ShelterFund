/* eslint-disable */
// @ts-nocheck
"use client";

import { useState, useEffect } from 'react';
import { Activity, DollarSign, Heart, Rocket, Loader2, ArrowUpRight } from 'lucide-react';

export default function AnalyticsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data.data);
        } else {
          // Fallback if DB is empty
          setStats({
            totalCampaigns: 3,
            totalTokens: 0,
            totalRaised: 0,
            totalVolume: 0,
            totalClaims: 0
          });
        }
        setLoading(false);
      })
      .catch(() => {
        setStats({
          totalCampaigns: 3,
          totalTokens: 0,
          totalRaised: 0,
          totalVolume: 0,
          totalClaims: 0
        });
        setLoading(false);
      });
  }, []);

  if (loading || !stats) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-accent" /></div>;
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 lg:px-6">
      <div className="mb-12">
        <h1 className="text-3xl font-medium tracking-tight text-primary">Platform Analytics</h1>
        <p className="mt-2 text-muted-foreground">Real-time metrics on the impact of the ShelterFund ecosystem.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* Stat Card 1 */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Total USDC Raised</h3>
            <DollarSign className="h-4 w-4 text-accent" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">${stats.totalRaised.toLocaleString()}</span>
            <span className="text-xs font-medium text-green-500 flex items-center"><ArrowUpRight className="h-3 w-3" /> 12%</span>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Total Trading Volume</h3>
            <Activity className="h-4 w-4 text-rose-500" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">${stats.totalVolume.toLocaleString()}</span>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Tokens Launched</h3>
            <Rocket className="h-4 w-4 text-pink-500" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">{stats.totalTokens}</span>
          </div>
        </div>

        {/* Stat Card 4 */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Active Shelters</h3>
            <Heart className="h-4 w-4 text-red-500" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">{stats.totalCampaigns}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Mock Chart Area */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm h-80 flex flex-col">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Volume Over Time (7d)</h3>
          <div className="flex-1 rounded-xl border border-dashed border-border flex items-center justify-center bg-secondary/10">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <Activity className="h-4 w-4" /> Chart Data Loading...
            </span>
          </div>
        </div>
        
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm h-80 flex flex-col">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Top Performing Shelters</h3>
          <div className="flex-1 flex flex-col gap-4">
             <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
               <span className="font-bold text-primary">Carla Ianni (Luna)</span>
               <span className="text-accent font-mono">$0</span>
             </div>
             <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 opacity-80">
               <span className="font-bold text-primary">Jaida Aliyah (Max)</span>
               <span className="text-accent font-mono">$0</span>
             </div>
             <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 opacity-60">
               <span className="font-bold text-primary">Laura Lara Ruiz (Edi)</span>
               <span className="text-accent font-mono">$0</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
