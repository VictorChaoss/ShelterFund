/* eslint-disable */
// @ts-nocheck
"use client";

import { useState, useEffect } from 'react';
import { Trophy, TrendingUp, Search, Loader2 } from 'lucide-react';

export default function ExplorePage() {
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then(res => res.json())
      .then(data => {
        let loadedTokens = [];
        if (data.success) {
          loadedTokens = data.data;
        }

        // Pull in the local tokens the user just deployed
        const claimedLocal = JSON.parse(localStorage.getItem('claimedTokens') || '{}');
        const customTokens = Object.keys(claimedLocal).map(campId => ({
          name: claimedLocal[campId].ticker + " Coin",
          ticker: claimedLocal[campId].ticker,
          mintAddress: claimedLocal[campId].mint.slice(0, 10) + "...",
          volumeUsd: 0,
          campaign: { name: "Sponsored Rescue" }
        }));

        setTokens([...customTokens, ...loadedTokens]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 lg:px-6">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-medium tracking-tight text-primary">Explore Coins</h1>
          <p className="mt-2 text-muted-foreground">
            The most heavily traded memecoins funding real-world animal rescues.
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search coins or shelters..." 
            className="w-full rounded-full border border-border bg-background py-2.5 pl-10 pr-4 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary/30 text-muted-foreground">
                <tr>
                  <th className="px-6 py-4 font-medium">Rank</th>
                  <th className="px-6 py-4 font-medium">Token Name</th>
                  <th className="px-6 py-4 font-medium">Trading Volume</th>
                  <th className="px-6 py-4 font-medium text-green-500">4% Tax Generated</th>
                  <th className="px-6 py-4 font-medium">Funding Campaign</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {tokens.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                      No coins have been launched yet. <a href="/rescues" className="text-accent hover:underline">Be the first to sponsor a rescue!</a>
                    </td>
                  </tr>
                ) : (
                  tokens.map((token, index) => (
                    <tr key={index} className="transition-colors hover:bg-secondary/20 group">
                      <td className="px-6 py-4">
                        {index === 0 ? <Trophy className="h-5 w-5 text-accent" /> : <span className="font-mono text-muted-foreground">#{index + 1}</span>}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">
                            {token.ticker}
                          </div>
                          <div>
                            <p className="font-bold text-primary">{token.name}</p>
                            <p className="text-xs text-muted-foreground font-mono">{token.mintAddress}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-primary flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-amber-500" />
                        ${token.volumeUsd.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 font-mono font-bold text-green-500">
                        ${(token.volumeUsd * 0.04).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent group-hover:bg-accent group-hover:text-black transition-colors">
                          {token.campaign.name}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
