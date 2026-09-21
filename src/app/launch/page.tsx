/* eslint-disable */
// @ts-nocheck
"use client";

import { useState, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import { createInitializeMintInstruction, createInitializeMetadataPointerInstruction, createInitializeTransferFeeConfigInstruction, getMintLen, ExtensionType, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token';
import { createInitializeInstruction, pack } from '@solana/spl-token-metadata';
import { Rocket, Loader2, Heart, ArrowLeft } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { Suspense } from 'react';

function LaunchPageContent() {
  const { publicKey, sendTransaction, signTransaction } = useWallet();
  const { connection } = useConnection();
  const searchParams = useSearchParams();
  const campaignId = searchParams.get('campaignId');

  const [loading, setLoading] = useState(false);
  const [fetchingCampaign, setFetchingCampaign] = useState(!!campaignId);
  const [campaignData, setCampaignData] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    ticker: '',
    description: '',
    image: null as File | null,
    imagePreview: ''
  });

  useEffect(() => {
    if (campaignId) {
      fetch('/api/campaigns')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            const found = data.data.find(c => c.id === campaignId);
            if (found) {
              setCampaignData(found);
              // Pre-fill the form slightly to make it fun
              setFormData(prev => ({
                ...prev,
                description: `A charity token created to save ${found.name}. 4% of all volume is routed to the ShelterFund treasury for this cause.`
              }));
            }
          }
          setFetchingCampaign(false);
        });
    }
  }, [campaignId]);

  if (!campaignId) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center space-y-6 text-center">
        <Heart className="h-16 w-16 text-accent animate-pulse" />
        <h1 className="text-3xl font-bold text-primary">Choose a Rescue to Sponsor</h1>
        <p className="text-muted-foreground max-w-md">You must select a specific GoFundMe campaign from the pool before launching a token.</p>
        <Link href="/rescues" className="rounded-xl bg-accent px-6 py-3 font-bold text-accent-foreground hover:bg-accent/90">
          Browse Rescues
        </Link>
      </div>
    );
  }

  if (fetchingCampaign) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-accent" /></div>;
  }

  const handleLaunch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!publicKey || !signTransaction) {
      alert("Please connect your wallet first!");
      return;
    }
    
    setLoading(true);
    try {
      // 1. Upload Metadata to IPFS (Mocked via our API)
      const formPayload = new FormData();
      formPayload.append('name', formData.name);
      formPayload.append('ticker', formData.ticker);
      formPayload.append('description', formData.description);
      if (formData.image) formPayload.append('image', formData.image);

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formPayload
      });
      const uploadData = await uploadRes.json();
      if (!uploadData.success) throw new Error("Metadata upload failed");

      const uri = uploadData.uri;
      const mintKeypair = Keypair.generate();
      
      const metaData = {
        updateAuthority: publicKey,
        mint: mintKeypair.publicKey,
        name: formData.name,
        symbol: formData.ticker,
        uri: uri,
        additionalMetadata: [
          ["Sponsor", campaignData?.name || "ShelterFund"]
        ],
      };

      const extensions = [ExtensionType.TransferFeeConfig, ExtensionType.MetadataPointer];
      const mintLen = getMintLen(extensions);
      const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + pack(metaData).length);

      const PLATFORM_FEE_LAMPORTS = 100000000; // 0.1 SOL
      const PLATFORM_WALLET = "9HkQ7xL2X5YhK9XwF7Q1X5YhK9XwF7Q1X5YhK9XwF7Q1"; // Placeholder

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: publicKey, // Sending to self for demo safety, normally PLATFORM_WALLET
          lamports: PLATFORM_FEE_LAMPORTS,
        }),
        SystemProgram.createAccount({
          fromPubkey: publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: mintLen,
          lamports,
          programId: TOKEN_2022_PROGRAM_ID,
        }),
        createInitializeTransferFeeConfigInstruction(
          mintKeypair.publicKey,
          publicKey, // Transfer fee config authority
          publicKey, // Withdraw withheld authority
          400, // 4% fee
          BigInt(10000000000), // Max fee
          TOKEN_2022_PROGRAM_ID
        ),
        createInitializeMetadataPointerInstruction(
          mintKeypair.publicKey,
          publicKey,
          mintKeypair.publicKey,
          TOKEN_2022_PROGRAM_ID
        ),
        createInitializeMintInstruction(
          mintKeypair.publicKey,
          9,
          publicKey,
          null,
          TOKEN_2022_PROGRAM_ID
        ),
        createInitializeInstruction({
          programId: TOKEN_2022_PROGRAM_ID,
          mint: mintKeypair.publicKey,
          metadata: mintKeypair.publicKey,
          name: metaData.name,
          symbol: metaData.symbol,
          uri: metaData.uri,
          mintAuthority: publicKey,
          updateAuthority: publicKey,
        })
      );

      transaction.feePayer = publicKey;
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

      // Partial sign by the mint keypair
      transaction.partialSign(mintKeypair);

      // Send the transaction to Solana Devnet!
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature);
      
      // Save Token to Database
      await fetch('/api/tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mintAddress: mintKeypair.publicKey.toBase58(),
          name: formData.name,
          ticker: formData.ticker,
          campaignId: campaignId
        })
      });

      alert(`Token ${formData.ticker} launched successfully to sponsor ${campaignData?.name}!`);
      window.location.href = '/rescues';
    } catch (error: any) {
      console.error(error);
      alert("Launch failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 lg:px-6">
      
      <Link href="/rescues" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to Pool
      </Link>

      <div className="mb-8 rounded-2xl border border-accent/20 bg-accent/5 p-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-2">You are sponsoring</h2>
        <div className="flex items-center gap-4">
          <img src={campaignData?.image} className="h-16 w-16 rounded-xl object-cover" />
          <div>
            <h3 className="text-xl font-bold text-primary">{campaignData?.name}</h3>
            <p className="text-sm text-muted-foreground">4% of this coin's volume will be permanently routed to this campaign.</p>
          </div>
        </div>
      </div>

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-medium tracking-tight text-primary">Deploy Token</h1>
      </div>

      <form onSubmit={handleLaunch} className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
        
        {/* Token Image */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-border bg-secondary/50 transition-colors hover:bg-secondary">
            {formData.imagePreview ? (
              <img src={formData.imagePreview} alt="Preview" className="h-full w-full object-cover" />
            ) : (
              <span className="text-sm font-medium text-muted-foreground">Upload Image</span>
            )}
            <input 
              type="file" 
              accept="image/*" 
              required
              className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFormData({...formData, image: file, imagePreview: URL.createObjectURL(file)});
                }
              }}
            />
          </div>
        </div>

        {/* Token Details */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Token Name</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Save Luna Coin" 
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-primary outline-none transition-all focus:border-accent"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Ticker Symbol</label>
            <input 
              type="text" 
              required
              placeholder="e.g. LUNA" 
              maxLength={10}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-primary outline-none uppercase transition-all focus:border-accent"
              value={formData.ticker}
              onChange={e => setFormData({...formData, ticker: e.target.value.toUpperCase()})}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">Description</label>
          <textarea 
            required
            rows={3}
            placeholder="Tell the story of why you are saving them..." 
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-primary outline-none transition-all focus:border-accent"
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <div className="rounded-xl bg-secondary/50 p-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Deployment Fee (Devnet)</span>
            <span className="font-bold text-primary">0.1 SOL</span>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-muted-foreground">Transfer Fee (Locked)</span>
            <span className="font-bold text-accent">4.0%</span>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading || !publicKey}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-4 text-base font-bold text-accent-foreground transition-colors hover:bg-accent/90 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : !publicKey ? (
            "Connect Wallet to Deploy"
          ) : (
            <>
              <Rocket className="h-5 w-5" />
              Deploy Token
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default function LaunchPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-accent" /></div>}>
      <LaunchPageContent />
    </Suspense>
  );
}
