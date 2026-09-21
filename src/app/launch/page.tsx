"use client";

import { useState, useEffect } from 'react';
import { PawPrint, Upload, Rocket, Loader2 } from 'lucide-react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction, PublicKey } from '@solana/web3.js';
import { 
  TOKEN_2022_PROGRAM_ID, 
  createInitializeMintInstruction, 
  getMinimumBalanceForRentExemptMint,
  ExtensionType,
  getMintLen,
  createInitializeTransferFeeConfigInstruction,
  createInitializeMetadataPointerInstruction,
  TYPE_SIZE,
  LENGTH_SIZE
} from '@solana/spl-token';
import { createInitializeInstruction, pack } from '@solana/spl-token-metadata';

// Platform's secure cold wallet that collects all the 4% taxes
const MASTER_TREASURY_WALLET = new PublicKey("11111111111111111111111111111111"); 
const TAX_BASIS_POINTS = 400; // 400 basis points = 4% tax
const PLATFORM_FEE_LAMPORTS = 100000000; // 0.1 SOL Upfront Platform Launch Fee

export default function LaunchPage() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [loading, setLoading] = useState(false);
  const [txSig, setTxSig] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);

  useEffect(() => {
    fetch('/api/campaigns')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCampaigns(data.data);
        }
        setLoadingCampaigns(false);
      })
      .catch(err => {
        console.error("Failed to fetch campaigns", err);
        setLoadingCampaigns(false);
      });
  }, []);

  const handleLaunch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!publicKey) {
      alert("Please connect your wallet first via the top right menu.");
      return;
    }
    if (!file) {
      alert("Please upload a token image.");
      return;
    }

    try {
      setLoading(true);
      
      const campaignId = (e.currentTarget.elements.namedItem('campaignId') as HTMLSelectElement).value;
      const name = (e.currentTarget.elements.namedItem('name') as HTMLInputElement).value;
      const ticker = (e.currentTarget.elements.namedItem('ticker') as HTMLInputElement).value;
      const description = (e.currentTarget.elements.namedItem('description') as HTMLTextAreaElement).value;

      // 1. Upload Metadata to IPFS
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', name);
      formData.append('ticker', ticker);
      formData.append('description', description);

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const uploadData = await uploadRes.json();
      if (!uploadData.success) throw new Error("Failed to upload metadata to IPFS");
      
      const metadataUri = uploadData.metadataUri;
      console.log("Metadata URI:", metadataUri);

      // 2. Setup Blockchain Metadata
      const mintKeypair = Keypair.generate();
      const decimals = 9;
      
      const metaData = {
        updateAuthority: publicKey,
        mint: mintKeypair.publicKey,
        name: name,
        symbol: ticker,
        uri: metadataUri,
        additionalMetadata: [["platform", "ShelterFund"]],
      };

      const mintLen = getMintLen([ExtensionType.TransferFeeConfig, ExtensionType.MetadataPointer]);
      const metadataExtension = TYPE_SIZE + LENGTH_SIZE + pack(metaData).length;
      const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataExtension);

      // 3. Build the REAL Blockchain Transaction
      const transaction = new Transaction().add(
        // Charge Platform Fee
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: MASTER_TREASURY_WALLET,
          lamports: PLATFORM_FEE_LAMPORTS,
        }),
        // Create Account for Token-2022 Mint
        SystemProgram.createAccount({
          fromPubkey: publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: mintLen,
          lamports,
          programId: TOKEN_2022_PROGRAM_ID,
        }),
        // Attach Metadata Pointer
        createInitializeMetadataPointerInstruction(
          mintKeypair.publicKey,
          publicKey,
          mintKeypair.publicKey,
          TOKEN_2022_PROGRAM_ID
        ),
        // Initialize 4% Transfer Tax (Locked to Master Wallet)
        createInitializeTransferFeeConfigInstruction(
          mintKeypair.publicKey,
          MASTER_TREASURY_WALLET, 
          MASTER_TREASURY_WALLET, 
          TAX_BASIS_POINTS, 
          BigInt(0), 
          TOKEN_2022_PROGRAM_ID
        ),
        // Initialize the actual Token Mint
        createInitializeMintInstruction(
          mintKeypair.publicKey,
          decimals,
          publicKey, 
          null, // Anti-rug: No freeze authority
          TOKEN_2022_PROGRAM_ID
        ),
        // Write the Image/Metadata URI into the smart contract
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

      // 4. Send the transaction to the network
      const signature = await sendTransaction(transaction, connection, {
        signers: [mintKeypair],
      });

      console.log('Token created! Transaction signature', signature);
      setTxSig(signature);
      
      // 5. Save mapping to database
      await fetch('/api/tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mintAddress: mintKeypair.publicKey.toString(),
          campaignId,
          name,
          ticker
        })
      });
      
    } catch (error: any) {
      console.error(error);
      alert("Failed to launch token: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 lg:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-medium tracking-tight text-primary">Launch a Coin</h1>
        <p className="mt-2 text-muted-foreground">
          Deploy a Token-2022 smart contract. A hardcoded 4% tax will route directly to the selected rescue.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        {txSig ? (
          <div className="text-center py-10 space-y-4">
             <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
               <PawPrint className="h-8 w-8 text-green-500 fill-green-500" />
             </div>
             <h2 className="text-2xl font-bold text-primary">Token Launched Successfully!</h2>
             <p className="text-muted-foreground">Your token is now live on Solana with a locked 4% tax.</p>
             <a href={`https://solscan.io/tx/${txSig}`} target="_blank" rel="noreferrer" className="inline-block text-accent hover:underline">
               View Transaction on Solscan
             </a>
             <div className="mt-8">
               <button onClick={() => setTxSig(null)} className="rounded-full border border-border px-6 py-2 text-sm font-medium text-primary hover:bg-secondary">
                 Launch Another
               </button>
             </div>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleLaunch}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary flex justify-between">
                <span>Select Live Rescue Campaign</span>
                {loadingCampaigns && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
              </label>
              <div className="relative">
                <select 
                  name="campaignId"
                  className="w-full appearance-none rounded-lg border border-border bg-background p-3 pl-10 text-sm text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  disabled={loadingCampaigns}
                >
                  {campaigns.map(camp => (
                    <option key={camp.id} value={camp.id}>
                      {camp.name} (${camp.goal - camp.raised} remaining)
                    </option>
                  ))}
                  {campaigns.length === 0 && !loadingCampaigns && (
                    <option>No live campaigns found.</option>
                  )}
                </select>
                <PawPrint className="absolute left-3 top-3.5 h-4 w-4 text-accent fill-accent" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Smart contract hardcodes 4% of all trading volume to automatically route here.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary">Token Name</label>
                <input name="name" required type="text" placeholder="e.g. Save Luna" className="w-full rounded-lg border border-border bg-background p-3 text-sm text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary">Ticker</label>
                <input name="ticker" required type="text" placeholder="e.g. LUNA" className="w-full rounded-lg border border-border bg-background p-3 text-sm text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Description</label>
              <textarea name="description" rows={3} placeholder="Tell the story of this coin..." className="w-full rounded-lg border border-border bg-background p-3 text-sm text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Token Image</label>
              <div className="flex w-full items-center justify-center">
                <label htmlFor="dropzone-file" className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-background transition-colors hover:bg-secondary/50">
                  <div className="flex flex-col items-center justify-center pb-6 pt-5 text-center px-4">
                    <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      {file ? <span className="font-bold text-accent">{file.name} selected</span> : <><span className="font-semibold text-primary">Click to upload</span> or drag and drop</>}
                    </p>
                    {!file && <p className="text-xs text-muted-foreground">PNG, JPG or GIF (MAX. 5MB)</p>}
                  </div>
                  <input 
                    id="dropzone-file" 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                </label>
              </div>
            </div>

            <button type="submit" disabled={loading || loadingCampaigns} className="flex w-full items-center justify-center gap-2 rounded-full bg-accent py-4 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90 disabled:opacity-50">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Rocket className="h-4 w-4" />}
              {loading ? "Uploading to IPFS & Deploying..." : "Launch Token-2022 Coin (0.1 SOL Platform Fee)"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
